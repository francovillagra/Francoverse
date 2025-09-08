"use client";

import { motion } from "framer-motion";
import ProjectCard, { Project } from "./ProjectCard";

type ProjectsSectionProps = {
  isStandalone?: boolean;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, ease: "easeOut" },
  },
};

const projects: Project[] = [
  {
    title: "Francoverse (Portfolio)",
    description:
      "Mi portfolio web hecho con Next.js, Tailwind y animaciones con Framer Motion. Fondo de partículas interactivas con react-tsparticles.",
    imageUrl: "/projects/portfolio.png",
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    demoUrl: "https://tu-demo-o-vercel.app", // reemplazar si ya tenés deploy
    repoUrl: "https://github.com/francovillagra/Francoverse",
  },
  {
    title: "App de Tareas",
    description:
      "Aplicación para gestionar tareas con autenticación y backend en Node.js.",
    imageUrl: "/projects/tasks.png",
    techStack: ["Node.js", "Express", "MongoDB", "React"],
    demoUrl: "https://tu-demo-tareas.app",
    repoUrl: "https://github.com/francovillagra/app-tareas",
  },
  // Agregá acá otros proyectos reales (Telecom X, SomosEquipo API, etc.)
];

export default function ProjectsSection({ isStandalone = false }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className={`w-full flex flex-col items-center justify-center px-6 py-16 gap-10 ${
        isStandalone ? "min-h-screen bg-[#030014]" : ""
      }`}
      aria-label="Sección de Proyectos"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Proyectos
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { ProjectsSection };
