// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import ClientWrapper from "@/components/layout/ClientWrapper";
import ThemeProvider from "@/components/providers/ThemeProvider";
import SideNav from "@/components/sections/Navigation/SideNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Francoverse",
  description: "Portafolio de Franco Villagra",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} relative min-h-dvh`}>
        <ThemeProvider>
          {/* Fondo de partículas detrás y sin interceptar clicks */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <ParticlesBackground />
          </div>

          {/* Barra lateral fija */}
          <div className="relative z-20">
            <SideNav />
          </div>

          {/* Contenido con transiciones */}
          <div className="relative z-10">
            <ClientWrapper>{children}</ClientWrapper>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

