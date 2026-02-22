import Image from "next/image";
import {ReactNode} from "react";

export interface ExperienceInfo {
    title: string;
    date? : string;
    experience : string[];
    img_name? : string;
    img_link? : string;
}

export interface JazzReadInfo {
    blog_title: string;
    introduction: ReactNode;
    link : string;
}