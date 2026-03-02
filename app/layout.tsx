// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SpaceBackground from "@/components/ui/SpaceBackground";
import ClientWrapper from "@/components/layout/ClientWrapper";
import ThemeProvider from "@/components/providers/ThemeProvider";
import TopNav from "@/components/sections/Navigation/TopNav";

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
          
          {/* Fondo espacial global */}
    <div className="fixed inset-0 z-0 pointer-events-none">
   <SpaceBackground />
    </div>

{/* Capa sutil opcional (descomentás cuando la uses) */}
{/*
<div className="fixed inset-0 z-[1] pointer-events-none opacity-40">
  <ParticlesBackground />
</div>
*/}

          {/* Barra lateral fija */}
          <div className="relative z-20">
            <TopNav />
          </div>

          {/* Contenido */}
          <div className="relative z-10">
            <ClientWrapper>{children}</ClientWrapper>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
