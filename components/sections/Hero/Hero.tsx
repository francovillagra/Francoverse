'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section
      className="relative w-full h-dvh grid place-items-center px-4 text-center
                 bg-transparent text-neutral-900 dark:text-white transition-colors"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Bienvenido a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Francoverse
          </span>
        </motion.h1>

        <motion.h2
          className="text-lg md:text-2xl mb-6 text-neutral-700 dark:text-neutral-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Desarrollador Fullstack | Explorando tecnologías modernas
        </motion.h2>

        <motion.p
          className="max-w-xl mx-auto mb-8 text-neutral-600 dark:text-neutral-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Construyo soluciones web combinando rendimiento, diseño y creatividad.
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {/* CTA principal → Projects */}
          <Link href="/section/projects" aria-label="Ver proyectos">
            <span className="px-6 py-2 font-semibold bg-black text-white hover:opacity-90 dark:bg-white dark:text-black transition inline-block rounded">
              Ver proyectos
            </span>
          </Link>

          {/* Descargar CV */}
          <a
            href="/FrancoVillagra-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Descargar CV"
          >
            <span className="px-6 py-2 font-semibold border border-black/20 text-neutral-900 hover:bg-black/[0.05] dark:border-white/30 dark:text-white dark:hover:bg-white/10 transition inline-block rounded">
              Descargar CV
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
