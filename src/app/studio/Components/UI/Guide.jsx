// src/app/studio/Components/UI/Guide.jsx
import React from 'react';
import Image from 'next/image';

import Data from "../../../constants.json";





function Guide() {
    return (
        <div className="bg-black border border-gray-800 rounded-lg shadow-lg overflow-hidden mb-6 mt-6">
            {/* Cabecera de la guía con título */}
            <div className="bg-gradient-to-r from-gray-900 to-black p-3 flex items-center">
                <div className="relative w-5 h-5 mr-2">
                    <Image
                        src={Data.logos.favicon}
                        alt="Editmu Logo"
                        fill
                        style={{ objectFit: 'contain' }}
                        className="filter brightness-110"
                    />
                </div>
                <h3 className="text-white font-semibold text-sm">Instrucciones de uso</h3>
            </div>

            {/* Contenido simplificado de la guía */}
            <div className="p-3 bg-gray-900 text-gray-300 text-sm">
                <div className="space-y-2">
                    <div className="flex space-x-2">
                        <div className="flex-shrink-0 w-1/3">
                            <h4 className="text-white font-medium text-xs">Cómo usar:</h4>
                        </div>
                        <div className="w-2/3">
                            <p className="text-xs">Sube una imagen, Escribe instrucciones claras, Presiona "Procesar Imagen".</p>
                        </div>
                    </div>

                    <div className="flex space-x-2 border-t border-gray-800 pt-2">
                        <div className="flex-shrink-0 w-1/3">
                            <h4 className="text-white font-medium text-xs">Consejos:</h4>
                        </div>
                        <div className="w-2/3">
                            <p className="text-xs">Sé específico. Indica estilos artísticos. Menciona colores o cambios de fondo.</p>
                        </div>
                    </div>

                    <div className="flex space-x-2 border-t border-gray-800 pt-2">
                        <div className="flex-shrink-0 w-1/3">
                            <h4 className="text-white font-medium text-xs">Importante:</h4>
                        </div>
                        <div className="w-2/3">
                            <p className="text-xs text-gray-400">No se permite contenido NSFW, alusión al crimen o material antiético.</p>
                        </div>
                    </div>

                    {/* Nueva sección de idiomas soportados */}
                    <div className="flex space-x-2 border-t border-gray-800 pt-2">
                        <div className="flex-shrink-0 w-1/3">
                            <h4 className="text-white font-medium text-xs">Soporta instrucciones en estos idiomas:</h4>
                        </div>
                        <div className="w-2/3 flex items-center space-x-4">
                            {/* Contenedor para el GIF de Español */}
                            <div className="flex flex-col items-center">
                                <div className="relative w-10 h-10 overflow-hidden rounded-full">
                                    <Image
                                        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYndveGc4dmtxeTZkNGdpMXpjbDFhNDhyOWVuNDA1Nzh4ZnR0c2o2OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uoZFpPDcH7DtYqGyk8/giphy.gif"
                                        alt="Español"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <span className="text-xs mt-1 text-gray-400">Español</span>
                            </div>

                            {/* Contenedor para el GIF de Inglés */}
                            <div className="flex flex-col items-center">
                                <div className="relative w-10 h-10 overflow-hidden rounded-full">
                                    <Image
                                        src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjl3NmlhNjI2cmhrOWdtZ2dzdWdmYmo2eDU1NGE1czhscXFxN2l3YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jchhyQ3o4naSGXjr5u/giphy.gif"
                                        alt="Inglés"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <span className="text-xs mt-1 text-gray-400">Inglés</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Guide;