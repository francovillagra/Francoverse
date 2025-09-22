'use client';

import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { NavigationItem, NavigationMenu } from "@/components/sections/Navigation";
import Button from '@/components/ui/Button';

type SectionKey = 'home' | 'about' | 'skills' | 'projects' | 'contact' | 'hero';

interface HomeNavigationProps {
  setActiveSection: (section: SectionKey) => void;
}

export default function HomeNavigation({ setActiveSection }: HomeNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClick = (section: SectionKey) => {
    setActiveSection(section);
    setIsOpen(false);
  };

  return (
    <header className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
      {/* Logo / Nombre */}
      <div
        className="text-xl font-bold cursor-pointer hover:text-purple-400 transition-colors"
        onClick={() => handleClick('hero')}
      >
        Franco Villagra
      </div>

      {/* Menú Desktop */}
      <nav className="hidden md:flex gap-6 items-center">
        <NavigationMenu>
          <NavigationItem icon="user" onClick={() => handleClick('about')} label="Sobre mí" />
          <NavigationItem icon="tools" onClick={() => handleClick('skills')} label="Habilidades" />
          <NavigationItem icon="code" onClick={() => handleClick('projects')} label="Proyectos" />
          <NavigationItem icon="mail" onClick={() => handleClick('contact')} label="Contacto" />
        </NavigationMenu>
      </nav>

      {/* Botón hamburguesa en móvil */}
      <Button onClick={toggleMenu} variant="icon" className="md:hidden text-2xl p-2">
        {isOpen ? <FaTimes /> : <FaBars />}
      </Button>

      {/* Menú Mobile */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-start px-6 py-4 gap-4 md:hidden z-40">
          <NavigationMenu direction="column">
            <NavigationItem icon="user" onClick={() => handleClick('about')} label="Sobre mí" />
            <NavigationItem icon="tools" onClick={() => handleClick('skills')} label="Habilidades" />
            <NavigationItem icon="code" onClick={() => handleClick('projects')} label="Proyectos" />
            <NavigationItem icon="mail" onClick={() => handleClick('contact')} label="Contacto" />
          </NavigationMenu>
        </div>
      )}
    </header>
  );
}
