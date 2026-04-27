"use client";

import { useEffect, useMemo, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const SECTION_IDS = ["home", "about", "projects", "skills", "contact"] as const;

type SectionId = (typeof SECTION_IDS)[number];

export default function ScrollNavigator() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          root: null,
          threshold: 0.45,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const currentIndex = useMemo(
    () => SECTION_IDS.findIndex((id) => id === activeSection),
    [activeSection]
  );

  const goToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goUp = () => {
    if (currentIndex <= 0) {
      goToSection("home");
      return;
    }
    goToSection(SECTION_IDS[currentIndex - 1]);
  };

  const goDown = () => {
    if (currentIndex >= SECTION_IDS.length - 1) {
      goToSection("contact");
      return;
    }
    goToSection(SECTION_IDS[currentIndex + 1]);
  };

  const atTop = currentIndex <= 0;
  const atBottom = currentIndex >= SECTION_IDS.length - 1;

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
        {SECTION_IDS.map((id) => {
          const isActive = id === activeSection;

          return (
            <button
              key={id}
              type="button"
              onClick={() => goToSection(id)}
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