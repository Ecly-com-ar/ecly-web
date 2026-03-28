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
    // Si ya hay sesión, redirigir al panel
    if (session) {
      navigate('/admin');
    }
  }, [session, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ecly-light">
        <div className="animate-bounce text-ecly-green font-black text-2xl">Cargando Ecly...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ecly-light flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 pt-32 pb-24">
        <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl p-8 sm:p-12 border-4 border-white transition-all duration-500">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Acceso Editor</h1>
            <p className="text-slate-500 font-bold">Uso exclusivo para personal de Ecly</p>
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
                    brandAccent: '#16a34a',
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
                  email_input_placeholder: 'tu@ecly.com',
                  password_input_placeholder: 'Tu contraseña secreta',
                }
              }
            }}
          />
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400 font-bold italic">
              * Si no tienes credenciales, contacta al administrador del sistema.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Access;