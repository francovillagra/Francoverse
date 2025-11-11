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
  const [hovered, setHovered] = useState<string | null>(null); // desktop: hover por ítem
  const [openMobile, setOpenMobile] = useState(false);         // mobile: drawer

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // ======= DESKTOP (md+) =======
  const DesktopAside = (
    <aside
      className="
        hidden md:flex
        fixed left-4 top-1/2 -translate-y-1/2 z-30
        bg-white/60 dark:bg-white/5 backdrop-blur
        border border-black/10 dark:border-white/10
        rounded-2xl p-2 flex-col items-start gap-2
        shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]
      "
      aria-label="Barra de navegación lateral"
    >
      <nav className="flex flex-col items-start gap-2">
        {LINKS.map(({ href, label, icon }) => {
          const active = isActive(href);
          const isHovered = hovered === href;
          const showLabel = isHovered;
          const iconColorClass = active ? "text-white dark:text-black" : "text-neutral-900 dark:text-white";

          return (
            <div
              key={href}
              onMouseEnter={() => setHovered(href)}
              onMouseLeave={() => setHovered(null)}
              className="relative flex items-center"
            >
              <Link href={href} prefetch={false} aria-current={active ? "page" : undefined} aria-label={label}>
                {/* Marco fijo para que el aside no cambie de ancho */}
                <div className="grid place-items-center w-12 h-12">
                  <motion.div
                    className={`
                      relative grid place-items-center rounded-full transition
                      ${active ? "bg-black/90 dark:bg-white" : "bg-white dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20"}
                    `}
                    style={{
                      width: 40,
                      height: 40,
                      boxShadow: active
                        ? "0 0 22px 6px rgba(168,85,247,0.55), 0 0 44px 14px rgba(56,189,248,0.33)"
                        : "0 0 12px 2px rgba(168,85,247,0.22)",
                    }}
                    animate={{
                      // Sólo escalamos el círculo interno (el marco exterior siempre es 48px)
                      scale: isHovered ? 1.2 : active ? [1, 1.04, 1] : [1, 1.02, 1],
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
                    <span className={`text-base ${iconColorClass}`}>{icon}</span>
                  </motion.div>
                </div>
              </Link>

              {/* Etiqueta flotante: no afecta el layout del aside */}
              <AnimatePresence>
                {showLabel && (
                  <motion.span
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 10 }}
                    exit={{ opacity: 0, x: 6 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="
                      pointer-events-none select-none
                      absolute left-14 top-1/2 -translate-y-1/2
                      rounded-xl px-3 py-1 text-sm font-medium
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

      <div className="w-full h-px my-1 bg-black/10 dark:bg-white/10" />

      {/* Toggle tema desktop - mismo patrón (marco fijo + escala) */}
      <div
        onMouseEnter={() => setHovered("theme")}
        onMouseLeave={() => setHovered(null)}
        className="relative flex items-center"
      >
        <div className="grid place-items-center w-12 h-12">
          <motion.div
            className="
              relative grid place-items-center rounded-full
              bg-white dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 transition
              border border-black/10 dark:border-white/10
            "
            style={{ width: 40, height: 40, boxShadow: "0 0 12px 2px rgba(168,85,247,0.22)" }}
            animate={{
              scale: hovered === "theme" ? 1.2 : [1, 1.02, 1],
              boxShadow: [
                "0 0 10px 2px rgba(168,85,247,0.16)",
                "0 0 16px 3px rgba(56,189,248,0.26)",
                "0 0 10px 2px rgba(168,85,247,0.16)",
              ],
            }}
            transition={{ duration: 2.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            aria-label="Cambiar tema"
          >
            <ThemeToggle />
          </motion.div>
        </div>

        <AnimatePresence>
          {hovered === "theme" && (
            <motion.span
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 10 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="
                pointer-events-none select-none
                absolute left-14 top-1/2 -translate-y-1/2
                rounded-xl px-3 py-1 text-sm font-medium
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

  // ======= MOBILE (sm) =======
  const MobileFab = (
    <button
      onClick={() => setOpenMobile(true)}
      className="
        md:hidden fixed left-4 bottom-4 z-40
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
          {/* Panel izquierdo */}
          <motion.aside
            className="
              md:hidden fixed left-0 top-0 h-full w-64 z-50
              bg-white/90 text-neutral-900 dark:bg-gray-900/95 dark:text-white
              backdrop-blur border-r border-black/10 dark:border-white/10
              p-3 flex flex-col gap-2
            "
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
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
