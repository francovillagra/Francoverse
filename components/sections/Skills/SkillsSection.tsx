"use client";

import { useMemo, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiFastapi,
  SiMongodb,
  SiMysql,
  SiPandas,
  SiJupyter,
  SiFramer,
  SiGit,
  SiGithub,
  SiJson,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

import type { Project } from "@/components/sections/Projects/ProjectCard";
import ProjectCard from "@/components/sections/Projects/ProjectCard";

type SkillsSectionProps = {
  projects: Project[];
};

type TechVisual = {
  label: string;
  icon: IconType;
  colorClass: string;
  glowClass: string;
};

const techVisualMap: Record<string, TechVisual> = {
  "Next.js": {
    label: "Next.js",
    icon: SiNextdotjs,
    colorClass: "text-white",
    glowClass: "drop-shadow-[0_0_16px_rgba(255,255,255,0.28)]",
  },
  React: {
    label: "React",
    icon: SiReact,
    colorClass: "text-cyan-400",
    glowClass: "drop-shadow-[0_0_18px_rgba(34,211,238,0.45)]",
  },
  TypeScript: {
    label: "TypeScript",
    icon: SiTypescript,
    colorClass: "text-blue-400",
    glowClass: "drop-shadow-[0_0_18px_rgba(96,165,250,0.45)]",
  },
  JavaScript: {
    label: "JavaScript",
    icon: SiJavascript,
    colorClass: "text-yellow-300",
    glowClass: "drop-shadow-[0_0_18px_rgba(253,224,71,0.45)]",
  },
  "Tailwind CSS": {
    label: "Tailwind CSS",
    icon: SiTailwindcss,
    colorClass: "text-cyan-300",
    glowClass: "drop-shadow-[0_0_18px_rgba(103,232,249,0.45)]",
  },
  "Node.js": {
    label: "Node.js",
    icon: SiNodedotjs,
    colorClass: "text-green-400",
    glowClass: "drop-shadow-[0_0_18px_rgba(74,222,128,0.45)]",
  },
  Python: {
    label: "Python",
    icon: SiPython,
    colorClass: "text-yellow-300",
    glowClass: "drop-shadow-[0_0_18px_rgba(253,224,71,0.38)]",
  },
  FastAPI: {
    label: "FastAPI",
    icon: SiFastapi,
    colorClass: "text-emerald-400",
    glowClass: "drop-shadow-[0_0_18px_rgba(52,211,153,0.45)]",
  },
  MongoDB: {
    label: "MongoDB",
    icon: SiMongodb,
    colorClass: "text-green-500",
    glowClass: "drop-shadow-[0_0_18px_rgba(34,197,94,0.45)]",
  },
  MySQL: {
    label: "MySQL",
    icon: SiMysql,
    colorClass: "text-sky-400",
    glowClass: "drop-shadow-[0_0_18px_rgba(56,189,248,0.45)]",
  },
  Pandas: {
    label: "Pandas",
    icon: SiPandas,
    colorClass: "text-violet-300",
    glowClass: "drop-shadow-[0_0_18px_rgba(196,181,253,0.45)]",
  },
  Jupyter: {
    label: "Jupyter",
    icon: SiJupyter,
    colorClass: "text-orange-400",
    glowClass: "drop-shadow-[0_0_18px_rgba(251,146,60,0.45)]",
  },
  "Framer Motion": {
    label: "Framer Motion",
    icon: SiFramer,
    colorClass: "text-pink-300",
    glowClass: "drop-shadow-[0_0_18px_rgba(249,168,212,0.45)]",
  },
  Git: {
    label: "Git",
    icon: SiGit,
    colorClass: "text-orange-500",
    glowClass: "drop-shadow-[0_0_18px_rgba(249,115,22,0.45)]",
  },
  GitHub: {
    label: "GitHub",
    icon: SiGithub,
    colorClass: "text-white",
    glowClass: "drop-shadow-[0_0_16px_rgba(255,255,255,0.28)]",
  },
  JSON: {
    label: "JSON",
    icon: SiJson,
    colorClass: "text-amber-300",
    glowClass: "drop-shadow-[0_0_18px_rgba(252,211,77,0.45)]",
  },
  REST: {
    label: "REST",
    icon: TbApi,
    colorClass: "text-cyan-300",
    glowClass: "drop-shadow-[0_0_18px_rgba(103,232,249,0.45)]",
  },
};

function getTechVisual(tech: string): TechVisual {
  return (
    techVisualMap[tech] || {
      label: tech,
      icon: TbApi,
      colorClass: "text-cyan-300",
      glowClass: "drop-shadow-[0_0_18px_rgba(103,232,249,0.45)]",
    }
  );
}

export default function SkillsSection({ projects }: SkillsSectionProps) {
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const technologies = useMemo(() => {
    return [...new Set(projects.flatMap((project) => project.techStack))].sort();
  }, [projects]);

  const marqueeItems = useMemo(() => [...technologies, ...technologies], [technologies]);

  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (!selectedTech) return [];
    return projects.filter((project) => project.techStack.includes(selectedTech));
  }, [projects, selectedTech]);

  const handleSelectTech = (tech: string) => {
    const nextValue = selectedTech === tech ? null : tech;
    setSelectedTech(nextValue);

    if (nextValue) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 50);
      });
    }
  };

  return (
    <section
      id="skills"
      aria-label="Habilidades"
      className="min-h-dvh w-full px-6 py-20 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold">Habilidades</h2>
          <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
            Explorá tecnologías y descubrí en qué proyectos las apliqué.
          </p>
          <p className="mt-2 text-white/45 text-sm md:text-base">
            Un mismo proyecto puede incluir varias tecnologías.
          </p>
        </div>

        <div className="mt-14 marquee marquee-mask overflow-hidden">
          <div className="marquee-track gap-10 py-4">
            {marqueeItems.map((tech, index) => {
              const { icon: Icon, label, colorClass, glowClass } = getTechVisual(tech);
              const isActive = selectedTech === tech;

              return (
                <button
                  key={`${tech}-${index}`}
                  type="button"
                  onClick={() => handleSelectTech(tech)}
                  aria-pressed={isActive}
                  aria-label={`Filtrar proyectos por ${label}`}
                  className="group flex shrink-0 flex-col items-center justify-center gap-3 px-2"
                >
                  <Icon
                    className={[
                      "text-5xl md:text-6xl transition-all duration-200",
                      colorClass,
                      isActive
                        ? `scale-110 ${glowClass}`
                        : `opacity-90 group-hover:scale-110 group-hover:-translate-y-1 group-hover:opacity-100 ${glowClass}`,
                    ].join(" ")}
                  />
                  <span
                    className={`text-xs md:text-sm font-medium text-center transition ${
                      isActive ? "text-white" : "text-white/55 group-hover:text-white/85"
                    }`}
                  >
                    {label}
                  </span>
                  <span
                    className={`h-[2px] rounded-full transition-all duration-200 ${
                      isActive
                        ? "w-10 bg-white/80"
                        : "w-0 bg-transparent group-hover:w-8 group-hover:bg-white/40"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div ref={resultsRef} className="mt-14">
          {!selectedTech ? (
            <p className="text-white/50">
              Seleccioná una tecnología para ver los proyectos donde la utilicé.
            </p>
          ) : filteredProjects.length === 0 ? (
            <p className="text-white/50">
              No hay proyectos asociados a {selectedTech}.
            </p>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between gap-4">
                <h3 className="text-xl md:text-2xl font-semibold text-white">
                  Proyectos donde utilicé {selectedTech}
                </h3>

                <button
                  type="button"
                  onClick={() => setSelectedTech(null)}
                  className="text-sm text-white/60 hover:text-white transition"
                >
                  Limpiar filtro
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={`${selectedTech}-${project.title}`}
                    {...project}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}