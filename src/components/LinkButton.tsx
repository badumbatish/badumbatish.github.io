import Image from "next/image";
import {useState} from "react";
import Link from "next/link";

import React from 'react';
const  LinkButton = ({link, linkName}: { link: string, linkName: string }) => {

    const iconNav: string = link.startsWith("/") ? "↙" : "↗";
    let buttonClass = `flex justify-center text-blue-800
                        hover:font-bold`;

    function CopyIcon({link}: { link: string }) {
        const defaultCopyBtn = <Image src={"copy-icon.svg"} alt={"copy button"} width={"15"}
                                      height={"15"}></Image>
        const CopyBtnSize21 = <Image src={"copy-icon.svg"} alt={"copy button"} width={"21"} height={"21"}></Image>
        const CopyBtnSize17 = <Image src={"copy-icon.svg"} alt={"copy button"} width={"17"} height={"17"}></Image>
        const [copyBtn, setCopyBtn] = useState(defaultCopyBtn);

        function clickCopyBtn() {
            navigator.clipboard.writeText(link);
            setCopyBtn(CopyBtnSize21);
            setTimeout(() => {
                setCopyBtn(defaultCopyBtn);
            }, 100);
        }
        function hoverOnCopyBtn() {
            setCopyBtn(CopyBtnSize17);
        }
        function hoverOffCopyBtn() {
            setCopyBtn(defaultCopyBtn);
        }
        return <button className="inline-block hover:background" onClick={clickCopyBtn} onMouseEnter={hoverOnCopyBtn}
                       onMouseLeave={hoverOffCopyBtn}
        >
            {copyBtn}
        </button>
    }

    let content;
    if (link.startsWith("/")) {
        // handles inward link
        content = <Link className={buttonClass} target="_self"
                        rel="noopener noreferrer" href={link}>
            <button>{linkName}{iconNav}
            </button>
        </Link>
        link = "badumbatish.github.io" + link;
    } else if (link.startsWith("mailto:")) {
        // Handles mail link
        content = <Link className={buttonClass} target="_blank"
                        rel="noopener noreferrer" href={link}>
            <button>{linkName}{iconNav}
            </button>
        </Link>
        link = link.substring("mailto:".length);
    }

    else {
        // Handle outward link
        content =
            <a className={buttonClass} target="_blank"
               rel="noopener noreferrer" href={link}>
                <button>{linkName}{iconNav}</button>
            </a>
    }

    return (
        <div className="flex justify-center flex-row border-black border-2 rounded text-blue-800 gap-2">
            <CopyIcon link={link}></CopyIcon>
            {content}
        </div>
    )

}

export default LinkButton;