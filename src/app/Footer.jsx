// src/app/Footer.jsx
'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Data from "./constants.json";





function Footer() {
    return (
        <footer className="bg-black border-t border-gray-800">
            {/* Contenedor principal con ancho máximo y padding */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Grid para layout responsivo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Primera columna: Logo e información */}
                    <div className="flex flex-col">
                        {/* Logo y nombre */}
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="relative w-8 h-8">
                                <Image
                                    src={Data.logos.favicon}
                                    alt="Editmu Logo"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    className="filter brightness-110"
                                />
                            </div>
                            <span className="font-semibold text-lg text-white">Editmu</span>
                        </div>
                        {/* Texto de desarrollo con enlace */}
                        <p className="text-xs text-gray-400 mt-2">
                            Desarrollado por <Link href="https://asogelabs.github.io/" className="text-gray-400 hover:text-white transition-colors duration-200">Asoge Labs</Link>
                        </p>
                    </div>

                    {/* Segunda columna: Enlaces legales */}
                    <div className="flex flex-col">
                        <h3 className="text-sm font-medium text-gray-300 mb-4">Información Legal</h3>
                        <div className="flex flex-col space-y-2">
                            <Link
                                href="/legal/privacy-policy"
                                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                Política de Privacidad
                            </Link>
                            <Link
                                href="/legal/terms"
                                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                Términos de Servicio
                            </Link>
                            <Link
                                href="/legal/cookies-policy"
                                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                Política de Cookies
                            </Link>
                        </div>
                    </div>

                    {/* Tercera columna: Donaciones */}
                    <div className="flex flex-col">
                        <h3 className="text-sm font-medium text-gray-300 mb-4">Apoyo al proyecto</h3>
                        <Link
                            href="https://asogelabs.github.io/donate"
                            className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 inline-block text-center mb-4"
                        >
                            Realizar donación
                        </Link>
                        <p className="text-xs text-gray-400">
                            Si no puedes realizar una donación monetaria, basta con desactivar los bloqueadores de anuncio mientras se usa la plataforma para apoyarnos.
                        </p>
                    </div>
                </div>

                {/* Línea divisoria */}
                <div className="border-t border-gray-800 my-6"></div>

                {/* Derechos de autor */}
                <div className="text-center text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} Editmu. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;