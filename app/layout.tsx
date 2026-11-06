// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { SITE_URL, STATIC_EXPORT } from "@/lib/site-url";

// Una sola familia, con eje de ancho (wdth): los títulos usan la versión angosta y el texto, la normal.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Color de la barra del navegador en el móvil: sigue al sistema (no al botón del sitio).
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F7FA" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1621" },
  ],
};

export const metadata: Metadata = {
  title: 'Franco Villagra — Desarrollador orientado a Ciberseguridad',
  description: 'Franco Villagra, desarrollador orientado a ciberseguridad. Revisión de seguridad para apps con Next.js, Supabase y Vercel, proyectos y CV.',
  keywords: [
    'Franco Villagra',
    'desarrollador',
    'ciberseguridad',
    'revisión de seguridad',
    'seguridad de aplicaciones web',
    'AppSec',
    'Next.js',
    'Supabase',
    'Vercel',
    'React',
    'TypeScript',
    'portfolio',
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
    title: 'Franco Villagra — Desarrollador orientado a Ciberseguridad',
    description: 'Revisión de seguridad para apps con Next.js, Supabase y Vercel: informe priorizado, con evidencia y plan de corrección. Proyectos y CV.',
    url: SITE_URL,
    siteName: 'Franco Villagra Portfolio',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Franco Villagra — Desarrollador orientado a Ciberseguridad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Franco Villagra — Desarrollador orientado a Ciberseguridad',
    description: 'Revisión de seguridad para apps con Next.js, Supabase y Vercel: informe priorizado, con evidencia y plan de corrección. Proyectos y CV.',
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
    // next-themes cambia la clase de <html> (t-day / t-night) antes de pintar: de ahí `suppressHydrationWarning`.
    <html lang="es" suppressHydrationWarning>
      <body className={`${archivo.variable} fv`}>
        <ThemeProvider>
          <a className="skip" href="#contenido">
            Ir al contenido
          </a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
        {/* Vercel Web Analytics solo existe en Vercel: en el sitio estático no se carga. */}
        {!STATIC_EXPORT && <Analytics />}
      </body>
    </html>
  );
}