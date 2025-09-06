import { Feed } from "feed";
import { getAllPosts } from "@/lib/api"

const feed = new Feed({
    title: "Jasmine Tang RSS Feed",
    description: "Jasmine's blog",
    id: "https://badumbatish.github.io/blog",
    link: "https://badumbatish.github.io/blog/rss.xml",
    language: "en",
    image: "https://badumbatish.github.io/pfp6.png",
    copyright: "All rights for public use and education, Jasmine Tang",
    author: {
        name: "Jasmine Tang",
        email: "thisisjjasmine@gmail.com",
        link: "https://badumbatish.github.io/"
    }
});
export const dynamic = 'force-static';

export async function GET() {
    const posts = await getAllPosts();

    posts.forEach((post) => {
        if (post.hidden != true && !post.title.includes("[ONGOING]")) {
            feed.addItem({
                title: `${post.title}`,
                id : `${post.id}`,
                link: `https://badumbatish.github.io/posts/${post.id}`,
                description: `${post.recap ?? ""}`,
                date: new Date(`${post.dateIso}`),
           });
        }
    });

    return new Response(feed.rss2(), {
        headers: {
            "Content-Type": "application/rss+xml",
        },
    });
}