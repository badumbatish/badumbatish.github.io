import React, {ReactNode} from "react";

const ProjectSection: React.FC<{children: ReactNode, className? : string}> = ({ children, className}) => {
    return (
        <div className={className}>
            <div className="flex justify-center items-center px-4 py-4">
                <h1 className="text-3xl  font-bold ">
                    Projects</h1>
            </div>

            <div className="flex justify-center">
                {children}
            </div>


        </div>
    );
};

const ProjectCard: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex-1 bg-gray-100 p-4">
                <h2 className="text-lg font-semibold mb-2">Column 1</h2>
                <p>This is the content for the first column.</p>
            </div>
            <div className="flex-1 bg-gray-200 p-4">
                <h2 className="text-lg font-semibold mb-2">Column 2</h2>
                <p>This is the content for the second column.</p>
            </div>
        </div>
    );
};
export {ProjectSection, ProjectCard} ;
