import Image from "next/image";
import pictureProfile from "public/pfp2.jpg";
import LinkButton from "@/components/LinkButton";

const LeftMainCard = () => {
    return (
    <div className="font-mono flex flex-col items-center basis-2/6
                                rounded-lg overflow-hidden shadow-lg p-4 border-2 border-blue-300 gap-2">
        <div className="basis-1/5">
            <Image className="mx-auto rounded-3xl overflow-hidden" src={pictureProfile}
                   alt="picture profile" width={150} height={200}></Image>

        </div>
        <div className="basis-4/5 flex flex-col gap-2">

            <h2 className="text-xl font-bold">Hi there, it&rsquo;s Jasmine :) <br/>I hope
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
                    <LinkButton link={"https://www.overleaf.com/read/bzvddqdhfdqp"} linkName={"resume.pdf"}></LinkButton>
                    <LinkButton link={"https://leetcode.com/thisisjjasmine/"}
                                linkName={"Leetcode"}></LinkButton>
                </div>
            </div>

        </div>
    </div>
    )
}

export default LeftMainCard;