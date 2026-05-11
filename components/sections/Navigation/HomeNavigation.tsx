"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
// Menú existente (se mantiene)
import NavigationMenu from "./NavigationMenu";
import NavigationItem from "./NavigationItem";
// Botón animado nuevo
import NavigationButton from "./NavigationButtons";

// Si Button no existe, reemplazalo por un <button> nativo
import Button from "@/components/ui/Button";

type SectionKey = "home" | "about" | "skills" | "projects" | "contact" | "hero";

interface Props {
  /** Si está presente, el nav actúa en modo SPA interno (setea sección). Si no, navega por rutas /section/* */
  setActiveSection?: (section: SectionKey) => void;
}

const LINKS = [
  { section: "about" as const,   label: "Sobre mí",    icon: "user",   route: "/section/about" },
  { section: "skills" as const,  label: "Habilidades", icon: "tools",  route: "/section/skills" },
  { section: "projects" as const,label: "Proyectos",   icon: "code",   route: "/section/projects" },
  { section: "contact" as const, label: "Contacto",    icon: "mail",   route: "/section/contact" },
];

export default function HomeNavigation({ setActiveSection }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((v) => !v);

  const go = (section: SectionKey, route: string) => {
    if (setActiveSection) {
      // 🔁 MODO SECCIONES (SPA interno)
      setActiveSection(section);
      setIsOpen(false);
      return;
    }
    // 🌐 MODO RUTAS (Next.js)
    if (pathname === route || pathname.startsWith(route + "/")) return; // evita doble push
    router.push(route);
    setIsOpen(false);
  };

  return (
    <>
      {/* Header fijo con menú */}
<header className="bg-white/80 text-neutral-900 dark:bg-gray-900/90 dark:text-white
  backdrop-blur border-b border-black/5 dark:border-white/10 px-4 py-3 transition-colors">

        {/* Logo / Nombre */}
        <div
          className="text-xl font-bold cursor-pointer hover:text-purple-400 transition-colors"
          onClick={() => go("hero", "/")} // hero → home
        >
          Franco Villagra
        </div>

        {/* Menú Desktop */}
        <nav className="hidden md:flex gap-6 items-center">
          <NavigationMenu>
            {LINKS.map(({ section, label, icon, route }) => (
              <NavigationItem
                key={section}
                icon={icon}
                label={label}
                onClick={() => go(section, route)}
              />
            ))}
          </NavigationMenu>
        </nav>

        {/* Botón hamburguesa (móvil) */}
        <Button onClick={toggleMenu} variant="icon" className="md:hidden text-2xl p-2">
          {isOpen ? <X /> : <Menu />}
        </Button>

        {/* Menú Mobile */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-start px-6 py-4 gap-4 md:hidden z-40">
            <NavigationMenu direction="column">
              {LINKS.map(({ section, label, icon, route }) => (
                <NavigationItem
                  key={`m-${section}`}
                  icon={icon}
                  label={label}
                  onClick={() => go(section, route)}
                />
              ))}
            </NavigationMenu>
          </div>
        )}
      </header>

      {/* Capa de botones animados (CTA rápidos) */}
      <div className="px-4 py-4">
        <div className="mx-auto max-w-5xl grid gap-3 grid-cols-2 sm:grid-cols-4">
          {LINKS.map(({ section, label, route }, idx) => (
            <div key={`cta-${section}`} onClick={() => go(section, route)}>
              <NavigationButton href={route} label={label} delay={0.08 * idx} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

