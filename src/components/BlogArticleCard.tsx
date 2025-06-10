import React, {ReactNode} from "react";
import {ExperienceInfo, JazzReadInfo} from "@/components/Types";
import {hover_border} from "@/components/tailwind_const";
import Link from "next/link";

export const BlogArticleSection: React.FC<{children: ReactNode, className? : string}> = ({ children, className}) => {
    return (
        <div className={`h-full w-full`}>
            <div className="flex justify-center items-center px-4 py-4 w-full">
                <h1 className="text-3xl  font-bold ">
                    Blogs and Articles</h1>
            </div>

            <div className={`flex flex-col md:flex-row justify-center  p-6 gap-10 ${className}`}>
                {children}
            </div>


        </div>
    );
};

export const BlogArticleCard: React.FC<JazzReadInfo> = ({blog_title, introduction, link}) => {

    return (
        <div className={`font-mono flex flex-col basis-1/4
                                rounded-lg overflow-hidden p-4 border-2 border-blue-300 gap-2
                                ${hover_border}`}>
            <div className={"flex md:flex-row justify-center content-s px-4 py-4 mx-auto"}>
                    <div className="mx-3 lg:my-auto text-xl font-bold hover:underline">
                        <Link href={link}>
                        {blog_title}↙
                        </Link>
                    </div>
            </div>
            <div className={"px-2 flex flex-col justify-center "}>
                {introduction}
            </div>

        </div>
    );
}