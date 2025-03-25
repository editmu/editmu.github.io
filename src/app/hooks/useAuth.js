// src/app/hooks/useAuth.js
'use client';
import { useState, useEffect } from 'react';

import supabase from '../lib/supabaseClient';





export function useAuth() {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Función para guardar o actualizar el perfil del usuario
        const saveUserProfile = async (user) => {
            if (!user) return;

            try {
                // Obtener el nombre del usuario desde los metadatos si está disponible
                const fullName = user.user_metadata?.full_name ||
                    user.user_metadata?.name ||
                    user.email?.split('@')[0] ||
                    'Usuario';

                // Verificar si el perfil ya existe
                const { data: existingProfile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                // Datos a guardar o actualizar
                const profileData = {
                    id: user.id,
                    full_name: fullName,
                    email: user.email,
                    updated_at: new Date()
                };

                if (!existingProfile) {
                    // Si no existe, crear un nuevo perfil
                    profileData.created_at = new Date();
                }

                // Upsert: inserta si no existe, actualiza si existe
                const { error } = await supabase
                    .from('profiles')
                    .upsert([profileData]);

                if (error) {
                    console.error('Error al guardar el perfil:', error);
                }
            } catch (error) {
                console.error('Error inesperado al guardar el perfil:', error);
            }
        };

        // Función para cargar la sesión actual
        const loadSession = async () => {
            try {
                setLoading(true);
                const { data: { session } } = await supabase.auth.getSession();

                setSession(session);
                if (session?.user) {
                    setUser(session.user);
                    // Guardar o actualizar el perfil del usuario
                    await saveUserProfile(session.user);
                }
            } catch (error) {
                console.error('Error al cargar la sesión:', error);
            } finally {
                setLoading(false);
            }
        };

        loadSession();

        // Suscribirse a los cambios de autenticación
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setSession(session);
                setUser(session?.user || null);

                // Si hay un usuario, guardar o actualizar su perfil
                if (session?.user) {
                    await saveUserProfile(session.user);
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // Funciones de autenticación
    const signUp = async (email, password, userData = {}) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: userData
                }
            });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    };

    const signIn = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    };

    const signInWithGoogle = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    }
                }
            });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    };

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error };
        }
    };

    return {
        session,
        user,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signOut
    };
};
export default useAuth;