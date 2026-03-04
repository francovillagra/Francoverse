"use client";

import { useMemo } from "react";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiNextdotjs, SiJavascript, SiTypescript, SiTailwindcss } from "react-icons/si";

type Tech = {
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
  gradClass: string; // clase del gradiente (CSS)
};

export default function TechMarquee() {
  const tech = useMemo<Tech[]>(
    () => [
      { name: "JavaScript", Icon: SiJavascript, gradClass: "grad-js" },
      { name: "TypeScript", Icon: SiTypescript, gradClass: "grad-ts" },
      { name: "React", Icon: FaReact, gradClass: "grad-react" },
      { name: "Next.js", Icon: SiNextdotjs, gradClass: "grad-next" },
      { name: "Node.js", Icon: FaNodeJs, gradClass: "grad-node" },
      { name: "Python", Icon: FaPython, gradClass: "grad-py" },
      { name: "Tailwind", Icon: SiTailwindcss, gradClass: "grad-tw" },
    ],
    []
  );

  const loop = [...tech, ...tech];

  return (
    <div className="marquee marquee-mask w-full overflow-hidden">
      <div className="marquee-track">
        {loop.map(({ name, Icon, gradClass }, idx) => (
          <div
            key={`${name}-${idx}`}
            className="tech-chip group mx-6 flex flex-col items-center justify-center text-white/75 cursor-pointer select-none"
            title={name}
            aria-label={name}
          >
            <Icon
              className={`
                tech-grad ${gradClass}
                text-5xl md:text-6xl
                transition-all duration-300
                group-hover:scale-110
              `}
            />

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