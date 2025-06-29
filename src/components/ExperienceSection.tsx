import React, {ReactNode} from "react";

const ExperienceSection: React.FC<{children: ReactNode, className? : string}> = ({ children , className }) => {
    return (
        <div className="h-full w-full flex flex-col font-mono">
            <div className="flex justify-center items-center px-4 py-4">
                <h1 className="text-3xl  font-bold ">
                    Experience</h1>
            </div>
            <div className="flex flex-col justify-content py-6 gap-10">
                {children}
            </div>

        </div>
    );
};

export default ExperienceSection;
