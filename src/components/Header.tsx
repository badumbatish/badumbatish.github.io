import React, {ReactNode} from "react";
import Link from "next/link";

const Header: React.FC<{children: ReactNode}> = ({ children }) => {
    return (
        <Link href="/">
            <div className="flex justify-center items-center py-4 ">
                {children}
            </div>
        </Link>

    );
};

export default Header;
