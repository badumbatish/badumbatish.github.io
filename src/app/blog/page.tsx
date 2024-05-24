import Link from 'next/link'
import { getAllPosts } from '@/lib/api'

export default async function Page() {
    const posts = await getAllPosts()

    return (
        <div className="py-12 flex flex-col items-center  justify-items-start mx-auto ">
            <h1 className="text-4xl">My blog</h1>
            <ul className="flex flex-col gap-6 ">
                {posts.map(post => {
                    const { id, date, title, recap, html} = post
                    return (
                        <li className="" key={id}>
                            <div className="flex flex-col ">
                                <div className="flex flex-row gap-4">
                                    <div className="underline text-lg">{date}</div>-
                                    <Link href={`/posts/${id}`}>
                                        <div className="underline text-lg text-blue-400">{title}</div>
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