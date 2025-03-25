// src/app/studio/Components/Dashboard.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Ri24HoursFill } from "react-icons/ri";

import supabase from '../../lib/supabaseClient';

import Guide from './UI/Guide';

import ImageEditor from './ImageEditor';





const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (!session) {
                    // Si no hay sesión, redirigir al login
                    router.push('/login');
                    return;
                }

                setUser(session.user);
            } catch (error) {
                console.error("Error al verificar autenticación:", error);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

        // Suscripción a cambios en el estado de autenticación
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (!session) {
                    router.push('/login');
                } else {
                    setUser(session.user);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, [router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-white py-3 px-6 bg-gradient-to-r from-purple-800 to-indigo-600 rounded-lg shadow-lg flex items-center">
                <Ri24HoursFill className="mr-3 text-yellow-300 text-2xl md:text-3xl flex-shrink-0" />
                Te damos la bienvenida a tu AI Studio!
            </h1>

            <Guide />

            {/* Componente de editor de imágenes */}
            <ImageEditor user={user} />
        </div>
    );
};
export default Dashboard;