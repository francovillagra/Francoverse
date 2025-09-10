// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import ClientWrapper from "@/components/layout/ClientWrapper"; // ⟵ el wrapper con Framer Motion

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Francoverse",
  description: "Portafolio de Franco Villagra",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      {/* Importante: sin min-h-screen para no forzar scroll */}
      <body className={`${inter.className} relative z-0`}>
        <ParticlesBackground />
        {/* Transición entre pantallas y altura controlada por cada página con h-dvh */}
        <ClientWrapper>
          {/* Podés dejar que cada page defina su <main className="w-full h-dvh"> */}
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
