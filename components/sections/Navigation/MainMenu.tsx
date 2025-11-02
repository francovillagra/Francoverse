'use client';

import React from 'react';

type Props = {
  onSelectSection: (section: string) => void;
};

const MainMenu = ({ onSelectSection }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#030014] text-white gap-6 px-4">
      <h1 className="text-4xl font-bold mb-8">Bienvenido a mi Portafolio</h1>
      
      <button
        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition"
        onClick={() => onSelectSection('hero')}
      >
        Sobre Mí
      </button>

      <button
        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition"
        onClick={() => onSelectSection('skills')}
      >
        Habilidades
      </button>

      <button
        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition"
        onClick={() => onSelectSection('projects')}
      >
        Proyectos
      </button>

      <button
        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition"
        onClick={() => onSelectSection('encryption')}
      >
        Encriptación
      </button>
    </div>
  );
};

export default MainMenu;
