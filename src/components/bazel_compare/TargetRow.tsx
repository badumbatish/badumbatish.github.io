"use client";

import React, { useState } from "react";
import {
    LoadInfo,
    runLoad,
    runsLoad,
} from "@/lib/bazel_profile/concurrency";
import {
    fmt,
    pctClass,
    pctStr,
    runDetail,
    runTitle,
    shortName,
} from "@/lib/bazel_profile/format";
import { total } from "@/lib/bazel_profile/tables";
import { TableSpec } from "@/lib/bazel_profile/types";

// The % cell shown next to every non-baseline value.
export function PctCell({
    base,
    val,
    className = "py-0.5",
}: {
    base: number;
    val: number;
    className?: string;
}) {
    return (
        <td className={`text-right pl-3 ${className} ${pctClass(base, val)}`}>
            {pctStr(base, val)}
        </td>
    );
}

// Machine load while this action ran: busy CPU cores (from the profile's OS
// counters) when available, else concurrent bazel actions. Amber when the
// machine was much busier than during the baseline's runs — a likely
// explanation for a slowdown that isn't intrinsic to the action.
function LoadTag({ info, baseInfo }: { info: LoadInfo; baseInfo?: LoadInfo }) {
    if (info.value <= 0) return null;
    const comparable =
        baseInfo !== undefined &&
        baseInfo.metric === info.metric &&
        baseInfo.value > 0;
    const hot = comparable && info.value >= 8 && info.value >= 1.5 * baseInfo.value;
    const parts = [];
    if (info.cpu !== undefined)
        parts.push(`avg ${Math.round(info.cpu)} busy CPU cores`);
    if (info.loadavg !== undefined)
        parts.push(`load avg ${Math.round(info.loadavg)}`);
    parts.push(`${Math.round(info.actions)} concurrent bazel actions`);
    return (
        <span
            className={`text-xs ${hot ? "text-amber-600" : "text-gray-400"}`}
            title={
                `${parts.join(" · ")} while this ran` +
                (comparable ? ` (baseline: ${Math.round(baseInfo.value)})` : "")
            }
        >
            {" "}
            @{Math.round(info.value)}
        </span>
    );
}

// One action's row: the per-profile totals with ×n run counts, expandable
// into ranked individual runs when any profile ran it more than once.
export default function TargetRow({
    t,
    spec,
    baseline,
}: {
    t: string;
    spec: TableSpec;
    baseline: string;
}) {
    const [open, setOpen] = useState(false);

    // per-profile runs, longest first, so rank #i lines up across columns
    const runsPer = spec.profiles.map((p) =>
        (p.actions[t] ?? []).slice().sort((a, b) => b.dur - a.dur),
    );
    const maxCount = Math.max(1, ...runsPer.map((r) => r.length));
    const expandable = maxCount > 1;
    const baseIdx = spec.profiles.findIndex((p) => p.name === baseline);
    const baseVal = total(spec.profiles[baseIdx]?.actions[t]);
    const loads = spec.profiles.map((p, j) => runsLoad(p, runsPer[j]));
    const baseLoadInfo = baseIdx >= 0 ? loads[baseIdx] : undefined;

    return (
        <>
            <tr
                className={`hover:bg-sky-50 ${expandable ? "cursor-pointer" : ""}`}
                onClick={expandable ? () => setOpen((o) => !o) : undefined}
            >
                <td className="text-left pr-4 py-0.5" title={t}>
                    {expandable ? (open ? "▾ " : "▸ ") : ""}
                    {shortName(t)}
                </td>
                {spec.profiles.map((p, j) => {
                    const val = total(p.actions[t]);
                    return (
                        <React.Fragment key={p.name}>
                            <td className="text-right pl-4 py-0.5">
                                {fmt(val)}
                                {maxCount > 1 && runsPer[j].length > 0 && (
                                    <span className="text-xs text-gray-400">
                                        {" "}
                                        ×{runsPer[j].length}
                                    </span>
                                )}
                                <LoadTag
                                    info={loads[j]}
                                    baseInfo={
                                        j === baseIdx ? undefined : baseLoadInfo
                                    }
                                />
                            </td>
                            {p.name !== baseline && (
                                <PctCell base={baseVal} val={val} />
                            )}
                        </React.Fragment>
                    );
                })}
            </tr>
            {open &&
                Array.from({ length: maxCount }, (_, i) => (
                    <tr
                        key={`${t}#${i}`}
                        className="text-xs text-gray-600 hover:bg-sky-50"
                    >
                        <td className="text-left pr-4 py-0.5 pl-6">run #{i + 1}</td>
                        {spec.profiles.map((p, j) => {
                            const r = runsPer[j][i];
                            const detail = r ? runDetail(r) : null;
                            const baseRun =
                                baseIdx >= 0 ? runsPer[baseIdx][i] : undefined;
                            const baseRunLoad = baseRun
                                ? runLoad(
                                      spec.profiles[baseIdx],
                                      baseRun.ts,
                                      baseRun.dur,
                                  )
                                : undefined;
                            return (
                                <React.Fragment key={p.name}>
                                    <td
                                        className="text-right pl-4 py-0.5"
                                        title={r ? runTitle(r) : undefined}
                                    >
                                        {r ? fmt(r.dur) : "-"}
                                        {detail && (
                                            <span className="text-gray-400">
                                                {" "}
                                                {detail}
                                            </span>
                                        )}
                                        {r && (
                                            <LoadTag
                                                info={runLoad(p, r.ts, r.dur)}
                                                baseInfo={
                                                    j === baseIdx
                                                        ? undefined
                                                        : baseRunLoad
                                                }
                                            />
                                        )}
                                    </td>
                                    {p.name !== baseline && (
                                        <PctCell
                                            base={
                                                baseIdx >= 0
                                                    ? (runsPer[baseIdx][i]?.dur ?? 0)
                                                    : 0
                                            }
                                            val={r?.dur ?? 0}
                                        />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tr>
                ))}
        </>
    );
}
