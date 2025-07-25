import { Feed } from "feed";
import { getAllPosts } from "@/lib/api"

const feed = new Feed({
    title: "Jasmine Tang RSS Feed",
    description: "Jasmine's blog",
    id: "https://badumbatish.github.io/blog",
    link: "https://badumbatish.github.io/blog/rss.xml",
    language: "en",
    copyright: "All rights for public use and education, Jasmine Tang",
});
export const dynamic = 'force-static';

export async function GET() {
    const posts = await getAllPosts();

    posts.forEach((post) => {
        if (post.hidden != true) {
            feed.addItem({
                title: `${post.title}`,
                id : `${post.id}`,
                link: `https://badumbatish.github.io/blog/${post.id}`,
                description: `${post.recap ?? ""}`,
                date: new Date(`${post.date}`),
           });
        }
    });

    return new Response(feed.rss2(), {
        headers: {
            "Content-Type": "application/rss+xml",
        },
    });
}