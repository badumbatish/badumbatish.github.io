import Link from 'next/link'

import {getAllPosts} from '@/lib/api'
import {BlogEntries} from "@/app/blog/blog_utils";

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
        <BlogEntries posts={posts}></BlogEntries>
    )
}