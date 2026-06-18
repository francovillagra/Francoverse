"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useState } from "react";
import type { Project } from "@/data/projects";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

type ProjectCardProps = Project & {
  highlightTechs?: string[];
  highlightColor?: string;
};

export default function ProjectCard({ title, description, image, technologies, liveUrl, githubUrl, highlightTechs, highlightColor }: ProjectCardProps) {
  const [src, setSrc] = useState(image ?? "/projects/placeholder.jpg");

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.035] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_0_22px_rgba(255,255,255,0.04)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 rounded-full bg-cyan-400/8 blur-3xl" />
      </div>

      <div className="relative aspect-[16/8] w-full overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          priority={false}
          onError={() => setSrc("/projects/placeholder.jpg")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
      </div>

      <div className="relative p-4 md:p-5">
        <div className="space-y-2">
          <h3 className="text-base md:text-lg font-semibold tracking-tight text-white">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-white/70 line-clamp-3">
            {description}
          </p>
        </div>

        {technologies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {technologies.map((tech) => {
              const lit = highlightTechs?.includes(tech) && !!highlightColor;
              return (
                <span
                  key={tech}
                  style={lit ? { borderColor: `rgba(${highlightColor},0.5)`, color: `rgb(${highlightColor})` } : undefined}
                  className="text-xs font-mono text-white/70 border border-white/10 px-2 py-0.5 rounded transition-colors duration-200"
                >
                  {tech}
                </span>
              );
            })}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs md:text-sm font-semibold text-black transition hover:opacity-90"
            >
              <ExternalLink size={14} />
              Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-xs md:text-sm font-medium text-white/90 transition hover:border-white/45 hover:text-white"
            >
              <Github size={14} />
              Repo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
