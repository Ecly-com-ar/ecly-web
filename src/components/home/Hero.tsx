"use client";

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="inicio" className="relative overflow-hidden bg-ecly-light pt-12 pb-20 lg:pt-24 lg:pb-32">
      {/* Círculos decorativos vibrantes */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-ecly-vibrant/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-ecly-accent/20 rounded-full blur-[100px]"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Columna 1: Texto y CTAs */}
          <div className="text-left max-w-2xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 mb-8 animate-bounce">
              <Sparkles className="h-5 w-5 text-ecly-accent" />
              <span className="text-sm font-black text-slate-800 uppercase tracking-wider">¡Dale un giro a tu negocio!</span>
            </div>
            
            <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] mb-8">
              Maximiza tus <br />
              <span className="text-ecly-green inline-block hover:scale-105 transition-transform cursor-default">ganancias</span> <br />
              rápidamente. 💸
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-600 font-bold mb-10 leading-tight">
              Con nuestros dispensadores inteligentes, transformas tu espacio 
              y te sumas a la revolución circular. ¿Listo para el cambio?
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="#waitlist" className="w-full sm:w-auto">
                <Button className="w-full bg-ecly-green hover:bg-green-600 text-white text-xl font-black py-8 px-10 rounded-3xl shadow-[0_10px_0_0_#16a34a] hover:shadow-[0_5px_0_0_#16a34a] transition-all hover:translate-y-1 active:translate-y-2">
                  Sumate a Ecly ¡YA! <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </a>
              <a 
                href="https://www.canva.com/..." 
                target="_blank"
                className="text-lg font-black text-slate-500 hover:text-ecly-green transition-colors flex items-center gap-2 p-4"
              >
                ¿Cómo funciona? ¡Mira!
              </a>
            </div>
          </div>

          {/* Columna 2: Imagen del stand real */}
          <div className="relative">
            <div className="aspect-square sm:aspect-video lg:aspect-square xl:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white transform lg:rotate-2 hover:rotate-0 transition-all duration-500">
              <img 
                src="/Ecly - Stand Supermercado (2).png" 
                alt="Stand de Ecly en supermercado"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-2xl font-black">Tu local, versión 2.0</p>
                <p className="text-lg font-bold opacity-90">Tecnología Ecly instalada.</p>
              </div>
            </div>
            
            {/* Badge flotante mejorado */}
            <div className="absolute -top-8 -right-4 sm:-right-8 bg-ecly-accent text-amber-900 p-6 rounded-full w-36 h-36 sm:w-44 sm:h-44 flex flex-col items-center justify-center text-center font-black -rotate-12 shadow-xl animate-float z-20">
              <span className="text-[10px] sm:text-xs uppercase">Ahorra hasta</span>
              <span className="text-3xl sm:text-5xl">40%</span>
              <span className="text-[10px] sm:text-xs uppercase">en costos</span>
            </div>
            
            {/* Elemento decorativo detrás */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-ecly-pop rounded-2xl -z-10 rotate-12 animate-pulse"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;