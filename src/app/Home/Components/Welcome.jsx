// src/app/Home/Components/Welcome.jsx
'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';





function Welcome({ examplesRef }) {
    // Efecto para crear la animación de gradiente optimizada
    useEffect(() => {
        // Creamos un elemento de estilo para la animación
        const styleElement = document.createElement('style');
        styleElement.innerHTML = `
            @keyframes gradient-animation {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            .animate-gradient {
                background-size: 200% auto;
                animation: gradient-animation 1.5s linear infinite;
                will-change: background-position;
                transform: translateZ(0);
            }
        `;
        // Añadimos los estilos al head del documento
        document.head.appendChild(styleElement);

        // Limpieza al desmontar
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    const handleScrollToExamples = () => {
        examplesRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-black min-h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                    Bienvenido sea{' '}
                    <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
                        el futuro
                    </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Transforma tus imágenes con el poder de la inteligencia artificial.
                    Crea fotografías profesionales con simples instrucciones de texto,
                    sin necesidad de conocimientos técnicos.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/register"
                        className="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-md text-base font-medium transition-colors duration-150"
                    >
                        Comenzar ahora
                    </Link>
                    <button
                        onClick={handleScrollToExamples}
                        className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-3 rounded-md text-base font-medium transition-colors duration-150"
                    >
                        Ver ejemplos
                    </button>
                </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent blur-3xl opacity-20"></div>
        </div>
    );
}

export default Welcome;
