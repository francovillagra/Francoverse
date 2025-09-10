import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import ClientWrapper from "@/components/layout/ClientWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Francoverse",
  description: "Portafolio de Franco Villagra",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} relative z-0`}>
        <ParticlesBackground />
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
