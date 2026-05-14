"use client";

import React from "react";
import { motion } from "framer-motion";
import { slideInFromTop, slideInFromLeft, slideInFromRight } from "@/utils/motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";

const HeroSection = () => {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      className="relative flex flex-col md:flex-row items-center justify-center
                 px-6 md:px-20 pt-20 w-full z-[20] h-dvh
                 bg-transparent text-neutral-900 dark:text-white transition-colors"
    >
      {/* Texto izquierda */}
      <div className="w-full flex flex-col gap-5 justify-center text-start">
        {/* Bienvenida */}
        <motion.div variants={slideInFromTop(0.5)}>
          <div
            className="py-2 px-3 flex items-center rounded-xl
                       border border-black/15 dark:border-white/20
                       bg-white/40 dark:bg-white/5 backdrop-blur
                       Welcome-box"
          >
            <Sparkles className="mr-2 h-4 w-4 text-violet-500 dark:text-[#b49bff]" />
            <p className="text-xs font-medium uppercase tracking-tight font-sans text-neutral-800 dark:text-white/90">
              Portfolio Desarrollador Fullstack
            </p>
          </div>
        </motion.div>

        {/* Título principal */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-2 mt-6 max-w-[600px] leading-tight"
        >
          <Title level="h1">
            Ofreciendo{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              la mejor
            </span>
          </Title>
          <Title level="h1">experiencia de proyecto</Title>
        </motion.div>

        {/* Descripción */}
        <motion.div variants={slideInFromLeft(0.8)}>
          <p className="my-5 max-w-[600px] text-lg text-white/80 leading-relaxed text-neutral-600 dark:text-neutral-300">
            Bienvenido a mi laboratorio digital, donde experimento con ideas, construyo soluciones
            y aprendo cada día. Me interesa resolver problemas y transformar ideas en soluciones
            funcionales. Te invito a conocer mis proyectos.
          </p>
        </motion.div>

        {/* Botón */}
        <motion.div variants={slideInFromLeft(1)}>
          <Button
            variant="primary"
            className="max-w-[200px] bg-black text-white hover:opacity-90
                       dark:bg-white dark:text-black transition"
          >
            Saber más!
          </Button>
        </motion.div>
      </div>

      {/* Imagen derecha */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="relative w-full md:w-1/2 h-auto flex justify-center items-center mt-10 md:mt-0"
      >
        <div className="relative w-[300px] md:w-[600px] lg:w-[800px] h-auto transform-image-shift">
          <Image
            src="/mainIconsdark.svg"
            alt="Iconos de herramientas de desarrollo"
            height={900}
            width={600}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
  