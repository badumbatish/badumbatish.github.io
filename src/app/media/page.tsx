import matter from "gray-matter";
import path from "node:path";

import fs from "fs";
import remarkMdx from "remark-mdx";
import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import {MediaPost, MediaType} from "@/app/media/media_types";
import {MediaEntries} from "@/app/media/media_entries";

export async function generateMetadata() {
    const title = "Mediaboxd";
    const description = "Jasmine's media garden, featuring game trailers, mangas and others' essays, etc";
    return {
        title,
        description,
    };
}

async function getMangaPosts(): Promise<MediaPost[]> {
    const postsDirectory = path.join(process.cwd(), "public/media");
    const postFolders = fs.readdirSync(postsDirectory);

    const posts = postFolders.map(async (folder) => {
        const folderPath = path.join(postsDirectory, folder);
        const textFilePath = path.join(folderPath, "text.mdx");

        const {data, content} =
            matter(await fs.promises.readFile(textFilePath, 'utf8'));
        const parser = await getParser()
        const html = await parser.process(content)

        let isoString = new Date(data.date).toISOString();
        return {
            slug: folder,
            title: data.title,
            tags: data.tags.split(',').map((t: string) => t.trim()),
            type: data.type as MediaType,
            text: String(html),
            date: `${isoString.slice(0, 10)}`,
            author: data.author,
            imageUrl: `/media/${folder}/picture.png`,
        };
    });

    let all_posts = await Promise.all(posts);
    return all_posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}

let p: ReturnType<typeof getParserPre> | undefined

async function getParserPre() {
    // @ts-ignore
    let result =  unified()
        .use(remarkMdx)
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, {
            // Necessary for support HTML embeds (see next plugin)
            allowDangerousHtml: true,
        })
        .use(rehypeStringify)
        .use(rehypeExternalLinks, { rel: ['nofollow'], target: '_blank'})
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings)

    return result;
}

function getParser() {
    if (!p) {
        p = getParserPre().catch(e => {
            p = undefined
            throw e
        })
    }
    return p
}

export default async function Page() {
    const posts = await getMangaPosts();
    return <MediaEntries posts={posts} />;
}

