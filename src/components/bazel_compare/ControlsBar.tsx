"use client";

import React from "react";
import { Profile, SortMode } from "@/lib/bazel_profile/types";

// The filter / sort / loaded-profile-chips bar. Fully controlled.
export default function ControlsBar({
    filter,
    onFilter,
    sortMode,
    onSortMode,
    profiles,
    onRemove,
    onClear,
}: {
    filter: string;
    onFilter: (v: string) => void;
    sortMode: SortMode;
    onSortMode: (v: SortMode) => void;
    profiles: Profile[];
    onRemove: (name: string) => void;
    onClear: () => void;
}) {
    return (
        <div className="w-full flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <label className="flex items-center gap-2">
                <span className="font-bold">Filter:</span>
                <input
                    value={filter}
                    onChange={(e) => onFilter(e.target.value)}
                    placeholder="substring — empty = all"
                    className="border border-blue-300 rounded px-2 py-1 font-mono w-48"
                />
            </label>
            <label className="flex items-center gap-2">
                <span className="font-bold">Sort by:</span>
                <select
                    value={sortMode}
                    onChange={(e) => onSortMode(e.target.value as SortMode)}
                    className="border border-blue-300 rounded px-2 py-1"
                >
                    <option value="name">target name</option>
                    <option value="duration">duration (desc)</option>
                </select>
            </label>
            <div className="flex flex-wrap items-center gap-2">
                {profiles.map((p) => (
                    <span
                        key={p.name}
                        className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 font-mono text-xs"
                    >
                        {p.name}
                        <button
                            onClick={() => onRemove(p.name)}
                            className="hover:text-red-500 font-bold"
                            title={`remove ${p.name}`}
                        >
                            ✕
                        </button>
                    </span>
                ))}
                <button
                    onClick={onClear}
                    className="underline text-indigo-400 hover:text-indigo-300 text-xs"
                >
                    clear all
                </button>
            </div>
        </div>
    );
}
