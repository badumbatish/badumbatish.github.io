'use client'


import Image from "next/image";
import React from "react";

const a =             <Image src={"Arrow_top.png"} alt={"arrow to top"} height={30} width={30}></Image>

const UpToTopButton: React.FC = () => {
    return (
        <button className={"bottom-4 right-4 fixed"} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div  className={"inline text-2xl font-bold border-black border-2 rounded  p-0 m-0 h-100 w-100"}>&#x21e1;&#x21e1;</div>

        </button>
    );
};

export default UpToTopButton;

