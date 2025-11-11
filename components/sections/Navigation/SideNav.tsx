"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaHome, FaUser, FaCode, FaTools, FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const LINKS: NavItem[] = [
  { href: "/", label: "Inicio", icon: <FaHome /> },
  { href: "/section/about", label: "Sobre mí", icon: <FaUser /> },
  { href: "/section/projects", label: "Proyectos", icon: <FaCode /> },
  { href: "/section/skills", label: "Habilidades", icon: <FaTools /> },
];

export default function SideNav() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // ======= DESKTOP (md+) — BARRA A LA DERECHA, EXPANDE HACIA LA IZQUIERDA =======
  const DesktopAside = (
    <aside
      className="
        hidden md:flex
        fixed right-4 top-1/2 -translate-y-1/2 z-30
        bg-white/60 dark:bg-white/5 backdrop-blur
        border border-black/10 dark:border-white/10
        rounded-2xl p-2 flex-col items-end gap-2
        shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]
      "
      aria-label="Barra de navegación lateral"
    >
      <nav className="flex flex-col items-end gap-2">
        {LINKS.map(({ href, label, icon }) => {
          const active = isActive(href);
          const isHovered = hovered === href;

          const baseW = 48;      // ancho base del botón
          const expandedW = 164; // ancho al hacer hover
          const iconColorClass = active ? "text-white dark:text-black" : "text-neutral-900 dark:text-white";

          return (
            <div
              key={href}
              onMouseEnter={() => setHovered(href)}
              onMouseLeave={() => setHovered(null)}
              className="relative h-12 w-12"
            >
              <Link href={href} prefetch={false} aria-current={active ? "page" : undefined} aria-label={label}>
                <motion.button
                  type="button"
                  className={`
                    absolute right-0 top-0 h-12
                    flex items-center justify-end gap-2
                    rounded-full pr-3
                    border border-black/10 dark:border-white/10
                    ${active ? "bg-black/90 dark:bg-white" : "bg-white dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20"}
                    outline-none
                    shadow-[0_0_12px_2px_rgba(168,85,247,0.22)]
                  `}
                  style={{ width: baseW }}
                  animate={{
                    // ✅ anclado a la derecha, solo crece hacia la izquierda
                    width: isHovered ? expandedW : baseW,
                    borderRadius: isHovered ? 16 : 9999,
                    // 🔄 pulso continuo (idle/active)
                    scale: active ? [1, 1.04, 1] : [1, 1.02, 1],
                    boxShadow: active
                      ? [
                          "0 0 22px 6px rgba(168,85,247,0.55), 0 0 44px 14px rgba(56,189,248,0.33)",
                          "0 0 28px 8px rgba(56,189,248,0.55), 0 0 52px 18px rgba(168,85,247,0.33)",
                          "0 0 22px 6px rgba(168,85,247,0.55), 0 0 44px 14px rgba(56,189,248,0.33)",
                        ]
                      : isHovered
                      ? [
                          "0 0 12px 2px rgba(168,85,247,0.22)",
                          "0 0 18px 4px rgba(56,189,248,0.30)",
                          "0 0 12px 2px rgba(168,85,247,0.22)",
                        ]
                      : [
                          "0 0 10px 2px rgba(168,85,247,0.16)",
                          "0 0 16px 3px rgba(56,189,248,0.26)",
                          "0 0 10px 2px rgba(168,85,247,0.16)",
                        ],
                  }}
                  transition={{ duration: 2.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                >
                  {/* Texto a la izquierda del ícono (porque el botón crece hacia la izquierda) */}
                  <AnimatePresence initial={false}>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.16 }}
                        className="text-sm font-medium select-none pointer-events-none text-neutral-900 dark:text-white"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Ícono pegado a la derecha */}
                  <span className={`text-base ${iconColorClass}`}>{icon}</span>
                </motion.button>
              </Link>
            </div>
          );
        })}
      </nav>

      <div className="w-full h-px my-1 bg-black/10 dark:bg-white/10" />

      {/* Toggle de tema — mismo patrón: a la derecha y expande hacia la izquierda con pulso */}
      <div
        onMouseEnter={() => setHovered("theme")}
        onMouseLeave={() => setHovered(null)}
        className="relative h-12 w-12"
      >
        <motion.div
          className="
            absolute right-0 top-0 h-12
            flex items-center justify-end gap-2
            rounded-full pr-3
            bg-white dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 transition
            border border-black/10 dark:border-white/10
            shadow-[0_0_12px_2px_rgba(168,85,247,0.22)]
          "
          style={{ width: 48 }}
          animate={{
            width: hovered === "theme" ? 140 : 48,
            borderRadius: hovered === "theme" ? 16 : 9999,
            scale: [1, 1.02, 1],
            boxShadow: [
              "0 0 10px 2px rgba(168,85,247,0.16)",
              "0 0 16px 3px rgba(56,189,248,0.26)",
              "0 0 10px 2px rgba(168,85,247,0.16)",
            ],
          }}
          transition={{ duration: 2.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          aria-label="Cambiar tema"
        >
          <AnimatePresence initial={false}>
            {hovered === "theme" && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.16 }}
                className="text-sm font-medium select-none pointer-events-none text-neutral-900 dark:text-white"
              >
                Tema
              </motion.span>
            )}
          </AnimatePresence>
          <ThemeToggle />
        </motion.div>
      </div>
    </aside>
  );

  // ======= MOBILE (sm) — FAB y Drawer a la DERECHA =======
  const MobileFab = (
    <button
      onClick={() => setOpenMobile(true)}
      className="
        md:hidden fixed right-4 bottom-4 z-40
        grid place-items-center size-12 rounded-full
        bg-white text-neutral-900 dark:bg-white/10 dark:text-white
        border border-black/10 dark:border-white/10
        shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]
        hover:scale-105 transition
      "
      aria-label="Abrir navegación"
    >
      <FaBars />
    </button>
  );

  const MobileDrawer = (
    <AnimatePresence>
      {openMobile && (
        <>
          {/* Overlay */}
          <motion.div
            className="md:hidden fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenMobile(false)}
          />
          {/* Panel derecho */}
          <motion.aside
            className="
              md:hidden fixed right-0 top-0 h-full w-64 z-50
              bg-white/90 text-neutral-900 dark:bg-gray-900/95 dark:text-white
              backdrop-blur border-l border-black/10 dark:border-white/10
              p-3 flex flex-col gap-2
            "
            initial={{ x: 280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 280, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            aria-label="Menú de navegación"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Navegación</span>
              <button
                className="grid place-items-center size-9 rounded-full
                           bg-white dark:bg-white/10 border border-black/10 dark:border-white/10"
                onClick={() => setOpenMobile(false)}
                aria-label="Cerrar navegación"
              >
                <FaTimes />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {LINKS.map(({ href, label, icon }) => {
                const active = isActive(href);
                const iconColorClass = active ? "text-white dark:text-black" : "text-neutral-900 dark:text-white";

                return (
                  <Link
                    key={href}
                    href={href}
                    prefetch={false}
                    onClick={() => setOpenMobile(false)}
                    className="flex items-center gap-3 rounded-xl px-2 py-2
                               hover:bg-black/[0.05] dark:hover:bg-white/10 transition"
                  >
                    <motion.div
                      className={`
                        relative grid place-items-center rounded-full
                        ${active ? "bg-black/90 dark:bg-white" : "bg-white dark:bg-white/10"}
                      `}
                      style={{ width: 40, height: 40, boxShadow: "0 0 12px 2px rgba(168,85,247,0.22)" }}
                      animate={{
                        boxShadow: active
                          ? [
                              "0 0 22px 6px rgba(168,85,247,0.55), 0 0 44px 14px rgba(56,189,248,0.33)",
                              "0 0 28px 8px rgba(56,189,248,0.55), 0 0 52px 18px rgba(168,85,247,0.33)",
                              "0 0 22px 6px rgba(168,85,247,0.55), 0 0 44px 14px rgba(56,189,248,0.33)",
                            ]
                          : [
                              "0 0 10px 2px rgba(168,85,247,0.16)",
                              "0 0 16px 3px rgba(56,189,248,0.26)",
                              "0 0 10px 2px rgba(168,85,247,0.16)",
                            ],
                        scale: active ? [1, 1.04, 1] : [1, 1.02, 1],
                      }}
                      transition={{ duration: 2.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                    >
                      <span className={`text-base ${iconColorClass}`}>{icon}</span>
                    </motion.div>
                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-2 border-t border-black/10 dark:border-white/10">
              <div className="flex items-center gap-3 px-1 py-2">
                <motion.div
                  className="relative grid place-items-center rounded-full
                             bg-white dark:bg-white/10 border border-black/10 dark:border-white/10"
                  style={{ width: 40, height: 40, boxShadow: "0 0 12px 2px rgba(168,85,247,0.22)" }}
                  animate={{
                    boxShadow: [
                      "0 0 10px 2px rgba(168,85,247,0.16)",
                      "0 0 16px 3px rgba(56,189,248,0.26)",
                      "0 0 10px 2px rgba(168,85,247,0.16)",
                    ],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 2.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                >
                  <ThemeToggle />
                </motion.div>
                <span className="text-sm font-medium">Tema</span>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {DesktopAside}
      {MobileFab}
      {MobileDrawer}
    </>
  );
}
