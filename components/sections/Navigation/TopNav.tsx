"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaHome, FaUser, FaCode, FaTools, FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

type NavItem = { href: string; label: string; icon: React.ReactNode };

const LINKS: NavItem[] = [
  { href: "/#home", label: "Inicio", icon: <FaHome /> },
  { href: "/#about", label: "Sobre mí", icon: <FaUser /> },
  { href: "/#projects", label: "Proyectos", icon: <FaCode /> },
  { href: "/#skills", label: "Habilidades", icon: <FaTools /> },
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
                    <span className={`text-base ${iconColorClass}`}>
                      {icon}
                    </span>

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

        <div className="w-px h-8 mx-1 bg-black/10 dark:bg-white/10" />

        {/* Theme fijo */}
        <div className="flex items-center px-1">
          <ThemeToggle />
        </div>
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

  return (
    <>
      {DesktopHeader}
      {MobileHeader}
    </>
  );
}