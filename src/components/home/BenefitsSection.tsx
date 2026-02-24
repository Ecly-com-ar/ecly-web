"use client";

import React from 'react';
import { TrendingUp, Wallet, Zap, Heart } from 'lucide-react';

const benefits = [
  {
    title: "Aumentá tu rentabilidad",
    description: "Reducí costos de envases y logística. Vendé por recarga y mejorá tu margen desde el primer mes.",
    icon: TrendingUp,
    color: "bg-ecly-vibrant",
    textColor: "text-ecly-dark"
  },
  {
    title: "Menos costos, más margen",
    description: "Modelo simple y eficiente. Sin stock complejo ni sobrecostos innecesarios.",
    icon: Wallet,
    color: "bg-ecly-accent",
    textColor: "text-amber-900"
  },
  {
    title: "Instalación simple y rápida",
    description: "El módulo se adapta a tu espacio en minutos, sin obras ni complicaciones.",
    icon: Zap,
    color: "bg-ecly-electric",
    textColor: "text-white"
  },
  {
    title: "Atraé y fidelizá clientes",
    description: "Sumate a la tendencia de consumo responsable y diferenciá tu negocio en tu zona.",
    icon: Heart,
    color: "bg-ecly-pop",
    textColor: "text-white"
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-black text-slate-900 sm:text-5xl mb-6">
          ¿Por qué elegir Ecly hoy? 🚀
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-16 font-medium">
          Transformá tu comercio en un punto de recarga inteligente y liderá el cambio.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx}
              className={`${benefit.color} ${benefit.textColor} p-8 rounded-[2rem] shadow-xl transform transition-all hover:-translate-y-2 hover:rotate-1 cursor-default min-h-[320px] flex flex-col`}
            >
              <div className="bg-white/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto shrink-0">
                <benefit.icon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black mb-3 leading-tight">{benefit.title}</h3>
              <p className="font-bold opacity-90">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;