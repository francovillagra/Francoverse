"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  { href: "/",                label: "Inicio",     icon: <FaHome /> },
  { href: "/section/about",   label: "Sobre mí",   icon: <FaUser /> },
  { href: "/section/projects",label: "Proyectos",  icon: <FaCode /> },
  { href: "/section/skills",  label: "Habilidades",icon: <FaTools /> },
];

export default function SideNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="
        fixed left-4 top-1/2 -translate-y-1/2 z-30
        bg-white/60 dark:bg-white/5 backdrop-blur
        border border-black/10 dark:border-white/10
        rounded-2xl p-2 flex flex-col items-start gap-2
        shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]
      "
      aria-label="Barra de navegación lateral"
    >
      {/* Items principales */}
      <nav className="flex flex-col items-start gap-2">
        {LINKS.map(({ href, label, icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              prefetch={false}
              onClick={(e) => {
                if (active) e.preventDefault();
              }}
              className="group flex items-center"
              aria-current={active ? "page" : undefined}
              aria-label={label}
            >
              {/* Botón circular con halo */}
              <div
                className={`
                  relative grid place-items-center
                  size-10 rounded-full
                  transition
                  text-neutral-900 dark:text-white
                  ${active
                    ? "bg-black/90 dark:bg-white text-white dark:text-black"
                    : "bg-white dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20"}
                `}
                style={{
                  // Halo suave
                  boxShadow: active
                    ? "0 0 20px 4px rgba(168, 85, 247, 0.6), 0 0 40px 12px rgba(56, 189, 248, 0.35)"
                    : "0 0 14px 2px rgba(168, 85, 247, 0.25)",
                }}
              >
                <span className="text-base">{icon}</span>
              </div>

              {/* Etiqueta deslizante */}
              <AnimatePresence>
                {open && (
                  <motion.span
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 10 }}
                    exit={{ opacity: 0, x: 6 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className={`
                      ml-2 select-none
                      rounded-xl px-3 py-1 text-sm font-medium
                      border border-black/10 dark:border-white/10
                      bg-white/80 text-neutral-900
                      dark:bg-white/10 dark:text-white
                      shadow-[0_6px_18px_-10px_rgba(0,0,0,0.5)]
                    `}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Separador sutil */}
      <div className="w-full h-px my-1 bg-black/10 dark:bg-white/10" />

      {/* Toggle de tema como botón circular */}
      <div className="flex items-center">
        <div
          className="
            relative grid place-items-center size-10 rounded-full
            bg-white dark:bg-white/10 text-neutral-900 dark:text-white
            hover:bg-white/80 dark:hover:bg-white/20 transition
            border border-black/10 dark:border-white/10
          "
          style={{
            boxShadow: "0 0 14px 2px rgba(168, 85, 247, 0.25)",
          }}
          aria-label="Cambiar tema"
        >
          <ThemeToggle />
        </div>

        <AnimatePresence>
          {open && (
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
