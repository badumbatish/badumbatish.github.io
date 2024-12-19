import Link from 'next/link'

import { getAllPosts } from '@/lib/api'
import {CopyIcon} from "@/components/LinkButton";

export default async function Page() {
    const posts = await getAllPosts()

    return (
        <div className="py-12 flex flex-col items-center  justify-items-start mx-auto ">
            <h1 className="text-4xl">My blog</h1>
            <ul className="flex flex-col gap-6 ">
                {posts.map(post => {
                    const { id, date, title, hidden, recap, html} = post
                    if (hidden == true ) {
                        return
                    }
                    return (
                        <li className="" key={id}>
                            <div className="flex flex-col ">
                                <div className="flex flex-row gap-4 text-lg sm:text-base md:text-base">
                                    <div className="underline">{date}</div>
                                    <CopyIcon link={`/posts/${id}`}></CopyIcon>
                                    <Link href={`/posts/${id}`}>
                                        <div className="underline text-blue-400 text-lg">{title}</div>
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
    )
}