'use client';

import Image from 'next/image'
import Link from 'next/link';
import pictureProfile from "public/pfp2.jpg";
import {useState} from "react";

let aboutMeCardClass = ""

function LinkButton({link, linkName}: { link: string, linkName: string }) {

    const iconNav: string = link.startsWith("/") ? "↙" : "↗";
    let buttonClass = `flex justify-center text-blue-800
                        hover:font-bold`;

    function CopyIcon({link}: { link: string }) {
        const defaultCopyBtn = <Image src={"copy-icon.svg"} alt={"copy button"} width={"15"}
                                      height={"15"}></Image>
        const CopyBtnSize21 = <Image src={"copy-icon.svg"} alt={"copy button"} width={"21"} height={"21"}></Image>
        const CopyBtnSize17 = <Image src={"copy-icon.svg"} alt={"copy button"} width={"17"} height={"17"}></Image>
        const [copyBtn, setCopyBtn] = useState(defaultCopyBtn);

        function clickCopyBtn() {
            navigator.clipboard.writeText(link);
            setCopyBtn(CopyBtnSize21);
            setTimeout(() => {
                setCopyBtn(defaultCopyBtn);
            }, 100);
        }
        function hoverOnCopyBtn() {
            setCopyBtn(CopyBtnSize17);
        }
        function hoverOffCopyBtn() {
            setCopyBtn(defaultCopyBtn);
        }
        return <button className="inline-block hover:background" onClick={clickCopyBtn} onMouseEnter={hoverOnCopyBtn}
            onMouseLeave={hoverOffCopyBtn}
        >
            {copyBtn}
        </button>
    }

    let content;
    if (link.startsWith("/")) {
        // handles inward link
        content = <Link className={buttonClass} target="_blank"
                        rel="noopener noreferrer" href={link}>
            <button>{linkName}{iconNav}
            </button>
        </Link>
        link = "badumbatish.github.io" + link;
    } else if (link.startsWith("mailto:")) {
        // Handles mail link
        content = <Link className={buttonClass} target="_blank"
                        rel="noopener noreferrer" href={link}>
            <button>{linkName}{iconNav}
            </button>
        </Link>
        link = link.substring("mailto:".length);
    }

    else {
        // Handle outward link
        content =
            <a className={buttonClass} target="_blank"
               rel="noopener noreferrer" href={link}>
                <button>{linkName}{iconNav}</button>
            </a>
    }

    return (
        <div className="flex justify-center flex-row border-black border-2 rounded text-blue-800 gap-2">
            <CopyIcon link={link}></CopyIcon>
            {content}
        </div>
    )

}

function AboutMeElement({title, lst}: { title: string; lst: string[] }) {
    return (
        <>
            <h3 className="text-lg font-bold">{title}</h3>
            <ul className="list-disc">
                {lst.map((description: string, index: number) =>
                    <li key={index}>{description}</li>
                )}
            </ul>
        </>
    )
}

function TimePiece({date, title, experience}: { date: string, title: string, experience: string[] }) {
    return (
        <>
            <div className="mx-4 pb-4 flex">
                <div>
                <div className="mb-0 flex flex-row items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div className={"font-bold text-xl"}>{title}</div>
                </div>

                <div className="flex flex-row gap-4">
                    <div className="m-0 -mt-1 ml-1 p-0 border-l-4 border-blue-500 h-auto"></div>
                    <div className={"italic font-light"}>{date}</div>
                </div>

                <div className="flex flex-row gap-8 ">
                    <div className="m-0 -mt-2 ml-1 p-0 border-l-4 border-blue-500 h-auto"></div>
                    <ul className={"list-disc"}>
                        {experience.map((exp, id)=> {
                            return (
                                <li key={id}>{exp}</li>
                            )
                        })}
                    </ul>
                </div>
                </div>
            </div>
        </>
    )
}

function TimeLine({children} : { children : JSX.Element[]}) {
    function TimeLineOrchestrator({props} : { props: JSX.Element[] }) {
        return (<div className={"flex flex-col item-start md:items-center"}>
            {props.map((value, index) => {
                return <div className={"w:10/12 md:w-1/2 text-base"} key={index}>{value}</div>;
            })}
        </div>)
    }

    return (
        <>
            <TimeLineOrchestrator props={children}></TimeLineOrchestrator>
        </>
    )
}

function projectPiece({title, skills,  experience}: { title: string, skills: string[], experience: string[] }) {

}
export default function Home() {
    let aboutMeColor = "blue"
    return (
        <main>
            <div className="flex flex-col flex-wrap gap-4">
                <div className="h-full w-full flex flex-col">
                    <div className="flex justify-center items-center py-4">

                        <h1 className="text-4xl  font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-400 to-green-400  ">Jasmine
                            Tang</h1>
                    </div>


                    <div className="flex flex-col md:flex-row justify-center gap-10 p-10">


                        <div className="font-mono flex flex-col items-center basis-2/6
                                rounded-lg overflow-hidden shadow-lg p-4 border-2 border-blue-300 gap-2"
                        >
                            <div className="basis-1/5">
                                <Image className="mx-auto rounded-3xl overflow-hidden" src={pictureProfile}
                                       alt="picture profile" width={150} height={200}></Image>

                            </div>
                            <div className="basis-4/5 flex flex-col gap-2">

                                <h2 className="text-xl font-bold">Hi there, it&rsquo;s Jasmine :) <br/>I hope
                                    you&apos;ll
                                    enjoy your stay :)
                                </h2>
                                <div>
                                    <div className="text-xl">Contact:</div>
                                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-1 text-sm lg:text-base">
                                        <LinkButton link={"mailto:jjasmine@berkeley.edu"}
                                                    linkName={"Email"}></LinkButton>
                                        <LinkButton link={"https://www.linkedin.com/in/jjasmine-t/"}
                                                    linkName={"LinkedIn"}></LinkButton>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xl">Catch me at/on:</div>
                                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-1 text-sm lg:text-base">

                                        <LinkButton link={"https://github.com/badumbatish/"}
                                                    linkName={"GitHub"}></LinkButton>
                                        <LinkButton link={"/blog"} linkName={"Blog"}></LinkButton>
                                        <LinkButton link={"https://www.overleaf.com/read/bzvddqdhfdqp"} linkName={"resume.pdf"}></LinkButton>
                                        <LinkButton link={"https://leetcode.com/thisisjjasmine/"}
                                                    linkName={"Leetcode"}></LinkButton>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="font-mono basis-4/6
                                            rounded-lg overflow-hidden shadow-lg
                        p-10 border-2 border-blue-300">
                            <ul className="flex flex-col gap-8">
                                <li>
                                    <AboutMeElement title="Research Intern @ Fermilab, Spring & Summer 2023."
                                                    lst={["Worked on the computational aspect of muon optimization",
                                                        "Coming back in Summer 2024 for some new exciting project!"]}
                                    ></AboutMeElement>

                                </li>
                                <li>
                                    <AboutMeElement title="Studying EECS @ Berkeley." lst={[`Technical Coursework: Introduction to Linear Algebra (Proof-based).
                                    Differential Equations.Structure and Interpretation of Computer Programs(CS61A).Data Structures(CS61B), Fundamentals of Computer Architecture(CS61C),
                                    Designing
                                    Information Devices and Systems I(EE16A),
                                    Linux System Administration DeCal, Web Development DeCal.`,
                                        `Interested in Compilers, Operating Systems, Algorithms.`]}
                                    ></AboutMeElement>
                                </li>
                                <li className={"collapse h-0 md:visible md:h-auto"}>
                                    <AboutMeElement title="About me: My journey from Viet Nam to the US" lst={[
                                        `2001-2019: Born & raised in Viet Nam`,
                                        `2019-2023: Moved to the US, worked and studied at Santiago Canyon College, Orange, CA`,
                                        `2023: Accepted and transfered to UC Berkeley, chasing new, wonderful opportunities`
                                    ]
                                    }></AboutMeElement>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div className="h-full w-full flex flex-col font-mono">
                    <div className="flex justify-center items-center px-4 py-4">
                        <h1 className="text-3xl  font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-purple-400 to-purple-300">
                            Professional Experience</h1>
                    </div>

                    <div className="flex justify-center">
                        <TimeLine>
                            <TimePiece date={"Jun -> Aug 2023"} title={"Software Intern @ Fermilab"} experience={[
                                "Implemented efficient data processing for roughly 19,000 HDF5 files with Python’s multiprocessing, and Big O" +
                                "complexity, reducing processing time from 80 hours to just 10 hours.",
                                "Wrote a custom TOML-like parser in Python for the physics simulation program to aid in brute-forcing the optimization search space.",
                                "Configured and built multi-core physics simulation program G4beamline with CMake"]}/>
                            <></>
                        </TimeLine>

                    </div>
                </div>

                <div className="h-full w-full flex flex-col font-mono">
                    <div className="flex justify-center items-center px-4 py-4">
                        <h1 className="text-3xl  font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-400 to-indigo-400">
                            Personal Projects</h1>
                    </div>

                    <div className="flex justify-center">
                        <p className={"bold"}>On going work</p>
                    </div>
                </div>
            </div>

            <footer className="flex flex-col justify-center gap-2 pt-4 items-center italic">
                <p>Author: Jasmine &quot;jjasmine&quot; Tang</p>
                <p>Built with NextJS, TailwindCSS, and a tonnn of loveee :)</p>
            </footer>
        </main>
    )
}
