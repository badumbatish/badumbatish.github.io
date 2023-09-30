import Image from 'next/image'
import Link from 'next/link';
import pictureProfile from "public/pfp2.jpg";

function LinkButton({ link, linkName} : {link: string, linkName:string}) {

    const iconNav : string = link.startsWith("/") ? "↙" : "↗";

    let content;
    if (link.startsWith("/") ){
        content = <Link target="_blank"
                         rel="noopener noreferrer" href={link}>{linkName}{iconNav}</Link>
    } else {
        content = <a target="_blank"
                         rel="noopener noreferrer" href={link}>{linkName}{iconNav}</a>
    }
    return (
        <>
        <button className="border-black border-2 rounded text-blue-800 hover:bg-blue-400">
            {content}
        </button>
        </>
    )

}
function AboutMeElement({ title, lst }: { title: string; lst: string[] }) {
    return (
        <>
            <h3 className="text-lg font-bold">{title}</h3>
            <ul className="list-disc">
                {lst.map((description:string, index :number) =>
                    <li key={index}>{description}</li>
                )}
            </ul>
        </>
    )
}


export default function Home() {
    return (
        <main>
            <div className="h-screen w-screen">
                <div className="flex justify-center items-center py-4">
                    <h1 className="text-4xl text-blue-400 font-bold">Jasmine Tang</h1>
                </div>


                <div className="flex flex-col md:flex-row justify-center gap-10 p-10">


                    <div className="font-mono flex flex-col items-center basis-2/6
                                rounded-lg overflow-hidden shadow-lg p-4 border-2 border-black gap-2"
                    >
                        <div className="basis-1/5">
                            <Image className="mx-auto rounded-3xl overflow-hidden" src={pictureProfile}
                                    alt="picture profile" width={150} height={200}></Image>

                        </div>
                        <div className="basis-4/5">
                            <h2 className="text-xl font-bold">Hi there, it's Jasmine
                            </h2>
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-1 text-sm lg:text-base">
                                <LinkButton link={"https://www.linkedin.com/in/jjasmine-t/"} linkName={"LinkedIn"}></LinkButton>
                                <LinkButton link={"https://github.com/badumbatish/"} linkName={"GitHub"}></LinkButton>
                                <LinkButton link={"/blog"} linkName={"Blog"}></LinkButton>
                                <LinkButton link={""} linkName={"resume.pdf"}></LinkButton>
                            </div>

                        </div>
                    </div>

                    <div className="font-mono basis-4/6
                                            rounded-lg overflow-hidden shadow-lg
                        p-10 border-2 border-black">
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
                                    `2023: Accepted and transfered to UC Berkeley, chase new, wonderful opportunities`
                                ]
                                }></AboutMeElement>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            <div className="h-screen w-screen">
                <div className="flex justify-center items-center py-4">
                    <h1 className="text-3xl text-orange-400 font-bold">My Experience</h1>
                </div>
            </div>
        </main>
    )
}
