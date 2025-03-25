// src/app/login/page.jsx
import React from 'react';

import Data from "../constants.json";

//import Login from './Components/Main';
import Login2 from "./Components/Main_v2";





export const metadata = {
    title: "Iniciar Sesión | Editmu - Editor de imágenes con IA",
    description: "Accede a tu cuenta de Editmu para comenzar a transformar tus imágenes con inteligencia artificial. Edita fotos profesionales sin conocimientos técnicos y de forma gratuita.",
    keywords: ["iniciar sesión Editmu", "login editor imágenes", "acceso cuenta IA", "ingreso Editmu", "editor de imágenes", "inteligencia artificial", "edición con IA", "transformar fotos", "edición fotográfica", "cuenta usuario"],
    authors: [{ name: "Editmu", url: `${Data.main_domain}/` }],
    creator: "Editmu",
    publisher: "Editmu",
    openGraph: {
        title: "Iniciar Sesión en Editmu - Editor de imágenes con IA",
        description: "Accede a tu cuenta para transformar tus fotografías con el poder de la IA. Crea y edita imágenes profesionales con simples instrucciones de texto.",
        url: `${Data.main_domain}/login`,
        siteName: "Editmu",
        images: [
            {
                url: Data.logos.favicon,
                width: 1200,
                height: 630,
                alt: "Iniciar Sesión en Editmu - Editor de imágenes con inteligencia artificial"
            }
        ],
        type: "website",
        locale: "es_SV",
        countryName: "El Salvador"
    },
    twitter: {
        card: "summary_large_image",
        title: "Iniciar Sesión en Editmu - Editor de imágenes con IA",
        description: "Accede a tu cuenta para comenzar a transformar tus imágenes con inteligencia artificial. Edita fotos de forma gratuita y sencilla.",
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
        canonical: `${Data.main_domain}/login`,
        languages: {
            "es-SV": `${Data.main_domain}/login`,
            "es": `${Data.main_domain}/login`
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
        title: "Editmu - Iniciar Sesión"
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
            url: `${Data.main_domain}/login`,
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
            <Login2 />
        </React.Fragment>
    )
};
export default page;