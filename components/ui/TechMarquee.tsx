"use client";

import { useMemo } from "react";
import { FaReact, FaNodeJs, FaPython, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql } from "react-icons/si";

type Tech = { name: string; Icon: React.ComponentType<{ className?: string }> };

export default function TechMarquee() {
  const tech = useMemo<Tech[]>(
    () => [
      { name: "JavaScript", Icon: FaGitAlt },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "React", Icon: FaReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "Node.js", Icon: FaNodeJs },
      { name: "Python", Icon: FaPython },
      { name: "Tailwind", Icon: SiTailwindcss },
      { name: "PostgreSQL", Icon: SiPostgresql },
    ],
    []
  );

  
  const loop = [...tech, ...tech];

  return (
    <div className="marquee marquee-mask w-full overflow-hidden">
      <div className="marquee-track">
        {loop.map(({ name, Icon }, idx) => (
          <div
            key={`${name}-${idx}`}
            className="
              tech-chip
              group
              mx-6 flex flex-col items-center justify-center
              text-white/80
              cursor-pointer
            "
          >
            <Icon
              className="
                text-5xl md:text-6xl
                transition-all duration-300
                group-hover:scale-110
                group-hover:text-white
              "
            />

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
        ))}
      </div>
    </div>
  );
}