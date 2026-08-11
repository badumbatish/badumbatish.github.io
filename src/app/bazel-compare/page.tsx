import BazelProfileComparator from "@/components/bazel_compare/BazelProfileComparator";

export async function generateMetadata() {
    const title = "Bazel Profile Comparator";
    const description =
        "Compare bazel build profiles (chrome-trace .gz) across cache configurations, entirely in your browser";
    return {
        title,
        description,
    };
}

export default function Page() {
    return (
        <div className="py-12 flex flex-col items-center justify-items-start mx-auto max-w-5xl px-4">
            <h1 className="text-4xl font-bold text-center">
                Bazel Profile Comparator
            </h1>
            <p className="pt-4 text-center max-w-2xl">
                Drop in the <code className="font-mono">.gz</code> profiles that{" "}
                <code className="font-mono">bazel --profile</code> spits out and
                compare per-action build times across cache configurations. Files
                named <code className="font-mono">no_cache</code>,{" "}
                <code className="font-mono">warm_cache</code>,{" "}
                <code className="font-mono">no_cache_modified</code>, and{" "}
                <code className="font-mono">warm_cache_modified</code> are grouped
                into clean-vs-modified tables automatically; anything else gets a
                generic comparison table.
            </p>
            <div className="pt-8 w-full">
                <BazelProfileComparator />
            </div>
        </div>
    );
}
