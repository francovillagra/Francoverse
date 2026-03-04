"use client";

import { useMemo } from "react";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiNextdotjs, SiJavascript, SiTypescript, SiTailwindcss } from "react-icons/si";

type Tech = {
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
  colorClass: string; // color que se activa en hover
};

export default function TechMarquee() {
  const tech = useMemo<Tech[]>(
    () => [
      { name: "JavaScript", Icon: SiJavascript, colorClass: "group-hover:text-yellow-300" },
      { name: "TypeScript", Icon: SiTypescript, colorClass: "group-hover:text-sky-300" },
      { name: "React", Icon: FaReact, colorClass: "group-hover:text-cyan-300" },
      { name: "Next.js", Icon: SiNextdotjs, colorClass: "group-hover:text-white" },
      { name: "Node.js", Icon: FaNodeJs, colorClass: "group-hover:text-emerald-300" },
      { name: "Python", Icon: FaPython, colorClass: "group-hover:text-blue-300" },
      { name: "Tailwind", Icon: SiTailwindcss, colorClass: "group-hover:text-teal-300" },
    ],
    []
  );

  const loop = [...tech, ...tech];

  return (
    <div className="marquee marquee-mask w-full overflow-hidden">
      <div className="marquee-track">
        {loop.map(({ name, Icon, colorClass }, idx) => {
          // pequeña desincronización para que no floten todos igual
          const delay = (idx % tech.length) * 0.18;

          return (
            <div
              key={`${name}-${idx}`}
              className="tech-chip group mx-6 flex flex-col items-center justify-center text-white/75 cursor-pointer select-none"
              style={{ animationDelay: `${delay}s` }}
              title={name}
              aria-label={name}
            >
              <div className="tech-float">
                <Icon
                  className={`
                    text-5xl md:text-6xl
                    transition-all duration-300
                    ${colorClass}
                    group-hover:scale-110
                    drop-shadow-[0_0_0_rgba(0,0,0,0)]
                  `}
                />
              </div>

              {/* Texto aparece en hover */}
              <span
                className="
                  mt-3 text-xs tracking-widest uppercase
                  opacity-0 translate-y-2
                  transition-all duration-300
                  group-hover:opacity-100
                  group-hover:translate-y-0
                  text-white/70
                "
              >
                {name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}