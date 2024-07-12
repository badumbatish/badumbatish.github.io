import nextMDX from '@next/mdx';
import remarkGfm from "remark-gfm";


/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
    output: 'export',
   images: { unoptimized: true },
}
const withMDX = nextMDX({
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
    },
});

export default withMDX(nextConfig);
