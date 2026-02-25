import Link from "next/link";
import {hover_border} from "@/components/tailwind_const";
import {getAllPosts} from "@/lib/api";

export async function generateMetadata() {
    const title = "Music Recs";
    const description = "Jasmine's music recommendations from across her blog posts";
    return {
        title,
        description,
    };
}

interface SongRec {
    title: string;
    artist: string;
    youtubeId?: string;
    url?: string;
    commentary?: string;
}

interface PostWithSongs {
    blogSlug: string;
    blogTitle: string;
    blogDate: string;
    songs: SongRec[];
}

async function getMusicRecs(): Promise<PostWithSongs[]> {
    const posts = await getAllPosts();
    const grouped: PostWithSongs[] = [];

    for (const post of posts) {
        const music = post.music as SongRec[] | undefined;
        if (!music || music.length === 0) continue;

        grouped.push({
            blogSlug: post.id.replace(/\.mdx?$/, ""),
            blogTitle: post.title,
            blogDate: post.date,
            songs: music,
        });
    }

    return grouped;
}

export default async function Page() {
    const posts = await getMusicRecs();

    return (
        <div className="py-12 flex flex-col items-center justify-items-start mx-auto max-w-4xl px-4">
            <h1 className="text-4xl font-bold">Music Recs</h1>
            <p className="pt-4 text-center max-w-2xl">
                As is tradition, every blog post comes with music recommendations.
                Here they all are in one place — a little soundtrack to my compiler adventures.
            </p>

            <div className="pt-8 w-full flex flex-col gap-6">
                {posts.map((post) => (
                    <div
                        key={post.blogSlug}
                        className={`rounded-lg border-2 border-blue-300 ${hover_border}`}
                    >
                        <div className="flex items-baseline justify-between px-4 pt-4 pb-2 border-b border-blue-200">
                            <Link
                                href={`/posts/${post.blogSlug}`}
                                className="font-bold text-lg underline hover:text-indigo-400"
                            >
                                {post.blogTitle}
                            </Link>
                            <span className="text-xs text-gray-500 shrink-0 ml-4">{post.blogDate}</span>
                        </div>

                        <div className="p-4 flex flex-col">
                            {post.songs.map((song, i) => (
                                <div key={`${song.youtubeId ?? song.url}-${i}`}>
                                    {i > 0 && (
                                        <hr className="my-4 border-dashed border-blue-200" />
                                    )}
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="sm:w-80 shrink-0">
                                            {song.youtubeId ? (
                                                <iframe
                                                    width="100%"
                                                    height="180"
                                                    src={`https://www.youtube.com/embed/${song.youtubeId}`}
                                                    title={`${song.title} by ${song.artist}`}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    className="rounded-md"
                                                />
                                            ) : (
                                                <a
                                                    href={song.url}
                                                    target="_blank"
                                                    rel="nofollow noopener"
                                                    className="flex items-center justify-center h-[180px] rounded-md bg-sky-100 hover:bg-sky-200"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 opacity-60 hover:opacity-100">
                                                        <path d="M8 5v14l11-7z"/>
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h2 className="font-bold text-lg">{song.title}</h2>
                                            <p className="text-sm">by {song.artist}</p>
                                            {song.commentary && (
                                                <p className="text-sm italic pt-2">&ldquo;{song.commentary}&rdquo;</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
