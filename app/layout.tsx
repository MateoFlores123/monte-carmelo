import { Cormorant_Garamond } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import Loader from "../components/Loader/Loader";
import Socialbar from "../components/Socialbar/Socialbar";
import CookieBanner from "@/components/CookieBanner";
import JsonLd from "@/components/Seo/JsonLd";
import { SITE } from "@/lib/site";
import { clinicSchema, websiteSchema } from "@/lib/schema";

import "./globals.css";

type LayoutProps = {
  children: ReactNode;
};

const clinicFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-clinic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Monte Carmelo Centro Médico en Arequipa | Salud Ocupacional y Especialidades",
    template: "%s | Monte Carmelo Arequipa",
  },
  description:
    "Centro médico en Arequipa con más de 30 años de experiencia. Salud ocupacional: exámenes médicos ocupacionales (EMO) pre ocupacionales, periódicos y de retiro para empresas. Especialistas y centro de investigación oncológica.",
  applicationName: SITE.name,
  keywords: [
    "salud ocupacional Arequipa",
    "centro médico ocupacional Arequipa",
    "clínica ocupacional Arequipa",
    "exámenes médicos ocupacionales Arequipa",
    "EMO Arequipa",
    "examen pre ocupacional Arequipa",
    "centro médico Arequipa",
  ],
  // El canonical se define en CADA página (si se pone aquí, todas las
  // subpáginas heredarían canonical "/" y Google las ignoraría).
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: SITE.name,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: "Monte Carmelo Centro Médico, Arequipa" }],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // Pega aquí el código que te da Google Search Console (método "etiqueta HTML")
  // verification: { google: "XXXXXXXXXXXX" },
  formatDetection: { telephone: true },
  category: "health",
};

export const viewport: Viewport = {
  themeColor: "#662153",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    // es-PE en vez de "es": le dice a Google que el público es de Perú
    <html lang="es-PE" className={clinicFont.variable}>
      {/* Se quitó el <link rel="preload" href="/images/hero-1.webp">: apuntaba a
          una imagen que el Hero ya no usa (usa hero-1.1.webp), así que el
          navegador descargaba una imagen extra para nada. next/image con
          `priority` ya precarga la correcta. */}
      <body>
        <JsonLd data={[clinicSchema(), websiteSchema()]} />
        <Loader />

        {children}
        <CookieBanner />
        <Socialbar />
      </body>
    </html>
  );
}
