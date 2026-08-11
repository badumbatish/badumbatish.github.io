"use client";

import React, { useRef, useState } from "react";

// File intake only: drag & drop, click-to-browse (native label activation),
// and a directory picker. Emits raw File[] — parsing is the caller's concern.
export default function ProfileDropzone({
    onFiles,
}: {
    onFiles: (files: File[]) => void;
}) {
    const [dragging, setDragging] = useState(false);
    const dirInput = useRef<HTMLInputElement>(null);

    return (
        <>
            <label
                htmlFor="bazel-profile-file-input"
                onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    onFiles(Array.from(e.dataTransfer.files));
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                className={`block w-full rounded-lg border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
                    dragging
                        ? "border-indigo-400 bg-sky-100"
                        : "border-blue-300 hover:bg-sky-50"
                }`}
            >
                <p className="font-bold">
                    Drop bazel profile files here (or click to browse)
                </p>
                <p className="text-sm text-gray-500 pt-1">
                    .gz / .json chrome-trace profiles from{" "}
                    <code className="font-mono">
                        bazel build --profile=name.gz ...
                    </code>{" "}
                    — everything is parsed locally in your browser, nothing is
                    uploaded. Add{" "}
                    <code className="font-mono">
                        --experimental_profile_include_target_label
                        --experimental_profile_include_primary_output
                        --experimental_profile_include_target_configuration
                    </code>{" "}
                    to see per-configuration details on multi-run actions.
                </p>
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        dirInput.current?.click();
                    }}
                    className="pt-2 text-sm underline text-indigo-400 hover:text-indigo-300"
                >
                    or select a whole directory
                </button>
            </label>
            <input
                id="bazel-profile-file-input"
                type="file"
                multiple
                accept=".gz,.json,.profile,application/gzip,application/json"
                className="sr-only"
                onChange={(e) => {
                    onFiles(Array.from(e.target.files ?? []));
                    e.target.value = "";
                }}
            />
            <input
                ref={dirInput}
                type="file"
                // @ts-expect-error webkitdirectory is non-standard but widely supported
                webkitdirectory=""
                multiple
                className="sr-only"
                onChange={(e) => {
                    onFiles(Array.from(e.target.files ?? []));
                    e.target.value = "";
                }}
            />
        </>
    );
}
