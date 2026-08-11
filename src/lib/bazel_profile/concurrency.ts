// Machine-load estimation for a time window. The primary signal is the
// profile's own OS counters (busy CPU cores); concurrent bazel actions is
// only a fallback, because foreign_cc actions vary wildly in internal
// parallelism — 10 `make -j` builds can outweigh 118 serial configures.

import { Profile, Run, Series, Timeline } from "./types";

// Build a step function of concurrency over time from all action intervals.
// times[i] is a breakpoint, counts[i] the concurrency in [times[i],
// times[i+1]), integral[i] the integral of concurrency from times[0] to
// times[i].
export function buildTimeline(
    intervals: { ts: number; dur: number }[],
): Timeline {
    const deltas = new Map<number, number>();
    for (const { ts, dur } of intervals) {
        deltas.set(ts, (deltas.get(ts) ?? 0) + 1);
        deltas.set(ts + dur, (deltas.get(ts + dur) ?? 0) - 1);
    }
    const times = Array.from(deltas.keys()).sort((a, b) => a - b);
    const counts: number[] = [];
    const integral: number[] = [];
    let running = 0;
    let acc = 0;
    for (let i = 0; i < times.length; i++) {
        if (i > 0) acc += running * (times[i] - times[i - 1]);
        running += deltas.get(times[i])!;
        counts.push(running);
        integral.push(acc);
    }
    return { times, counts, integral };
}

function integralAt(tl: Timeline, x: number): number {
    const { times, counts, integral } = tl;
    let lo = 0;
    let hi = times.length - 1;
    let i = -1;
    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (times[mid] <= x) {
            i = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    if (i < 0) return 0;
    return integral[i] + counts[i] * (x - times[i]);
}

// Average number of concurrently-running actions during [ts, ts+dur]
// (including the action itself).
export function avgLoad(tl: Timeline, ts: number, dur: number): number {
    if (dur <= 0 || tl.times.length === 0) return 0;
    return (integralAt(tl, ts + dur) - integralAt(tl, ts)) / dur;
}

export function buildSeries(points: [number, number][]): Series {
    points.sort((a, b) => a[0] - b[0]);
    return { ts: points.map((p) => p[0]), val: points.map((p) => p[1]) };
}

// Average of a sampled counter over [from, to]; falls back to the nearest
// sample at or before `to` when the window is shorter than the sample rate.
export function seriesAvg(s: Series, from: number, to: number): number {
    if (s.ts.length === 0) return 0;
    let lo = 0;
    let hi = s.ts.length;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (s.ts[mid] < from) lo = mid + 1;
        else hi = mid;
    }
    let sum = 0;
    let n = 0;
    for (let i = lo; i < s.ts.length && s.ts[i] <= to; i++) {
        sum += s.val[i];
        n++;
    }
    if (n > 0) return sum / n;
    return lo > 0 ? s.val[lo - 1] : s.val[0];
}

// The load shown to the user: busy CPU cores when the profile has OS
// counters, concurrent bazel actions otherwise. The secondary numbers feed
// the tooltip.
export interface LoadInfo {
    value: number;
    metric: "cpu" | "actions";
    cpu?: number;
    loadavg?: number;
    actions: number;
}

export function runLoad(p: Profile, ts: number, dur: number): LoadInfo {
    const actions = avgLoad(p.timeline, ts, dur);
    const cpu = p.counters.cpu
        ? seriesAvg(p.counters.cpu, ts, ts + dur)
        : undefined;
    const loadavg = p.counters.loadavg
        ? seriesAvg(p.counters.loadavg, ts, ts + dur)
        : undefined;
    return {
        value: cpu ?? actions,
        metric: cpu !== undefined ? "cpu" : "actions",
        cpu,
        loadavg,
        actions,
    };
}

// Duration-weighted load across several runs of the same action.
export function runsLoad(p: Profile, runs: Run[]): LoadInfo {
    const totalDur = runs.reduce((acc, r) => acc + r.dur, 0);
    if (totalDur === 0) {
        return { value: 0, metric: p.counters.cpu ? "cpu" : "actions", actions: 0 };
    }
    const infos = runs.map((r) => ({ info: runLoad(p, r.ts, r.dur), dur: r.dur }));
    const weigh = (get: (i: LoadInfo) => number | undefined): number | undefined =>
        infos.some(({ info }) => get(info) === undefined)
            ? undefined
            : infos.reduce((a, { info, dur }) => a + get(info)! * dur, 0) / totalDur;
    const cpu = weigh((i) => i.cpu);
    return {
        value: cpu ?? weigh((i) => i.actions)!,
        metric: cpu !== undefined ? "cpu" : "actions",
        cpu,
        loadavg: weigh((i) => i.loadavg),
        actions: weigh((i) => i.actions)!,
    };
}
