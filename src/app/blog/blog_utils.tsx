"use client"
import { useState} from 'react';
import {Post} from "@/lib/api";
import Link from "next/link";

enum BlogShownType {
    BothBlogType,
    OnGoingOnly,
    FinishedOnly,
}

function BlogType(blogType: BlogShownType, setBlogType: (arg0: BlogShownType) => void) {
    let labelHelper = (idealValue: BlogShownType, title: string) => {
        return <label className={"flex flex-row gap-x-2"}>
            <input
                type="radio"
                name="blogType"
                value={idealValue}
                checked={blogType === idealValue}
                onChange={() => setBlogType(idealValue)}
            />
            {title}
        </label>
    };
    return <>
        <div className={"flex flex-col"}>
            {labelHelper(BlogShownType.BothBlogType, "Show all blogs")}
            {labelHelper(BlogShownType.OnGoingOnly, "On-going blogs only")}
            {labelHelper(BlogShownType.FinishedOnly, "Finished blogs only.")}
        </div>
     </>
}

export function BlogEntries({posts}: { posts: Post[] }) {
    const [blogType, setBlogType] = useState(BlogShownType.BothBlogType);


    return (
        <>
            <div className="py-12 flex flex-col items-center  justify-items-start mx-auto ">
                <h1 className="text-4xl">My blog</h1>

                <h1 className=" sm:text-sm md:text-base mt-2">
                    Jasmine&apos;s (usually) long form content (tech) blog.

                </h1>
                <h1 className=" sm:text-sm md:text-base mb-2">
                    Each blog,
                    starting from <a className={"text-blue-400"} href={"posts/going_to_mlir_gym_1"}>MLIR gym
                    1</a> (2024-12-07), comes
                    with
                    music recommendations :)

                    I hope everyone enjoys :)
                </h1>
                {BlogType(blogType, setBlogType)}
                <ul className="flex flex-col gap-6 w-3/5">
                    {posts.map(post => {
                        const {id, date, title, hidden, recap, html} = post
                        if (hidden == true ) {
                            return
                        }
                        if (title.includes("[ONGOING]") && blogType === BlogShownType.FinishedOnly) return
                        if (!title.includes("[ONGOING]") && blogType === BlogShownType.OnGoingOnly) return
                        return (
                            <li className="" key={id}>
                                <div className="flex flex-col sm:text-sm md:text-base">
                                    <div className="flex flex-row gap-4 ">
                                        <div className="underline">{date}</div>
                                        <Link href={`/posts/${id}`}>
                                            <div className="underline text-blue-400 ">{title}</div>
                                        </Link>
                                    </div>
                                    <div>
                                        <span className="underline">TLDR</span>: {recap}
                                    </div>
                                </div>
                            </li>
                    )
                })}
            </ul>
        </div>
        </>
    )

}