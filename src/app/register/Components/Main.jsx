// src/app/register/Components/Main.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

import supabase from '../../lib/supabaseClient';





export default function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName
                    }
                }
            });

            if (error) throw error;

            // Crear entrada en la tabla de perfiles
            if (data.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .upsert([
                        {
                            id: data.user.id,
                            full_name: fullName,
                            email: email,
                            updated_at: new Date()
                        }
                    ]);

                if (profileError) console.error("Error al crear perfil:", profileError);
            }

            // Redirigir a login después del registro exitoso
            router.push('/login?registered=true');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setGoogleLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/studio`,
                    // Solicitar acceso al nombre del usuario a Google
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
        <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-black text-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                    Crear una cuenta
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-900 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-800">
                    <form className="space-y-6" onSubmit={handleRegister}>
                        {error && (
                            <div className="rounded-md bg-red-900 p-4 border border-red-700">
                                <div className="text-sm text-red-300">{error}</div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                                Nombre completo
                            </label>
                            <div className="mt-1">
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-gray-700 bg-gray-800 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-gray-600 focus:outline-none focus:ring-gray-600 text-white sm:text-sm"
                                />
                            </div>
                        </div>

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
                                    className="block w-full appearance-none rounded-md border border-gray-700 bg-gray-800 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-gray-600 focus:outline-none focus:ring-gray-600 text-white sm:text-sm"
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
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-gray-700 bg-gray-800 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-gray-600 focus:outline-none focus:ring-gray-600 text-white sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                                Confirmar contraseña
                            </label>
                            <div className="mt-1">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-gray-700 bg-gray-800 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-gray-600 focus:outline-none focus:ring-gray-600 text-white sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full justify-center rounded-md border border-transparent bg-white hover:bg-gray-200 py-2 px-4 text-sm font-medium text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-150"
                            >
                                {loading ? 'Creando cuenta...' : 'Crear cuenta'}
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
                                onClick={handleGoogleSignUp}
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
                                <span className="bg-gray-900 px-2 text-gray-400">¿Ya tienes una cuenta?</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                href="/login"
                                className="flex w-full justify-center rounded-md border border-gray-700 bg-gray-800 py-2 px-4 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-700 transition-colors duration-150"
                            >
                                Iniciar sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};