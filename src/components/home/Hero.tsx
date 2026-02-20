"use client";

import React from 'react';
import { Package, Droplets, FlaskConical, Leaf, Recycle } from 'lucide-react';

const Hero = () => {
  return (
    <section id="inicio" className="relative overflow-hidden bg-ecly-light py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              <span className="block">Consumo responsable,</span>
              <span className="block text-ecly-green">futuro sostenible</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-slate-600 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl lg:mx-0">
              Descubre productos envasados con la tecnología circular de Ecly. Reduce plásticos y apoya a las marcas que cuidan el planeta.
            </p>
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center lg:justify-start md:mt-8 lg:mx-0">
              <div className="rounded-md shadow">
                <a className="flex w-full items-center justify-center rounded-md border border-transparent bg-ecly-green px-8 py-3 text-base font-medium text-white hover:bg-green-700 md:py-4 md:text-lg md:px-10" href="#waitlist">
                  Solicita ahora
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a 
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-ecly-green hover:bg-slate-50 md:py-4 md:text-lg md:px-10" 
                  href="https://www.canva.com/design/DAHAfJK3fOw/9oOsUMWcJ3tNi9EEOuBTww/view?utm_content=DAHAfJK3fOw&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h0d873b5d79"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Saber más
                </a>
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block mt-12 lg:mt-0">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-green-100 rounded-full opacity-30 blur-3xl transform translate-x-10 translate-y-10"></div>
              <div className="relative h-full w-full bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl flex items-center justify-center overflow-hidden">
                <div className="grid grid-cols-2 gap-4 p-8 w-full h-full">
                  <div className="bg-ecly-light rounded-2xl flex flex-col items-center justify-center p-4 border border-green-100 transform hover:scale-105 transition-transform duration-300">
                    <Package className="h-10 w-10 text-ecly-green mb-2" />
                    <span className="text-xs font-bold text-slate-600 text-center">Envases Retornables</span>
                  </div>
                  <div className="bg-blue-50 rounded-2xl flex flex-col items-center justify-center p-4 border border-blue-100 transform translate-y-8 hover:scale-105 transition-transform duration-300">
                    <Droplets className="h-10 w-10 text-blue-500 mb-2" />
                    <span className="text-xs font-bold text-slate-600 text-center">Zero Waste</span>
                  </div>
                  <div className="bg-yellow-50 rounded-2xl flex flex-col items-center justify-center p-4 border border-yellow-100 transform -translate-y-4 hover:scale-105 transition-transform duration-300">
                    <FlaskConical className="h-10 w-10 text-yellow-600 mb-2" />
                    <span className="text-xs font-bold text-slate-600 text-center">Tecnología</span>
                  </div>
                  <div className="bg-green-50 rounded-2xl flex flex-col items-center justify-center p-4 border border-green-200 transform hover:scale-105 transition-transform duration-300">
                    <Leaf className="h-10 w-10 text-ecly-dark mb-2" />
                    <span className="text-xs font-bold text-slate-600 text-center">Circular</span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white p-4 rounded-full shadow-lg border border-slate-100 flex flex-col items-center">
                    <Recycle className="h-12 w-12 text-ecly-green animate-pulse" />
                    <span className="text-black font-bold text-sm mt-1">Ecly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;