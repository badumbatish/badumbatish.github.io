'use client'

import React, { useEffect, useState } from "react";

const ScrollButton: React.FC = () => {
    const [atTop, setAtTop] = useState(true);
    const [atBottom, setAtBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

            setAtTop(scrollTop <= 1);
            setAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () =>
        window.scrollTo({ top: 0, behavior: "smooth" });

    const scrollToBottom = () =>
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });

    // Hide if page is too short to scroll
    if (atTop && atBottom) return null;

    return (
        <div className="bottom-4 right-4 fixed flex flex-col gap-2">
            {!atTop && (
                <button
                    className="shadow-md"
                    onClick={scrollToTop}
                >
                    <div className="inline text-xl font-bold border-black border-2 rounded p-2 bg-white">
                        ⇡⇡
                    </div>
                </button>
            )}
            {!atBottom && (
                <button
                    className="shadow-md"
                    onClick={scrollToBottom}
                >
                    <div className="inline text-xl font-bold border-black border-2 rounded p-2 bg-white">
                        ⇣⇣
                    </div>
                </button>
            )}
        </div>
    );
};

export default ScrollButton;
