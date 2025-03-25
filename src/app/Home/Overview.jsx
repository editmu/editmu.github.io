// src/app/Home/Overview.jsx
"use client";
import React, { useState, useEffect } from 'react';
import supabase from '../lib/supabaseClient';

import Welcome from './Components/Welcome';
import Examples from './Components/Examples';
import Why from './Components/Why';





function Overview() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        // Obtener la sesión actual al cargar el componente
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        // Suscribirse a cambios en el estado de autenticación
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        // Limpiar la suscripción al desmontar el componente
        return () => subscription.unsubscribe();
    }, []);

    
    return (
        <React.Fragment>
            {/* Componente Welcome que se muestra para todos los usuarios */}
            <Welcome />
            <Examples />
            <Why />
            
            {/* Contenido adicional para usuarios que han iniciado sesión */}
            {session && (
                <div className="bg-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                ¡Hola, {session.user.email}! Gracias por usar Editmu.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
export default Overview;