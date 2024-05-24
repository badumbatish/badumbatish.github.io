'use client';

import {IntroSection, LeftMainCard, RightMainCard} from "@/components/IntroSection";
import ExperienceSection from "@/components/ExperienceSection";
import {ProjectSection, ProjectCard} from "@/components/ProjectSection";
import {TimePiece, TimeLine} from "@/components/TimeLineRelated";

export default function Home() {
    let sectionClassName = "h-full w-full flex flex-col font-mono";

    return (
        <main className="flex flex-col flex-wrap gap-4">
            <IntroSection className = {sectionClassName}>
                <LeftMainCard></LeftMainCard>
                <RightMainCard></RightMainCard>
            </IntroSection>

            <ExperienceSection className={sectionClassName}>
                <TimeLine>
                    <TimePiece date={"May -> Aug 2024"} title={"Google Summer Of Code Participant with GCC"} experience={[
                        `Work work work! Jasmine's going to work on gccrs (the GNU Compiler for Rust) :), providing inline assembly support
                        for it. The project focuses on adding implementation for two built-in Rust macros: asm!(), and global_asm!(). `,
                    `gccrs will be able to detect and parse the assembly code within asm!, and global_asm! macro, converting them to gcc assembly format to eventually generate code.`]}
                                     placement={"top"}/>

                    <TimePiece date={"Jun -> Aug 2023"} title={"Software Intern @ Fermilab"} experience={[
                        "Implemented efficient data processing for roughly 19,000 HDF5 files with Python’s multiprocessing, and Big O " +
                        "complexity, reducing processing time from 80 hours to just 10 hours.",
                        "Wrote a custom TOML-like interpreter in Python for the physics simulation program to aid in brute-forcing the optimization search space.",
                        "Configured and built multi-core physics simulation program G4beamline with CMake"]}
                                     placement={""}/>
                    <></>
                </TimeLine>
            </ExperienceSection>


            <ProjectSection className={sectionClassName}>
                On going work
            </ProjectSection>

        </main>
    )
}
