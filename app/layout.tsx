import type { Metadata, Viewport } from "next";
import { Teko, Oswald, Inter } from "next/font/google";
import Footer from "./components/Footer";
import ClientShell from "./components/ClientShell";
import "./globals.css";

const teko = Teko({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-teko",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#00f2ff",
};

export const metadata: Metadata = {
  title: "VICTORY RACE II | 11.09.2026 | El Desafío CrossFit Más Épico de Villa Carlos Paz",
  description:
    "Victory Race II — La competencia de CrossFit de alta intensidad más extrema en la Costanera de Villa Carlos Paz. ASEGURÁ TU LUGAR (FASE 1) y superá tus límites en la batalla por la victoria.",
  keywords: "CrossFit, Villa Carlos Paz, Competencia, Victory Race, Fitness, Argentina, Entrenamiento funcional, WOD, Atletas",
  metadataBase: new URL("https://victoryrace.pages.dev"),
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://victoryrace.pages.dev",
    title: "VICTORY RACE II | LA BATALLA POR LA GLORIA",
    description:
      "11 de Septiembre 2026. Preparate para la competencia que redefine tus límites en el Playón Municipal.",
    images: [{ url: "https://victoryrace.pages.dev/assets/img/hero-bg.jpg" }],
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "VICTORY RACE II — 11.09.2026",
    description: "La mayor competencia de CrossFit en Córdoba. Asegurá tu lugar hoy.",
    images: ["https://victoryrace.pages.dev/assets/img/hero-bg.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${teko.variable} ${oswald.variable} ${inter.variable}`}
    >
      <body>
        <ClientShell />
        <main>{children}</main>
        <Footer />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" defer />
      </body>
    </html>
  );
}
