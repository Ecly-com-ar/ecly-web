"use client";

import React from 'react';
import { Container, Smartphone, RefreshCw, ShoppingBag } from 'lucide-react';

const steps = [
  {
    title: "Traé tu envase",
    description: "Cualquier envase limpio que tengas en casa sirve para recargar.",
    icon: ShoppingBag,
    color: "bg-ecly-vibrant",
    iconColor: "text-ecly-dark"
  },
  {
    title: "Escaneá y Elegí",
    description: "Usá el código QR del dispenser para elegir el producto y la cantidad.",
    icon: Smartphone,
    color: "bg-ecly-electric",
    iconColor: "text-white"
  },
  {
    title: "Recargá y Ahorrá",
    description: "El dispenser carga exacto lo que pediste. ¡Pagás menos y sin plástico!",
    icon: RefreshCw,
    color: "bg-ecly-accent",
    iconColor: "text-amber-900"
  }
];

const StepSection = () => {
  return (
    <section className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 mb-24 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-ecly-green/10 blur-[100px] rounded-full"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">¿Cómo funciona <span className="text-ecly-green">Ecly</span>?</h2>
          <p className="text-xl text-slate-400 font-bold max-w-2xl mx-auto">Tan simple que no vas a querer volver a comprar envases nunca más.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 border-t-2 border-dashed border-slate-700 -z-10 -ml-12"></div>
              )}
              <div className="flex flex-col items-center text-center">
                <div className={`${step.color} ${step.iconColor} w-24 h-24 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl transform transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                  <step.icon size={40} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black mb-4">{step.title}</h3>
                <p className="text-slate-400 font-bold leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepSection;