// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import ClientWrapper from "@/components/layout/ClientWrapper";
import TopNav from "@/components/navigation/TopNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Francoverse",
  description: "Portafolio de Franco Villagra",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} relative z-0`}>
        {/* Fondo de partículas detrás del contenido */}
        <ParticlesBackground />
        {/* Nav sutil arriba a la derecha */}
        <TopNav />
        {/* Contenido con transiciones y encima del fondo */}
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
