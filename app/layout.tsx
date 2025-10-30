// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import ClientWrapper from "@/components/layout/ClientWrapper";
import TopNav from "@/components/navigation/TopNav";
import ThemeProvider from "@/components/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Francoverse",
  description: "Portafolio de Franco Villagra",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} relative min-h-dvh`}>
        {/* Fondo de partículas SIEMPRE detrás y sin interceptar clicks */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <ParticlesBackground />
        </div>

        <ThemeProvider>
          {/* Nav arriba */}
          <div className="relative z-20">
            <TopNav />
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
