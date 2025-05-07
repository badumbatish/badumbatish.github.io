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

    const { title, recap } = await getPostById(id);
    return {
        title,
        description: recap,
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

                <div className="flex font-bold">Edit:</div>
                <p>Hi everyone!
                    My friend <a href={"https://www.linkedin.com/in/julius-alexandre/"}>Julius</a> is
                    looking for compiler full time roles and/or internship opportunities for 2025/2026.

                </p>
                <p>Julius is an undergrad at Western Governors University specializing in computer architecture and
                    compilers.</p>

                <p>
                    He&apos;s <a href={"https://github.com/llvm/llvm-project/commits/main/?author=wizardengineer"}>contributed
                    to LLVM</a> and is knowledgeable of the compiler architecture, as a result, he&apos;s well‑versed
                    in C, C++, Python, LLVM, and Assembly.
                </p>
                <p>
                    His open source projects, which have a combined stars of 200+, range from developing OS kernels to
                    writing hypervisors for AMD-v.
                </p>

                <p>
                    His resume is <a href={"https://badumbatish.github.io/blogs/compiler_questions_where_to_find_them/Julius_Alexander_SWE_Compiler.pdf"}>here</a>.
                    I hope everybody can give him a referral
                    or reach out to him at his <a href={"https://www.linkedin.com/in/julius-alexandre/"}>LinkedIn</a>
                </p>
                <div className="flex justify-start text-xl font-bold underline">
                    <h4>{date}</h4>
                </div>

                {/*
            <div className="flex font-bold">Edit:</div>
            My resume is <a
            href={"https://badumbatish.github.io/about_me/Jasmine_Resume_Badumbatish.pdf"}>here</a>.
            If you know of a compiler related job posting, please feel free to contact me or refer me at either <a
            href={"mailto:tanghocle456@gmail.com"}>tanghocle456@gmail.com</a> or <a
            href={"mailto:jjasmine@berkeley.edu"}>jjasmine@berkeley.edu</a>.
            <hr></hr>
*/}
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