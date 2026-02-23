"use client";

import React from 'react';
import { TrendingUp, Wallet, Zap, Heart } from 'lucide-react';

const benefits = [
  {
    title: "¡Maximiza tus ganancias!",
    description: "Elimina costos de envasado y logística pesada. ¡Más margen para vos!",
    icon: TrendingUp,
    color: "bg-ecly-vibrant",
    textColor: "text-ecly-dark"
  },
  {
    title: "¿Te gustaría ahorrar?",
    description: "Reducción directa en costos operativos desde el primer día.",
    icon: Wallet,
    color: "bg-ecly-accent",
    textColor: "text-amber-900"
  },
  {
    title: "¡Instalación Flash!",
    description: "Nuestros dispensadores se adaptan a tu espacio en minutos.",
    icon: Zap,
    color: "bg-ecly-electric",
    textColor: "text-white"
  },
  {
    title: "Clientes Felices",
    description: "Súmate a la tendencia eco que todos buscan hoy. ¡Fideliza!",
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
          No es solo ecología, es inteligencia de negocio. ¡Mira todo lo que ganas!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx}
              className={`${benefit.color} ${benefit.textColor} p-8 rounded-[2rem] shadow-xl transform transition-all hover:-translate-y-2 hover:rotate-1 cursor-default`}
            >
              <div className="bg-white/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
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