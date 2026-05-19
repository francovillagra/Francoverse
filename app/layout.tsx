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
  title: 'Franco Villagra — Desarrollador Full Stack & Ciberseguridad',
  description: 'Portfolio profesional de Franco Villagra: desarrollo web con Next.js, React, TypeScript, y especialización en ciberseguridad. Proyectos destacados y CV disponible.',
  keywords: [
    'Franco Villagra',
    'desarrollador',
    'full stack',
    'ciberseguridad',
    'Next.js',
    'React',
    'TypeScript',
    'portfolio',
    'developer',
    'Buenos Aires',
    'Argentina',
  ],
  authors: [{ name: 'Franco Villagra' }],
  creator: 'Franco Villagra',
  publisher: 'Franco Villagra',
  metadataBase: new URL('https://francoverse.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Franco Villagra — Desarrollador Full Stack & Ciberseguridad',
    description: 'Portfolio profesional: desarrollo web y ciberseguridad',
    url: 'https://francoverse.vercel.app',
    siteName: 'Franco Villagra Portfolio',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Franco Villagra — Desarrollador Full Stack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Franco Villagra — Desarrollador Full Stack',
    description: 'Portfolio profesional: desarrollo web y ciberseguridad',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
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