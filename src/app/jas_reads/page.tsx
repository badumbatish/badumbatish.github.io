import Image from "next/image";
import matter from "gray-matter";
import path from "node:path";

import fs from "fs";
import {QuickReadButton} from "@/app/jas_reads/manga_util";
import remarkMdx from "remark-mdx";
import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "@jsdevtools/rehype-toc";

const typeStyles = new Map([
    ["trans", (text : string) => (
        <div  className={""}>{text}</div>
    )],
    ["romance", (text) => (
        <div  className={""}>{text}</div>
    )],
    ["sci-fi", (text) => (
        <div  className={""}>{text}</div>
    )],
    ["fantasy", (text) => (
        <div  className={""}>{text}</div>
    )],
    ["horror", (text) => (
        <div  className={""}>{text}</div>
    )]
]);

const validMangaTypes = new Set(["trans", "romance", "sci-fi", "fantasy", "horror"]);
async function stylizeMangaTags (mangaType : string)  {
        let typeStyle = typeStyles.get(mangaType);

    return (
            <div className={"pl-2 inline-block"}>
                {typeStyle ? typeStyle(mangaType) : <span>{mangaType}</span>}
            </div>

    );
};



interface MangaPost {
    slug: string;
    title: string;
    tags: [string];
    text: string;
    date : Date;
    imageUrl: string

}

async function getMangaPosts() {
    const postsDirectory = path.join(process.cwd(), "src/_manga");
    const postFolders = fs.readdirSync(postsDirectory);

    const posts = postFolders.map(async (folder) => {
        const folderPath = path.join(postsDirectory, folder);
        const textFilePath = path.join(folderPath, "text.mdx");

        // Read text.mdx content
        const {data, content} =
            matter(await fs.promises.readFile(textFilePath, 'utf8'))
; // Use gray-matter to parse any metadata (optional)
        const parser = await getParser()
        const html = await parser.process(content)

        let isoString = new Date(data.date).toISOString();
        return {
            slug: folder,
            title: data.title,
            tags: data.tags.split(','),
            text: String(html),
            date : `${isoString.slice(0, 10)}`,
            author : data.author,
            imageUrl: `/manga/${folder}/picture.png`, // Assuming you serve static images from public or proper route
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
    
    return (
        <div className="py-12 flex flex-col items-center  justify-items-start mx-auto ">
            <h1 className="text-4xl">JasRead</h1>
            <p className="pt-2">Hi everyone, welcome to the manga/books corner; this is where I document and give reviews on
                whatever note-worthy manga or books ive been reading.
            </p>
            <br/>
            <div className={"p-4 rounded-lg flex flex-col"}>
                <div className={"mx-auto text-2xl font-bold"}>Manga</div>
                {posts.map(( post) => (
                        <div key={post.slug} className="bg-gray-50 py-4 px-4 my-2 rounded-md">
                            <div className={"flex flex-col space-x-4 sm:flex-row"}>
                                <QuickReadButton content={post.text} >
                                    <Image src={post.imageUrl} alt={post.slug} width={85} height={80}
                                           className={"shadow-2xl rounded-md mb-2 sm:mb-0 hover:border-2 hover:border-black hover:rounded-md hover:scale-150"}>
                                    </Image>
                                </QuickReadButton>
                                <div className={"pl-4 border-l-slate-800 border-double border-r-0 border-y-0 border-4 flex flex-col justify-center"}>
                                    <QuickReadButton content={post.text}>
                                        <h2 className={"font-bold text-lg pb-2 hover:underline"}>{post.title}</h2>
                                    </QuickReadButton>
                                    <div className={"flex flex-row text-md uppercase rounded-md pl-4 pb-2"}>
                                        <div className={"underline"}>
                                            Tags:
                                        </div>
                                        {post.tags.map((manga_tag : string) => (stylizeMangaTags(manga_tag)))}
                                    </div>
                                    <div>
                                        <span>
                                        <span className={"text-sm font-bold"}>Author(s): </span>
                                             {post.author}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                ))}
        </div></div>
    )
}

