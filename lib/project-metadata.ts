export type ProjectMetadata = {
  displayTitle?: string;
  imageUrl?: string;
  techStack?: string[];
  featured?: boolean;
};

export const projectMetadata: Record<string, ProjectMetadata> = {
  Francoverse: {
    displayTitle: "Francoverse",
    imageUrl: "/projects/openb.jpg",
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    featured: true,
  },
  ChallengeTelecomX: {
    displayTitle: "Challenge Telecom X",
    imageUrl: "/projects/telecom.jpg",
    techStack: ["Python", "Pandas", "Matplotlib", "Jupyter"],
    featured: true,
  },
  SomosEquipo: {
    displayTitle: "SomosEquipo API",
    imageUrl: "/projects/trabajoenequipo.jpg",
    techStack: ["FastAPI", "Python", "REST", "JSON"],
    featured: true,
  },
};