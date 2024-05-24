function TimePiece({date, title, experience, placement}
                       : { date: string, title: string, experience: string[], placement: string }) {
    let bottom_extend= (placement == "top" || placement == "center") ? 4 : 0;
    return (
        <>
            <div className={`mx-4 pb-2 flex content-start`}>
                <div>
                    <div className="ml-2 flex flex-row grow content-center justify-between gap-2 flex-1">
                        <h1 className={"mx-3  font-bold text-xl"}>{title}</h1>
                        <h1 className={"italic font-light  items-center"}>{date}</h1>

                    </div>



                    <div className="flex flex-row gap-8 ">
                        <div className={`border-l-2 border-black `}></div>
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
        return (<div className={"flex flex-col item-start items-center"}>
            {props.map((value, index) => {
                return <div className={" sm:w-1/2 md:w-4/6 text-base"} key={index}>{value}</div>;
            })}
        </div>)
    }

    return (
        <>
            <TimeLineOrchestrator props={children}></TimeLineOrchestrator>
        </>
    )
}

export {TimePiece, TimeLine};
