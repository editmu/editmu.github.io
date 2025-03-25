// src/app/studio/page.jsx
import React from 'react';

import Data from "../constants.json";

import Dashboard from './Components/Dashboard';





export const metadata = {
    title: "AI Studio | Editmu - Editor de imágenes con IA",
    description: "Accede a tu estudio de edición de imágenes con inteligencia artificial. Transforma y mejora tus fotografías con instrucciones de texto simples, sin conocimientos técnicos y completamente gratis.",
    keywords: ["estudio de edición", "editor de imágenes", "inteligencia artificial", "edición con IA", "transformar fotos", "procesamiento de imágenes", "modificación de imágenes", "editor fotográfico gratuito", "AI para fotografías", "generar imágenes", "retoque fotográfico"],
    authors: [{ name: "Editmu", url: `${Data.main_domain}/` }],
    creator: "Editmu",
    publisher: "Editmu",
    openGraph: {
        title: "Editmu Studio - Tu espacio de trabajo para edición de imágenes con IA",
        description: "Accede a tu estudio de edición personal para transformar tus fotografías con el poder de la IA. Edita, personaliza y mejora imágenes con simples instrucciones de texto, sin necesidad de conocimientos técnicos.",
        url: `${Data.main_domain}/studio`,
        siteName: "Editmu",
        images: [
            {
                url: Data.logos.favicon,
                width: 1200,
                height: 630,
                alt: "Editmu Studio - Espacio de edición de imágenes con inteligencia artificial"
            }
        ],
        type: "website",
        locale: "es_SV",
        countryName: "El Salvador"
    },
    twitter: {
        card: "summary_large_image",
        title: "Editmu Studio - Tu espacio de edición con IA",
        description: "Accede a tu área de trabajo personal para transformar imágenes con inteligencia artificial. Convierte tus ideas en realidad con simples instrucciones de texto.",
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
        canonical: `${Data.main_domain}/studio`,
        languages: {
            "es-SV": `${Data.main_domain}/studio`,
            "es": `${Data.main_domain}/studio`
        },
    },
    category: "Diseño y Fotografía",
    classification: "Editor de Imágenes, Inteligencia Artificial, Tecnología, Estudio de Edición",
    formatDetection: {
        email: false,
        address: false,
        telephone: false
    },
    applicationName: "Editmu",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "Editmu Studio - Edición de imágenes con IA"
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
            url: `${Data.main_domain}/studio`,
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
const Page = () => {
    return (
        <React.Fragment>
            <Dashboard />
        </React.Fragment>
    );
}

export default Page;
