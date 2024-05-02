import React, {ReactNode} from "react";

const Header: React.FC<{children: ReactNode}> = ({ children }) => {
    return (
        <a href="/">
            <div className="flex justify-center items-center py-4">
                {children}
            </div>
        </a>

    );
};

export default Header;
