"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

export type Project = {
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function ProjectCard({
  title,
  description,
  imageUrl,
  demoUrl,
  repoUrl,
}: Project) {
  const [src, setSrc] = useState(imageUrl);
  const [, setLoading] = useState(true);

  useEffect(() => {
    setSrc(imageUrl);
    setLoading(true);
  }, [imageUrl]);

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.035] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.055] hover:shadow-[0_0_26px_rgba(255,255,255,0.05)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 rounded-full bg-cyan-400/8 blur-3xl" />
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          priority={false}
          onLoad={() => setLoading(false)}
          onError={() => {
            console.warn(`[ProjectCard] Falló cargar "${src}" → uso placeholder`);
            setSrc("/projects/placeholder.jpg");
            setLoading(false);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
      </div>

      <div className="relative p-5 md:p-6">
        <div className="space-y-2">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-white">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-white/72 line-clamp-4">
            {description}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-sm font-semibold text-black transition hover:opacity-90"
            >
              <ExternalLink size={15} />
              Demo
            </a>
          )}

          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3.5 py-2 text-sm font-medium text-white/90 transition hover:border-white/45 hover:text-white"
            >
              <Github size={15} />
              Repo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}