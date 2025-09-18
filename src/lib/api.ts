// lib/api.ts
import fs from 'fs'
import matter from 'gray-matter'
import {join} from 'path'
import {unified} from 'unified'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeToc from '@jsdevtools/rehype-toc'
import remarkMdx from "remark-mdx";
import remarkMath from 'remark-math'
import rehypePrettyCode from 'rehype-pretty-code'

// @ts-ignore
import collapse from "remark-collapse";
import rehypePrismDiff from "rehype-prism-diff";
import rehypeRaw from "rehype-raw";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import {transformerCopyButton} from "@rehype-pretty/transformers";
import {
    transformerNotationDiff,
    transformerNotationHighlight,
    transformerNotationWordHighlight
} from "@shikijs/transformers";
import {transformerColorizedBrackets} from "@shikijs/colorized-brackets";
import { createHighlighter } from 'shiki'

const mlirGrammar = JSON.parse(fs.readFileSync( 'mlir.json', 'utf8'));
const tdGrammar = JSON.parse(fs.readFileSync( 'tablegen.json', 'utf8'));


// memoize/cache the creation of the markdown parser, this sped up the
// building of the blog from ~60s->~10s
let p: ReturnType<typeof getParserPre> | undefined

async function getParserPre() {
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return unified()
        .use(remarkMdx)
        .use(remarkParse)
        .use(collapse, {
            test: '.*[sS]upporting section.*',
        })
        .use(remarkGfm)
        .use(remarkMath)
        .use(remarkRehype, {
            // Necessary for support HTML embeds (see next plugin)
            allowDangerousHtml: true,
        })
        .use(rehypeRaw)
        .use(rehypeKatex)
        // @ts-ignore
        .use(rehypePrettyCode, {
            getHighlighter(options) {
                return createHighlighter({
                    ...options,
                    langs: [
                        "cmake",
                        {
                            name: "td",
                            scopeName: "source.td",
                            displayName: "td",
                            ...tdGrammar,
                            aliases: ["td"],
                        },
                        {
                            name: "mlir",
                            scopeName: "source.mlir",
                            displayName: "mlir",
                            ...mlirGrammar,
                            aliases: ["mlir"],
                        },
                    ],
                })
            },
            defaultLang: "plaintext",
            transformers: [
                transformerNotationDiff(),
                transformerNotationHighlight(),
                transformerNotationWordHighlight(),
                transformerColorizedBrackets(),
                transformerCopyButton({
                    visibility: 'always',
                    feedbackDuration: 3_000,
                }),
            ],
            keepBackground: false,
        })
        .use(rehypeExternalLinks, {rel: ['nofollow'], target: '_blank'})
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings)
        .use(rehypePrismDiff)
        .use(rehypeToc)
        .use(rehypeStringify)
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

export type Post = {
    title: string
    id: string
    recap?: string
    tag?: string | string[]
    hidden?: boolean
    date: string
    dateIso: string
    html: string
    // include all other frontmatter keys if needed
    [key: string]: unknown
}

export async function getPostById(id: string) :Promise<Post>  {
    const realId = id.replace(/\.mdx$/, '')
    const fullPath = join('src/_posts', `${realId}.mdx`)
    const { data, content } = matter(await fs.promises.readFile(fullPath, 'utf8'))

    const parser = await getParser()
    const html = await parser.process(content)

    let isoString = new Date(data.date).toISOString();

    return {
        ...data,
        title: data.title,
        id: realId,
        recap : data.recap,
        tag : data.tag,
        hidden : data.hidden,
        date: `${isoString.slice(0, 10)}`,
        dateIso: isoString,
        html: html.value.toString(),
    }
}

export async function getAllPosts() {
    const posts = await Promise.all(
        fs.readdirSync('src/_posts').map(id => getPostById(id)),
    )
    return posts.sort((post1: Post, post2:Post) => (post1.date > post2.date ? -1 : 1))
}
