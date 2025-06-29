import {ReactElement} from "react";
import {ExperienceInfo} from "@/components/Types";

const TimePiece : React.FC<ExperienceInfo> =  ({ date,  title, experience}) => {
    return (
        <>
            <div className={`mx-4 pb-2 `}>
                <div>
                    <div className="ml-2 flex justify-between  gap-2 w-full ">
                        <h1 className={"mx-3  font-bold text-xl"}>{title}</h1>
                        <h1 className={"italic font-light  place-self-end"}>{date}</h1>

                    </div>

                    <div className="flex flex-row gap-8 pt-2 ">
                        <div className={`border-l-2 border-blue-400 `}></div>
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

const TimeLine : React.FC<{children :  ReactElement[]}> = ({ children }) => {
    const TimeLineOrchestrator:React.FC<{props : ReactElement[]}> = ({ props  }) => {

        return (<div className={"flex flex-col item-start items-center gap-10"}>
            {props.map((value, index) => {
                return <div className={"md:w-4/6 text-base"} key={index}>{value}</div>;
            })}
        </div>)
    }

    return <><>
        <TimeLineOrchestrator props={children}></TimeLineOrchestrator>
    </>
    </>;
}

export {TimePiece, TimeLine};
