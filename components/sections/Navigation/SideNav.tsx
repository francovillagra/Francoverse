"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaHome, FaUser, FaCode, FaTools } from "react-icons/fa";
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

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside
      className="
        fixed left-4 top-1/2 -translate-y-1/2 z-30
        bg-white/60 dark:bg-white/5 backdrop-blur
        border border-black/10 dark:border-white/10
        rounded-2xl p-2 flex flex-col items-start gap-2
        shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]
      "
      aria-label="Barra de navegación lateral"
    >
      {/* Íconos de navegación */}
      <nav className="flex flex-col items-start gap-2">
        {LINKS.map(({ href, label, icon }) => {
          const active = isActive(href);
          const isHovered = hovered === href; // sólo este ítem está bajo el cursor
          const showLabel = isHovered;

          // Icono siempre visible (contraste perfecto en activo)
          const iconColorClass = active
            ? "text-white dark:text-black"
            : "text-neutral-900 dark:text-white";

          // Dimensiones animadas SOLO para el ítem hovered
          const targetSize = isHovered ? 48 : 40; // px (40 = size-10, 48 ≈ size-12)

          return (
            <div
              key={href}
              onMouseEnter={() => setHovered(href)}
              onMouseLeave={() => setHovered(null)}
              className="flex items-center"
            >
              <Link
                href={href}
                prefetch={false}
                aria-current={active ? "page" : undefined}
                aria-label={label}
              >
                {/* Círculo con halo y tamaño animado por ítem */}
                <motion.div
                  className={`
                    relative grid place-items-center rounded-full transition
                    ${active
                      ? "bg-black/90 dark:bg-white"
                      : "bg-white dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20"}
                  `}
                  style={{
                    width: 40,  // state inicial (se sobreescribe por animate)
                    height: 40, // idem
                    boxShadow: active
                      ? "0 0 22px 6px rgba(168,85,247,0.55), 0 0 44px 14px rgba(56,189,248,0.33)"
                      : "0 0 12px 2px rgba(168,85,247,0.22)",
                  }}
                  animate={{
                    width: targetSize,
                    height: targetSize,
                    // Pulso cromático violeta↔cian; más fuerte si está activo o hovered
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
                    scale: active ? [1, 1.04, 1] : isHovered ? [1, 1.06, 1] : [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                >
                  <span className={`text-base ${iconColorClass}`}>{icon}</span>
                </motion.div>
              </Link>

              {/* Etiqueta solo cuando el cursor está sobre el ícono */}
              <AnimatePresence>
                {showLabel && (
                  <motion.span
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 10 }}
                    exit={{ opacity: 0, x: 6 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="
                      ml-2 select-none rounded-xl px-3 py-1 text-sm font-medium
                      border border-black/10 dark:border-white/10
                      bg-white/80 text-neutral-900
                      dark:bg-white/10 dark:text-white
                      shadow-[0_6px_18px_-10px_rgba(0,0,0,0.5)]
                    "
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Separador */}
      <div className="w-full h-px my-1 bg-black/10 dark:bg-white/10" />

      {/* Toggle de tema con pulso (sin expandir toda la barra) */}
      <div
        onMouseEnter={() => setHovered("theme")}
        onMouseLeave={() => setHovered(null)}
        className="flex items-center"
      >
        <motion.div
          className="
            relative grid place-items-center rounded-full
            bg-white dark:bg-white/10
            hover:bg-white/80 dark:hover:bg-white/20 transition
            border border-black/10 dark:border-white/10
          "
          style={{ width: 40, height: 40, boxShadow: "0 0 12px 2px rgba(168,85,247,0.22)" }}
          animate={{
            width: hovered === "theme" ? 48 : 40,
            height: hovered === "theme" ? 48 : 40,
            boxShadow: [
              "0 0 10px 2px rgba(168,85,247,0.16)",
              "0 0 16px 3px rgba(56,189,248,0.26)",
              "0 0 10px 2px rgba(168,85,247,0.16)",
            ],
            scale: hovered === "theme" ? [1, 1.06, 1] : [1, 1.02, 1],
          }}
          transition={{ duration: 2.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          aria-label="Cambiar tema"
        >
          <ThemeToggle />
        </motion.div>

        <AnimatePresence>
          {hovered === "theme" && (
            <motion.span
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 10 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="
                ml-2 select-none rounded-xl px-3 py-1 text-sm font-medium
                border border-black/10 dark:border-white/10
                bg-white/80 text-neutral-900
                dark:bg-white/10 dark:text-white
              "
            >
              Tema
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
