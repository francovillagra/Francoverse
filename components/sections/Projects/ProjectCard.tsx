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
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr]">
        <div className="relative min-h-[240px] md:min-h-full overflow-hidden">
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(min-width: 768px) 50vw, 100vw"
            priority={false}
            onLoad={() => setLoading(false)}
            onError={() => {
              console.warn(`[ProjectCard] Falló cargar "${src}" → uso placeholder`);
              setSrc("/projects/placeholder.jpg");
              setLoading(false);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10 md:bg-gradient-to-r md:from-black/20 md:via-transparent md:to-black/30" />
        </div>

        <div className="relative flex flex-col justify-between p-6 md:p-7">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                {title}
              </h3>

              <p className="text-sm md:text-base leading-relaxed text-white/72">
                {description}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
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
      </div>
    </motion.article>
  );
}