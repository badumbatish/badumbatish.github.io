import {ReactElement} from "react";
import {ExperienceInfo} from "@/components/Types";

const TimePiece : React.FC<ExperienceInfo> =  ({ date,  title, experience}) => {
    return (
        <>
            <div className={`mx-4 pb-2 flex content-start`}>
                <div>
                    <div className="ml-2 flex flex-row grow content-center justify-between gap-2 flex-1">
                        <h1 className={"mx-3  font-bold text-xl"}>{title}</h1>
                        <h1 className={"italic font-light  items-center"}>{date}</h1>

                    </div>

                    <div className="flex flex-row gap-8 ">
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

        return (<div className={"flex flex-col item-start items-center"}>
            {props.map((value, index) => {
                return <div className={" sm:w-1/2 md:w-4/6 text-base"} key={index}>{value}</div>;
            })}
        </div>)
    }

    return <><>
        <TimeLineOrchestrator props={children}></TimeLineOrchestrator>
    </>
    </>;
}

export {TimePiece, TimeLine};
