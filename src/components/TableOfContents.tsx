"use client";

import { useEffect, useRef, useState } from "react";

interface TocEntry {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({
  articleSelector = "article",
}: {
  articleSelector?: string;
}) {
  const [headings, setHeadings] = useState<TocEntry[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const isScrollingRef = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const article = document.querySelector(articleSelector);
    if (!article) return;

    const elements = article.querySelectorAll("h1[id], h2[id], h3[id]");
    const entries: TocEntry[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent ?? "",
      level: el.tagName === "H1" ? 1 : el.tagName === "H2" ? 2 : 3,
    }));
    setHeadings(entries);

    const observer = new IntersectionObserver(
      (intersectionEntries) => {
        if (isScrollingRef.current) return;
        for (const entry of intersectionEntries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [articleSelector]);

  useEffect(() => {
    if (!activeId || !listRef.current) return;
    const activeEl = listRef.current.querySelector(`a[href="#${CSS.escape(activeId)}"]`) as HTMLElement | null;
    if (!activeEl) return;
    const list = listRef.current;
    const elTop = activeEl.offsetTop - list.offsetTop;
    const target = elTop - list.clientHeight / 3;
    list.scrollTo({ top: target, behavior: "smooth" });
  }, [activeId]);

  const listRef = useRef<HTMLUListElement>(null);

  if (headings.length === 0) return null;

  return (
    <div className="hidden xl:block fixed top-20 right-8 w-48 max-h-[60vh] text-[13px]">
      <p className="font-medium text-black/80 text-[11px] uppercase tracking-wider mb-1">On this page</p>
      <ul ref={listRef} className="space-y-0 max-h-[calc(60vh-2rem)] overflow-y-auto overscroll-contain scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
        {headings.map((h) => (
          <li
            key={h.id}
            className={`border-l-2 transition-colors ${
              activeId === h.id ? "border-sky-400" : "border-black/10"
            } ${h.level === 3 ? "pl-4" : h.level === 2 ? "pl-2" : ""}`}
          >
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                isScrollingRef.current = true;
                setActiveId(h.id);
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                clearTimeout(scrollTimerRef.current);
                scrollTimerRef.current = setTimeout(() => {
                  isScrollingRef.current = false;
                }, 1000);
              }}
              className={`block py-px px-2 leading-snug transition-colors no-underline ${
                activeId === h.id
                  ? "text-sky-400 font-medium"
                  : "text-black hover:text-indigo-400"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
