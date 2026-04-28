"use client";

import { useEffect, useMemo, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const SECTION_IDS = ["home", "about", "projects", "skills", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

function getCurrentSection(): SectionId {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  if (scrollY <= 8) return "home";
  if (scrollY + viewportHeight >= docHeight - 8) return "contact";

  const anchor = scrollY + 140;

  let current: SectionId = "home";

  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;

    if (anchor >= el.offsetTop) {
      current = id;
    } else {
      break;
    }
  }

  return current;
}

export default function ScrollNavigator() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  useEffect(() => {
    const update = () => {
      setActiveSection(getCurrentSection());
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
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
    const current = getCurrentSection();
    const index = SECTION_IDS.findIndex((id) => id === current);
    if (index <= 0) return;
    goToSection(SECTION_IDS[index - 1]);
  };

  const goDown = () => {
    const current = getCurrentSection();
    const index = SECTION_IDS.findIndex((id) => id === current);
    if (index >= SECTION_IDS.length - 1) return;
    goToSection(SECTION_IDS[index + 1]);
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