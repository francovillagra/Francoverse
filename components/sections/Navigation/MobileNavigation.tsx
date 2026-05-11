'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="md:hidden relative">
      <button
        aria-label="Toggle menu"
        onClick={toggleMenu}
        className="text-2xl p-2 focus:outline-none"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full
  bg-white/90 text-neutral-900 dark:bg-gray-900/90 dark:text-white
  backdrop-blur flex flex-col gap-4 p-4 z-50 border-t border-black/10 dark:border-white/10">

          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
            Inicio
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
            Sobre mí
          </Link>
          <Link href="/skills" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
            Habilidades
          </Link>
          <Link href="/projects" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
            Proyectos
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
            Contacto
          </Link>
        </div>
      )}
    </nav>
  );
}
