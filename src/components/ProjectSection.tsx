import React, {ReactNode} from "react";
import {ExperienceInfo} from "@/components/Types";
import Image from "next/image";
import Link from "next/link";
import {hover_border} from "@/components/tailwind_const";

const ProjectSection: React.FC<{children: ReactNode, className? : string}> = ({ children, className}) => {
    return (
        <div className={`h-full w-full`}>
            <div className="flex justify-center items-center px-4 py-4 w-full">
                <h1 className="text-3xl  font-bold ">
                    Projects</h1>
            </div>

            <div className={`flex flex-col md:flex-row justify-center  p-6 gap-10 ${className}`}>
                {children}
            </div>


        </div>
    );
};

const ProjectCard: React.FC<ExperienceInfo> = ({title, experience, img_name ="cute_flower.png", img_link=""}) => {

    return (
        <div className={`font - mono basis-4/6
            rounded-lg overflow-hidden
            p-8 border-2 border-blue-300 ${hover_border}`}>
            <div className={"flex flex-col md:flex-row justify-start content-s px-4 py-4 mx-auto"}>
                <Link href={img_link} rel="noopener noreferrer" target="_blank">
                    <img className={"mx-auto rounded-3xl border-blue-400 border-2 hover:border-4 bg-blue-50"}
                         src={img_name} alt={"image"} width={"120"}
                         height={"100"}></img>
                </Link>
                <div className="mx-3 py-3 lg:my-auto font-bold text-xl ">
                    {title}
                </div>
            </div>

            <div className="list-disc ">
                {experience.map((value, index) => {
                    return <li key={index}>{value}</li>;
                })}
            </div>

        </div>
    );
};
export {ProjectSection, ProjectCard} ;
