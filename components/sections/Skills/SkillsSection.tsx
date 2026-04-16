"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/components/sections/Projects/ProjectCard";
import ProjectCard from "@/components/sections/Projects/ProjectCard";

type SkillsSectionProps = {
  projects: Project[];
};

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

        <div className="mt-10 flex flex-wrap gap-3">
          {technologies.map((tech) => {
            const isActive = selectedTech === tech;

            return (
              <button
                key={tech}
                type="button"
                onClick={() => setSelectedTech(isActive ? null : tech)}
                className={`rounded-full px-4 py-2 text-sm border transition ${
                  isActive
                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-200"
                    : "border-white/15 bg-white/5 text-white/80 hover:border-white/40"
                }`}
              >
                {tech}
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
                  <ProjectCard key={`${selectedTech}-${project.title}`} {...project} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}