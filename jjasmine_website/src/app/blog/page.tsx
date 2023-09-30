import Link from 'next/link'
import { getAllPosts } from '@/lib/api'

export default async function Page() {
    const posts = await getAllPosts()

    return (
        <div>
            <h1 className="text-4xl">My blog</h1>

            <h2>All posts:</h2>
            <ul>
                {posts.map(post => {
                    const { id, date, title } = post
                    return (
                        <li className="" key={id}>
                            <Link href={`/posts/${id}`}>
                                {date} - {title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}