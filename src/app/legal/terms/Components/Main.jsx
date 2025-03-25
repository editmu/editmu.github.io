// src/app/legal/terms/Components/Main.jsx
'use client';
import React, { useState } from 'react';

import Data from "../../../constants.json";





function Main() {
    // Estado para controlar la sección activa en dispositivos móviles
    const [activeSection, setActiveSection] = useState('general');

    // Lista de secciones para la navegación lateral
    const sections = [
        { id: 'general', title: 'Términos Generales' },
        { id: 'account', title: 'Cuentas de Usuario' },
        { id: 'content', title: 'Contenido y Propiedad' },
        { id: 'restrictions', title: 'Restricciones de Uso' },
        { id: 'privacy', title: 'Privacidad y Datos' },
        { id: 'termination', title: 'Terminación' },
        { id: 'disclaimer', title: 'Limitación de Responsabilidad' },
        { id: 'changes', title: 'Cambios en los Términos' },
        { id: 'contact', title: 'Contacto' }
    ];

    return (
        <div className="bg-black min-h-screen text-gray-300">
            {/* Encabezado de la página */}
            <div className="bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">
                        Términos de Servicio
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Estos términos rigen el uso de Editmu, nuestra plataforma de edición de imágenes mediante inteligencia artificial.
                        Por favor, lee cuidadosamente antes de usar nuestros servicios.
                    </p>
                    <div className="w-24 h-1 mx-auto mt-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"></div>
                </div>
            </div>

            {/* Contenedor principal con navegación lateral y contenido */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                    {/* Navegación lateral (visible en desktop) */}
                    <nav className="hidden lg:block sticky top-8 self-start">
                        <ul className="space-y-2 border-l border-gray-800 pl-4">
                            {sections.map((section) => (
                                <li key={section.id}>
                                    <a
                                        href={`#${section.id}`}
                                        className={`block py-2 transition-colors duration-200 hover:text-white ${activeSection === section.id ? 'text-white font-medium border-l-2 border-purple-500 -ml-[17px] pl-4' : 'text-gray-400'
                                            }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setActiveSection(section.id);
                                            document.getElementById(section.id).scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Selector de sección (visible en mobile) */}
                    <div className="lg:hidden mb-8">
                        <label htmlFor="section-select" className="sr-only">
                            Seleccionar sección
                        </label>
                        <select
                            id="section-select"
                            className="block w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            value={activeSection}
                            onChange={(e) => {
                                setActiveSection(e.target.value);
                                document.getElementById(e.target.value).scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {sections.map((section) => (
                                <option key={section.id} value={section.id}>
                                    {section.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Contenido principal de los términos */}
                    <div className="lg:col-span-3">
                        <div className="prose prose-lg prose-invert max-w-none">
                            {/* Sección 1: Términos Generales */}
                            <section id="general" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">1. Términos Generales</h2>
                                <p>
                                    Al acceder y utilizar Editmu ("el Servicio"), aceptas cumplir y quedar vinculado por estos Términos de Servicio.
                                    Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder al Servicio.
                                </p>
                                <p>
                                    Editmu es una plataforma gratuita que permite a los usuarios transformar imágenes utilizando
                                    tecnología de inteligencia artificial. Nos reservamos el derecho de modificar, suspender o
                                    discontinuar cualquier aspecto del Servicio en cualquier momento.
                                </p>
                                <p>
                                    Estos Términos de Servicio constituyen un acuerdo legal entre tú y Editmu, y rigen tu uso
                                    del Servicio, reemplazando cualquier acuerdo anterior.
                                </p>
                            </section>

                            {/* Sección 2: Cuentas de Usuario */}
                            <section id="account" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">2. Cuentas de Usuario</h2>
                                <p>
                                    Para acceder a ciertas funciones del Servicio, deberás crear una cuenta. Eres responsable
                                    de mantener la confidencialidad de tu cuenta y contraseña, así como de restringir el acceso
                                    a tu dispositivo.
                                </p>
                                <p>
                                    Al crear una cuenta, confirmas que:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                    <li>Toda la información proporcionada es precisa, completa y actualizada</li>
                                    <li>Tienes al menos 18 años o cuentas con el consentimiento de un tutor legal</li>
                                    <li>Tu uso del Servicio no viola ninguna ley o regulación aplicable</li>
                                </ul>
                                <p>
                                    Nos reservamos el derecho de eliminar, recuperar o cambiar un nombre de usuario que selecciones
                                    si determinamos, a nuestra discreción, que dicho nombre de usuario es inapropiado, obsceno o
                                    de otra manera cuestionable.
                                </p>
                            </section>

                            {/* Sección 3: Contenido y Propiedad */}
                            <section id="content" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">3. Contenido y Propiedad</h2>
                                <p>
                                    Al utilizar Editmu, puedes generar imágenes basadas en tus instrucciones de texto o
                                    modificar imágenes existentes ("Contenido"). Conservas todos los derechos sobre el
                                    Contenido que generes o modifiques a través del Servicio, sujeto a las siguientes condiciones:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                    <li>Nos otorgas una licencia mundial, no exclusiva, libre de regalías para usar, almacenar
                                        y procesar el Contenido con el fin de proporcionar, mantener y mejorar el Servicio</li>
                                    <li>Eres responsable de garantizar que tienes los derechos necesarios sobre cualquier imagen
                                        que subas para modificar</li>
                                    <li>No reivindicamos propiedad o derechos de autor sobre el Contenido generado</li>
                                </ul>
                                <p>
                                    El Servicio y sus contenidos originales, características y funcionalidades son propiedad de
                                    Editmu y están protegidos por leyes internacionales de propiedad intelectual. No se concede
                                    ningún derecho para utilizar nuestra marca comercial, logotipo u otro contenido de marca sin
                                    nuestro consentimiento previo por escrito.
                                </p>
                            </section>

                            {/* Sección 4: Restricciones de Uso */}
                            <section id="restrictions" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">4. Restricciones de Uso</h2>
                                <p>
                                    Al utilizar nuestro Servicio, aceptas no:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                    <li>Generar o modificar contenido que sea ilegal, difamatorio, obsceno, pornográfico,
                                        sexualmente explícito (NSFW), que promueva el odio o la violencia, o que viole los
                                        derechos de terceros</li>
                                    <li>Intentar generar imágenes que representen a menores de edad en situaciones inapropiadas</li>
                                    <li>Utilizar el Servicio para crear contenido que infrinja derechos de autor, marcas comerciales
                                        u otros derechos de propiedad intelectual</li>
                                    <li>Realizar ingeniería inversa, descompilar o desmontar cualquier parte del Servicio</li>
                                    <li>Utilizar el Servicio de manera que pueda dañar, deshabilitar o sobrecargar nuestros servidores</li>
                                    <li>Utilizar bots, scrapers u otros medios automatizados para acceder al Servicio</li>
                                    <li>Vender, revender o explotar comercialmente el Servicio sin autorización explícita</li>
                                </ul>
                                <p>
                                    La violación de estas restricciones puede resultar en la terminación de tu cuenta y
                                    posibles acciones legales.
                                </p>
                            </section>

                            {/* Sección 5: Privacidad y Datos */}
                            <section id="privacy" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">5. Privacidad y Datos</h2>
                                <p>
                                    Tu privacidad es importante para nosotros. Nuestra Política de Privacidad, disponible en
                                    nuestra plataforma, describe cómo recopilamos, utilizamos y compartimos tu información
                                    cuando utilizas nuestro Servicio.
                                </p>
                                <p>
                                    Al utilizar Editmu, aceptas nuestras prácticas de datos descritas en la Política de Privacidad.
                                    Ten en cuenta que:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                    <li>Todas las imágenes se procesan en tiempo real y no se almacenan permanentemente en nuestros servidores</li>
                                    <li>El historial de edición solo se mantiene durante tu sesión actual</li>
                                    <li>Es tu responsabilidad descargar y guardar tus creaciones, ya que no se conservarán
                                        una vez que cierres o actualices la aplicación</li>
                                </ul>
                                <p>
                                    Utilizamos anuncios no intrusivos para financiar el servicio gratuito. Te pedimos que consideres
                                    desactivar los bloqueadores de anuncios mientras utilizas Editmu para apoyar la operación
                                    continua del servicio.
                                </p>
                            </section>

                            {/* Sección 6: Terminación */}
                            <section id="termination" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">6. Terminación</h2>
                                <p>
                                    Podemos terminar o suspender tu cuenta y acceso al Servicio inmediatamente, sin previo aviso
                                    ni responsabilidad, por cualquier motivo, incluido, sin limitación, si incumples estos Términos
                                    de Servicio.
                                </p>
                                <p>
                                    En caso de terminación, tu derecho a utilizar el Servicio cesará inmediatamente. Si deseas
                                    terminar tu cuenta, simplemente puedes dejar de usar el Servicio.
                                </p>
                                <p>
                                    Todas las disposiciones de estos Términos que por su naturaleza deberían sobrevivir a la
                                    terminación sobrevivirán, incluyendo, sin limitación, disposiciones de propiedad, renuncias
                                    de garantía, indemnización y limitaciones de responsabilidad.
                                </p>
                            </section>

                            {/* Sección 7: Limitación de Responsabilidad */}
                            <section id="disclaimer" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">7. Limitación de Responsabilidad</h2>
                                <p>
                                    Editmu y sus servicios se proporcionan "tal cual" y "según disponibilidad" sin garantías
                                    de ningún tipo, ya sean expresas o implícitas.
                                </p>
                                <p>
                                    No garantizamos que:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                    <li>El Servicio funcionará ininterrumpidamente o estará disponible en un momento o ubicación particular</li>
                                    <li>Los resultados de la edición de imágenes cumplirán con tus expectativas o requisitos</li>
                                    <li>Cualquier error o defecto será corregido</li>
                                    <li>El Servicio está libre de virus u otros componentes dañinos</li>
                                </ul>
                                <p>
                                    En ningún caso Editmu, sus directores, empleados, socios, agentes o proveedores serán
                                    responsables por cualquier daño indirecto, incidental, especial, consecuente o punitivo,
                                    incluyendo sin limitación, pérdida de beneficios, datos, uso, buena voluntad u otras
                                    pérdidas intangibles.
                                </p>
                            </section>

                            {/* Sección 8: Cambios en los Términos */}
                            <section id="changes" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">8. Cambios en los Términos</h2>
                                <p>
                                    Nos reservamos el derecho de modificar o reemplazar estos Términos en cualquier momento a
                                    nuestra discreción. Si realizamos cambios materiales, haremos esfuerzos razonables para
                                    proporcionar al menos 15 días de aviso antes de que los nuevos términos entren en vigor.
                                </p>
                                <p>
                                    El uso continuado de nuestro Servicio después de dichos cambios constituye tu aceptación
                                    de los nuevos Términos. Si no estás de acuerdo con los nuevos términos, por favor deja de
                                    usar el Servicio.
                                </p>
                                <p>
                                    Es tu responsabilidad revisar periódicamente estos Términos para estar informado de
                                    cualquier actualización o cambio.
                                </p>
                            </section>

                            {/* Sección 9: Contacto */}
                            <section id="contact" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">9. Contacto</h2>
                                <p>
                                    Si tienes alguna pregunta sobre estos Términos de Servicio, por favor contáctanos a través de:
                                </p>
                                <div className="mt-4 p-6 bg-gray-900 rounded-lg border border-gray-800">
                                    <p className="text-white font-medium mb-1">Correo electrónico:</p>
                                    <p className="text-gray-400 mb-4">{Data.contact_email}</p>
                                </div>
                                <p className="mt-6 text-sm text-gray-500">
                                    Última actualización: 23 de marzo de 2025
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;