"use client";

import React from "react";
import { shortName } from "@/lib/bazel_profile/format";
import { Insight } from "@/lib/bazel_profile/insights";

const SHOWN = 8;

// The "why is this different?" panel: ranked attribution hints for the
// currently-filtered targets, flagging what the data cannot explain.
export default function InsightsPanel({ insights }: { insights: Insight[] }) {
    if (insights.length === 0) return null;
    return (
        <div className="mx-4 mt-3 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm">
            <p className="font-bold">Outlier:</p>
            <ul className="list-disc pl-5 pt-1 flex flex-col gap-0.5">
                {insights.slice(0, SHOWN).map((i) => (
                    <li key={`${i.target}::${i.profile}`}>
                        <span className="font-mono font-bold" title={i.target}>
                            {shortName(i.target)}
                        </span>
                        : {i.message}
                    </li>
                ))}
            </ul>
            {insights.length > SHOWN && (
                <p className="text-xs text-gray-500 pt-1">
                    +{insights.length - SHOWN} more — narrow the filter to see them
                </p>
            )}
        </div>
    );
}
