import Image from "next/image";
import pictureProfile from "public/pfp2.jpg";
import LinkButton from "@/components/LinkButton";
import Link from "next/link";
import React, {useState} from "react";

const NickNameButton = () => {
    let NickNameArray : String[]= ["Jasmine", "jsmn", "Lễ", "Jazz", "Thảo", "jjasmine", "jjsm"];
    let clickMe = <Image className={"inline"} src={"clickme.png"} alt={"click me button"} width={8} height={8}></Image>
    const [NickName, setNickName] = useState<String>("Jasmine");
    const [Counter, setCounter] = useState(0);
    const [TextSize, setTextSize] = useState("text-xl");
    const myClick = () => {
        setCounter((Counter + 1) % NickNameArray.length);
        setNickName(NickNameArray[Counter]);
        setTextSize("text-2xl");
        setTimeout(() => {
            setTextSize("text-xl");
        }, 100);


    }

    function hoverOnBtn() {
        setTextSize("text-2xl");
    }
    function hoverOffBtn() {
        setTextSize("text-xl");
    }

    return <span>
        <span
        >
            <button className={`inline content-start items-start justify-start flex-row text-blue-400 underline-offset-1 ${TextSize}`}
                             onClick={myClick}
                             onMouseEnter={hoverOnBtn}
                             onMouseLeave={hoverOffBtn}>

                <span>{NickName}</span>
                <span className={"justify-self-start"}>{clickMe}</span>
                </button>
        </span>
        <span> :)</span>
    </span>
}
const LeftMainCard = () => {
    return (
    <div className="font-mono flex flex-col items-center basis-2/6
                                rounded-lg overflow-hidden shadow-lg p-4 border-2 border-blue-300 gap-2">
        <div className="basis-1/5">
            <Image className="mx-auto rounded-3xl overflow-hidden" src={pictureProfile}
                   alt="picture profile" width={150} height={200}></Image>

        </div>
        <div className="basis-4/5 flex flex-col gap-2">

            <h2 className="text-xl font-bold">Hi there, it&rsquo;s <NickNameButton></NickNameButton> <br/>I hope
                you&apos;ll
                enjoy your stay :)
            </h2>
            <div>
                <div className="text-xl">Contact:</div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-1 text-sm lg:text-base">
                    <LinkButton link={"mailto:jjasmine@berkeley.edu"}
                                linkName={"Email"}></LinkButton>
                    <LinkButton link={"https://www.linkedin.com/in/jjasmine-t/"}
                                linkName={"LinkedIn"}></LinkButton>
                </div>
            </div>
            <div>
                <div className="text-xl">Catch me at/on:</div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-1 text-sm lg:text-base">

                    <LinkButton link={"https://github.com/badumbatish/"}
                                linkName={"GitHub"}></LinkButton>
                    <LinkButton link={"/blog"} linkName={"Blog"}></LinkButton>
                    <LinkButton link={"https://www.overleaf.com/read/bzvddqdhfdqp#fb6509"} linkName={"resume.pdf"}></LinkButton>
                    <LinkButton link={"https://leetcode.com/thisisjjasmine/"}
                                linkName={"Leetcode"}></LinkButton>
                    <LinkButton link={"https://developers.google.com/profile/u/jjasmine"} linkName={"google.dev"}></LinkButton>
                </div>
            </div>

        </div>
    </div>
    )
}

export default LeftMainCard;