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
    console.log("[AuthProvider] 🔄 Obteniendo perfil para ID:", userId);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role, first_name, last_name, bio, avatar_url')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error("[AuthProvider] ❌ Error Supabase fetchProfile:", error);
      }

      if (data) {
        console.log("[AuthProvider] ✅ Perfil cargado:", data);
        setProfile(data);
      } else {
        console.warn("[AuthProvider] ⚠️ No se encontró perfil, inicializando vacío.");
        setProfile({ role: 'editor', first_name: '', last_name: '', bio: '', avatar_url: '' });
      }
    } catch (err) {
      console.error("[AuthProvider] 💥 Excepción en fetchProfile:", err);
    } finally {
      setLoading(false);
      console.log("[AuthProvider] 🏁 Carga finalizada (loading=false)");
    }
  };

  useEffect(() => {
    console.log("[AuthProvider] 🔌 Inicializando Auth...");

    // 1. Verificación inicial explícita
    const initAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        console.log("[AuthProvider] 🔍 Sesión inicial detectada:", initialSession?.user?.id || "Ninguna");
        
        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        if (initialSession?.user) {
          await fetchProfile(initialSession.user.id);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("[AuthProvider] 💥 Error en initAuth:", err);
        setLoading(false);
      }
    };

    initAuth();

    // 2. Suscripción a cambios
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log("[AuthProvider] 🔑 Evento Auth detectado:", event);
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        // Solo recargamos perfil si el evento lo sugiere (ej: Sign In)
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          await fetchProfile(currentSession.user.id);
        }
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
  };

  const refreshProfile = async () => {
    if (user) {
      // No ponemos loading=true aquí para no bloquear la UI durante el refresco
      await fetchProfile(user.id);
    }
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