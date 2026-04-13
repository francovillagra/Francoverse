"use client";

import { motion } from "framer-motion";
import ProjectCard, { Project } from "./ProjectCard";

type ProjectsSectionProps = {
  projects: Project[];
  isStandalone?: boolean;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, ease: "easeOut" },
  },
};

export default function ProjectsSection({
  projects,
  isStandalone = false,
}: ProjectsSectionProps) {
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

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}