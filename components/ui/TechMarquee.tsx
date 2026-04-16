"use client";

import { useMemo } from "react";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiNextdotjs, SiJavascript, SiTypescript, SiTailwindcss } from "react-icons/si";

type Tech = {
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  glowClass: string;
};

export default function TechMarquee() {
  const tech = useMemo<Tech[]>(
    () => [
      {
        name: "JavaScript",
        Icon: SiJavascript,
        colorClass: "group-hover:text-yellow-300",
        glowClass: "group-hover:shadow-[0_0_24px_rgba(250,204,21,0.35)]",
      },
      {
        name: "TypeScript",
        Icon: SiTypescript,
        colorClass: "group-hover:text-sky-300",
        glowClass: "group-hover:shadow-[0_0_24px_rgba(56,189,248,0.35)]",
      },
      {
        name: "React",
        Icon: FaReact,
        colorClass: "group-hover:text-cyan-300",
        glowClass: "group-hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]",
      },
      {
        name: "Next.js",
        Icon: SiNextdotjs,
        colorClass: "group-hover:text-white",
        glowClass: "group-hover:shadow-[0_0_24px_rgba(255,255,255,0.28)]",
      },
      {
        name: "Node.js",
        Icon: FaNodeJs,
        colorClass: "group-hover:text-emerald-300",
        glowClass: "group-hover:shadow-[0_0_24px_rgba(52,211,153,0.35)]",
      },
      {
        name: "Python",
        Icon: FaPython,
        colorClass: "group-hover:text-blue-300",
        glowClass: "group-hover:shadow-[0_0_24px_rgba(96,165,250,0.35)]",
      },
      {
        name: "Tailwind",
        Icon: SiTailwindcss,
        colorClass: "group-hover:text-teal-300",
        glowClass: "group-hover:shadow-[0_0_24px_rgba(45,212,191,0.35)]",
      },
    ],
    []
  );

  const loop = [...tech, ...tech];

  return (
    <div className="marquee marquee-mask w-full overflow-hidden">
      <div className="marquee-track">
        {loop.map(({ name, Icon, colorClass, glowClass }, idx) => (
          <div
            key={`${name}-${idx}`}
            className="
              tech-chip group mx-6 flex flex-col items-center justify-center
              cursor-pointer select-none
            "
            title={name}
            aria-label={name}
          >
            <div
              className={`
                rounded-2xl border border-transparent px-4 py-4
                transition-all duration-300
                group-hover:border-white/20
                ${glowClass}
              `}
            >
              <Icon
                className={`
                  text-5xl md:text-6xl text-white/75
                  transition-all duration-300
                  group-hover:scale-110
                  ${colorClass}
                `}
              />
            </div>

            <span
              className="
                mt-3 text-xs tracking-widest uppercase text-white/70
                opacity-0 translate-y-2
                transition-all duration-300
                group-hover:opacity-100
                group-hover:translate-y-0
              "
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
