"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface NavigationButtonProps {
  href: string;
  label: string;
  delay?: number;
  icon?: React.ReactNode; // opcional, por si después querés añadir íconos
}

/**
 * Botón de navegación animado — Francoverse
 * -----------------------------------------
 * Uso: Ideal para secciones principales (About, Projects, Skills, Contact, etc.)
 * Se integra con el resto de los componentes de Navigation y mantiene coherencia visual.
 */
export default function NavigationButton({ href, label, delay = 0, icon }: NavigationButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ delay, duration: 0.35, ease: "easeOut" }}
      className="w-full flex justify-center"
    >
      <Link
        href={href}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/90 text-sm font-medium transition-colors backdrop-blur-md"
      >
        {icon && <span className="text-lg">{icon}</span>}
        {label}
      </Link>
    </motion.div>
  );
}
