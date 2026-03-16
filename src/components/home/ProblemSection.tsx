"use client";

import React from 'react';
import { PackageX, Droplets, RefreshCw, Sparkles } from 'lucide-react';

const ProblemSection = () => {
  return (
    <section id="problema" className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="relative order-2 lg:order-1 flex justify-center">
            <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-ecly-light blur-3xl opacity-50"></div>
            <div className="relative z-10 w-full max-w-[500px] aspect-square overflow-hidden rounded-[3rem] shadow-2xl transition-transform hover:scale-[1.02] duration-500 border-4 border-white">
              <img 
                alt="Problemática de envases plásticos" 
                className="w-full h-full object-cover" 
                src="/image_envases.jpeg" 
              />
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0 order-1 lg:order-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black tracking-widest text-ecly-green bg-ecly-light uppercase mb-6">
              El Problema
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight mb-8">
              El modelo actual es <span className="text-ecly-green">insostenible.</span>
            </h2>
            
            <p className="text-lg text-slate-600 mb-8 font-medium leading-relaxed">
              Si miramos cómo consumimos productos de limpieza o higiene, el problema es claro:
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-xl bg-red-50 text-red-600">
                  <PackageX className="h-5 w-5" />
                </div>
                <p className="text-slate-700 font-bold text-lg">Las personas no necesitan el envase.</p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-xl bg-blue-50 text-blue-600">
                  <Droplets className="h-5 w-5" />
                </div>
                <p className="text-slate-700 font-bold text-lg">Solo necesitan el producto.</p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-xl bg-orange-50 text-orange-600">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <p className="text-slate-700 font-bold text-lg">Pero hoy el sistema de distribución está diseñado para vender un envase nuevo cada vez.</p>
              </div>

              <div className="flex items-start gap-4 mt-4 p-6 bg-ecly-light rounded-2xl border border-ecly-vibrant/20 shadow-sm">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-xl bg-ecly-green text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-ecly-dark font-black text-lg">
                  Eso abre una oportunidad enorme: Impulsar la transición del modelo de envases descartables hacia un sistema de recarga.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;