"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProjectCard, { Project } from "./ProjectCard";

type ProjectsSectionProps = {
  projects: Project[];
  isStandalone?: boolean;
  limit?: number;
  showViewAll?: boolean;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, ease: "easeOut" as const },
  },
};

export default function ProjectsSection({
  projects,
  isStandalone = false,
  limit,
  showViewAll = false,
}: ProjectsSectionProps) {
  const visibleProjects = typeof limit === "number" ? projects.slice(0, limit) : projects;

  return (
    <section
      id="projects"
      aria-label="Sección de Proyectos"
      aria-labelledby="projects-title"
      className={`w-full flex flex-col items-center justify-center px-6 py-16 gap-10 ${
        isStandalone ? "h-dvh" : ""
      }`}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <motion.h2
            id="projects-title"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            Proyectos
          </motion.h2>

          {showViewAll && (
            <Link
              href="/sections/projects"
              className="hidden md:inline-flex rounded-lg border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-white/40 hover:text-white"
            >
              Ver todos
            </Link>
          )}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
        >
          {visibleProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </motion.div>

        {showViewAll && (
          <div className="mt-8 md:hidden">
            <Link
              href="/sections/projects"
              className="inline-flex rounded-lg border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-white/40 hover:text-white"
            >
              Ver todos
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export { ProjectsSection };