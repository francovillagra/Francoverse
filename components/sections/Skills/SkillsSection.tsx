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

type TechCategory = "Frontend" | "Backend" | "Datos" | "Herramientas";

type TechVisual = {
  label: string;
  icon: IconType;
  colorClass: string;
  glowClass: string;
  category: TechCategory;
};

const techVisualMap: Record<string, TechVisual> = {
  "Next.js": {
    label: "Next.js",
    icon: SiNextdotjs,
    colorClass: "text-white",
    glowClass: "drop-shadow-[0_0_16px_rgba(255,255,255,0.28)]",
    category: "Frontend",
  },
  React: {
    label: "React",
    icon: SiReact,
    colorClass: "text-cyan-400",
    glowClass: "drop-shadow-[0_0_18px_rgba(34,211,238,0.45)]",
    category: "Frontend",
  },
  TypeScript: {
    label: "TypeScript",
    icon: SiTypescript,
    colorClass: "text-blue-400",
    glowClass: "drop-shadow-[0_0_18px_rgba(96,165,250,0.45)]",
    category: "Frontend",
  },
  JavaScript: {
    label: "JavaScript",
    icon: SiJavascript,
    colorClass: "text-yellow-300",
    glowClass: "drop-shadow-[0_0_18px_rgba(253,224,71,0.45)]",
    category: "Frontend",
  },
  "Tailwind CSS": {
    label: "Tailwind CSS",
    icon: SiTailwindcss,
    colorClass: "text-cyan-300",
    glowClass: "drop-shadow-[0_0_18px_rgba(103,232,249,0.45)]",
    category: "Frontend",
  },
  "Framer Motion": {
    label: "Framer Motion",
    icon: SiFramer,
    colorClass: "text-pink-300",
    glowClass: "drop-shadow-[0_0_18px_rgba(249,168,212,0.45)]",
    category: "Frontend",
  },
  "Node.js": {
    label: "Node.js",
    icon: SiNodedotjs,
    colorClass: "text-green-400",
    glowClass: "drop-shadow-[0_0_18px_rgba(74,222,128,0.45)]",
    category: "Backend",
  },
  Python: {
    label: "Python",
    icon: SiPython,
    colorClass: "text-yellow-300",
    glowClass: "drop-shadow-[0_0_18px_rgba(253,224,71,0.38)]",
    category: "Backend",
  },
  FastAPI: {
    label: "FastAPI",
    icon: SiFastapi,
    colorClass: "text-emerald-400",
    glowClass: "drop-shadow-[0_0_18px_rgba(52,211,153,0.45)]",
    category: "Backend",
  },
  MongoDB: {
    label: "MongoDB",
    icon: SiMongodb,
    colorClass: "text-green-500",
    glowClass: "drop-shadow-[0_0_18px_rgba(34,197,94,0.45)]",
    category: "Backend",
  },
  MySQL: {
    label: "MySQL",
    icon: SiMysql,
    colorClass: "text-sky-400",
    glowClass: "drop-shadow-[0_0_18px_rgba(56,189,248,0.45)]",
    category: "Backend",
  },
  REST: {
    label: "REST",
    icon: TbApi,
    colorClass: "text-cyan-300",
    glowClass: "drop-shadow-[0_0_18px_rgba(103,232,249,0.45)]",
    category: "Backend",
  },
  Pandas: {
    label: "Pandas",
    icon: SiPandas,
    colorClass: "text-violet-300",
    glowClass: "drop-shadow-[0_0_18px_rgba(196,181,253,0.45)]",
    category: "Datos",
  },
  Jupyter: {
    label: "Jupyter",
    icon: SiJupyter,
    colorClass: "text-orange-400",
    glowClass: "drop-shadow-[0_0_18px_rgba(251,146,60,0.45)]",
    category: "Datos",
  },
  Git: {
    label: "Git",
    icon: SiGit,
    colorClass: "text-orange-500",
    glowClass: "drop-shadow-[0_0_18px_rgba(249,115,22,0.45)]",
    category: "Herramientas",
  },
  GitHub: {
    label: "GitHub",
    icon: SiGithub,
    colorClass: "text-white",
    glowClass: "drop-shadow-[0_0_16px_rgba(255,255,255,0.28)]",
    category: "Herramientas",
  },
  JSON: {
    label: "JSON",
    icon: SiJson,
    colorClass: "text-amber-300",
    glowClass: "drop-shadow-[0_0_18px_rgba(252,211,77,0.45)]",
    category: "Herramientas",
  },
};

const categoryOrder: TechCategory[] = [
  "Frontend",
  "Backend",
  "Datos",
  "Herramientas",
];

function getTechVisual(tech: string): TechVisual {
  return (
    techVisualMap[tech] || {
      label: tech,
      icon: TbApi,
      colorClass: "text-cyan-300",
      glowClass: "drop-shadow-[0_0_18px_rgba(103,232,249,0.45)]",
      category: "Herramientas",
    }
  );
}

export default function SkillsSection({ projects }: SkillsSectionProps) {
  const technologies = useMemo(() => {
    return [...new Set(projects.flatMap((project) => project.techStack))].sort();
  }, [projects]);

  const groupedTechnologies = useMemo(() => {
    const groups: Record<TechCategory, string[]> = {
      Frontend: [],
      Backend: [],
      Datos: [],
      Herramientas: [],
    };

    technologies.forEach((tech) => {
      const visual = getTechVisual(tech);
      groups[visual.category].push(tech);
    });

    return groups;
  }, [technologies]);

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

        <div className="relative mt-14">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute right-1/4 top-1/2 h-48 w-48 rounded-full bg-violet-400/10 blur-3xl" />
            <div className="absolute left-1/4 bottom-0 h-44 w-44 rounded-full bg-blue-400/10 blur-3xl" />
          </div>

          <div className="space-y-12">
            {categoryOrder.map((category) => {
              const techs = groupedTechnologies[category];
              if (!techs.length) return null;

              return (
                <div key={category} className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-10 bg-white/20" />
                    <h3 className="text-sm md:text-base font-semibold uppercase tracking-[0.25em] text-white/60">
                      {category}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-10 gap-x-6">
                    {techs.map((tech) => {
                      const isActive = selectedTech === tech;
                      const { icon: Icon, label, colorClass, glowClass } =
                        getTechVisual(tech);

                      return (
                        <button
                          key={tech}
                          type="button"
                          onClick={() => setSelectedTech(isActive ? null : tech)}
                          aria-pressed={isActive}
                          aria-label={`Filtrar proyectos por ${label}`}
                          className="group flex flex-col items-center justify-center gap-3"
                        >
                          <Icon
                            className={[
                              "text-5xl md:text-6xl transition-all duration-200",
                              colorClass,
                              isActive
                                ? `scale-110 ${glowClass}`
                                : `opacity-90 group-hover:scale-110 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:${glowClass}`,
                            ].join(" ")}
                          />
                          <span
                            className={`text-xs md:text-sm font-medium text-center transition ${
                              isActive
                                ? "text-white"
                                : "text-white/55 group-hover:text-white/85"
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
              );
            })}
          </div>
        </div>

        <div className="mt-12">
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