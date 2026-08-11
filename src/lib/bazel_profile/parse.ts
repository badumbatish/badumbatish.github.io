// Parsing of bazel --profile chrome-trace files (.gz or plain JSON).

import { buildSeries, buildTimeline } from "./concurrency";
import { Profile, Run } from "./types";

async function toText(file: File): Promise<string> {
    const buf = await file.arrayBuffer();
    const bytes = new Uint8Array(buf);
    if (bytes.length > 2 && bytes[0] === 0x1f && bytes[1] === 0x8b) {
        const stream = new Blob([buf])
            .stream()
            .pipeThrough(new DecompressionStream("gzip"));
        return new Response(stream).text();
    }
    return new TextDecoder().decode(buf);
}

export function profileNameFromFilename(filename: string): string {
    return filename
        .replace(/\.gz$/i, "")
        .replace(/\.json$/i, "")
        .replace(/\.profile$/i, "");
}

export function parseProfileJson(text: string, name: string): Profile {
    const data = JSON.parse(text);
    const events: unknown = data?.traceEvents;
    if (!Array.isArray(events)) {
        throw new Error("no traceEvents array — is this a bazel --profile output?");
    }
    const actions: Record<string, Run[]> = {};
    const intervals: { ts: number; dur: number }[] = [];
    const cpuPts: [number, number][] = [];
    const loadavgPts: [number, number][] = [];
    let maxEnd = 0;
    let minStart = Infinity;
    for (const e of events) {
        if (e?.ph === "C" && typeof e.ts === "number" && e.args) {
            const v = Number(Object.values(e.args)[0]);
            if (Number.isFinite(v)) {
                if (e.name === "CPU usage (total)") cpuPts.push([e.ts, v]);
                else if (e.name === "System load average")
                    loadavgPts.push([e.ts, v]);
            }
        }
        if (
            e?.ph === "X" &&
            e?.cat === "action processing" &&
            typeof e.dur === "number" &&
            typeof e.ts === "number"
        ) {
            intervals.push({ ts: e.ts, dur: e.dur });
            (actions[e.name] ??= []).push({
                ts: e.ts,
                dur: e.dur,
                out: typeof e.out === "string" ? e.out : undefined,
                target:
                    typeof e.args?.target === "string" ? e.args.target : undefined,
                config:
                    typeof e.args?.configuration === "string"
                        ? e.args.configuration
                        : undefined,
            });
        }
        if (typeof e?.ts === "number") {
            const end = e.ts + (typeof e.dur === "number" ? e.dur : 0);
            if (end > maxEnd) maxEnd = end;
            if (e.ts < minStart) minStart = e.ts;
        }
    }
    const wall = minStart === Infinity ? 0 : maxEnd - minStart;
    return {
        name,
        actions,
        wall,
        timeline: buildTimeline(intervals),
        counters: {
            cpu: cpuPts.length > 0 ? buildSeries(cpuPts) : undefined,
            loadavg: loadavgPts.length > 0 ? buildSeries(loadavgPts) : undefined,
        },
    };
}

export async function parseProfileFile(file: File): Promise<Profile> {
    const text = await toText(file);
    return parseProfileJson(text, profileNameFromFilename(file.name));
}
