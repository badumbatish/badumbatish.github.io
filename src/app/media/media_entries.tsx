"use client"
import { useState } from 'react';
import Image from "next/image";
import { QuickReadButton } from "@/app/media/media_util";
import { hover_border } from "@/components/tailwind_const";
import { MediaPost, MediaType, MediaTypeLabel } from "@/app/media/media_types";

function MediaTypeFilter(selectedType: MediaType | null, setSelectedType: (type: MediaType | null) => void) {
    const labelHelper = (value: MediaType | null, title: string) => (
        <label key={value ?? "all"} className="flex flex-row gap-x-2">
            <input
                type="radio"
                name="mediaType"
                value={value ?? "all"}
                checked={selectedType === value}
                onChange={() => setSelectedType(value)}
            />
            {title}
        </label>
    );

    return (
        <div className="flex flex-col">
            {labelHelper(null, "Show all media")}
            {Object.values(MediaType).map(type =>
                labelHelper(type, `${MediaTypeLabel[type]} only`)
            )}
        </div>
    );
}

export function MediaEntries({ posts }: { posts: MediaPost[] }) {
    const [selectedType, setSelectedType] = useState<MediaType | null>(null);

    const filteredPosts = selectedType
        ? posts.filter(post => post.type === selectedType)
        : posts;

    return (
        <div className="py-12 flex flex-col items-center justify-items-start mx-auto max-w-4xl px-4">
            <h1 className="text-4xl">Mediaboxd</h1>
            <p className="pt-2">
                Hi everyone, welcome to the manga/books/media corner; this is where I document and give
                recommendations/reviews on whatever note-worthy manga or books ive been reading.
            </p>
            <br />

            {MediaTypeFilter(selectedType, setSelectedType)}

            <div className="p-4 rounded-lg flex flex-col">
                <div className="mx-auto text-2xl font-bold">Media</div>
                {filteredPosts.map((post) => (
                    <div key={post.slug} className={`rounded-lg p-4 border-2 border-blue-300 my-2 w-auto ${hover_border}`}>
                        <div className="flex flex-row gap-4">
                            <QuickReadButton content={post.text}>
                                <Image src={post.imageUrl} alt={post.slug} width={80} height={80}
                                    className="z-20 mx-auto border-blue-400 border-2 hover:border-4 bg-blue-50 shadow-md rounded-md hover:border-blue"
                                />
                            </QuickReadButton>
                            <div className="flex flex-col">
                                <QuickReadButton content={post.text}>
                                    <h2 className="font-bold text-lg pb-1 hover:underline">{post.title}</h2>
                                </QuickReadButton>
                                <div className="flex flex-row text-sm rounded-md pl-4 pb-1">
                                    <div className="uppercase underline">Type</div>:
                                    <div className="first-letter:capitalize pl-2">
                                        {MediaTypeLabel[post.type]}
                                    </div>
                                </div>
                                <div className="flex flex-row text-sm uppercase rounded-md pl-4 pb-1">
                                    <div className="uppercase underline">Tags</div>:
                                    {post.tags.map((tag) => (
                                        <div key={tag} className="pl-2 inline-block">{tag}</div>
                                    ))}
                                </div>
                                <div>
                                    <span>
                                        <span className="text-sm font-bold">Author(s): </span>
                                        {post.author}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
