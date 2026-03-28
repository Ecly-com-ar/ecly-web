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
    if (session) {
      navigate('/admin');
    }
  }, [session, navigate]);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-ecly-light flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 pt-32 pb-24">
        <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl p-8 sm:p-12 border-4 border-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Acceso Editor</h1>
            <p className="text-slate-500 font-bold">Gestioná el contenido de Ecly</p>
          </div>
          
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#22c55e',
                    brandAccent: '#16a34a',
                    inputBackground: '#f8fafc',
                    inputText: '#0f172a',
                    inputPlaceholder: '#94a3b8',
                    inputBorder: '#e2e8f0',
                    inputBorderHover: '#22c55e',
                    inputBorderFocus: '#22c55e',
                  },
                  radii: {
                    borderRadiusButton: '1rem',
                    buttonPadding: '12px',
                    inputPadding: '12px',
                  },
                  fonts: {
                    bodyFontFamily: `'Inter', sans-serif`,
                    buttonFontFamily: `'Inter', sans-serif`,
                    inputFontFamily: `'Inter', sans-serif`,
                    labelFontFamily: `'Inter', sans-serif`,
                  }
                }
              },
              className: {
                button: 'font-black uppercase tracking-wider',
                input: 'font-bold',
                label: 'font-black text-slate-700 uppercase tracking-widest text-[10px]'
              }
            }}
            providers={[]}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Correo electrónico',
                  password_label: 'Contraseña',
                  button_label: 'Entrar',
                  loading_button_label: 'Entrando...',
                  email_input_placeholder: 'tu@email.com',
                  password_input_placeholder: 'Tu contraseña',
                },
                sign_up: {
                  email_label: 'Correo electrónico',
                  password_label: 'Contraseña',
                  button_label: 'Registrarse',
                  loading_button_label: 'Registrando...',
                  email_input_placeholder: 'tu@email.com',
                  password_input_placeholder: 'Tu contraseña',
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