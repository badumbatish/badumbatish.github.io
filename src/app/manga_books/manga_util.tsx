"use client"
import {useEffect, useRef, useState} from "react";

interface BlurredTextboxProps {
    content: string;
    buttonText?: string;
}
export function QuickReadButton({ content, children }: {content: string,  children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const textboxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (textboxRef.current && !textboxRef.current.contains(event.target as Node)) {
                setIsVisible(false);
                document.body.style.overflow = "auto"; // Restore scrolling when closed
            }
        }

        function handleEscape(event : KeyboardEvent) {
            if (event.key === "Escape") {
                setIsVisible(false);
                document.body.style.overflow = "auto"; // Restore scrolling when closed
            }
        }
        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden"; // Disable background scrolling
            // Start the animation after component is visible
            setTimeout(() => {
                setIsAnimating(true);
            }, 10);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
            // Reset animation state when hidden
            setIsAnimating(false);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "auto"; // Ensure scrolling is restored when unmounted
        }
    }, [isVisible]);

    return (
        <div className="relative flex items-center justify-center">
            <button
                onClick={() => setIsVisible(true)}
                className=""
            >
                {children}
            </button>

            {isVisible && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center overflow-hidden z-50">

                    <article
                        ref={textboxRef}
                        className={`bg-white p-4 rounded-lg shadow-lg w-2/4  overflow-y-auto 
                                   transition-all duration-300 ease-in-out
                                   ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                        style={{maxHeight: "80vh", overflowY: "auto"}}
                    >
                        <div className="prose prose-sm mx-auto prose-slate"
                             dangerouslySetInnerHTML={{__html : content}}
                        >

                        </div>
                    </article>
                </div>
            )}
        </div>
    );
}



