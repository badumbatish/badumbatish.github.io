import Image from "next/image";

export interface ExperienceInfo {
    title: string;
    date? : string;
    experience : string[];
    img_name? : string;
    img_link? : string;
}