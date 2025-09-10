"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-dvh flex flex-col items-center justify-center text-white p-8 relative z-10">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">Bienvenido a mi Portfolio</h1>
      <p className="text-lg mb-12 text-center max-w-xl">
        Elige una sección para explorar más detalles sobre mi trabajo.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <Link href="/section/hero" className="bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg p-6 text-center hover:opacity-90 transition">
          Ver Hero
        </Link>
        <Link href="/section/skills" className="bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg p-6 text-center hover:opacity-90 transition">
          Ver Skills
        </Link>
        <Link href="/section/projects" className="bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg p-6 text-center hover:opacity-90 transition">
          Ver Projects
        </Link>
      </div>
    </main>
  );
}
