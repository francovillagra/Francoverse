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
};

const techVisualMap: Record<string, TechVisual> = {
  "Next.js": { label: "Next.js", icon: SiNextdotjs },
  React: { label: "React", icon: SiReact },
  TypeScript: { label: "TypeScript", icon: SiTypescript },
  JavaScript: { label: "JavaScript", icon: SiJavascript },
  "Tailwind CSS": { label: "Tailwind CSS", icon: SiTailwindcss },
  "Node.js": { label: "Node.js", icon: SiNodedotjs },
  Python: { label: "Python", icon: SiPython },
  FastAPI: { label: "FastAPI", icon: SiFastapi },
  MongoDB: { label: "MongoDB", icon: SiMongodb },
  MySQL: { label: "MySQL", icon: SiMysql },
  Pandas: { label: "Pandas", icon: SiPandas },
  Jupyter: { label: "Jupyter", icon: SiJupyter },
  "Framer Motion": { label: "Framer Motion", icon: SiFramer },
  Git: { label: "Git", icon: SiGit },
  GitHub: { label: "GitHub", icon: SiGithub },
  JSON: { label: "JSON", icon: SiJson },
  REST: { label: "REST", icon: TbApi },
};

function getTechVisual(tech: string): TechVisual {
  return techVisualMap[tech] || { label: tech, icon: TbApi };
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
            Explorá las tecnologías con las que trabajé y descubrí los proyectos
            donde las apliqué.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {technologies.map((tech) => {
            const isActive = selectedTech === tech;
            const { icon: Icon, label } = getTechVisual(tech);

            return (
              <button
                key={tech}
                type="button"
                onClick={() => setSelectedTech(isActive ? null : tech)}
                className={`group rounded-2xl border p-4 backdrop-blur-sm transition flex flex-col items-center justify-center gap-3 min-h-[120px] ${
                  isActive
                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.18)]"
                    : "border-white/10 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/8"
                }`}
                aria-pressed={isActive}
                aria-label={`Filtrar proyectos por ${label}`}
              >
                <Icon className="text-3xl md:text-4xl transition-transform duration-200 group-hover:scale-110" />
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
              Seleccioná una tecnología para ver los proyectos relacionados.
            </p>
          ) : filteredProjects.length === 0 ? (
            <p className="text-white/50">
              No hay proyectos asociados a {selectedTech}.
            </p>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between gap-4">
                <h3 className="text-xl md:text-2xl font-semibold text-white">
                  Proyectos con {selectedTech}
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