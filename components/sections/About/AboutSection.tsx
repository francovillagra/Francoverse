"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full h-dvh flex items-center justify-center px-6"
      aria-label="Sobre mí"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl text-center space-y-6"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          Sobre mí
        </h2>
        <p className="text-base md:text-lg text-white/80 leading-relaxed">
          Soy <span className="font-semibold text-white">Franco Villagra</span>, 
          Auditor Financiero y de Cumplimiento en la Auditoría General de la Nación, 
          y Desarrollador Fullstack apasionado por crear soluciones digitales 
          que unan la precisión de los datos con la experiencia de usuario.
        </p>
        <p className="text-base md:text-lg text-white/80 leading-relaxed">
          Mi recorrido profesional combina la <span className="font-semibold">auditoría y el análisis de datos</span> 
          con el desarrollo web moderno en <span className="font-semibold">React, Next.js y Python</span>. 
          Esta dualidad me permite abordar proyectos tanto desde la perspectiva 
          técnica como desde la visión estratégica.
        </p>
        <p className="text-base md:text-lg text-white/80 leading-relaxed">
          Me motiva <span className="font-semibold">transformar la complejidad en claridad</span>, 
          construyendo productos escalables y visualmente atractivos, 
          siempre enfocados en aportar valor real.
        </p>

        <motion.a
          href="/section/projects"
          className="inline-block mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 font-semibold text-white hover:opacity-90 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Ver proyectos
        </motion.a>
      </motion.div>
    </section>
  );
}
