// src/app/Navigation.jsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaUserCircle, FaEye, FaEyeSlash, FaBars, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Data from "./constants.json";

import supabase from './lib/supabaseClient';





function Navigation() {
    const [session, setSession] = useState(null);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEmail, setShowEmail] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Estado para controlar la visibilidad del modal de confirmación de cierre de sesión
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const router = useRouter();

    // Referencias para los menús desplegables
    const profileMenuRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const profileButtonRef = useRef(null);
    const mobileMenuButtonRef = useRef(null);
    
    // Referencia para el modal de confirmación
    const logoutModalRef = useRef(null);

    useEffect(() => {
        // Obtener la sesión actual al cargar el componente
        const loadSessionAndUserInfo = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setSession(session);

                if (session) {
                    setBasicUserInfo(session);
                }

                // Simular un pequeño retraso para asegurar una transición suave
                setTimeout(() => {
                    setLoading(false);
                }, 800);
            } catch (error) {
                console.error("Error al cargar la sesión:", error);
                setLoading(false);
            }
        };

        loadSessionAndUserInfo();

        // Suscribirse a cambios en el estado de autenticación
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            if (session) {
                setBasicUserInfo(session);
            } else {
                setUserInfo(null);
            }
        });

        // Limpiar la suscripción al desmontar el componente
        return () => subscription.unsubscribe();
    }, []);

    // Efecto para cerrar los menús cuando se hace clic fuera de ellos
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Cerrar menú de perfil si está abierto y se hace clic fuera
            if (showProfileMenu &&
                profileMenuRef.current &&
                !profileMenuRef.current.contains(event.target) &&
                profileButtonRef.current &&
                !profileButtonRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }

            // Cerrar menú móvil si está abierto y se hace clic fuera
            if (mobileMenuOpen &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                mobileMenuButtonRef.current &&
                !mobileMenuButtonRef.current.contains(event.target)) {
                setMobileMenuOpen(false);
            }

            // Cerrar modal de confirmación si está abierto y se hace clic fuera
            if (showLogoutConfirm &&
                logoutModalRef.current &&
                !logoutModalRef.current.contains(event.target)) {
                setShowLogoutConfirm(false);
            }
        };

        // También cerrar menús al presionar la tecla Escape
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                setShowProfileMenu(false);
                setMobileMenuOpen(false);
                setShowLogoutConfirm(false);
            }
        };

        // Añadir event listeners
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscKey);

        // Limpiar los event listeners
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [showProfileMenu, mobileMenuOpen, showLogoutConfirm]);

    // Función para extraer información básica del usuario desde la sesión
    const setBasicUserInfo = (session) => {
        if (!session) return;

        try {
            // Extraer información de los metadatos de usuario
            const userName = session.user.user_metadata?.full_name ||
                session.user.user_metadata?.name ||
                session.user.email?.split('@')[0] ||
                'Usuario';

            setUserInfo({
                id: session.user.id,
                full_name: userName,
                email: session.user.email,
                created_at: session.user.created_at
            });
        } catch (error) {
            console.error('Error al procesar información básica del usuario:', error);
        }
    };

    // Función para alternar la visibilidad del menú de perfil
    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
        // Si abrimos el menú de perfil, cerramos el menú móvil si está abierto
        if (mobileMenuOpen) setMobileMenuOpen(false);
    };

    // Función para alternar la visibilidad del menú móvil
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        // Si abrimos el menú móvil, cerramos el menú de perfil si está abierto
        if (showProfileMenu) setShowProfileMenu(false);
    };

    // Función para cerrar el menú móvil
    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    // Función para alternar la visibilidad del correo electrónico
    const toggleEmailVisibility = (e) => {
        e.stopPropagation(); // Evitar que el clic cierre el menú de perfil
        setShowEmail(!showEmail);
    };

    // Función para ocultar parcialmente el correo electrónico
    const maskEmail = (email) => {
        if (!email) return '';
        const [username, domain] = email.split('@');
        return showEmail ? email : `******@${domain}`;
    };

    // Función para mostrar el modal de confirmación de cierre de sesión
    const promptLogout = () => {
        setShowLogoutConfirm(true);
    };

    // Función para cancelar el cierre de sesión
    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    // Función para cerrar sesión
    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            setShowProfileMenu(false);
            setMobileMenuOpen(false);
            setShowLogoutConfirm(false);
            router.push('/'); // Redireccionar a la página principal después de cerrar sesión
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    // Procesar el nombre para mostrar
    const displayName = userInfo?.full_name ||
        (userInfo?.email ? userInfo.email.split('@')[0] : 'Usuario');

    // Componente de Loader mientras carga
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-16 bg-black">
                <div className="inline-flex items-center">
                    <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <>
            <nav className="bg-black border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo y nombre del sitio */}
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center space-x-2">
                                <Link href={session ? "/studio" : "/"} className="flex items-center">
                                    <div className="relative w-8 h-8 mr-2">
                                        <Image
                                            src={Data.logos.favicon}
                                            alt="Editmu Logo"
                                            fill
                                            style={{ objectFit: 'contain' }}
                                            className="filter brightness-110"
                                        />
                                    </div>
                                    <span className="font-semibold text-lg text-white">Editmu</span>
                                </Link>
                            </div>
                        </div>

                        {/* Botón de menú hamburguesa (visible solo en móvil) */}
                        <div className="sm:hidden flex items-center">
                            <button
                                ref={mobileMenuButtonRef}
                                onClick={toggleMobileMenu}
                                className="text-gray-400 hover:text-white focus:outline-none p-2"
                                aria-expanded={mobileMenuOpen ? "true" : "false"}
                                aria-haspopup="true"
                            >
                                {mobileMenuOpen ? (
                                    <FaTimes className="h-6 w-6" />
                                ) : (
                                    <FaBars className="h-6 w-6" />
                                )}
                            </button>
                        </div>

                        {/* Sección de perfil o autenticación (visible solo en desktop) */}
                        <div className="hidden sm:flex items-center">
                            {session ? (
                                <div className="relative ml-3">
                                    <div>
                                        <button
                                            ref={profileButtonRef}
                                            onClick={toggleProfileMenu}
                                            className="flex items-center text-gray-400 hover:text-white focus:outline-none transition-colors duration-200"
                                            aria-expanded={showProfileMenu ? "true" : "false"}
                                            aria-haspopup="true"
                                        >
                                            <span className="mr-2 text-gray-400">{displayName}</span>
                                            <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center">
                                                <FaUserCircle className="h-6 w-6 text-gray-300" />
                                            </div>
                                        </button>
                                    </div>
                                    {showProfileMenu && (
                                        <div
                                            ref={profileMenuRef}
                                            className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg py-1 bg-gray-900 ring-1 ring-gray-800 focus:outline-none z-10"
                                            role="menu"
                                            aria-orientation="vertical"
                                        >
                                            <div className="px-4 py-3 text-sm text-gray-400 border-b border-gray-800">
                                                <p className="font-medium text-gray-300">{userInfo?.full_name || 'Usuario'}</p>
                                                {/* Correo con opción para mostrar/ocultar */}
                                                <div className="flex items-center mt-1">
                                                    <p className="text-xs flex-1 overflow-hidden text-ellipsis">{maskEmail(userInfo?.email)}</p>
                                                    <button
                                                        onClick={toggleEmailVisibility}
                                                        className="ml-2 text-gray-400 hover:text-white"
                                                        aria-label={showEmail ? "Ocultar correo" : "Mostrar correo"}
                                                    >
                                                        {showEmail ?
                                                            <FaEye className="h-4 w-4" /> :
                                                            <FaEyeSlash className="h-4 w-4" />
                                                        }
                                                    </button>
                                                </div>
                                                <p className="text-xs mt-1">
                                                    Se unió el {new Date(userInfo?.created_at || session.user.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <Link
                                                href="/studio"
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors duration-150"
                                                role="menuitem"
                                            >
                                                Ir al Estudio
                                            </Link>
                                            <button
                                                onClick={promptLogout} // Cambiado a promptLogout para mostrar confirmación
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors duration-150"
                                                role="menuitem"
                                            >
                                                Cerrar sesión
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex space-x-4">
                                    <Link
                                        href="/login"
                                        className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-white hover:bg-gray-200 text-black px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150"
                                    >
                                        Crear Cuenta
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Menú móvil desplegable (visible solo cuando está abierto) */}
                {mobileMenuOpen && (
                    <div
                        ref={mobileMenuRef}
                        className="sm:hidden bg-gray-900 border-t border-gray-800 shadow-lg"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {session ? (
                                <div className="p-3">
                                    <div className="flex items-center p-2 mb-3">
                                        <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                                            <FaUserCircle className="h-7 w-7 text-gray-300" />
                                        </div>
                                        <div>
                                            <p className="text-gray-300 font-medium">{displayName}</p>
                                            {/* Correo con opción para mostrar/ocultar */}
                                            <div className="flex items-center">
                                                <p className="text-xs text-gray-400 flex-1 overflow-hidden text-ellipsis">
                                                    {maskEmail(userInfo?.email)}
                                                </p>
                                                <button
                                                    onClick={toggleEmailVisibility}
                                                    className="ml-2 text-gray-400 hover:text-white"
                                                    aria-label={showEmail ? "Ocultar correo" : "Mostrar correo"}
                                                >
                                                    {showEmail ?
                                                        <FaEye className="h-4 w-4" /> :
                                                        <FaEyeSlash className="h-4 w-4" />
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        href="/studio"
                                        onClick={closeMobileMenu}
                                        className="block text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-150"
                                    >
                                        Ir al Estudio
                                    </Link>
                                    <button
                                        onClick={promptLogout} // Cambiado a promptLogout para mostrar confirmación
                                        className="block w-full text-left text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-150"
                                    >
                                        Cerrar sesión
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col">
                                    <Link
                                        href="/login"
                                        onClick={closeMobileMenu}
                                        className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-150"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                    <div className="mt-2 mx-3">
                                        <Link
                                            href="/register"
                                            onClick={closeMobileMenu}
                                            className="block w-full bg-white hover:bg-gray-200 text-black px-3 py-2 rounded-md text-base font-medium text-center transition-colors duration-150"
                                        >
                                            Crear Cuenta
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Modal de confirmación de cierre de sesión */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>
                    <div
                        ref={logoutModalRef}
                        className="relative bg-gray-900 rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full mx-4 sm:mx-auto"
                    >
                        <div className="px-6 py-5 border-b border-gray-800">
                            <h3 className="text-lg font-medium text-gray-200">Confirmar cierre de sesión</h3>
                        </div>
                        <div className="px-6 py-4">
                            <p className="text-gray-300 mb-1">Estás a punto de cerrar sesión de tu cuenta.</p>
                            <p className="text-gray-400 text-sm">Deberás volver a iniciar sesión la próxima vez que quieras acceder.</p>
                        </div>
                        <div className="px-6 py-4 bg-gray-800 flex justify-end space-x-3">
                            <button
                                onClick={cancelLogout}
                                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white focus:outline-none transition-colors duration-150"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-medium bg-white text-black hover:bg-gray-200 rounded focus:outline-none transition-colors duration-150"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Navigation;