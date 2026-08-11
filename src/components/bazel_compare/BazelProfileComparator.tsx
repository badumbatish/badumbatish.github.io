"use client";

import React, { useCallback, useMemo, useState } from "react";
import { parseProfileFile } from "@/lib/bazel_profile/parse";
import { buildTables } from "@/lib/bazel_profile/tables";
import { Profile, SortMode } from "@/lib/bazel_profile/types";
import ComparisonTable from "./ComparisonTable";
import ControlsBar from "./ControlsBar";
import ProfileDropzone from "./ProfileDropzone";

const DEFAULT_FILTER = "Foreign Cc";

// Give the browser a frame to paint (the parsing indicator) before a heavy
// synchronous JSON.parse blocks the main thread.
const nextPaint = () =>
    new Promise<void>((resolve) =>
        requestAnimationFrame(() => setTimeout(resolve, 0)),
    );

// Container: owns the loaded profiles and view options, wires them into the
// dropzone, controls bar, and comparison tables.
export default function BazelProfileComparator() {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [parsing, setParsing] = useState<string | null>(null);
    const [filter, setFilter] = useState(DEFAULT_FILTER);
    const [sortMode, setSortMode] = useState<SortMode>("name");

    const addFiles = useCallback(async (files: File[]) => {
        const usable = files.filter((f) => /\.(gz|json|profile)$/i.test(f.name));
        if (usable.length === 0 && files.length > 0) {
            setErrors((e) => [
                ...e,
                "No .gz / .json / .profile files in that selection.",
            ]);
            return;
        }
        const bad: string[] = [];
        for (let i = 0; i < usable.length; i++) {
            const f = usable[i];
            setParsing(
                usable.length > 1
                    ? `${f.name} (${i + 1}/${usable.length})`
                    : f.name,
            );
            await nextPaint();
            try {
                const p = await parseProfileFile(f);
                // Re-uploading a file with the same name replaces it; each
                // profile shows up as soon as it is parsed.
                setProfiles((prev) => [
                    ...prev.filter((q) => q.name !== p.name),
                    p,
                ]);
            } catch (err) {
                bad.push(
                    `${f.name}: ${err instanceof Error ? err.message : String(err)}`,
                );
            }
        }
        setParsing(null);
        setErrors(bad);
    }, []);

    const tables = useMemo(() => buildTables(profiles), [profiles]);

    return (
        <div className="w-full flex flex-col gap-6">
            <ProfileDropzone onFiles={addFiles} />

            {parsing && (
                <div className="w-full flex items-center justify-center gap-2 text-sm text-gray-600">
                    <span className="inline-block w-4 h-4 rounded-full border-2 border-blue-300 border-t-indigo-500 animate-spin" />
                    Parsing {parsing}…
                </div>
            )}

            {errors.length > 0 && (
                <div className="w-full rounded-lg border-2 border-red-300 p-4 text-sm text-red-600">
                    {errors.map((e, i) => (
                        <p key={i}>{e}</p>
                    ))}
                </div>
            )}

            {profiles.length > 0 && (
                <ControlsBar
                    filter={filter}
                    onFilter={setFilter}
                    sortMode={sortMode}
                    onSortMode={setSortMode}
                    profiles={profiles}
                    onRemove={(name) =>
                        setProfiles((prev) => prev.filter((p) => p.name !== name))
                    }
                    onClear={() => {
                        setProfiles([]);
                        setErrors([]);
                    }}
                />
            )}

            {tables.map((t) => (
                <ComparisonTable
                    key={t.title + t.profiles.map((p) => p.name).join(",")}
                    spec={t}
                    filter={filter}
                    sortMode={sortMode}
                />
            ))}

            {profiles.length === 1 && (
                <p className="text-sm text-gray-500 italic text-center">
                    Add at least one more profile to see % comparisons.
                </p>
            )}
        </div>
    );
}
