"use client";

import React from 'react';
import { Factory, ShoppingBag, Truck } from 'lucide-react';

const ProblemSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-ecly-light blur-3xl opacity-50"></div>
            <img 
              alt="El Problema Ambiental" 
              className="relative z-10 w-full h-auto rounded-3xl shadow-2xl transition-transform hover:scale-[1.02] duration-500" 
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800" 
            />
          </div>
          
          <div className="mt-12 lg:mt-0 order-1 lg:order-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest text-ecly-green bg-ecly-light uppercase mb-6">
              El Problema
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight mb-8">
              Estamos enterrando recursos que valen <span className="text-ecly-green">divisas.</span>
            </h2>
            
            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-2xl bg-ecly-light text-ecly-green">
                  <Factory className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">50 %</h3>
                  <p className="text-slate-600 mt-1 font-medium">Capacidad ociosa en la industria recicladora por falta de Trazabilidad</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-50 text-blue-600">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">42,7 KG</h3>
                  <p className="text-slate-600 mt-1 font-medium">Plástico consumido por persona al año; la mayoría termina rellenos sanitarios</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-2xl bg-orange-50 text-orange-600">
                  <Truck className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">MILLONES</h3>
                  <p className="text-slate-600 mt-1 font-medium">Pesos desperdiciados en logística inversa ineficiente y envases de un solo uso.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Fuente: ECOPLAS / CAIRPLAS (Datos 2024-2025)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;