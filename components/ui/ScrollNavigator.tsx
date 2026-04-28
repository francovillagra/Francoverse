"use client";

import { useEffect, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const SECTION_IDS = ["home", "about", "projects", "skills", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

type SectionData = {
  id: SectionId;
  element: HTMLElement;
};

function getSections(): SectionData[] {
  return SECTION_IDS.map((id) => {
    const element = document.getElementById(id);
    return element ? { id, element } : null;
  }).filter((item): item is SectionData => item !== null);
}

function getVisibleSectionIndex(sections: SectionData[]): number {
  if (!sections.length) return 0;

  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  if (scrollY <= 8) return 0;
  if (scrollY + viewportHeight >= docHeight - 8) return sections.length - 1;

  const offset = 140;
  let index = 0;

  for (let i = 0; i < sections.length; i++) {
    const top = sections[i].element.offsetTop;
    if (scrollY + offset >= top) {
      index = i;
    } else {
      break;
    }
  }

  return index;
}

export default function ScrollNavigator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateActive = () => {
      const sections = getSections();
      setActiveIndex(getVisibleSectionIndex(sections));
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  const scrollToIndex = (index: number) => {
    const sections = getSections();
    const target = sections[index];
    if (!target) return;

    const top = target.element.offsetTop;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const goUp = () => {
    const sections = getSections();
    const current = getVisibleSectionIndex(sections);
    if (current <= 0) return;
    scrollToIndex(current - 1);
  };

  const goDown = () => {
    const sections = getSections();
    const current = getVisibleSectionIndex(sections);
    if (current >= sections.length - 1) return;
    scrollToIndex(current + 1);
  };

  const atTop = activeIndex <= 0;
  const atBottom = activeIndex >= SECTION_IDS.length - 1;

  return (
    <div className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3">
      <button
        type="button"
        onClick={goUp}
        aria-label="Ir a la sección anterior"
        className={`grid place-items-center size-11 rounded-2xl border backdrop-blur-md transition ${
          atTop
            ? "border-white/5 bg-white/[0.03] text-white/25 cursor-default"
            : "border-white/10 bg-white/[0.05] text-white/75 hover:border-white/25 hover:text-white hover:-translate-y-0.5"
        }`}
      >
        <FaChevronUp size={14} />
      </button>

      <div className="flex flex-col items-center gap-2">
        {SECTION_IDS.map((id, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={id}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Ir a ${id}`}
              className={`rounded-full transition-all ${
                isActive
                  ? "h-8 w-2 bg-white/85"
                  : "h-2.5 w-2.5 bg-white/25 hover:bg-white/55"
              }`}
            />
          );
        })}
      </div>

      <button
        type="button"
        onClick={goDown}
        aria-label="Ir a la siguiente sección"
        className={`grid place-items-center size-11 rounded-2xl border backdrop-blur-md transition ${
          atBottom
            ? "border-white/5 bg-white/[0.03] text-white/25 cursor-default"
            : "border-white/10 bg-white/[0.05] text-white/75 hover:border-white/25 hover:text-white hover:translate-y-0.5"
        }`}
      >
        <FaChevronDown size={14} />
      </button>
    </div>
  );
}