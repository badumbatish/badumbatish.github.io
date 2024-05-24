import React, {ReactNode} from "react";
import {ExperienceInfo} from "@/components/Types";
import Image from "next/image";

const ProjectSection: React.FC<{children: ReactNode, className? : string}> = ({ children, className}) => {
    return (
        <div className={className}>
            <div className="flex justify-center items-center px-4 py-4">
                <h1 className="text-3xl  font-bold ">
                    Projects</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 justify-evenly content-evenly">
                {children}
            </div>


        </div>
    );
};

const ProjectCard: React.FC<ExperienceInfo> = ({title, experience, img_name ="cute_flower.png"}) => {

    return (
        <div className="flex flex-col px-4 py-10">
            <div className={"mx-auto flex flex-col md:flex-row justify-start content-center px-4"}>
                <img className={"mx-auto rounded-3xl "} src={img_name} alt={"image"} width={"120"}
                       height={"100"}></img>
                <div className="mx-3 my-auto font-bold text-xl">
                    {title}
                </div>
            </div>



            <div className="list-disc my-4 mx-auto sm:w-1/2 md:w-4/6 text-base">
                {experience.map((value, index) => {
                    return <li key={index}>{value}</li>;
                })}
            </div>

        </div>
    );
};
export {ProjectSection, ProjectCard} ;
