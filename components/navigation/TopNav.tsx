"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/section/about", label: "About" },   // <- antes era /section/hero
  { href: "/section/projects", label: "Projects" },
  { href: "/section/skills", label: "Skills" },
  { href: "/section/cv", label: "CV" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-4 right-4 z-20">
      <ul className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-2 py-1">
        {links.map(({ href, label }) => {
          const active = pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm px-3 py-1.5 rounded-xl transition ${
                  active
                    ? "bg-white text-black font-semibold"
                    : "text-white/85 hover:bg-white/10"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
