"use client";

import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Access = () => {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Si la sesión ya existe, redirigimos al dashboard inmediatamente
    if (!loading && session) {
      navigate('/dashboard', { replace: true });
    }
  }, [session, loading, navigate]);

  // Mientras verifica la sesión, no mostramos el formulario para evitar parpadeos
  if (loading || session) {
    return (
      <div className="min-h-screen bg-ecly-light flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-6">
          <img 
            src="/Ecly_Logotype.png" 
            alt="Ecly Logo" 
            className="h-16 w-auto object-contain grayscale opacity-50"
          />
          <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ecly-light flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 pt-32 pb-24">
        <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl p-10 border-4 border-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Editor Ecly</h1>
            <p className="text-slate-500 font-bold">Accede para publicar novedades</p>
          </div>
          <Auth
            supabaseClient={supabase}
            view="sign_in"
            showLinks={false}
            appearance={{ 
              theme: ThemeSupa, 
              variables: { 
                default: { 
                  colors: { 
                    brand: '#22c55e', 
                    brandAccent: '#16a34a' 
                  },
                  radii: {
                    buttonRadius: '1rem',
                    inputRadius: '1rem'
                  }
                } 
              } 
            }}
            providers={[]}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Correo electrónico',
                  password_label: 'Contraseña',
                  button_label: 'Entrar al Panel',
                  loading_button_label: 'Iniciando sesión...',
                  email_input_placeholder: 'tu@email.com',
                  password_input_placeholder: 'Tu contraseña'
                }
              }
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Access;