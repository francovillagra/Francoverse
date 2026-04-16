"use client";

import { useMemo, useState } from "react";
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
  activeClass: string;
};

const techVisualMap: Record<string, TechVisual> = {
  "Next.js": {
    label: "Next.js",
    icon: SiNextdotjs,
    colorClass: "text-white",
    activeClass: "border-white/40 bg-white/10 shadow-[0_0_28px_rgba(255,255,255,0.14)]",
  },
  React: {
    label: "React",
    icon: SiReact,
    colorClass: "text-cyan-400",
    activeClass: "border-cyan-400/60 bg-cyan-400/10 shadow-[0_0_28px_rgba(34,211,238,0.22)]",
  },
  TypeScript: {
    label: "TypeScript",
    icon: SiTypescript,
    colorClass: "text-blue-400",
    activeClass: "border-blue-400/60 bg-blue-400/10 shadow-[0_0_28px_rgba(96,165,250,0.22)]",
  },
  JavaScript: {
    label: "JavaScript",
    icon: SiJavascript,
    colorClass: "text-yellow-300",
    activeClass: "border-yellow-300/60 bg-yellow-300/10 shadow-[0_0_28px_rgba(253,224,71,0.22)]",
  },
  "Tailwind CSS": {
    label: "Tailwind CSS",
    icon: SiTailwindcss,
    colorClass: "text-cyan-300",
    activeClass: "border-cyan-300/60 bg-cyan-300/10 shadow-[0_0_28px_rgba(103,232,249,0.22)]",
  },
  "Node.js": {
    label: "Node.js",
    icon: SiNodedotjs,
    colorClass: "text-green-400",
    activeClass: "border-green-400/60 bg-green-400/10 shadow-[0_0_28px_rgba(74,222,128,0.22)]",
  },
  Python: {
    label: "Python",
    icon: SiPython,
    colorClass: "text-yellow-300",
    activeClass: "border-yellow-300/60 bg-yellow-300/10 shadow-[0_0_28px_rgba(253,224,71,0.20)]",
  },
  FastAPI: {
    label: "FastAPI",
    icon: SiFastapi,
    colorClass: "text-emerald-400",
    activeClass: "border-emerald-400/60 bg-emerald-400/10 shadow-[0_0_28px_rgba(52,211,153,0.22)]",
  },
  MongoDB: {
    label: "MongoDB",
    icon: SiMongodb,
    colorClass: "text-green-500",
    activeClass: "border-green-500/60 bg-green-500/10 shadow-[0_0_28px_rgba(34,197,94,0.22)]",
  },
  MySQL: {
    label: "MySQL",
    icon: SiMysql,
    colorClass: "text-sky-400",
    activeClass: "border-sky-400/60 bg-sky-400/10 shadow-[0_0_28px_rgba(56,189,248,0.22)]",
  },
  Pandas: {
    label: "Pandas",
    icon: SiPandas,
    colorClass: "text-violet-300",
    activeClass: "border-violet-300/60 bg-violet-300/10 shadow-[0_0_28px_rgba(196,181,253,0.22)]",
  },
  Jupyter: {
    label: "Jupyter",
    icon: SiJupyter,
    colorClass: "text-orange-400",
    activeClass: "border-orange-400/60 bg-orange-400/10 shadow-[0_0_28px_rgba(251,146,60,0.22)]",
  },
  "Framer Motion": {
    label: "Framer Motion",
    icon: SiFramer,
    colorClass: "text-pink-300",
    activeClass: "border-pink-300/60 bg-pink-300/10 shadow-[0_0_28px_rgba(249,168,212,0.22)]",
  },
  Git: {
    label: "Git",
    icon: SiGit,
    colorClass: "text-orange-500",
    activeClass: "border-orange-500/60 bg-orange-500/10 shadow-[0_0_28px_rgba(249,115,22,0.22)]",
  },
  GitHub: {
    label: "GitHub",
    icon: SiGithub,
    colorClass: "text-white",
    activeClass: "border-white/40 bg-white/10 shadow-[0_0_28px_rgba(255,255,255,0.14)]",
  },
  JSON: {
    label: "JSON",
    icon: SiJson,
    colorClass: "text-amber-300",
    activeClass: "border-amber-300/60 bg-amber-300/10 shadow-[0_0_28px_rgba(252,211,77,0.22)]",
  },
  REST: {
    label: "REST",
    icon: TbApi,
    colorClass: "text-cyan-300",
    activeClass: "border-cyan-300/60 bg-cyan-300/10 shadow-[0_0_28px_rgba(103,232,249,0.22)]",
  },
};

function getTechVisual(tech: string): TechVisual {
  return (
    techVisualMap[tech] || {
      label: tech,
      icon: TbApi,
      colorClass: "text-cyan-300",
      activeClass:
        "border-cyan-300/60 bg-cyan-300/10 shadow-[0_0_28px_rgba(103,232,249,0.22)]",
    }
  );
}

export default function SkillsSection({ projects }: SkillsSectionProps) {
  const technologies = useMemo(() => {
    return [...new Set(projects.flatMap((project) => project.techStack))].sort();
  }, [projects]);

  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (!selectedTech) return [];
    return projects.filter((project) => project.techStack.includes(selectedTech));
  }, [projects, selectedTech]);

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

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {technologies.map((tech) => {
            const isActive = selectedTech === tech;
            const { icon: Icon, label, colorClass, activeClass } = getTechVisual(tech);

            return (
              <button
                key={tech}
                type="button"
                onClick={() => setSelectedTech(isActive ? null : tech)}
                className={`group rounded-2xl border p-4 backdrop-blur-sm transition-all duration-200 flex flex-col items-center justify-center gap-3 min-h-[120px] ${
                  isActive
                    ? `${activeClass} text-white scale-[1.02]`
                    : "border-white/10 bg-white/5 text-white/80 hover:border-white/25 hover:bg-white/8 hover:-translate-y-1"
                }`}
                aria-pressed={isActive}
                aria-label={`Filtrar proyectos por ${label}`}
              >
                <Icon
                  className={`text-3xl md:text-4xl transition-transform duration-200 group-hover:scale-110 ${colorClass}`}
                />
                <span className="text-xs md:text-sm font-medium text-center">
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10">
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