"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProblemSection from '@/components/home/ProblemSection';
import { ShieldCheck, Globe, Users, TrendingUp } from 'lucide-react';

const Institutional = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="py-20 bg-ecly-light">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ecly-green/10 text-ecly-green font-bold text-sm mb-6">
              <ShieldCheck size={18} /> Empresa de Triple Impacto
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">
              Nuestra Visión de <span className="text-ecly-green">Cambio</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-slate-600">
              En Ecly no solo reciclamos; redefinimos la economía para que sea circular, inclusiva y rentable para todos.
            </p>
          </div>
        </section>

        <ProblemSection />

        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Los Pilares de Nuestro Triple Impacto</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-green-100 text-ecly-green rounded-2xl flex items-center justify-center mb-6">
                  <Globe size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">Ambiental</h3>
                <p className="text-slate-600 leading-relaxed">
                  Eliminamos los plásticos de un solo uso mediante tecnología de trazabilidad en envases retornables.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Users size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">Social</h3>
                <p className="text-slate-600 leading-relaxed">
                  Formalizamos y dignificamos el trabajo en la cadena de reciclaje, integrando a comunidades locales.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">Económico</h3>
                <p className="text-slate-600 leading-relaxed">
                  Reducimos costos logísticos para las marcas y generamos nuevos ingresos para los comercios de cercanía.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Institutional;