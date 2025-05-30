import Link from 'next/link'

import {getAllPosts, getPostById} from '@/lib/api'
import {CopyIcon} from "@/components/LinkButton";

export async function generateMetadata(
) {
    const title = "Tech Blog";
    const description = "Jasmine's Tech Blog, accompanied with music recommendations";
    return {
        title,
        description,
    };
}

export default async function Page() {
    const posts = await getAllPosts()

    return (
        <div className="py-12 flex flex-col items-center  justify-items-start mx-auto ">
            <h1 className="text-4xl">My blog</h1>

            <h1 className=" sm:text-sm md:text-base mt-2">
                Jasmine&apos;s (usually) long form content (tech) blog.

            </h1>
            <h1 className=" sm:text-sm md:text-base mb-2">
                Each blog,
                starting from <a className={"text-blue-400"} href={"posts/going_to_mlir_gym_1"}>MLIR gym 1</a> (2024-12-07), comes
                with
                music recommendations :)

                I hope everyone enjoys :)
            </h1>
            <ul className="flex flex-col gap-6 ">
                {posts.map(post => {
                    const {id, date, title, hidden, recap, html} = post
                    if (hidden == true) {
                        return
                    }
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
    )
}