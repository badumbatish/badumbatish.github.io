import nextMDX from '@next/mdx';
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypePrettyCode from "rehype-pretty-code";


/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
    output: 'export',
   images: { unoptimized: true },
}

// https://rehype-pretty.pages.dev
const withMDX = nextMDX({
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight, rehypePrettyCode],
    },
});

export default withMDX(nextConfig);
