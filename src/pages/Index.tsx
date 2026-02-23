"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/home/Hero';
import BrandLogos from '@/components/home/BrandLogos';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/layout/Footer';
import { Store, TrendingUp, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-sans">
      <Header />
      <main className="flex-1">
        <Hero />
        
        {/* Sección de beneficios rápidos para comercios */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900">¿Por qué elegir Ecly para tu negocio?</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-ecly-green/10 text-ecly-green rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Store size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Diferenciación</h3>
                <p className="text-slate-600">Sé el punto de referencia sustentable en tu barrio.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Más Ventas</h3>
                <p className="text-slate-600">Atraé al consumidor consciente que busca envases retornables.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Triple Impacto</h3>
                <p className="text-slate-600">Tu comercio ayuda al ambiente y a la comunidad local.</p>
              </div>
            </div>
          </div>
        </section>

        <BrandLogos />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;