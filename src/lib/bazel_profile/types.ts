// Data model for bazel --profile comparison.

// One execution of an action. target/config/out are present when the profile
// was captured with --experimental_profile_include_target_label /
// _target_configuration / _primary_output.
export interface Run {
    ts: number;
    dur: number;
    out?: string;
    target?: string;
    config?: string;
}

// Concurrency-over-time step function; see lib/bazel_profile/concurrency.ts.
export interface Timeline {
    times: number[];
    counts: number[];
    integral: number[];
}

// A sampled counter from the profile (e.g. "CPU usage (total)"), sorted by ts.
export interface Series {
    ts: number[];
    val: number[];
}

// One parsed profile file: every "action processing" event keyed by action
// name (an action built in several configurations yields several runs).
export interface Profile {
    name: string;
    actions: Record<string, Run[]>;
    wall: number;
    timeline: Timeline;
    counters: {
        cpu?: Series; // "CPU usage (total)", in busy cores
        loadavg?: Series; // "System load average"
    };
}

// A named preset that pulls specific profile filenames into one table.
export interface Group {
    title: string;
    baseline: string;
    profiles: string[];
    labels: Record<string, string>;
}

// One rendered comparison table.
export interface TableSpec {
    title: string;
    profiles: Profile[];
    defaultBaseline: string;
    labels: Record<string, string>;
}

export type SortMode = "name" | "duration";
