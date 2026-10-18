"use client";

import { useEffect, useRef, useState } from "react";

type Tab = { id: string; name: string };

/**
 * Sticky, horizontally scrollable category links. The tab of the section
 * currently near the top of the viewport is marked with aria-current.
 */
export function CategoryTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const listRef = useRef<HTMLDivElement>(null);
  // After a click, ignore the observer until the scroll settles; sections that
  // sit side by side would otherwise steal the highlight.
  const lockedRef = useRef(false);

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        if (lockedRef.current) return;
        const first = tabs.find((tab) => visible.has(tab.id));
        if (first) {
          setActive(first.id);
          return;
        }
        // Above every section (e.g. after jumping back to the top): highlight the first tab.
        const firstSection = document.getElementById(tabs[0]?.id ?? "");
        if (firstSection && firstSection.getBoundingClientRect().top > 96) {
          setActive(tabs[0].id);
        }
      },
      { rootMargin: "-96px 0px -55% 0px" },
    );
    for (const tab of tabs) {
      const section = document.getElementById(tab.id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [tabs]);

  useEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!list || !tab) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({
      left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [active]);

  function handleClick(id: string) {
    setActive(id);
    lockedRef.current = true;
    const unlock = () => {
      lockedRef.current = false;
    };
    window.addEventListener("scrollend", unlock, { once: true });
    window.setTimeout(unlock, 1200);
  }

  return (
    <nav
      aria-label="Kategori menu"
      className="sticky top-0 z-10 border-y border-line bg-surface"
    >
      <div
        ref={listRef}
        className="page-container relative flex gap-7 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            data-tab={tab.id}
            aria-current={tab.id === active ? "true" : undefined}
            onClick={() => handleClick(tab.id)}
            className="link-underline inline-flex min-h-14 flex-none items-center text-base font-bold whitespace-nowrap text-ink-muted transition-colors hover:text-ink aria-[current]:text-ink after:bottom-0! after:bg-terracotta-deep!"
          >
            {tab.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
