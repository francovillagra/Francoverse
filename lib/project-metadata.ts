export type ProjectMetadata = {
  displayTitle?: string;
  imageUrl?: string;
  techStack?: string[];
  featured?: boolean;
  description?: string;
};

export const projectMetadata: Record<string, ProjectMetadata> = {
  Francoverse: {
    displayTitle: "Francoverse",
    imageUrl: "/projects/openb.jpg",
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    featured: true,
    description:
      "Portfolio personal diseñado para presentar mis proyectos, tecnologías y evolución profesional de una forma visual, moderna e interactiva.",
  },
  ChallengeTelecomX: {
    displayTitle: "Challenge Telecom X",
    imageUrl: "/projects/telecom.jpg",
    techStack: ["Python", "Pandas", "Matplotlib", "Jupyter"],
    featured: true,
    description:
      "Proyecto de análisis de datos orientado a estudiar la evasión de clientes, detectar patrones y transformar datos en información útil para la toma de decisiones.",
  },
  SomosEquipo: {
    displayTitle: "SomosEquipo API",
    imageUrl: "/projects/trabajoenequipo.jpg",
    techStack: ["FastAPI", "Python", "REST", "JSON"],
    featured: true,
    description:
      "API pensada para la gestión colaborativa de tareas y equipos, con foco en organización, flujos de trabajo y una estructura backend clara y escalable.",
  },
};