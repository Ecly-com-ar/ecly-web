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
        console.error("[AuthProvider] ❌ Error Supabase:", error);
        return;
      }

      if (data) {
        console.log("[AuthProvider] ✅ Perfil cargado:", data);
        setProfile(data);
      } else {
        console.warn("[AuthProvider] ⚠️ No hay fila de perfil, usando valores por defecto.");
        setProfile({ role: 'editor', first_name: '', last_name: '', bio: '', avatar_url: '' });
      }
    } catch (err) {
      console.error("[AuthProvider] 💥 Excepción en fetchProfile:", err);
    } finally {
      setLoading(false);
      console.log("[AuthProvider] 🏁 Proceso de carga finalizado.");
    }
  };

  useEffect(() => {
    console.log("[AuthProvider] 🔌 Suscribiendo a cambios de Auth...");
    
    // Solo manejamos el estado desde onAuthStateChange para evitar duplicados
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log("[AuthProvider] 🔑 Evento Auth:", event, currentSession?.user?.id);
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        await fetchProfile(currentSession.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      console.log("[AuthProvider] 🔌 Desuscribiendo...");
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
  };

  const refreshProfile = async () => {
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