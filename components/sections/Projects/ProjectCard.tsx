"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ProjectCard({
  title,
  description,
  imageUrl,
  techStack,
  demoUrl,
  repoUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      className="group bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition shadow-lg"
    >
      {/* Imagen */}

    <div className="relative w-full aspect-[16/9] overflow-hidden">
    <Image
      src={imageUrl}
      alt={title}
      fill
      className="object-cover"
      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
      priority={false}
        />
      </div>


      {/* Contenido */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-white/80">{description}</p>

        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-full border border-white/15 bg-white/5"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-white text-black text-sm font-semibold hover:opacity-90 transition"
            >
              <ExternalLink size={16} />
              Demo
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 border border-white/30 hover:border-white/60 text-sm transition"
            >
              <Github size={16} />
              Repo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
