// src/app/login/Components/Main_v2.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

import Data from "../../constants.json";

import supabase from '../../lib/supabaseClient';





export default function Main_v2() {
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState(null);
    const [services, setServices] = useState([]);
    const [loadingServices, setLoadingServices] = useState(true);

    useEffect(() => {
        // Fetch de los servicios desde el JSON
        const fetchServices = async () => {
            try {
                const response = await fetch(Data.asogelabs_json);
                const data = await response.json();
                setServices(data.main);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoadingServices(false);
            }
        };

        fetchServices();
    }, []);

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/studio`,
                },
            });

            if (error) throw error;

            // No es necesario redirigir, la autenticación de OAuth se encargará del flujo
        } catch (error) {
            setError(error.message);
            setGoogleLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-black">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                    Iniciar Sesión
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-900 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-800">
                    {error && (
                        <div className="rounded-md bg-red-900 bg-opacity-20 p-4 border border-red-800">
                            <div className="text-sm text-red-400">{error}</div>
                        </div>
                    )}

                    <div>
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={googleLoading}
                            className="flex w-full justify-center items-center space-x-2 rounded-md border border-gray-700 bg-gray-800 py-2 px-4 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-700 transition-colors duration-150"
                        >
                            {googleLoading ? (
                                <>
                                    <span className="animate-spin h-5 w-5 border-2 border-t-2 border-gray-300 rounded-full"></span>
                                    <span>Conectando...</span>
                                </>
                            ) : (
                                <>
                                    <FcGoogle className="h-5 w-5" />
                                    <span>Continuar con Google</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="mt-4 text-center text-gray-400 text-sm">
                        <p>Es más rápido y no necesita verificación.</p>
                    </div>

                    {loadingServices ? (
                        <div className="mt-6 flex justify-center">
                            <div className="animate-spin h-8 w-8 border-4 border-t-4 border-gray-300 rounded-full"></div>
                        </div>
                    ) : (
                        services.length > 0 && (
                            <div className="mt-6 border border-gray-700 rounded-lg p-4 bg-gray-800">
                                <p className="text-center text-gray-400 text-xs">
                                    Si tienes cuenta en otro servicio de Asoge Labs, puedes usarla aquí. Se sincronizará automáticamente.
                                </p>
                                <div className="flex justify-center space-x-4 mt-4 flex-wrap">
                                    {services.map((service, index) => (
                                        <div key={index} className="flex flex-col items-center">
                                            <img src={service.logo} alt={service.name} className="h-12 w-12" />
                                            <span className="text-gray-300 text-xs mt-2">{service.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    )}

                    {/* Nota sobre la aceptación de términos */}
                    <div className="mt-6 text-center text-gray-400 text-xs">
                        <p>
                            Al iniciar sesión, estás aceptando nuestra{' '}
                            <Link href="/legal/privacy-policy" className="text-gray-300 underline">
                                Política de Privacidad
                            </Link>
                            ,{' '}
                            <Link href="/legal/terms" className="text-gray-300 underline">
                                Términos de Servicio
                            </Link>
                            {' '}y{' '}
                            <Link href="/legal/cookies-policy" className="text-gray-300 underline">
                                Política de Cookies
                            </Link>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
