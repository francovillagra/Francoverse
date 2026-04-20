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
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          priority={false}
          onLoad={() => setLoading(false)}
          onError={() => {
            console.warn(`[ProjectCard] Falló cargar "${src}" → uso placeholder`);
            setSrc("/projects/placeholder.jpg");
            setLoading(false);
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="relative p-6">
        <div className="space-y-3">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
            {title}
          </h3>

          <p className="text-sm md:text-base leading-relaxed text-white/72">
            {description}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:opacity-90"
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
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-medium text-white/90 transition hover:border-white/45 hover:text-white"
            >
              <Github size={16} />
              Repo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}