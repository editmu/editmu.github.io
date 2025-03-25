// src/app/register/page.jsx
import React from 'react'

import Data from "../constants.json";

import Register from './Components/Main'





export const metadata = {
    title: "Registro | Editmu - Editor de imágenes con IA",
    description: "Crea tu cuenta en Editmu y comienza a transformar tus imágenes con inteligencia artificial. Regístrate gratis y accede a todas las herramientas de edición fotográfica sin límites.",
    keywords: ["registro Editmu", "crear cuenta", "editor de imágenes", "inteligencia artificial", "edición con IA", "cuenta gratuita", "transformar fotos", "edición fotográfica", "diseño gráfico", "procesamiento de imágenes"],
    authors: [{ name: "Editmu", url: `${Data.main_domain}/` }],
    creator: "Editmu",
    publisher: "Editmu",
    openGraph: {
        title: "Crear cuenta en Editmu - Editor de imágenes con inteligencia artificial",
        description: "Regístrate gratuitamente y comienza a transformar tus fotografías con el poder de la IA. Crea, edita y personaliza imágenes profesionales sin necesidad de conocimientos técnicos.",
        url: `${Data.main_domain}/register`,
        siteName: "Editmu",
        images: [
            {
                url: Data.logos.favicon,
                width: 1200,
                height: 630,
                alt: "Registro en Editmu - Editor de imágenes con inteligencia artificial"
            }
        ],
        type: "website",
        locale: "es_SV",
        countryName: "El Salvador"
    },
    twitter: {
        card: "summary_large_image",
        title: "Únete a Editmu - Transforma tus imágenes con IA",
        description: "Crea tu cuenta gratuita en Editmu y accede a todas las herramientas de edición fotográfica potenciadas por inteligencia artificial.",
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
        canonical: `${Data.main_domain}/register`,
        languages: {
            "es-SV": `${Data.main_domain}/register`,
            "es": `${Data.main_domain}/register`
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
        title: "Editmu - Registro de cuenta"
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
            url: `${Data.main_domain}/register`,
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
            <Register />
        </React.Fragment>
    )
}
export default page;