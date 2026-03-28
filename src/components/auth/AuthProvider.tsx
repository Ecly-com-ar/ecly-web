"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

type Profile = {
  role: string | null;
  first_name: string | null;
  last_name: string | null;
  bio: string | null;
  avatar_url: string | null;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    console.log("[AuthProvider] Iniciando fetchProfile para:", userId);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role, first_name, last_name, bio, avatar_url')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error("[AuthProvider] Error de Supabase al obtener perfil:", error);
        throw error;
      }

      if (data) {
        console.log("[AuthProvider] Perfil cargado exitosamente:", data);
        setProfile(data);
      } else {
        console.warn("[AuthProvider] No se encontró perfil en la DB, inicializando estado básico.");
        setProfile({ role: 'editor', first_name: '', last_name: '', bio: '', avatar_url: '' });
      }
    } catch (err) {
      console.error("[AuthProvider] Excepción atrapada en fetchProfile:", err);
      // Evitamos el bloqueo seteando un perfil vacío si falla
      setProfile({ role: 'editor', first_name: '', last_name: '', bio: '', avatar_url: '' });
    } finally {
      console.log("[AuthProvider] Finalizando carga de perfil.");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("[AuthProvider] Iniciando AuthProvider useEffect...");
    
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("[AuthProvider] Sesión inicial obtenida:", currentSession?.user?.email || "Sin sesión");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession?.user) {
        fetchProfile(currentSession.user.id);
      } else {
        console.log("[AuthProvider] No hay usuario inicial, deteniendo carga.");
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log("[AuthProvider] Evento de Auth cambiado:", event);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession?.user) {
        await fetchProfile(currentSession.user.id);
      } else {
        console.log("[AuthProvider] Usuario deslogueado o sin sesión.");
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      console.log("[AuthProvider] Desmontando AuthProvider.");
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    console.log("[AuthProvider] Iniciando SignOut...");
    setLoading(true);
    await supabase.auth.signOut();
  };

  const refreshProfile = async () => {
    console.log("[AuthProvider] Refrescando perfil manualmente...");
    if (user) await fetchProfile(user.id);
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};