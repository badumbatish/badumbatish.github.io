// lib/api.ts
import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'
import { unified } from 'unified'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeShiki from '@shikijs/rehype'
import rehypeToc from '@jsdevtools/rehype-toc'
import * as shiki from 'shiki'
import remarkMdx from "remark-mdx";
import {
    transformerNotationHighlight,
  transformerNotationDiff,
  // ...
} from '@shikijs/transformers'
import rehypeHighlight from "rehype-highlight";
import rehypePrismDiff from "rehype-prism-diff";
import rust from 'highlight.js/lib/languages/rust'
import {common} from "lowlight";
// memoize/cache the creation of the markdown parser, this sped up the
// building of the blog from ~60s->~10s
let p: ReturnType<typeof getParserPre> | undefined

async function getParserPre() {
    // @ts-ignore
    // @ts-ignore
    let i = 0;
    let result =  unified()
        .use(remarkMdx)
        .use(remarkParse)
        .use(remarkRehype)
        .use(remarkGfm)
        // @ts-ignore
        .use(rehypeShiki, {
            theme: 'catppuccin-frappe',
            //theme :'poimandres',
            inline: 'tailing-curly-colon', // or other options
            transformers: [
    transformerNotationDiff(),
    transformerNotationHighlight(),

    // ...
  ],
        })
        .use(rehypeStringify)
        .use(rehypeSlug)
        .use(rehypeHighlight, {
            languages : {...common, rust},
        })
        .use(rehypePrismDiff)
        .use(rehypeAutolinkHeadings, {
            behavior : 'wrap',
            content: arg => ({
                type: 'element',
                tagName: 'a',
                properties: {
                    href: '#' + arg.properties?.id,
                    style: 'margin-right: 10px',
                },
                children: [{ type: 'text', value: `` }],
            }),
        })
        .use(rehypeToc)

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

export async function getPostById(id: string) {
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
        html: html.value.toString(),
    }
}

export async function getAllPosts() {
    const posts = await Promise.all(
        fs.readdirSync('src/_posts').map(id => getPostById(id)),
    )
    return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}
