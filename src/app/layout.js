// src/app/layout.js
import React from "react";

import "./globals.css";

import Data from "./constants.json";

import Navigation from './Navigation';
import Footer from "./Footer";





export const metadata = {
  title: "Inicio | Editmu - Editor de imágenes con IA",
  description: "Transforma tus imágenes con inteligencia artificial. Edita fotos profesionales con simples instrucciones de texto, sin conocimientos técnicos previos y totalmente gratis.",
  keywords: ["editor de imágenes", "inteligencia artificial", "edición con IA", "transformar fotos", "edición fotográfica", "diseño gráfico", "procesamiento de imágenes", "editor gratuito", "modificación de fotos", "AI para imágenes"],
  authors: [{ name: "Editmu", url: `${Data.main_domain}/` }],
  creator: "Editmu",
  publisher: "Editmu",
  openGraph: {
    title: "Editmu - Editor de imágenes potenciado por inteligencia artificial",
    description: "Transforma tus fotografías con el poder de la IA. Crea, edita y personaliza imágenes profesionales con simples instrucciones de texto, sin necesidad de conocimientos técnicos.",
    url: `${Data.main_domain}/`,
    siteName: "Editmu",
    images: [
      {
        url: Data.logos.favicon,
        width: 1200,
        height: 630,
        alt: "Editmu - Editor de imágenes con inteligencia artificial"
      }
    ],
    type: "website",
    locale: "es_SV",
    countryName: "El Salvador"
  },
  twitter: {
    card: "summary_large_image",
    title: "Editmu - Transforma tus imágenes con IA",
    description: "Editor de imágenes gratuito potenciado por inteligencia artificial. Convierte tus ideas en realidad con simples instrucciones de texto.",
    image: Data.logos.favicon,
    creator: "@editmu",
    site: "@editmu"
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1
    }
  },
  icons: {
    icon: Data.logos.favicon,
    shortcut: Data.logos.favicon,
    apple: Data.logos.favicon,
    other: {
      rel: "apple-touch-icon-precomposed",
      url: Data.logos.favicon
    }
  },
  verification: {
    google: Data.SEO.google_search_console_id,
  },
  alternates: {
    canonical: `${Data.main_domain}/`,
    languages: {
      "es-SV": `${Data.main_domain}/`,
      "es": `${Data.main_domain}/`
    },
  },
  category: "Diseño y Fotografía",
  classification: "Editor de Imágenes, Inteligencia Artificial, Tecnología",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  applicationName: "Editmu",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Editmu - Editor de imágenes con IA"
  },
  manifest: "/manifest.json",
  themeColor: Data.colorMarca,
  colorScheme: "dark light",
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  appLinks: {
    android: {
      package: Data.android_package,
      app_name: Data.android_appname
    },
    web: {
      url: `${Data.main_domain}/`,
      should_fallback: true
    }
  },
  metadataBase: new URL(`${Data.main_domain}/`),
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
  },
  geo: {
    region: "SV",
    placename: "El Salvador",
  }
};
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="93cf8f7002840987f8e060434021368a06c3b4a1" content="93cf8f7002840987f8e060434021368a06c3b4a1" />
      </head>
      <body>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}