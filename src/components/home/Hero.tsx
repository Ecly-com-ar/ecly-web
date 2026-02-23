"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const benefits = [
  {
    top: "Ahorra hasta",
    value: "40%",
    bottom: "en logística",
    bgColor: "bg-ecly-accent",
    textColor: "text-amber-900"
  },
  {
    top: "Reduce el",
    value: "90%",
    bottom: "de plásticos",
    bgColor: "bg-ecly-vibrant",
    textColor: "text-ecly-dark"
  },
  {
    top: "Aumenta",
    value: "20%",
    bottom: "tus ventas",
    bgColor: "bg-ecly-electric",
    textColor: "text-white"
  },
  {
    top: "Baja un",
    value: "100%",
    bottom: "un solo uso",
    bgColor: "bg-ecly-pop",
    textColor: "text-white"
  }
];

const Hero = () => {
  const [currentBenefit, setCurrentBenefit] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % benefits.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const benefit = benefits[currentBenefit];

  return (
    <section id="inicio" className="relative overflow-hidden bg-ecly-light py-8 lg:py-12 min-h-[calc(100vh-96px)] flex items-center">
      {/* Círculos decorativos vibrantes */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-ecly-vibrant/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-ecly-accent/10 rounded-full blur-[80px]"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Columna 1: Texto y CTAs */}
          <div className="text-left max-w-2xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm border border-slate-100 mb-6">
              <Sparkles className="h-4 w-4 text-ecly-accent" />
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider">¡Dale un giro a tu negocio!</span>
            </div>
            
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl leading-[1] mb-6">
              Maximiza tus <br />
              <span className="text-ecly-green inline-block hover:scale-105 transition-transform cursor-default">ganancias</span> <br />
              rápidamente. 💸
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 font-bold mb-8 leading-snug max-w-lg">
              Con nuestros dispensadores inteligentes, transformas tu espacio 
              y te sumas a la revolución circular.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="#waitlist" className="w-full sm:w-auto">
                <Button className="w-full bg-ecly-green hover:bg-green-600 text-white text-lg font-black py-6 px-8 rounded-2xl shadow-[0_8px_0_0_#16a34a] hover:shadow-[0_4px_0_0_#16a34a] transition-all hover:translate-y-1 active:translate-y-2">
                  Sumate a Ecly ¡YA! <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a 
                href="#" 
                className="text-md font-black text-slate-500 hover:text-ecly-green transition-colors flex items-center gap-2 p-2"
              >
                ¿Cómo funciona?
              </a>
            </div>
          </div>

          {/* Columna 2: Imagen del stand real */}
          <div className="relative max-w-lg mx-auto lg:max-w-none w-full">
            <div className="aspect-[4/3] sm:aspect-video lg:aspect-square xl:aspect-[4/4] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white transform lg:rotate-1 hover:rotate-0 transition-all duration-500">
              <img 
                src="/ecly-stand-supermercado.png" 
                alt="Stand de Ecly en supermercado"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xl font-black">Tu local, versión 2.0</p>
                <p className="text-sm font-bold opacity-90">Tecnología Ecly instalada.</p>
              </div>
            </div>
            
            {/* Badge flotante DINÁMICO */}
            <div className={`absolute -top-6 -right-2 sm:-right-4 ${benefit.bgColor} ${benefit.textColor} p-4 rounded-full w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center justify-center text-center font-black -rotate-12 shadow-lg animate-float z-20 transition-all duration-500`}>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-tighter">{benefit.top}</span>
              <span className="text-2xl sm:text-3xl leading-none my-0.5">{benefit.value}</span>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-tighter">{benefit.bottom}</span>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer hidden lg:flex">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Scroll</span>
          <div className="w-6 h-10 border-2 border-ecly-green rounded-full flex justify-center p-1.5 shadow-sm">
            <div className="w-1.5 h-1.5 bg-ecly-green rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;