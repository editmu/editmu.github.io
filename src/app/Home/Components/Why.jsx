// src/app/Home/Components/Why.jsx
import React from 'react';





function Why() {
    return (
        <section className="bg-black py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Título con diseño mejorado */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">¿Por qué usar Editmu?</h2>
                    <div className="w-24 h-1 mx-auto mt-6 bg-gradient-to-r from-gray-700 to-gray-500 rounded-full"></div>
                </div>

                {/* Contenedor de tarjetas con sombras mejoradas */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Tarjeta 1 - Diseño mejorado */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-7 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/30 group">
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-200">¿Es gratis?</h3>
                        <p className="text-gray-400 text-sm">
                            Totalmente gratuito. Nos financiamos con anuncios no intrusivos, por favor considera desactivar bloqueadores mientras usas la plataforma.
                        </p>
                    </div>

                    {/* Tarjeta 2 */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-7 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/30 group">
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-200">¿Tiene límites?</h3>
                        <p className="text-gray-400 text-sm">
                            Sin límites de generación. El historial guarda 10 versiones por imagen, pero puedes reiniciarlo para continuar trabajando.
                        </p>
                    </div>

                    {/* Tarjeta 3 */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-7 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/30 group">
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-200">¿Puedo editar cualquier contenido?</h3>
                        <p className="text-gray-400 text-sm">
                            No se permite contenido NSFW, alusión al crimen o material que viole los límites éticos y comunitarios.
                        </p>
                    </div>

                    {/* Tarjeta 4 */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-7 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/30 group">
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-200">¿Necesito conocimientos técnicos?</h3>
                        <p className="text-gray-400 text-sm">
                            Interfaz intuitiva diseñada para todos los niveles. Crea imágenes profesionales sin experiencia técnica previa.
                        </p>
                    </div>

                    {/* Tarjeta 5 */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-7 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/30 group">
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-200">¿Qué calidad tienen las imágenes?</h3>
                        <p className="text-gray-400 text-sm">
                            Alta calidad para uso personal o profesional. Resoluciones óptimas para la mayoría de usos digitales.
                        </p>
                    </div>

                    {/* Tarjeta 6 */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-7 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/30 group">
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-200">¿Dónde se guardan mis imágenes?</h3>
                        <p className="text-gray-400 text-sm">
                            Todo ocurre en tiempo real sin almacenamiento en la nube. Al reiniciar la sesión, se pierde el progreso. Descarga tus creaciones importantes.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Why;