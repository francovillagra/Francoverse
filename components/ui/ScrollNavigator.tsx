"use client";

import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

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

  const viewportCenter = window.innerHeight / 2;

  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  sections.forEach((section, index) => {
    const rect = section.element.getBoundingClientRect();
    const sectionCenter = rect.top + rect.height / 2;
    const distance = Math.abs(sectionCenter - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

export default function ScrollNavigator() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [sectionsCount, setSectionsCount] = useState<number>(SECTION_IDS.length);

  useEffect(() => {
    let ticking = false;

    const updateActive = () => {
      const sections = getSections();

      setSectionsCount(sections.length);
      setActiveIndex(getVisibleSectionIndex(sections));
    };

    const requestUpdate = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    };

    updateActive();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const scrollToIndex = (index: number) => {
    const sections = getSections();
    const target = sections[index];

    console.log("ScrollNavigator click:", {
      index,
      sectionsFound: sections.map((section) => section.id),
      target: target?.id,
    });

    if (!target) return;

    target.element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goUp = () => {
    const sections = getSections();
    const current = getVisibleSectionIndex(sections);

    console.log("goUp:", {
      current,
      sectionsFound: sections.map((section) => section.id),
    });

    if (current <= 0) return;

    scrollToIndex(current - 1);
  };

  const goDown = () => {
    const sections = getSections();
    const current = getVisibleSectionIndex(sections);

    console.log("goDown:", {
      current,
      sectionsFound: sections.map((section) => section.id),
    });

    if (current >= sections.length - 1) return;

    scrollToIndex(current + 1);
  };

  const atTop = activeIndex <= 0;
  const atBottom = activeIndex >= sectionsCount - 1;

  const buttonBaseClass =
    "grid place-items-center size-11 rounded-2xl border backdrop-blur-md transition-all duration-300 outline-none";

  const buttonEnabledClass =
    "border-white/10 bg-white/[0.05] text-white/75 hover:border-cyan-300/60 hover:text-white hover:shadow-[0_0_22px_rgba(103,232,249,0.35)] hover:ring-1 hover:ring-cyan-300/30 focus-visible:border-cyan-300/70 focus-visible:shadow-[0_0_24px_rgba(103,232,249,0.45)]";

  const buttonDisabledClass =
    "border-white/5 bg-white/[0.03] text-white/25 cursor-default";

  return (
    <div className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-3">
      <button
        type="button"
        onClick={goUp}
        disabled={atTop}
        aria-label="Ir a la sección anterior"
        className={`${buttonBaseClass} ${
          atTop
            ? buttonDisabledClass
            : `${buttonEnabledClass} hover:-translate-y-0.5`
        }`}
      >
        <ChevronUp size={14} />
      </button>

      <div className="flex flex-col items-center gap-2 rounded-full border border-white/10 bg-black/10 px-2 py-3 backdrop-blur-md transition-all duration-300 hover:border-cyan-300/50 hover:shadow-[0_0_24px_rgba(103,232,249,0.25)]">
        {SECTION_IDS.map((id, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={id}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Ir a ${id}`}
              className={`rounded-full transition-all duration-300 outline-none ${
                isActive
                  ? "h-8 w-2 bg-white/85 shadow-[0_0_14px_rgba(255,255,255,0.45)]"
                  : "h-2.5 w-2.5 bg-white/25 hover:bg-cyan-200/80 hover:shadow-[0_0_14px_rgba(103,232,249,0.55)] focus-visible:bg-cyan-200/80"
              }`}
            />
          );
        })}
      </div>

      <button
        type="button"
        onClick={goDown}
        disabled={atBottom}
        aria-label="Ir a la siguiente sección"
        className={`${buttonBaseClass} ${
          atBottom
            ? buttonDisabledClass
            : `${buttonEnabledClass} hover:translate-y-0.5`
        }`}
      >
        <ChevronDown size={14} />
      </button>
    </div>
  );
}