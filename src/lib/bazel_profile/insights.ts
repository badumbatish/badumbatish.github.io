// Outlier detection: flag targets where machine load and outcome point in
// opposite directions — finishing faster despite higher CPU load, or slower
// despite a quieter machine. Differences that load or run counts already
// explain are not outliers; the table itself shows those (×n, amber loads).

import { runsLoad } from "./concurrency";
import { fmt } from "./format";
import { total } from "./tables";
import { TableSpec } from "./types";

export interface Insight {
    target: string;
    profile: string;
    severity: number; // µs of absolute difference, for ranking
    message: string;
}

const MIN_ABS_US = 2e6; // ignore differences under 2s...
const MIN_REL = 0.25; // ...or under 25%
const EARLY_US = 60e6; // "start of build" for cold-start hints

function pctOf(rel: number): string {
    return `${rel >= 0 ? "+" : ""}${Math.round(rel * 100)}%`;
}

export function analyzeTable(
    spec: TableSpec,
    baseline: string,
    targets: string[],
): Insight[] {
    const base = spec.profiles.find((p) => p.name === baseline);
    if (!base || spec.profiles.length < 2) return [];
    const label = (n: string) => spec.labels[n] ?? n;
    const out: Insight[] = [];

    for (const t of targets) {
        const baseRuns = base.actions[t] ?? [];
        const baseTotal = total(baseRuns);
        for (const p of spec.profiles) {
            if (p.name === baseline) continue;
            const runs = p.actions[t] ?? [];
            const colTotal = total(runs);
            if (colTotal === 0 || baseTotal === 0) continue;

            // When run counts differ, compare per-run so extra configurations
            // don't masquerade as slowness.
            const sameCount = runs.length === baseRuns.length;
            const colPer = colTotal / runs.length;
            const basePer = baseTotal / baseRuns.length;
            const rel = sameCount
                ? (colTotal - baseTotal) / baseTotal
                : colPer / basePer - 1;
            const absDiff = sameCount
                ? Math.abs(colTotal - baseTotal)
                : Math.abs(colPer - basePer);
            if (absDiff < MIN_ABS_US || Math.abs(rel) < MIN_REL) continue;

            const colLoad = runsLoad(p, runs);
            const baseLoad = runsLoad(base, baseRuns);
            if (colLoad.metric !== baseLoad.metric || baseLoad.value <= 0)
                continue;
            const ratio = colLoad.value / baseLoad.value;

            const slowerOnQuieterMachine = rel > 0 && ratio <= 1.1;
            const fasterOnBusierMachine = rel < 0 && ratio >= 0.9;
            if (!slowerOnQuieterMachine && !fasterOnBusierMachine) continue;

            const loadStr = `@${Math.round(colLoad.value)} vs @${Math.round(baseLoad.value)}`;
            const bits = [
                `${pctOf(rel)} in ${label(p.name)} (${fmt(baseTotal)} → ${fmt(colTotal)})`,
            ];
            if (!sameCount) {
                bits.push(
                    `ran ×${runs.length} vs ×${baseRuns.length} - comparing per-run`,
                );
            }
            if (slowerOnQuieterMachine) {
                bits.push(
                    `slower despite lower machine load (${loadStr})`,
                );
                const meanStart =
                    runs.reduce((a, r) => a + r.ts, 0) / runs.length;
                if (meanStart < EARLY_US) {
                    bits.push(
                        `ran in the first minute of the build - cold caches / spawn burst?`,
                    );
                }
            } else {
                bits.push(
                    `faster despite machine load ${loadStr} — ${label(baseline)} likely does more work per run (config/ABI/toolchain difference)?`,
                );
            }
            out.push({
                target: t,
                profile: p.name,
                severity: Math.abs(colTotal - baseTotal),
                message: bits.join("; "),
            });
        }
    }
    return out.sort((a, b) => b.severity - a.severity);
}
