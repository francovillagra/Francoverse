"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const highlights = [
  {
    title: "Base técnica",
    description:
      "Formación en desarrollo full stack, arquitectura de aplicaciones y tecnologías modernas para construir soluciones web funcionales y escalables.",
  },
  {
    title: "Especialización",
    description:
      "Orientación hacia Seguridad Informática, con interés en comprender, proteger y fortalecer sistemas, procesos y entornos digitales.",
  },
  {
    title: "Proyección",
    description:
      "Evolución constante en ciberdefensa, inteligencia artificial aplicada y cloud, integrando desarrollo, análisis y seguridad en un mismo camino profesional.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="Sobre mí"
      className="relative w-full min-h-dvh flex items-center justify-center px-6 py-20"
    >
      <div className="absolute top-4 left-4 z-20">
        <Link
          href="/"
          className="rounded-xl px-3 py-2 border border-white/30 hover:border-white/60 transition"
          aria-label="Volver al inicio"
        >
          ← Volver
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl w-full text-center space-y-10"
      >
        <div className="space-y-5 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Sobre mí
          </h2>

          <p className="text-base md:text-lg text-white/80 leading-relaxed">
            Soy <span className="font-semibold text-white">Franco Villagra</span>,
            desarrollador fullstack con formación en sistemas, desarrollo de
            software y arquitectura de aplicaciones, con una proyección cada vez
            más orientada a la Seguridad Informática.
          </p>

          <p className="text-base md:text-lg text-white/80 leading-relaxed">
            Mi perfil combina una base sólida en{" "}
            <span className="font-semibold text-white">
              JavaScript, TypeScript, React, Next.js, Node.js, Python y bases de
              datos
            </span>
            , junto con un interés profundo por comprender cómo funcionan los
            sistemas, cómo se protegen y cómo pueden evolucionar de forma segura.
          </p>

          <p className="text-base md:text-lg text-white/80 leading-relaxed">
            Actualmente continúo mi camino en ciberdefensa e inteligencia
            artificial aplicada, explorando la intersección entre desarrollo,
            automatización, análisis y seguridad para construir soluciones
            modernas, confiables y con propósito.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {highlights.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-white/70 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="/section/projects"
          className="inline-block mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 font-semibold text-white hover:opacity-90 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Ver proyectos
        </motion.a>
      </motion.div>
    </section>
  );
}