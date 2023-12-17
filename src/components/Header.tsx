import React, {ReactNode} from "react";

const Header: React.FC<{children: ReactNode}> = ({ children }) => {
    return (
        <div className="flex justify-center items-center py-4">
            {children}
        </div>
    );
};

export default Header;
