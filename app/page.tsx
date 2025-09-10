"use client";

export default function Home() {
  return (
    <main className="relative z-10 w-full h-dvh grid place-items-center px-6">
      <div className="max-w-3xl text-center space-y-6">
        <p className="uppercase tracking-[0.2em] text-white/60 text-sm">Portafolio</p>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Francoverse
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/80">
          Desarrollador <span className="font-semibold">Fullstack</span> — React • Next.js • Node
        </p>
        <p className="text-white/70">
          Usá los botones de la esquina superior para navegar entre secciones.
        </p>
      </div>
    </main>
  );
}
