// src/app/legal/privacy-policy/Components/Main.jsx
import React from 'react';

import Data from "../../../constants.json";





function Main() {
    return (
        <div className="bg-black min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            {/* Contenedor principal */}
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8 shadow-lg">
                {/* Encabezado de la página */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Política de Privacidad
                    </h1>
                    <div className="w-24 h-1 mx-auto mt-4 bg-gradient-to-r from-gray-700 to-gray-500 rounded-full"></div>
                    <p className="mt-4 text-gray-400">
                        Última actualización: 23 de marzo de 2025
                    </p>
                </div>

                {/* Contenido de la política */}
                <div className="space-y-8 text-gray-300">
                    {/* Introducción */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Introducción</h2>
                        <p className="text-gray-400 mb-3">
                            En Editmu ("nosotros", "nuestro", "la plataforma") respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política de privacidad tiene como objetivo informarte sobre cómo recopilamos, usamos y protegemos cualquier información que nos proporciones al utilizar nuestra plataforma.
                        </p>
                        <p className="text-gray-400">
                            Editmu es una plataforma de edición de imágenes basada en inteligencia artificial que permite a los usuarios transformar fotografías mediante instrucciones de texto.
                        </p>
                    </section>

                    {/* Información que recopilamos */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. Información que recopilamos</h2>
                        <p className="text-gray-400 mb-3">
                            Para proporcionarte nuestros servicios, podemos recopilar los siguientes tipos de información:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-2">
                            <li>
                                <span className="text-white">Información de registro:</span> Cuando creas una cuenta, podemos solicitar tu nombre, dirección de correo electrónico y contraseña.
                            </li>
                            <li>
                                <span className="text-white">Imágenes y contenido:</span> Las imágenes que subes y las instrucciones de texto que proporcionas para editarlas.
                            </li>
                            <li>
                                <span className="text-white">Información técnica:</span> Datos sobre tu dispositivo, navegador, dirección IP y cómo interactúas con nuestra plataforma.
                            </li>
                            <li>
                                <span className="text-white">Cookies y tecnologías similares:</span> Utilizamos cookies para mejorar tu experiencia, recordar tus preferencias y mostrar anuncios relevantes.
                            </li>
                        </ul>
                    </section>

                    {/* Cómo usamos tu información */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. Cómo usamos tu información</h2>
                        <p className="text-gray-400 mb-3">
                            Utilizamos la información recopilada para:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-2">
                            <li>Proporcionar, mantener y mejorar nuestros servicios de edición de imágenes.</li>
                            <li>Procesar tus instrucciones y generar las ediciones solicitadas.</li>
                            <li>Personalizar tu experiencia y ofrecerte contenido relevante.</li>
                            <li>Mostrar anuncios no intrusivos que nos permiten ofrecer un servicio gratuito.</li>
                            <li>Analizar el uso de nuestra plataforma para mejorar nuestros servicios.</li>
                            <li>Detectar y prevenir actividades fraudulentas o abusivas.</li>
                            <li>Comunicarnos contigo sobre actualizaciones, novedades o cambios en nuestros servicios.</li>
                        </ul>
                    </section>

                    {/* Almacenamiento de datos */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Almacenamiento de datos</h2>
                        <p className="text-gray-400 mb-3">
                            Como se indica en nuestra sección "¿Dónde se guardan mis imágenes?", todo el procesamiento ocurre en tiempo real sin almacenamiento permanente en la nube:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-2">
                            <li>Las imágenes y sus versiones editadas se almacenan temporalmente durante tu sesión.</li>
                            <li>Al reiniciar la sesión o cerrar el navegador, se pierde el progreso no guardado.</li>
                            <li>Te recomendamos descargar tus creaciones importantes antes de finalizar tu sesión.</li>
                            <li>El historial guarda hasta 10 versiones por imagen durante tu sesión activa.</li>
                        </ul>
                    </section>

                    {/* Compartir información */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. Compartir información</h2>
                        <p className="text-gray-400 mb-3">
                            No vendemos ni alquilamos tus datos personales a terceros. Sin embargo, podemos compartir información en las siguientes circunstancias:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-2">
                            <li>Con proveedores de servicios que nos ayudan a operar la plataforma (procesamiento de pagos, alojamiento, análisis).</li>
                            <li>Para cumplir con obligaciones legales o responder a solicitudes legítimas de autoridades públicas.</li>
                            <li>Para proteger nuestros derechos, privacidad, seguridad o propiedad, así como los de nuestros usuarios.</li>
                            <li>Con socios publicitarios para mostrar anuncios relevantes que financian nuestro servicio gratuito.</li>
                        </ul>
                    </section>

                    {/* Tus derechos */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">6. Tus derechos</h2>
                        <p className="text-gray-400 mb-3">
                            Dependiendo de tu ubicación, puedes tener los siguientes derechos sobre tus datos personales:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-2">
                            <li>Acceder a los datos personales que tenemos sobre ti.</li>
                            <li>Corregir datos inexactos o incompletos.</li>
                            <li>Eliminar tus datos personales.</li>
                            <li>Restringir u oponerte al procesamiento de tus datos.</li>
                            <li>Recibir tus datos en un formato estructurado y transferible.</li>
                            <li>Retirar tu consentimiento en cualquier momento.</li>
                        </ul>
                        <p className="text-gray-400 mt-3">
                            Para ejercer estos derechos, contáctanos a través de nuestra sección de soporte.
                        </p>
                    </section>

                    {/* Seguridad */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">7. Seguridad</h2>
                        <p className="text-gray-400">
                            Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales contra el acceso, uso o divulgación no autorizados. Sin embargo, ninguna transmisión por Internet o método de almacenamiento electrónico es completamente seguro, por lo que no podemos garantizar su seguridad absoluta.
                        </p>
                    </section>

                    {/* Contenido prohibido */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">8. Contenido prohibido</h2>
                        <p className="text-gray-400 mb-3">
                            Como se menciona en nuestra sección "¿Puedo editar cualquier contenido?", no permitimos:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-2">
                            <li>Contenido NSFW (Not Safe For Work) o de naturaleza sexual explícita.</li>
                            <li>Imágenes que hagan alusión al crimen o actividades ilegales.</li>
                            <li>Material que viole los límites éticos establecidos en nuestros términos de servicio.</li>
                            <li>Contenido que infrinja derechos de autor o propiedad intelectual de terceros.</li>
                        </ul>
                        <p className="text-gray-400 mt-3">
                            Nos reservamos el derecho de eliminar dicho contenido y suspender las cuentas que violen estas restricciones.
                        </p>
                    </section>

                    {/* Cambios en la política */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">9. Cambios en la política de privacidad</h2>
                        <p className="text-gray-400">
                            Podemos actualizar esta política de privacidad periódicamente para reflejar cambios en nuestras prácticas o por otros motivos operativos, legales o regulatorios. Te notificaremos sobre cualquier cambio material publicando la nueva política en esta página y, cuando sea apropiado, te enviaremos una notificación por correo electrónico.
                        </p>
                    </section>

                    {/* Contacto */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">10. Contacto</h2>
                        <p className="text-gray-400">
                            Si tienes preguntas sobre esta política de privacidad o sobre cómo tratamos tus datos personales, contáctanos a través de:
                        </p>
                        <div className="mt-3 py-3 px-4 bg-gray-800 rounded-lg text-gray-300">
                            <p>Correo electrónico: <span className="text-blue-400">{Data.contact_email}</span></p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
};
export default Main;