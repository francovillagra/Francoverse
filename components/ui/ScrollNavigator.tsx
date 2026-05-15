'use client';

import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const SECTIONS = [
  { id: 'home',     label: 'Inicio' },
  { id: 'about',    label: 'Sobre mí' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'skills',   label: 'Habilidades' },
  { id: 'contact',  label: 'Contacto' },
];

export default function ScrollNavigator() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      SECTIONS.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPrevious = () => {
    scrollToSection(SECTIONS[Math.max(0, activeSection - 1)].id);
  };

  const scrollToNext = () => {
    scrollToSection(SECTIONS[Math.min(SECTIONS.length - 1, activeSection + 1)].id);
  };

  const btnClass =
    "grid place-items-center size-8 rounded-full border transition-all duration-300 outline-none border-fg/30 text-fg/60 hover:border-fg/50 hover:bg-fg/10 disabled:opacity-30 disabled:cursor-not-allowed";

  return (
    <div className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-2">

      <button
        onClick={scrollToPrevious}
        disabled={activeSection === 0}
        aria-label="Sección anterior"
        className={btnClass}
      >
        <ChevronUp size={16} />
      </button>

      {SECTIONS.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          aria-label={`Ir a ${section.label}`}
          className={`rounded-full transition-all duration-300 outline-none ${
            activeSection === index
              ? 'h-6 w-1.5 bg-fg/80'
              : 'size-1.5 bg-fg/20 hover:bg-fg/50'
          }`}
        />
      ))}

      <button
        onClick={scrollToNext}
        disabled={activeSection === SECTIONS.length - 1}
        aria-label="Sección siguiente"
        className={btnClass}
      >
        <ChevronDown size={16} />
      </button>

    </div>
  );
}
