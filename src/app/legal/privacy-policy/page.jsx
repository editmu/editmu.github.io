// src/app/legal/privacy-policy/page.jsx
import React from 'react';

import Data from "../../constants.json";

import Main from './Components/Main';





export const metadata = {
    title: "Política de Privacidad | Editmu - Editor de imágenes con IA",
    description: "Conoce cómo Editmu protege tus datos personales. Información sobre la recopilación, uso y almacenamiento de datos en nuestra plataforma de edición de imágenes con inteligencia artificial.",
    keywords: ["política de privacidad", "protección de datos", "privacidad Editmu", "seguridad de datos", "derechos de usuario", "almacenamiento de imágenes", "procesamiento de datos", "confidencialidad", "cookies", "información personal"],
    authors: [{ name: "Editmu", url: `${Data.main_domain}/legal/privacy-policy` }],
    creator: "Editmu",
    publisher: "Editmu",
    openGraph: {
        title: "Política de Privacidad | Editmu - Protección de tus datos personales",
        description: "Descubre cómo protegemos tu privacidad en Editmu. Información detallada sobre la recopilación, uso y protección de datos en nuestra plataforma de edición de imágenes con IA.",
        url: `${Data.main_domain}/legal/privacy-policy`,
        siteName: "Editmu",
        images: [
            {
                url: Data.logos.favicon,
                width: 1200,
                height: 630,
                alt: "Política de Privacidad de Editmu - Editor de imágenes con IA"
            }
        ],
        type: "website",
        locale: "es_SV",
        countryName: "El Salvador"
    },
    twitter: {
        card: "summary_large_image",
        title: "Política de Privacidad | Editmu - Protección de datos personales",
        description: "Información completa sobre cómo Editmu protege tus datos. Conoce tus derechos y cómo mantenemos segura tu información al usar nuestro editor de imágenes con IA.",
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
        canonical: `${Data.main_domain}/legal/privacy-policy`,
        languages: {
            "es-SV": `${Data.main_domain}/legal/privacy-policy`,
            "es": `${Data.main_domain}/legal/privacy-policy`
        },
    },
    category: "Legal",
    classification: "Política de Privacidad, Protección de Datos, Términos Legales",
    formatDetection: {
        email: false,
        address: false,
        telephone: false
    },
    applicationName: "Editmu",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "Política de Privacidad | Editmu"
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
            url: `${Data.main_domain}/legal/privacy-policy`,
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