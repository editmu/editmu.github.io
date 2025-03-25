// src/app/legal/cookies-policy/Components/Main.jsx
import React from 'react';
import Link from 'next/link';

import Data from "../../../constants.json";





function Main() {
    return (
        <div className="bg-black min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            {/* Contenedor principal con efecto sutil de fondo */}
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8 relative z-10 shadow-xl">
                {/* Encabezado de la política */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Política de Cookies
                    </h1>
                    <div className="w-24 h-1 mx-auto mt-6 bg-gradient-to-r from-gray-700 to-gray-500 rounded-full"></div>
                    <p className="mt-4 text-gray-400">
                        Última actualización: 23 de marzo de 2025
                    </p>
                </div>

                {/* Introducción */}
                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-white mb-4">1. Introducción</h2>
                    <p className="text-gray-300 mb-4">
                        Bienvenido a Editmu. Esta Política de Cookies explica cómo utilizamos cookies y tecnologías similares para reconocerte cuando visitas nuestro sitio web. Explica qué son estas tecnologías y por qué las usamos, así como tus derechos para controlarlas.
                    </p>
                    <p className="text-gray-300">
                        Esta política debe leerse junto con nuestra Política de Privacidad y nuestros Términos de Servicio.
                    </p>
                </section>

                {/* Qué son las cookies */}
                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-white mb-4">2. ¿Qué son las cookies?</h2>
                    <p className="text-gray-300 mb-4">
                        Las cookies son pequeños archivos de datos que se colocan en tu ordenador o dispositivo móvil cuando visitas un sitio web. Las cookies son ampliamente utilizadas por los propietarios de sitios web para hacer que sus sitios funcionen, o funcionen de manera más eficiente, así como para proporcionar información de informes.
                    </p>
                    <p className="text-gray-300">
                        Las cookies establecidas por el propietario del sitio (en este caso, Editmu) se denominan "cookies propias". Las cookies establecidas por terceros que no sean el propietario del sitio se denominan "cookies de terceros". Las cookies de terceros permiten que funciones o características de terceros se proporcionen en o a través del sitio web (como publicidad, contenido interactivo y análisis).
                    </p>
                </section>

                {/* Tipos de cookies que utilizamos */}
                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-white mb-4">3. Tipos de cookies que utilizamos</h2>

                    {/* Cookies esenciales */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-blue-400 mb-2">Cookies Esenciales</h3>
                        <p className="text-gray-300 mb-2">
                            Estas cookies son necesarias para el funcionamiento del sitio web y no pueden ser desactivadas en nuestros sistemas. Generalmente solo se establecen en respuesta a acciones realizadas por ti que equivalen a una solicitud de servicios, como establecer tus preferencias de privacidad, iniciar sesión o completar formularios.
                        </p>
                        <p className="text-gray-300">
                            Puedes configurar tu navegador para bloquear o alertarte sobre estas cookies, pero algunas partes del sitio no funcionarán correctamente.
                        </p>
                    </div>

                    {/* Cookies de rendimiento */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-blue-400 mb-2">Cookies de Rendimiento</h3>
                        <p className="text-gray-300">
                            Estas cookies nos permiten contar visitas y fuentes de tráfico para que podamos medir y mejorar el rendimiento de nuestro sitio. Nos ayudan a saber qué páginas son las más y menos populares y ver cómo los visitantes se mueven por el sitio. Toda la información que recopilan estas cookies es agregada y, por lo tanto, anónima.
                        </p>
                    </div>

                    {/* Cookies de funcionalidad */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-blue-400 mb-2">Cookies de Funcionalidad</h3>
                        <p className="text-gray-300">
                            Estas cookies permiten que el sitio proporcione una funcionalidad y personalización mejoradas. Pueden ser establecidas por nosotros o por terceros cuyos servicios hemos añadido a nuestras páginas. Si no permites estas cookies, algunos o todos estos servicios pueden no funcionar correctamente.
                        </p>
                    </div>

                    {/* Cookies de publicidad */}
                    <div>
                        <h3 className="text-lg font-medium text-blue-400 mb-2">Cookies de Publicidad</h3>
                        <p className="text-gray-300">
                            Estas cookies pueden ser establecidas a través de nuestro sitio por nuestros socios publicitarios. Pueden ser utilizadas por esas empresas para construir un perfil de tus intereses y mostrarte anuncios relevantes en otros sitios. No almacenan directamente información personal, sino que se basan en la identificación única de tu navegador y dispositivo de internet.
                        </p>
                    </div>
                </section>

                {/* Cómo gestionamos las cookies */}
                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-white mb-4">4. Gestión de cookies</h2>
                    <p className="text-gray-300 mb-4">
                        Puedes gestionar las cookies de varias maneras. Ten en cuenta que eliminar o bloquear las cookies puede afectar a tu experiencia de usuario y es posible que no puedas acceder a ciertas partes de nuestro sitio web.
                    </p>

                    <h3 className="text-lg font-medium text-blue-400 mb-2">Desde tu navegador</h3>
                    <p className="text-gray-300 mb-6">
                        La mayoría de los navegadores te permiten ver qué cookies tienes y eliminarlas individualmente o bloquear las cookies de un sitio web en particular o de todos los sitios web. Ten en cuenta que si eliminas todas las cookies, perderás todos tus ajustes guardados.
                    </p>

                    <h3 className="text-lg font-medium text-blue-400 mb-2">Desde nuestro banner de cookies</h3>
                    <p className="text-gray-300">
                        Cuando visitas nuestro sitio por primera vez, te presentamos un banner de cookies que te permite aceptar o personalizar las cookies que utilizamos. Puedes cambiar tus preferencias en cualquier momento visitando nuestra página de configuración de cookies.
                    </p>
                </section>

                {/* Cookies de terceros */}
                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-white mb-4">5. Cookies de terceros</h2>
                    <p className="text-gray-300 mb-4">
                        En algunos casos especiales, también utilizamos cookies proporcionadas por terceros de confianza. La siguiente sección detalla qué cookies de terceros podrías encontrar a través de este sitio.
                    </p>
                    <ul className="list-disc pl-6 mb-4 text-gray-300">
                        <li className="mb-2">Este sitio utiliza Google Analytics, una de las soluciones de análisis más extendidas en Internet, para ayudarnos a entender cómo usas el sitio y las formas en que podemos mejorar tu experiencia.</li>
                        <li className="mb-2">También utilizamos servicios de publicidad para financiar nuestro sitio gratuito. Estos servicios pueden usar cookies para mostrar anuncios relevantes.</li>
                        <li>Es posible que ocasionalmente probemos nuevas funciones y hagamos cambios sutiles en la forma en que el sitio se presenta. Cuando estamos todavía probando nuevas funciones, estas cookies pueden utilizarse para garantizar que recibas una experiencia consistente mientras estás en el sitio.</li>
                    </ul>
                </section>

                {/* Actualizaciones a esta política */}
                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-white mb-4">6. Actualizaciones a esta política</h2>
                    <p className="text-gray-300">
                        Podemos actualizar esta Política de Cookies de vez en cuando para reflejar, por ejemplo, cambios en las cookies que utilizamos o por otras razones operativas, legales o regulatorias. Por lo tanto, vuelve a consultar esta Política de Cookies regularmente para mantenerte informado sobre nuestro uso de cookies y tecnologías relacionadas.
                    </p>
                </section>

                {/* Contacto */}
                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-white mb-4">7. Contacto</h2>
                    <p className="text-gray-300">
                        Si tienes alguna pregunta sobre nuestro uso de cookies o tecnologías similares, por favor contáctanos a:
                    </p>
                    <p className="text-blue-400 mt-2">
                        {Data.contact_email}
                    </p>
                </section>

                {/* Botón de volver */}
                <div className="text-center mt-12">
                    <Link
                        href="/"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-md text-base font-medium transition-colors duration-150 inline-block"
                    >
                        Volver al inicio
                    </Link>
                </div>

                {/* Efecto decorativo de fondo */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-transparent blur-3xl opacity-20 -z-10"></div>
            </div>
        </div>
    );
}

export default Main;