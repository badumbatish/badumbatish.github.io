import nextMDX from '@next/mdx';


/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
    output: 'export',
   images: { unoptimized: true },
}

const withMDX = nextMDX({
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
});

export default withMDX(nextConfig);