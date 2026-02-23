"use client";

import React from 'react';
import { User, MessageSquare } from 'lucide-react';

const testimonials = [
  {
    quote: "¡Ecly cambió mi local! Mis clientes aman venir con sus envases. ¡Mis ventas subieron un 20%!",
    author: "Juan Pérez",
    role: "Dueño de Almacén 'El Sol'",
    color: "bg-ecly-vibrant"
  },
  {
    quote: "¿Sabías que ahorré miles en logística? Ecly es el socio que no sabía que necesitaba.",
    author: "Marta Gómez",
    role: "Gerente de Minimercado",
    color: "bg-ecly-accent"
  },
  {
    quote: "¡Sumate a Ecly! Es fácil, rápido y el planeta te lo agradece. No hay vuelta atrás.",
    author: "Leo Rossi",
    role: "Tienda de Conveniencia",
    color: "bg-ecly-electric"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-ecly-light overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-black text-center text-slate-900 mb-16">
          Lo que dicen los que ya se animaron 🗣️
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, idx) => (
            <div key={idx} className="relative">
              <div className={`${t.color} p-8 rounded-[2.5rem] relative z-10 shadow-xl transform ${idx % 2 === 0 ? 'rotate-2' : '-rotate-2'} hover:rotate-0 transition-transform`}>
                <MessageSquare className="absolute -top-4 -left-4 h-12 w-12 text-white fill-current opacity-30" />
                <p className="text-xl font-black text-slate-900 mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 leading-none">{t.author}</p>
                    <p className="text-sm font-bold opacity-70">{t.role}</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-current text-inherit opacity-50"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;