"use client";

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="inicio" className="relative overflow-hidden bg-ecly-light pt-20 pb-32">
      {/* Círculos decorativos vibrantes */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-ecly-vibrant/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-ecly-accent/20 rounded-full blur-[100px]"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 mb-8 animate-bounce">
            <Sparkles className="h-5 w-5 text-ecly-accent" />
            <span className="text-sm font-black text-slate-800 uppercase tracking-wider">¡Dale un giro a tu negocio!</span>
          </div>
          
          <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-7xl lg:text-8xl leading-[0.9] mb-8">
            Maximiza tus <br />
            <span className="text-ecly-green inline-block hover:scale-105 transition-transform cursor-default">ganancias</span> <br />
            rápidamente. 💸
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-600 font-bold mb-12 leading-relaxed">
            Con nuestros dispensadores inteligentes, transformas tu espacio <br className="hidden sm:block" />
            y te sumas a la revolución circular. ¿Listo para el cambio?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#waitlist" className="w-full sm:w-auto">
              <Button className="w-full bg-ecly-green hover:bg-green-600 text-white text-xl font-black py-8 px-12 rounded-3xl shadow-[0_10px_0_0_#16a34a] hover:shadow-[0_5px_0_0_#16a34a] transition-all hover:translate-y-1 active:translate-y-2">
                Sumate a Ecly ¡YA! <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </a>
            <a 
              href="https://www.canva.com/..." 
              target="_blank"
              className="text-lg font-black text-slate-500 hover:text-ecly-green transition-colors flex items-center gap-2 p-4"
            >
              ¿Te gustaría saber cómo? ¡Mira esto!
            </a>
          </div>
        </div>

        {/* Imagen representativa dinámica */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1605371924599-2d036cda1ae0?auto=format&fit=crop&q=80&w=1200" 
              alt="Dispensador en tienda"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <p className="text-3xl font-black">Tu local, versión 2.0</p>
              <p className="text-lg font-bold opacity-90">Tecnología Ecly en acción.</p>
            </div>
          </div>
          {/* Badge flotante */}
          <div className="absolute -top-10 -right-10 bg-ecly-accent text-amber-900 p-6 rounded-full w-40 h-40 flex flex-col items-center justify-center text-center font-black rotate-12 shadow-xl animate-float">
            <span className="text-xs uppercase">Ahorra hasta</span>
            <span className="text-4xl">40%</span>
            <span className="text-xs uppercase">en envases</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;