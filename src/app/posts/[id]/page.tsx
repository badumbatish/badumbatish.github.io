import { getPostById, getAllPosts } from "@/lib/api";
import 'katex/dist/katex.min.css'
import Link from "next/link"; // for styling math


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
        <div className="py-12 flex flex-col items-center  justify-items-start mx-auto ">
        <Link href={"/blog"} className={"flex justify-center text-4xl"}>
            <h2>My blog</h2>
        </Link>
        <article className="p-8 prose pt-0.5 max-w-none w-full lg:w-1/2 md:w-4/6 sm:w-5/6 prose-sky mx-auto">
            <div className="flex justify-center text-2xl font-bold ">
                <h2>{title}</h2>
            </div>
            <div className="flex justify-start text-xl font-bold underline">
                <h4>{date}</h4>
            </div>
            <div className="flex font-bold">Edit:</div>
            My resume is <a
            href={"https://www.overleaf.com/project/638120c30d0003f7bfe10360"}>here</a> (and downloadable <a
            href={"https://badumbatish.github.io/about_me/Jasmine_Resume_Badumbatish.pdf"}>here</a>).
            If you know of a compiler related job posting, please feel free to contact me or refer me at either <a
            href={"tanghocle456@gmail.com"}>tanghocle456@gmail.com</a> or <a
            href={"jjasmine@berkeley.edu"}>jjasmine@berkeley.edu</a>.
            <hr></hr>
            <div dangerouslySetInnerHTML={{__html: html}}/>
        </article>
        </div>
    );
}

// This function can statically allow nextjs to find all the posts that you have made, and statically generate them
export async function generateStaticParams() {
    const posts = await getAllPosts();

    return posts.map((post) => ({
        id: post.id,
    }));
}