import { getPostById, getAllPosts } from "@/lib/api";


// Set the title of the page to be the post title, note that we no longer use
// e.g. next/head in app dir
export async function generateMetadata(
    props: {
        params: Promise<{ id: string }>;
    }
) {
    const params = await props.params;

    const {
        id
    } = params;

    const { title } = await getPostById(id);
    return {
        title,
    };
}

// Generate the post, note that this is a "react server component"! it is allowed to be async
export default async function Post(
    props: {
        params: Promise<{ id: string }>;
    }
) {
    const params = await props.params;

    const {
        id
    } = params;

    const { html, title, date } = await getPostById(id);
    return (
        <article className="p-8 prose  max-w-none w-full lg:w-1/2 md:w-4/6 sm:w-5/6 prose-sky mx-auto">
            <div className="flex justify-center text-2xl font-bold ">
                <h2>{title}</h2>
            </div>
            <div className="flex justify-start text-xl font-bold underline">
                <h4>{date}</h4>
            </div>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
    );
}

// This function can statically allow nextjs to find all the posts that you have made, and statically generate them
export async function generateStaticParams() {
    const posts = await getAllPosts();

    return posts.map((post) => ({
        id: post.id,
    }));
}