// components/navigation/TopNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/section/about", label: "Sobre mí" },
  { href: "/section/projects", label: "Proyectos" },
  { href: "/section/skills", label: "Habilidades" },
];

export default function TopNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="fixed top-4 right-4 z-20">
      <ul className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-2 py-1">
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
                className={`text-sm px-3 py-1.5 rounded-xl transition ${
                  active
                    ? "bg-white text-black font-semibold cursor-default"
                    : "text-white/85 hover:bg-white/10"
                }`}
                prefetch={false}
              >
                {label}
              </Link>
            </li>
          );
        })}
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
}
