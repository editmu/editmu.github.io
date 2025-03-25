// src/app/page.js
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import supabase from './lib/supabaseClient';

import Overview from './Home/Overview';





export default function Home() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);

        // Si hay una sesión activa, redirigir al estudio
        if (session) {
          router.push('/studio');
        }
      } catch (error) {
        console.error("Error al verificar sesión:", error);
      } finally {
        setLoading(false);
      }
    }

    checkSession();

    // Suscribirse a cambios en el estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        router.push('/studio');
      }
    });

    // Limpiar la suscripción al desmontar el componente
    return () => subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  // Solo mostramos la página de introducción si no hay sesión
  return <Overview />;
}