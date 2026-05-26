'use client';

import projects from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  return (
    <div className="min-h-dvh flex flex-col justify-center px-6 py-20 max-w-6xl mx-auto">

      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl md:text-4xl font-light tracking-wide text-fg/95">
          Proyectos
        </h2>
        <button className="text-xs font-mono tracking-wider uppercase text-fg/50 hover:text-fg/80 transition-colors border border-line px-4 py-2 rounded">
          Ver todos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>

    </div>
  );
}
