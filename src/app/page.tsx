'use client';

import Image from 'next/image'
import Link from 'next/link';
import pictureProfile from "public/pfp2.jpg";
import {useState} from "react";
import Name from "@/components/Name";
import LinkButton from "@/components/LinkButton";
import LeftMainCard from "@/components/LeftMainCard";
import RightMainCard from "@/components/RightMainCard";
import IntroCards from "@/components/IntroCards";
import Header from '@/components/Header';





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

export default function Home() {
    let aboutMeColor = "blue"
    return (
        <main>
            <div className="flex flex-col flex-wrap gap-4">
                <div className="h-full w-full flex flex-col">
                    <Header>
                        <Name></Name>
                    </Header>

                    <IntroCards>
                        <LeftMainCard></LeftMainCard>
                        <RightMainCard></RightMainCard>
                    </IntroCards>
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
