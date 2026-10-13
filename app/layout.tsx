// app/layout.tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ScrollNavigator from "@/components/ui/ScrollNavigator";
import ClientWrapper from "@/components/layout/ClientWrapper";
import ThemeProvider from "@/components/providers/ThemeProvider";
import TopNav from "@/components/sections/Navigation/TopNav";
import { SITE_URL, STATIC_EXPORT } from "@/lib/site-url";

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
  title: 'Franco Villagra — Full Stack · Seguridad de Aplicaciones Web',
  description: 'Franco Villagra, desarrollador Full Stack especializado en seguridad de aplicaciones web. Pentesting web, revisiones de seguridad para Next.js, proyectos y CV.',
  keywords: [
    'Franco Villagra',
    'desarrollador',
    'full stack',
    'ciberseguridad',
    'seguridad de aplicaciones web',
    'pentesting web',
    'AppSec',
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
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Franco Villagra — Full Stack · Seguridad de Aplicaciones Web',
    description: 'Desarrollador Full Stack especializado en seguridad de aplicaciones web: pentesting web, revisiones de seguridad y proyectos.',
    url: SITE_URL,
    siteName: 'Franco Villagra Portfolio',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Franco Villagra — Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Franco Villagra — Full Stack · Seguridad de Aplicaciones Web',
    description: 'Desarrollador Full Stack especializado en seguridad de aplicaciones web: pentesting web, revisiones de seguridad y proyectos.',
    images: ['/og-image.png'],
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
    google: 'aTF3O45APagS2wdA4SCZh5OnZpHJfw9g9_AJNSI0sC4',
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
        {/* Vercel Web Analytics solo existe en Vercel: en el sitio estático no se carga. */}
        {!STATIC_EXPORT && <Analytics />}
      </body>
    </html>
  );
}