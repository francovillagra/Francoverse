"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
// 👇 ahora importamos desde la misma carpeta consolidada
import NavigationMenu from "./NavigationMenu";
import NavigationItem from "./NavigationItem";
// Si tu Button no existe, podés usar un <button> nativo
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
    <header className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
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
        {isOpen ? <FaTimes /> : <FaBars />}
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
  );
}
