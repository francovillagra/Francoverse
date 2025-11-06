"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/section/about", label: "Sobre mí" },
  { href: "/section/projects", label: "Proyectos" },
  { href: "/section/skills", label: "Habilidades" },
];

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const goHome = () => {
    if (pathname !== "/") router.push("/");
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-20">
      <ul className="flex items-center gap-2 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur px-2 py-1">
        {/* Botón Home */}
        <li>
          <button
            onClick={goHome}
            aria-label="Ir al inicio"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm
                       text-neutral-900 hover:bg-black/[0.05]
                       dark:text-white dark:hover:bg-white/10 transition"
          >
            <FaHome />
            <span className="hidden sm:inline">Inicio</span>
          </button>
        </li>

        {/* Links */}
        {links.map(({ href, label }) => {
          const active = isActive(href);
          return (
            <li key={href}>
              <Link
                href={active ? "#" : href}
                onClick={(e) => { if (active) e.preventDefault(); }}
                aria-current={active ? "page" : undefined}
                aria-disabled={active ? true : undefined}
                tabIndex={active ? -1 : 0}
                className={`text-sm px-3 py-1.5 rounded-xl transition
                  ${active
                    ? "bg-black/[0.08] text-neutral-900 dark:bg-white/90 dark:text-black font-semibold cursor-default"
                    : "text-neutral-900 hover:bg-black/[0.05] dark:text-white dark:hover:bg-white/10"
                  }`}
                prefetch={false}
              >
                {label}
              </Link>
            </li>
          );
        })}

        {/* Toggle de tema */}
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
}
