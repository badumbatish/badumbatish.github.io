import React, {ReactNode} from "react";

const IntroCards: React.FC<{children: ReactNode}> = ({ children }) => {
    return (
        <div className="flex flex-col md:flex-row justify-center gap-10 p-10">
            {children}
        </div>
    );
};

export default IntroCards;
