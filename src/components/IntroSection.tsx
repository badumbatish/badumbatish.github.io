import React, {ReactNode, useEffect, useState} from "react";
import Image from "next/image";
// import pictureProfile from "";
import LinkButton from "@/components/LinkButton";
import AboutMeElement from "@/components/AboutMeElement";
import {hover_border} from "@/components/tailwind_const";
import { create, all } from 'mathjs';

const math = create(all);

const RandomProfilePicture = () => {
    const [currentPfp, setCurrentPfp] = useState(1);



    return (
        <div className="basis-1/5">
            <Image
                className="mx-auto rounded-3xl overflow-hidden"
                src={'pfp6.png'}
                alt="profile picture"
                width={250}
                height={300}
            />
        </div>
    );
};
const IntroSection: React.FC<{children: ReactNode, className? : string}> = ({ children , className}) => {
    return (
        <div className={`flex flex-col md:flex-row justify-center  p-6  ${className}`}>
            {children}
        </div>
    );
};

const NickNameButton = () => {
    let NickNameArray : String[]= [ "Jasmine", "badumbatish", "jsmn", "Lễ", "Jazz", "Thảo", "jjasmine",
                                     "jjsm", "fried chicken little", "bagel adventurer", "whyareuscared" ];
    let clickMe = <Image className={"inline"} src={"clickme.png"} alt={"click me button"} width={8} height={8}></Image>
    const [NickName, setNickName] = useState<String>("Jasmine");
    const [Counter, setCounter] = useState(0);
    const [TextSize, setTextSize] = useState("text-xl");
    const myClick = () => {

        setNickName(NickNameArray[(Counter + 1) % NickNameArray.length]);
        setCounter((Counter + 1) % NickNameArray.length);

        setTextSize("text-2xl");
        setTimeout(() => {
            setTextSize("text-xl");
        }, 100);


    }

    function hoverOnBtn() {
        setTextSize("text-2xl");
    }
    function hoverOffBtn() {
        setTextSize("text-xl");
    }

    return <span>
        <span
        >
            <button className={`inline content-start items-start justify-start flex-row hover:underline underline-offset-1`}
                    onClick={myClick}
                    onMouseEnter={hoverOnBtn}
                    onMouseLeave={hoverOffBtn}>

                <h2 className="text-xl font-bold h-3">Hi there, it&rsquo;s
                    <span className={`text-blue-400 `}> {NickName}
                        <span
                            className={"justify-self-start"}>{clickMe}
                        </span>
                    </span>
                    :)
                </h2>
                </button>
        </span>
    </span>
}


const LeftMainCard = () => {
    return (
        <div className={`font-mono flex flex-col items-center basis-2/6
                                rounded-lg overflow-hidden p-4 
                                border-2 border-blue-300 gap-2 hover:border-indigo-400 ${hover_border}`}>
            {/* <div className="basis-1/5`}">
               <Image className="mx-auto rounded-3xl overflow-hidden" src={"pfp3.png"}
                       alt="picture profile" width={150} height={200}></Image>

            </div>
            */}
            <RandomProfilePicture></RandomProfilePicture>
            <div className="basis-4/5 flex flex-col gap-2">

                <NickNameButton></NickNameButton>

                <br/>
                <h2 className="text-xl font-bold">I hope
                    you&apos;ll
                    enjoy your stay :)
                </h2>
                <div>
                    <div className="text-xl">Contact:</div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-1 gap-1 text-sm lg:text-base">
                        <LinkButton link={"mailto:jjasmine@igalia.com"}
                                    linkName={"jjasmine@igalia.com"}></LinkButton>
                        <LinkButton link={"mailto:jjasmine@berkeley.edu"}
                                    linkName={"jjasmine@berkeley.edu"}></LinkButton>
                        <LinkButton link={"https://www.linkedin.com/in/jjasmine-t/"}
                                    linkName={"LinkedIn"}></LinkButton>
                    </div>
                </div>
                <div>
                    <div className="text-xl">Catch me at/on:</div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-1 text-sm lg:text-base">

                        <LinkButton link={"https://github.com/badumbatish/"}
                                    linkName={"GitHub"}></LinkButton>
                        {/*<LinkButton link={"https://badumbatish.github.io/about_me/Jasmine_Resume_Badumbatish.pdf"}
                                    linkName={"resume.pdf"}></LinkButton>*/}
                        <LinkButton link={"https://codeberg.org/badumbatish"}
                                    linkName={"Codeberg"}></LinkButton>

                        <LinkButton link={"https://discord.gg/mvdVEqDQxn"} linkName={"Discord"}></LinkButton>
                        <LinkButton link={"https://ko-fi.com/badumbatish"} linkName={"My Kofi"}></LinkButton>

                        <LinkButton link={"https://leetcode.com/badumbatish/"}
                                    linkName={"Leetcode"}></LinkButton>
                        <LinkButton link={"/blog"} linkName={"My blog"}></LinkButton>
                        {/*<LinkButton link={"https://bsky.app/profile/badumbatish.bsky.social"} linkName={"bluesky"}></LinkButton>*/}

                    </div>
                </div>

            </div>
        </div>
    )
}

const RightMainCard = () => {
    return (
        <div className={`font - mono basis-4/6
            rounded-lg overflow-hidden
            p-10 border-2 border-blue-300 ${hover_border}`}>
            <ul className="flex flex-col gap-8">
                <li>
                    <AboutMeElement title="About Me"
                                    lst={["Hi everyone, it's Jasmine here! I like compilers, gcc, llvm and occasional scripting.",
                                        `I enjoy technical writings and have some blogs, give them a try!`,
                                        `I like going on walks, watching speed runs of Souls, RE games, listening to music, reading manga and learning about new languages :)`,
                                        `For music, I like rap, pop, pop-rock and electronics pop :)`,
                                        `For manga, I like shonen as well as melancholic slice-of-life manga`]}
                    ></AboutMeElement>

                </li>
                <li>
                    <AboutMeElement title="LLVM Compiler Engineer @ Igalia" lst={["La la la I'm working at Igaliaaa."
                                    ]}
                    ></AboutMeElement>
                </li>
                <li>
                    <AboutMeElement title="Studied EECS @ Berkeley." lst={[
                        `Technical Coursework: Intro to Compilers (CS164), Compiler Optimizations (CS265), Operating Systems (CS162), Intro & Advanced Algorithms (CS70 & CS170)`]}
                    ></AboutMeElement>
                </li>

            </ul>
        </div>
    )
}

export {IntroSection, LeftMainCard, RightMainCard};
