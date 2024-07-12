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
  onVisitHighlightedWord(node) {
        node.properties.className = ["word--highlighted"]
    },

    onVisitLine(node) {
        if (node.children.length === 0) {
            // if code block has a empty line, add a space instead of keeping it blank
            node.children = [{ type: "text", value: " " }]
        }
    },
    onVisitHighlightedLine(node) {
        const nodeClass = node.properties.className;
        console.log("Highlighted Line", {node})
        if (nodeClass && nodeClass.length > 0) {
            node.properties.className.push("line--highlighted");
        }else{
            node.properties.className = ["line--highlighted"];
        }
    },
};
const withMDX = nextMDX({
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, options]],
    },
});

export default withMDX(nextConfig);
