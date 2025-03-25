// src/app/legal/terms/page.jsx
import React from 'react';

import Data from "../../constants.json";

import Main from './Components/Main';





export const metadata = {
    title: "Términos de Servicio | Editmu - Editor de imágenes con IA",
    description: "Conoce los términos y condiciones de uso de Editmu, nuestra plataforma gratuita de edición de imágenes con inteligencia artificial. Información sobre derechos, restricciones y políticas de uso.",
    keywords: ["términos de servicio", "condiciones de uso", "editor de imágenes", "edición con IA", "políticas de privacidad", "restricciones de uso", "derechos de contenido", "limitación de responsabilidad", "términos legales", "Editmu"],
    authors: [{ name: "Editmu", url: `${Data.main_domain}/terms` }],
    creator: "Editmu",
    publisher: "Editmu",
    openGraph: {
        title: "Términos de Servicio | Editmu - Editor de imágenes con IA",
        description: "Consulta los términos y condiciones que rigen el uso de Editmu, nuestra plataforma gratuita de edición de imágenes con inteligencia artificial. Información importante sobre derechos, restricciones y políticas.",
        url: `${Data.main_domain}/terms`,
        siteName: "Editmu",
        images: [
            {
                url: Data.logos.favicon,
                width: 1200,
                height: 630,
                alt: "Términos de Servicio de Editmu - Editor de imágenes con IA"
            }
        ],
        type: "website",
        locale: "es_SV",
        countryName: "El Salvador"
    },
    twitter: {
        card: "summary_large_image",
        title: "Términos de Servicio | Editmu - Editor de imágenes con IA",
        description: "Consulta los términos y condiciones de uso de nuestra plataforma gratuita de edición de imágenes con inteligencia artificial.",
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
        canonical: `${Data.main_domain}/terms`,
        languages: {
            "es-SV": `${Data.main_domain}/terms`,
            "es": `${Data.main_domain}/terms`
        },
    },
    category: "Legal",
    classification: "Términos de Servicio, Políticas, Legal, Editor de Imágenes, Inteligencia Artificial",
    formatDetection: {
        email: false,
        address: false,
        telephone: false
    },
    applicationName: "Editmu",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "Términos de Servicio | Editmu"
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
            url: `${Data.main_domain}/terms`,
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
function page() {
    return (
        <React.Fragment>
            <Main />
        </React.Fragment>
    )
};
export default page;