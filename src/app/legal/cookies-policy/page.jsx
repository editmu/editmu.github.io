// src/app/legal/cookies-policy/page.jsx
import React from 'react';

import Data from "../../constants.json";

import Main from './Components/Main';





export const metadata = {
    title: "Política de Cookies | Editmu - Editor de imágenes con IA",
    description: "Conoce cómo utilizamos cookies en Editmu, nuestro editor de imágenes con inteligencia artificial. Información sobre tipos de cookies, gestión y configuración de privacidad.",
    keywords: ["política de cookies", "privacidad web", "cookies Editmu", "configuración de cookies", "editor de imágenes IA", "gestión de cookies", "privacidad inteligencia artificial", "cookies esenciales", "cookies de rendimiento", "políticas de privacidad"],
    authors: [{ name: "Editmu", url: `${Data.main_domain}/legal/cookies-policy` }],
    creator: "Editmu",
    publisher: "Editmu",
    openGraph: {
        title: "Política de Cookies | Editmu - Editor de imágenes con IA",
        description: "Descubre cómo utilizamos cookies en nuestro editor de imágenes con IA. Información detallada sobre tipos de cookies, cómo gestionarlas y cómo protegemos tu privacidad mientras usas Editmu.",
        url: `${Data.main_domain}/legal/cookies-policy`,
        siteName: "Editmu",
        images: [
            {
                url: Data.logos.favicon,
                width: 1200,
                height: 630,
                alt: "Política de Cookies de Editmu - Editor de imágenes con IA"
            }
        ],
        type: "website",
        locale: "es_SV",
        countryName: "El Salvador"
    },
    twitter: {
        card: "summary_large_image",
        title: "Política de Cookies | Editmu - Editor de imágenes con IA",
        description: "Información completa sobre el uso de cookies en Editmu, editor de imágenes potenciado por inteligencia artificial. Gestiona tus preferencias de privacidad.",
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
        canonical: `${Data.main_domain}/legal/cookies-policy`,
        languages: {
            "es-SV": `${Data.main_domain}/legal/cookies-policy`,
            "es": `${Data.main_domain}/legal/cookies-policy`
        },
    },
    category: "Legal y Privacidad",
    classification: "Política de Cookies, Privacidad, Términos Legales",
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
            url: `${Data.main_domain}/legal/cookies-policy`,
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