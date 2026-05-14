// app/layout.tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollNavigator from "@/components/ui/ScrollNavigator";
import ClientWrapper from "@/components/layout/ClientWrapper";
import ThemeProvider from "@/components/providers/ThemeProvider";
import TopNav from "@/components/sections/Navigation/TopNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Francoverse",
  description: "Portafolio de Franco Villagra",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-bg text-fg/90 relative min-h-dvh isolate antialiased`}>
        <ThemeProvider>
          {/* Top nav */}
          <div className="relative z-20">
            <TopNav />
          </div>

          {/* Contenido */}
          <div className="relative z-10">
            <ClientWrapper>{children}</ClientWrapper>
          </div>

          {/* ScrollNavigator */}
          <ScrollNavigator />
        </ThemeProvider>
      </body>
    </html>
  );
}