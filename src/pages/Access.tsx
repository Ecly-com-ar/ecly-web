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
      navigate('/dashboard');
    }
  }, [session, navigate]);

  if (loading) return null;

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
            appearance={{ theme: ThemeSupa, variables: { default: { colors: { brand: '#22c55e', brandAccent: '#16a34a' } } } }}
            providers={[]}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Access;