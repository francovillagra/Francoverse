"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

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
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition shadow-lg"
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          priority={false}
          onLoad={() => setLoading(false)}
          onError={() => {
            console.warn(`[ProjectCard] Falló cargar "${src}" → uso placeholder`);
            setSrc("/projects/placeholder.jpg");
            setLoading(false);
          }}
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm leading-relaxed text-white/75">{description}</p>
        </div>

        <div className="mt-auto flex items-center gap-3">
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