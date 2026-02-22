import React, {ReactNode, useEffect, useRef, useState} from "react";
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
    const NickNameArray: [string, string][] = [
        ["Jasmine",              ""],
        ["badumbatish",          "my coding handle"],
        ["Thảo",                 "my vietnamese chosen name"],
        ["jjasmine",             "my usual social and email handle"],
        ["fried chicken little", "chicken little movie but its fried you know hahha"],
        ["bagel adventurer",     "this one stems from back when i have a blog on bagels"],
        ["whyareuscared",        "my steam acct"],
    ];
    const [NickName, setNickName] = useState("Jasmine");
    const [isOpen, setIsOpen] = useState(false);
    const [tooltip, setTooltip] = useState<string | null>(null);
    const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
    const dropdownRef = useRef<HTMLSpanElement>(null);

    const getReason = (name: string) => NickNameArray.find(([n]) => n === name)?.[1] || "";

    const handleHoverStart = (name: string) => {
        hoverTimerRef.current = setTimeout(() => {
            const reason = getReason(name);
            if (reason) setTooltip(reason);
        }, 1000);
    };

    const handleHoverEnd = () => {
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
        setTooltip(null);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectName = (name: string) => {
        setNickName(name);
        setIsOpen(false);
        handleHoverEnd();
    };

    return (
        <span>
            <h2 className="text-xl font-bold h-3">Hi there, it&rsquo;s{" "}
                <span ref={dropdownRef} className="relative inline-block">
                    <button
                        className="text-blue-400 hover:underline underline-offset-1"
                        onClick={() => setIsOpen(!isOpen)}
                        onMouseEnter={() => handleHoverStart(NickName)}
                        onMouseLeave={handleHoverEnd}
                    >
                        {NickName}
                        <span className="text-sm ml-1 animate-bounce inline-block">▼</span>
                    </button>
                    {tooltip && !isOpen && (
                        <span className="absolute left-0 top-full z-20 mt-1 px-3 py-1.5 text-xs bg-white text-black border-2 border-blue-300 rounded-lg shadow-lg font-mono whitespace-nowrap">
                            {tooltip}
                        </span>
                    )}
                    {isOpen && (
                        <ul className={`absolute left-0 top-full z-10 mt-1 border-2 border-blue-300 rounded-lg shadow-lg max-h-60 overflow-auto py-1 min-w-max bg-white font-mono ${hover_border}`}>
                            {NickNameArray.map(([name, reason]) => (
                                <li key={name}>
                                    <button
                                        className={`block w-full text-left px-4 py-1.5 text-sm hover:bg-indigo-300/20 ${
                                            name === NickName ? "text-blue-600 font-bold" : "text-black"
                                        }`}
                                        onClick={() => selectName(name)}
                                        onMouseEnter={() => handleHoverStart(name)}
                                        onMouseLeave={handleHoverEnd}
                                        title={reason}
                                    >
                                        {name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </span>
                {" "}:)
            </h2>
        </span>
    );
}


const LeftMainCard = () => {
    return (
        <div className={`font-mono flex flex-col items-center basis-2/6
                                rounded-lg overflow-visible p-4
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
