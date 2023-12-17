import AboutMeElement from "@/components/AboutMeElement";

const RightMainCard = () => {
    return (
        <div className="font-mono basis-4/6
                                            rounded-lg overflow-hidden shadow-lg
                        p-10 border-2 border-blue-300">
            <ul className="flex flex-col gap-8">
                <li>
                    <AboutMeElement title="Research Intern @ Fermilab, Spring & Summer 2023."
                                    lst={["Worked on the computational aspect of muon optimization"]}
                    ></AboutMeElement>

                </li>
                <li>
                    <AboutMeElement title="Studying EECS @ Berkeley." lst={[
                        `Transferred from Santiago Canyon College in Aug 2023.`,
                        `Technical Coursework: Introduction to Linear Algebra (Proof-based).
                                    Differential Equations.Structure and Interpretation of Computer Programs(CS61A).Data Structures(CS61B), Fundamentals of Computer Architecture(CS61C),
                                    Designing
                                    Information Devices and Systems I(EE16A),
                                    Linux System Administration DeCal, Web Development DeCal.`]}
                    ></AboutMeElement>
                </li>
                <li className={"collapse h-0 md:visible md:h-auto"}>
                    <AboutMeElement title="My interests" lst={[
                        `I am interested in system programming in general. More specifically, between the intersection of compilers, hardware and AI.`,
                        `Upcoming coursework: Operating Systems (Spr24), Introduction to Compilers (Spr24), Discrete Math & Probability (Spr24)`
                    ]
                    }></AboutMeElement>
                </li>
            </ul>
        </div>
    )
}

export default RightMainCard;