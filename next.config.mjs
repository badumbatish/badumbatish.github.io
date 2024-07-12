import nextMDX from '@next/mdx';
import remarkGfm from "remark-gfm";


import rehypePrettyCode from "rehype-pretty-code";
/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
    output: 'export',
   images: { unoptimized: true },
}
/** @type {import('rehype-pretty-code').Options} */
const options = {
  keepBackground: false,
  theme: "one-dark-pro",
};
const withMDX = nextMDX({
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, options]],
    },
});

export default withMDX(nextConfig);
