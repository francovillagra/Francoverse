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
      "Portfolio personal hecho con Next.js, Tailwind y animaciones con Framer Motion. Incluye partículas interactivas con react-tsparticles.",
    imageUrl: "/projects/openb.jpg",
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    demoUrl: "https://francoverse.vercel.app", // reemplazá con tu deploy real
    repoUrl: "https://github.com/francovillagra/Francoverse",
  },
  {
    title: "Challenge Telecom X",
    description:
      "Análisis de churn de clientes usando Python, Pandas y Matplotlib. Incluye limpieza de datos, análisis exploratorio y visualización para entender la evasión.",
    imageUrl: "/projects/telecom.jpg",
    techStack: ["Python", "Pandas", "Matplotlib", "Jupyter"],
    demoUrl: "", // no aplica demo online
    repoUrl: "https://github.com/francovillagra/ChallengeTelecomX",
  },
  {
    title: "SomosEquipo API",
    description:
      "API colaborativa de gestión de tareas construida con FastAPI. Permite CRUD de usuarios y tareas, almacenando datos en JSON con endpoints documentados.",
    imageUrl: "/projects/trabajoenequipo.jpg",
    techStack: ["FastAPI", "Python", "REST", "JSON"],
    demoUrl: "", // opcional si la subís a Azure
    repoUrl: "https://github.com/francovillagra/SomosEquipo",
  },
];


export default function ProjectsSection({ isStandalone = false }: ProjectsSectionProps) {
  return (
   // ProjectsSection.tsx
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

export { ProjectsSection };
