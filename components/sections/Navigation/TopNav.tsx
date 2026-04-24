"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaHome, FaUser, FaCode, FaTools, FaBars, FaTimes, FaEnvelope } from "react-icons/fa";

type NavItem = { href: string; label: string; icon: React.ReactNode };

const LINKS: NavItem[] = [
  { href: "/#home", label: "Inicio", icon: <FaHome /> },
  { href: "/#about", label: "Sobre mí", icon: <FaUser /> },
  { href: "/#projects", label: "Proyectos", icon: <FaCode /> },
  { href: "/#skills", label: "Habilidades", icon: <FaTools /> },
  { href: "/#contact", label: "Contacto", icon: <FaEnvelope /> },
];

export default function TopNav() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState(false);

  const isActive = (href: string) => {
    const base = href.split("#")[0] || "/";
    return base === "/" ? pathname === "/" : pathname.startsWith(base);
  };

  const baseW = 48;
  const expandedW = 172;

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
              <div key={href} className="relative h-12" style={{ width: expandedW }}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  aria-label={label}
                >
                  <motion.button
                    type="button"
                    onMouseEnter={() => setHovered(href)}
                    onMouseLeave={() =>
                      setHovered((prev) => (prev === href ? null : prev))
                    }
                    className={`
                      absolute left-0 top-0 h-12
                      flex items-center justify-start gap-2 pl-3 pr-3 rounded-full
                      border border-black/10 dark:border-white/10
                      ${
                        active
                          ? "bg-black/90 dark:bg-white"
                          : "bg-white dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20"
                      }
                      transform-gpu
                    `}
                    style={{ width: baseW, willChange: "transform,width" }}
                    animate={{
                      width: isHovered ? expandedW : baseW,
                      borderRadius: isHovered ? 16 : 9999,
                      scale: isHovered ? 1.02 : active ? 1.01 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 34,
                      mass: 0.7,
                    }}
                  >
                    <span className={`text-base ${iconColorClass}`}>{icon}</span>

                    <AnimatePresence initial={false}>
                      {isHovered && (
                        <motion.span
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -6 }}
                          transition={{ duration: 0.16, ease: "easeOut" }}
                          className={`text-sm font-medium select-none pointer-events-none ${iconColorClass}`}
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

      
      </div>
    </header>
  );

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
        <span className="font-semibold text-neutral-900 dark:text-white">
          Francoverse
        </span>

        <div className="flex items-center gap-2">
         
          <button
            onClick={() => setOpenMobile((prev) => !prev)}
            className="
              grid place-items-center size-10 rounded-xl
              bg-white text-neutral-900 dark:bg-white/10 dark:text-white
              border border-black/10 dark:border-white/10
              shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]
              active:scale-95 transition
            "
            aria-label={openMobile ? "Cerrar navegación" : "Abrir navegación"}
            aria-expanded={openMobile}
          >
            {openMobile ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );

  const MobileMenu = (
    <AnimatePresence>
      {openMobile && (
        <>
          <motion.div
            className="md:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenMobile(false)}
          />

          <motion.div
            className="
              md:hidden fixed top-[68px] left-4 right-4 z-40
              rounded-2xl border border-black/10 dark:border-white/10
              bg-white/90 dark:bg-[#09090f]/90 backdrop-blur-xl
              shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]
              p-3
            "
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <nav className="flex flex-col">
              {LINKS.map(({ href, label, icon }) => {
                const active = isActive(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpenMobile(false)}
                    className={`
                      flex items-center gap-3 rounded-xl px-4 py-3 transition
                      ${
                        active
                          ? "bg-black/90 text-white dark:bg-white dark:text-black"
                          : "text-neutral-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
                      }
                    `}
                  >
                    <span className="text-base">{icon}</span>
                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {DesktopHeader}
      {MobileHeader}
      {MobileMenu}
    </>
  );
}