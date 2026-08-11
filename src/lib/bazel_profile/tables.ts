// Comparison semantics: which profiles form which table, which actions are
// shown, and in what order.

import { shortName } from "./format";
import { Group, Profile, Run, SortMode, TableSpec } from "./types";

// Mirrors trace/compare_profiles.py: profiles whose filenames match these are
// grouped into the same tables the script prints. Add presets here.
export const GROUPS: Group[] = [
    {
        title: "Clean builds",
        baseline: "no_cache",
        profiles: ["no_cache", "warm_cache", "cold_cache"],
        labels: { no_cache: "no_cache", warm_cache: "warm", cold_cache: "cold" },
    },
    {
        title: "Modified builds",
        baseline: "no_cache_modified",
        profiles: ["no_cache_modified", "warm_cache_modified"],
        labels: { no_cache_modified: "no_mod", warm_cache_modified: "warm_mod" },
    },
];

export function total(runs: Run[] | undefined): number {
    return (runs ?? []).reduce((acc, r) => acc + r.dur, 0);
}

// Split loaded profiles into tables: known filename groups first (when at
// least two of a group's profiles are loaded), everything else in one
// generic table.
export function buildTables(profiles: Profile[]): TableSpec[] {
    const byName = Object.fromEntries(profiles.map((p) => [p.name, p]));
    const consumed = new Set<string>();
    const result: TableSpec[] = [];
    for (const g of GROUPS) {
        const present = g.profiles.filter((n) => byName[n]);
        if (present.length >= 2) {
            present.forEach((n) => consumed.add(n));
            result.push({
                title: g.title,
                profiles: present.map((n) => byName[n]),
                defaultBaseline: byName[g.baseline] ? g.baseline : present[0],
                labels: g.labels,
            });
        }
    }
    const leftovers = profiles.filter((p) => !consumed.has(p.name));
    if (leftovers.length > 0) {
        result.push({
            title: result.length > 0 ? "Other profiles" : "Comparison",
            profiles: leftovers,
            defaultBaseline: leftovers[0].name,
            labels: {},
        });
    }
    return result;
}

// All action names in a table matching the case-insensitive substring filter.
export function matchedTargets(spec: TableSpec, filter: string): Set<string> {
    const needle = filter.toLowerCase();
    const targets = new Set<string>();
    for (const p of spec.profiles) {
        for (const k of Object.keys(p.actions)) {
            if (k.toLowerCase().includes(needle)) targets.add(k);
        }
    }
    return targets;
}

export function sortTargets(
    targets: string[],
    spec: TableSpec,
    sortMode: SortMode,
): string[] {
    const sorted = [...targets];
    if (sortMode === "name") {
        sorted.sort((a, b) => {
            const sa = shortName(a).toLowerCase();
            const sb = shortName(b).toLowerCase();
            return sa < sb ? -1 : sa > sb ? 1 : 0;
        });
    } else {
        sorted.sort((a, b) => {
            const va = Math.max(...spec.profiles.map((p) => total(p.actions[a])));
            const vb = Math.max(...spec.profiles.map((p) => total(p.actions[b])));
            return vb - va;
        });
    }
    return sorted;
}
