// src/app/login/Components/Main.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

import supabase from '../../lib/supabaseClient';





export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Verificar si el usuario ya está autenticado
        const checkUser = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                router.push('/studio'); // Redirigir al estudio si ya está autenticado
            }
        };

        checkUser();
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // Redirigir al estudio después del login exitoso
            router.push('/studio');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

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
                    <form className="space-y-6" onSubmit={handleLogin}>
                        {error && (
                            <div className="rounded-md bg-red-900 bg-opacity-20 p-4 border border-red-800">
                                <div className="text-sm text-red-400">{error}</div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Correo electrónico
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-gray-700 bg-gray-800 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-gray-600 focus:outline-none focus:ring-gray-600 sm:text-sm text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Contraseña
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-gray-700 bg-gray-800 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-gray-600 focus:outline-none focus:ring-gray-600 sm:text-sm text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full justify-center rounded-md border border-transparent bg-white hover:bg-gray-200 py-2 px-4 text-sm font-medium text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-150"
                            >
                                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-800" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-gray-900 px-2 text-gray-400">O continuar con</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={handleGoogleSignIn}
                                disabled={googleLoading}
                                className="flex w-full justify-center items-center space-x-2 rounded-md border border-gray-700 bg-gray-800 py-2 px-4 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-700 transition-colors duration-150"
                            >
                                <FcGoogle className="h-5 w-5" />
                                <span>{googleLoading ? 'Conectando...' : 'Google'}</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-800" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-gray-900 px-2 text-gray-400">¿No tienes una cuenta?</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                href="/register"
                                className="flex w-full justify-center rounded-md border border-gray-700 bg-gray-800 py-2 px-4 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-700 transition-colors duration-150"
                            >
                                Crear una cuenta
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};