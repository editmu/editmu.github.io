// src/app/register/Components/Main_v2.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';

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

    const handleGoogleSignUp = async () => {
        setGoogleLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/studio`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    }
                }
            });

            if (error) throw error;

            // No es necesario redirigir, la autenticación de OAuth se encargará del flujo
        } catch (error) {
            setError(error.message);
            setGoogleLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col justify-center items-center py-12 px-4 bg-gray-900 text-white">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight">
                    Crear una cuenta
                </h2>
            </div>

            <div className="w-full max-w-sm bg-gray-800 py-8 px-6 shadow-lg rounded-lg border border-gray-700">
                {error && (
                    <div className="mb-4 rounded-md bg-red-900 bg-opacity-20 p-4 border border-red-800">
                        <div className="text-sm text-red-400">{error}</div>
                    </div>
                )}

                <button
                    onClick={handleGoogleSignUp}
                    disabled={googleLoading}
                    className="flex w-full justify-center items-center space-x-2 rounded-md border border-gray-600 bg-gray-700 py-2 px-4 text-sm font-medium text-gray-200 shadow-sm hover:bg-gray-600 transition-colors duration-150"
                >
                    {googleLoading ? (
                        <>
                            <span className="animate-spin h-5 w-5 border-2 border-t-2 border-gray-200 rounded-full"></span>
                            <span>Conectando...</span>
                        </>
                    ) : (
                        <>
                            <FcGoogle className="h-5 w-5" />
                            <span>Continuar con Google</span>
                        </>
                    )}
                </button>

                <div className="mt-4 text-center text-gray-300 text-sm">
                    <p>Es más rápido y no necesita verificación.</p>
                </div>

                {loadingServices ? (
                    <div className="mt-6 flex justify-center">
                        <div className="animate-spin h-8 w-8 border-4 border-t-4 border-gray-200 rounded-full"></div>
                    </div>
                ) : (
                    services.length > 0 && (
                        <div className="mt-6 border border-gray-600 rounded-lg p-4 bg-gray-700">
                            <p className="text-center text-gray-300 text-xs">
                                Si tienes cuenta en otro servicio de Asoge Labs, puedes usarla aquí. Se sincronizará automáticamente.
                            </p>
                            <div className="flex justify-center space-x-4 mt-4 flex-wrap">
                                {services.map((service, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <img src={service.logo} alt={service.name} className="h-12 w-12" />
                                        <span className="text-gray-200 text-xs mt-2">{service.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
