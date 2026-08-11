// Display formatting for bazel profile comparisons.

import { Run } from "./types";

export function fmt(us: number): string {
    if (us === 0) return "-";
    return `${(us / 1e6).toFixed(1)}s`;
}

export function pctStr(base: number, val: number): string {
    if (base === 0) return "";
    const pct = ((val - base) / base) * 100;
    return `${pct >= 0 ? "+" : ""}${pct.toFixed(0)}%`;
}

export function pctClass(base: number, val: number): string {
    if (base === 0 || val === base) return "text-gray-400";
    return val < base ? "text-green-600" : "text-red-500";
}

// "Foreign Cc - Meson: Building zstd" -> "zstd", like the python script's
// t.split("Building ")[-1].
export function shortName(actionName: string): string {
    return actionName.split("Building ").pop()!;
}

// Short config annotation for one execution, when the profile was captured
// with --experimental_profile_include_primary_output / _target_configuration.
export function runDetail(r: Run): string | null {
    if (r.out) {
        const m = r.out.match(/bazel-out\/([^/]+)\//);
        if (m) return m[1];
    }
    if (r.config) return r.config === "system" ? "system" : r.config.slice(0, 8);
    return null;
}

export function runTitle(r: Run): string {
    const bits = [];
    if (r.target) bits.push(r.target);
    if (r.out) bits.push(r.out);
    if (r.config) bits.push(`config ${r.config}`);
    return bits.join("\n");
}
