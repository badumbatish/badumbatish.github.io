"use client";

import React, { useState } from "react";
import { hover_border } from "@/components/tailwind_const";
import { fmt } from "@/lib/bazel_profile/format";
import { analyzeTable } from "@/lib/bazel_profile/insights";
import { matchedTargets, sortTargets, total } from "@/lib/bazel_profile/tables";
import { SortMode, TableSpec } from "@/lib/bazel_profile/types";
import InsightsPanel from "./InsightsPanel";
import TargetRow, { PctCell } from "./TargetRow";

const ROW_LIMIT = 100;

// One comparison table: header with baseline picker, one TargetRow per
// matched action, and SUM / WALL CLOCK footer rows.
export default function ComparisonTable({
    spec,
    filter,
    sortMode,
}: {
    spec: TableSpec;
    filter: string;
    sortMode: SortMode;
}) {
    const [baselineOverride, setBaselineOverride] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);

    const baseline =
        baselineOverride && spec.profiles.some((p) => p.name === baselineOverride)
            ? baselineOverride
            : spec.defaultBaseline;
    const base = spec.profiles.find((p) => p.name === baseline)!;

    const allTargets = matchedTargets(spec, filter);
    const targetList = Array.from(allTargets);
    const insights = analyzeTable(spec, baseline, targetList);
    let targets = sortTargets(targetList, spec, sortMode);
    const truncated = !showAll && targets.length > ROW_LIMIT;
    if (truncated) targets = targets.slice(0, ROW_LIMIT);

    const sums: Record<string, number> = {};
    for (const p of spec.profiles) {
        sums[p.name] = Array.from(allTargets).reduce(
            (acc, t) => acc + total(p.actions[t]),
            0,
        );
    }

    const label = (name: string) => spec.labels[name] ?? name;

    return (
        <div className={`w-full rounded-lg border-2 border-blue-300 ${hover_border}`}>
            <div className="px-4 pt-4 pb-2 border-b border-blue-200 flex flex-wrap items-baseline gap-x-3">
                <h2 className="font-bold text-lg">{spec.title}</h2>
                <span className="text-xs text-gray-500">
                    baseline: {label(baseline)} (click a column header to change; click
                    a ▸ row to expand its individual runs; @n = avg busy CPU cores
                    while it ran — or bazel actions if the profile has no CPU
                    counters — amber when ≥1.5× baseline&apos;s, hover for detail)
                </span>
            </div>
            <InsightsPanel insights={insights} />
            <div className="p-4 overflow-x-auto">
                <table className="font-mono text-sm w-full whitespace-nowrap">
                    <thead>
                        <tr className="border-b border-blue-200">
                            <th className="text-left pr-4 py-1 font-bold">Target</th>
                            {spec.profiles.map((p) => (
                                <React.Fragment key={p.name}>
                                    <th className="text-right pl-4 py-1">
                                        <button
                                            onClick={() => setBaselineOverride(p.name)}
                                            className={`font-bold hover:text-indigo-400 ${
                                                p.name === baseline ? "underline" : ""
                                            }`}
                                            title={
                                                p.name === baseline
                                                    ? "current baseline"
                                                    : "set as baseline"
                                            }
                                        >
                                            {label(p.name)}
                                        </button>
                                    </th>
                                    {p.name !== baseline && (
                                        <th className="text-right pl-3 py-1 text-gray-500 font-normal">
                                            %
                                        </th>
                                    )}
                                </React.Fragment>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {targets.map((t) => (
                            <TargetRow
                                key={t}
                                t={t}
                                spec={spec}
                                baseline={baseline}
                            />
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="border-t border-blue-200 font-bold">
                            <td className="text-left pr-4 py-1">SUM (matched)</td>
                            {spec.profiles.map((p) => (
                                <React.Fragment key={p.name}>
                                    <td className="text-right pl-4 py-1">
                                        {fmt(sums[p.name])}
                                    </td>
                                    {p.name !== baseline && (
                                        <PctCell
                                            base={sums[baseline]}
                                            val={sums[p.name]}
                                            className="py-1 font-bold"
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr className="font-bold">
                            <td className="text-left pr-4 py-1">WALL CLOCK</td>
                            {spec.profiles.map((p) => (
                                <React.Fragment key={p.name}>
                                    <td className="text-right pl-4 py-1">{fmt(p.wall)}</td>
                                    {p.name !== baseline && (
                                        <PctCell
                                            base={base.wall}
                                            val={p.wall}
                                            className="py-1 font-bold"
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </tr>
                    </tfoot>
                </table>
                {truncated && (
                    <button
                        onClick={() => setShowAll(true)}
                        className="pt-2 text-sm underline text-indigo-400 hover:text-indigo-300"
                    >
                        showing {ROW_LIMIT} of {allTargets.size} actions — show all
                    </button>
                )}
                {allTargets.size === 0 && (
                    <p className="text-sm text-gray-500 italic">
                        No actions match &ldquo;{filter}&rdquo; in these profiles.
                    </p>
                )}
            </div>
        </div>
    );
}
