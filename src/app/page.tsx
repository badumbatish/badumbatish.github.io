'use client';

import {IntroSection, LeftMainCard, RightMainCard} from "@/components/IntroSection";
import ExperienceSection from "@/components/ExperienceSection";
import {ProjectSection, ProjectCard} from "@/components/ProjectSection";
import {TimePiece, TimeLine} from "@/components/TimeLineRelated";
import {BlogArticleCard, BlogArticleSection} from "@/components/BlogArticleCard";
import Link from "next/link";

export default function Home() {
    let sectionClassName = "h-full w-full flex flex-col font-mono gap-10";

    return (
        <main className="flex flex-col flex-wrap gap-4">
            <IntroSection className = {sectionClassName}>
                <LeftMainCard></LeftMainCard>
                <RightMainCard></RightMainCard>
            </IntroSection>

            <BlogArticleSection>
               <BlogArticleCard blog_title={"(Tech) Blog"} introduction={<span>Technical blogs (with <Link href="/music/" className="inline underline text-indigo-400 hover:text-indigo-300">music recs</Link>).</span>} link={"/blog/"}></BlogArticleCard>
                <BlogArticleCard blog_title={"Mediaboxd"} introduction={"Reviews/Recommendations for manga, books, videos and films"} link={"/media/"}></BlogArticleCard>
            </BlogArticleSection>

            <ExperienceSection className={sectionClassName}>
                <TimeLine>
                    <TimePiece date={"June 2025 -> Present"} title={"LLVM Compiler Engineer @ Igalia"} experience={[
                        `Doing open source contributions to LLVM. Area: Compiler backend in WebAssembly/RISC-V/MLIR.`
                    ]}/>
                    <TimePiece date={"May -> Aug 2024"} title={"Google Summer Of Code Participant with GCC"} experience={[
                         `Work work work! Jasmine's going to work on gccrs (the GNU Compiler for Rust) :), providing inline assembly support
                         for it. The project focuses on adding implementation for two built-in Rust macros: asm!(), and global_asm!(). `,
                     `gccrs will be able to detect and parse the assembly code within asm!, and global_asm! macro, converting them to gcc assembly format to eventually generate code.`
                    ]}/>

                    <></>
                </TimeLine>
            </ExperienceSection>


            <ProjectSection className={sectionClassName}>
                <ProjectCard title={"Chocopy: A statically-typed-subset-of-Python Compiler"} img_name={"projects/chocopy.png"}
                             img_link={"https://chocopy.org/"}
                             experience={[`Develop a statically typed subset of Python compiler with JFlex and CUP’s parser generator combined with
semantic analysis and code generation via RISC-V architecture.`,
                `Deploy a multi-core test harness in Python that handles file input and hanging tests for a more robust develop-
ment cycle. Enable code-size and run-time metrics to benchmark.`]}></ProjectCard>


                <ProjectCard title={"PintOS: An educational operating system for the x86 architecture"}
                             img_name={"projects/pintos.png"}
                             img_link={"https://cs162.org/static/proj/pintos-docs/"}
                             experience={[`Collaborated with team members to extend a bare-bone OS with ELF executable
loading, a small syscall interface for both process control and file system methods`, `Implemented a strict priority scheduler with
priority donation for deadlock avoidance and multi-threading capabilities, alongside a conditional variable based
buffer cache for speeding up I/O and an extensible file system with sub-directories constructed with inodes.`]}></ProjectCard>

            </ProjectSection>

        </main>
    )
}
