import Image from 'next/image'
import Link from 'next/link';
import pictureProfile from "public/pfp2.jpg";
import Head from "next/head";

let aboutMeCardClass = ""

function LinkButton({link, linkName}: { link: string, linkName: string }) {

    const iconNav: string = link.startsWith("/") ? "↙" : "↗";
    let buttonClass = `flex justify-center border-black border-2 rounded text-blue-800 hover:bg-blue-200
                        hover:font-bold`;

    let content;
    if (link.startsWith("/")) {
        content = <Link className={buttonClass} target="_blank"
                        rel="noopener noreferrer" href={link}>
            <button>{linkName}{iconNav}
            </button>
        </Link>
    } else {
        content = <a className={buttonClass} target="_blank"
                     rel="noopener noreferrer" href={link}>
            <button>{linkName}{iconNav}
            </button>
        </a>
    }
    return (
        <>
            {content}
        </>
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

function TimeLine() {
    function TimeLineOrchestrator({props} : {props : JSX.Element[]}) {
        return (<div>
            {props.map((value, index) => {
                return <div key={index}>{value}</div>;
            })}
        </div>)
    }
    function TimePiece({date, title, experience} : { date: string, title : string, experience : string}) {
        return (
            <>
                <div className="pb-4">
                    <div className="mb-0 flex flex-row items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <div className={"font-bold text-xl"}>{title}</div>
                    </div>

                    <div className="flex flex-row gap-4">
                        <div className="m-0 -mt-1 ml-1 p-0 border-l-4 border-blue-500 h-auto"></div>
                        <div className={"italic font-light"}>{date}</div>
                    </div>

                    <div className="flex flex-row gap-4">
                        <div className="m-0 -mt-2 ml-1 p-0 border-l-4 border-blue-500 h-auto"></div>
                        <div>{experience}</div>
                    </div>
                </div>
            </>
    )
    }
    let timePieces = [];

    let timePiece =  <TimePiece date={"June-2023 -> Aug 2023"} title={"Research Intern @ Fermilab"} experience={"TBD"}></TimePiece>;
    timePieces.push(timePiece);

    timePiece = <TimePiece date={"Jan-2023 -> March 2023"} title={"Research Intern @ Fermilab"} experience={"TBD"}></TimePiece>;
    timePieces.push(timePiece);

    return (
        <>
            <TimeLineOrchestrator props={timePieces}></TimeLineOrchestrator>
        </>
    )
}

export default function Home() {
    let aboutMeColor = "blue"
    return (
        <main>
            <div className="flex flex-col flex-wrap gap-4">
                <div className="h-full w-full flex flex-col">
                    <div className="flex justify-center items-center py-4">

                        <h1 className="text-4xl  font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-400 to-green-400  ">Jasmine Tang</h1>
                    </div>


                    <div className="flex flex-col md:flex-row justify-center gap-10 p-10">


                        <div className="font-mono flex flex-col items-center basis-2/6
                                rounded-lg overflow-hidden shadow-lg p-4 border-2 border-blue-300 gap-2"
                        >
                            <div className="basis-1/5">
                                <Image className="mx-auto rounded-3xl overflow-hidden" src={pictureProfile}
                                       alt="picture profile" width={150} height={200}></Image>

                            </div>
                            <div className="basis-4/5">

                                <h2 className="text-xl font-bold">Hi there, it&rsquo;s Jasmine :) <br/>I hope you&apos;ll
                                    enjoy your stay :)
                                </h2>
                                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-1 text-sm lg:text-base">
                                    <LinkButton link={"https://www.linkedin.com/in/jjasmine-t/"}
                                                linkName={"LinkedIn"}></LinkButton>
                                    <LinkButton link={"https://github.com/badumbatish/"}
                                                linkName={"GitHub"}></LinkButton>
                                    <LinkButton link={"/blog"} linkName={"Blog"}></LinkButton>
                                    <LinkButton link={""} linkName={"resume.pdf"}></LinkButton>
                                    <LinkButton link={"https://leetcode.com/thisisjjasmine/"} linkName={"Leetcode"}></LinkButton>
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
                                <li>
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


                <div className="h-full w-full flex flex-col">
                    <div className="flex justify-center items-center px-4 py-4">
                        <h1 className="text-3xl  font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-purple-400 to-purple-300">
                            My Experience in Software Development</h1>
                    </div>

                    <div className="flex justify-center">
                        <TimeLine></TimeLine>


                    </div>
                </div>

            </div>

            <footer className="flex flex-col justify-center gap-4">
                <p>Author: Jasmine &quot;jjasmine&quot; Tang</p>
                <p>Built with NextJS, TailwindCSS, and a tonnn of loveee :)</p>
            </footer>
        </main>
    )
}
