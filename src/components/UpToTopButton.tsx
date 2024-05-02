'use client'


import Image from "next/image";
import React from "react";


const UpToTopButton: React.FC = () => {
    return (
        <button className={"bottom-4 right-4 fixed"} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Image src={"Arrow_top.png"} alt={"arrow to top"} height={30} width={30}></Image>
        </button>
    );
};

export default UpToTopButton;

