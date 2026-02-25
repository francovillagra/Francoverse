"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaHome, FaUser, FaCode, FaTools, FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

type NavItem = { href: string; label: string; icon: React.ReactNode };

const LINKS: NavItem[] = [
  { href: "/", label: "Inicio", icon: <FaHome /> },
  { href: "/section/about", label: "Sobre mí", icon: <FaUser /> },
  { href: "/section/projects", label: "Proyectos", icon: <FaCode /> },
  { href: "/section/skills", label: "Habilidades", icon: <FaTools /> },
];

export default function TopNav() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  // Botón en reposo / expandido (mismo concepto que ya tenías)
  const baseW = 48;
  const expandedW = 172;

  // ======= DESKTOP (md+) — HEADER SUPERIOR =======
  const DesktopHeader = (
    <header
      className="
        hidden md:block fixed top-4 left-1/2 -translate-x-1/2 z-30
        bg-white/60 dark:bg-white/5 backdrop-blur
        border border-black/10 dark:border-white/10
        rounded-2xl px-2 py-2
        shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]
      "
      aria-label="Barra de navegación superior"
    >
      <div className="flex items-center gap-2">
        <nav className="flex items-center gap-2">
          {LINKS.map(({ href, label, icon }) => {
            const active = isActive(href);
            const isHovered = hovered === href;
            const iconColorClass = active
              ? "text-white dark:text-black"
              : "text-neutral-900 dark:text-white";

            return (
              // Contenedor ancho fijo para evitar reflow; el botón se expande hacia la derecha
              <div key={href} className="relative h-12" style={{ width: expandedW }}>
                <Link href={href} prefetch={false} aria-current={active ? "page" : undefined} aria-label={label}>
                  <motion.button
                    type="button"
                    onMouseEnter={() => setHovered(href)}
                    onMouseLeave={() => setHovered((prev) => (prev === href ? null : prev))}
                    className={`
                      absolute left-0 top-0 h-12
                      flex items-center justify-start gap-2 pl-3 pr-3 rounded-full
                      border border-black/10 dark:border-white/10
                      ${active ? "bg-black/90 dark:bg-white" : "bg-white dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20"}
                      transform-gpu
                    `}
                    style={{ width: baseW, willChange: "transform,width" }}
                    animate={{
                      width: isHovered ? expandedW : baseW,
                      borderRadius: isHovered ? 16 : 9999,
                      scale: isHovered ? 1.02 : active ? 1.01 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.7 }}
                  >
                    <span className={`text-base ${iconColorClass}`}>{icon}</span>

                    <AnimatePresence initial={false}>
                      {isHovered && (
                        <motion.span
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -6 }}
                          transition={{ duration: 0.16, ease: "easeOut" }}
                          className="text-sm font-medium select-none pointer-events-none text-neutral-900 dark:text-white"
                        >
                          {label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="w-px h-8 mx-1 bg-black/10 dark:bg-white/10" />

        {/* Theme: mismo patrón de expansión, pero horizontal */}
        <div className="relative h-12" style={{ width: 140 }}>
          <motion.div
            onMouseEnter={() => setHovered("theme")}
            onMouseLeave={() => setHovered((prev) => (prev === "theme" ? null : prev))}
            className="
              absolute left-0 top-0 h-12
              flex items-center justify-start gap-2 pl-3 pr-3 rounded-full
              bg-white dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 transition
              border border-black/10 dark:border-white/10
              transform-gpu
            "
            style={{ width: baseW, willChange: "transform,width" }}
            animate={{
              width: hovered === "theme" ? 140 : baseW,
              borderRadius: hovered === "theme" ? 16 : 9999,
              scale: hovered === "theme" ? 1.02 : 1,
            }}
            transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.7 }}
            aria-label="Cambiar tema"
          >
            <AnimatePresence initial={false}>
              {hovered === "theme" && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="text-sm font-medium select-none pointer-events-none text-neutral-900 dark:text-white"
                >
                  Tema
                </motion.span>
              )}
            </AnimatePresence>

            {/* El ThemeToggle actual tiene estilos “blancos”; lo ajustamos abajo */}
            <ThemeToggle />
          </motion.div>
        </div>
      </div>
    </header>
  );

  // ======= MOBILE — HEADER + DRAWER DESDE ARRIBA =======
  const MobileHeader = (
    <header
      className="
        md:hidden fixed top-0 left-0 right-0 z-30
        bg-white/70 dark:bg-black/30 backdrop-blur
        border-b border-black/10 dark:border-white/10
        px-4 py-3
      "
      aria-label="Barra superior móvil"
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-neutral-900 dark:text-white">Francoverse</span>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpenMobile(true)}
            className="
              grid place-items-center size-10 rounded-xl
              bg-white text-neutral-900 dark:bg-white/10 dark:text-white
              border border-black/10 dark:border-white/10
              shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]
              active:scale-95 transition
            "
            aria-label="Abrir navegación"
          >
            <FaBars />
          </button>
        </div>
      </div>
    </header>
  );

  const MobileDrawer = (
    <AnimatePresence>
      {openMobile && (
        <>
          <motion.div
            className="md:hidden fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenMobile(false)}
          />
          <motion.aside
            className="
              md:hidden fixed left-0 right-0 top-0 z-50
              bg-white/95 text-neutral-900 dark:bg-gray-900/95 dark:text-white
              backdrop-blur border-b border-black/10 dark:border-white/10
              p-4
            "
            initial={{ y: -280, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -280, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            aria-label="Menú de navegación"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold">Navegación</span>
              <button
                className="grid place-items-center size-9 rounded-xl
                           bg-white dark:bg-white/10 border border-black/10 dark:border-white/10"
                onClick={() => setOpenMobile(false)}
                aria-label="Cerrar navegación"
              >
                <FaTimes />
              </button>
            </div>

            <nav className="grid grid-cols-2 gap-2">
              {LINKS.map(({ href, label, icon }) => {
                const active = isActive(href);
                const iconColorClass = active
                  ? "text-white dark:text-black"
                  : "text-neutral-900 dark:text-white";

                return (
                  <Link
                    key={href}
                    href={href}
                    prefetch={false}
                    onClick={() => setOpenMobile(false)}
                    className="
                      flex items-center gap-3 rounded-xl px-3 py-3
                      border border-black/10 dark:border-white/10
                      bg-white/70 dark:bg-white/5
                      hover:bg-black/[0.05] dark:hover:bg-white/10 transition
                    "
                  >
                    <motion.div
                      className={`
                        grid place-items-center rounded-full
                        ${active ? "bg-black/90 dark:bg-white" : "bg-white dark:bg-white/10"}
                        border border-black/10 dark:border-white/10
                      `}
                      style={{ width: 40, height: 40, willChange: "transform" }}
                      animate={{ scale: active ? 1.02 : 1 }}
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    >
                      <span className={`text-base ${iconColorClass}`}>{icon}</span>
                    </motion.div>

                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {DesktopHeader}
      {MobileHeader}
      {MobileDrawer}
    </>
  );
}