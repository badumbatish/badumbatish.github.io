import AboutMeElement from "@/components/AboutMeElement";

const RightMainCard = () => {
    return (
        <div className="font-mono basis-4/6
                                            rounded-lg overflow-hidden shadow-lg
                        p-10 border-2 border-blue-300">
            <ul className="flex flex-col gap-8">
                <li>
                    <AboutMeElement title="About Me"
                                    lst={["Hi everyone, it's Jasmine here :)  I like compilers, gcc, llvm and occasional scripting.",
                                    `In my free time, I like going on walks, watching speed runs of Souls, RE games, listening to music, reading manga and learning about new languages. Yes I meant it both ways :)`,
                                    `For music, I like pop, pop-rock and electronics pop :)`,
                                    `For manga, I like shonen as well as melancholic slice-of-life manga`]}
                    ></AboutMeElement>

                </li>
                <li>
                    <AboutMeElement title="Studying EECS @ Berkeley." lst={[
                        `Transferred from Santiago Canyon College in Aug 2023.`,
                        `Technical Coursework: Introduction to Compilers, Operating Systems, Data Structure and Algorithms, Discrete Math & Probability
                                    Linux System Administration DeCal, Web Development DeCal.`]}
                    ></AboutMeElement>
                </li>

            </ul>
        </div>
    )
}

export default RightMainCard;