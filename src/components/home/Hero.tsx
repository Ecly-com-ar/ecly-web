"use client";

import React from 'react';
import { ShieldCheck, Star, ArrowRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Hero = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "¡Excelente elección!",
      description: "Pronto te ayudaremos a transformar tu comercio.",
    });
  };

  return (
    <section className="relative bg-white pt-12 pb-24 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-ecly-light rounded-full blur-3xl opacity-50 -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Lado Izquierdo: Propuesta de Valor */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ecly-green/10 text-ecly-green text-sm font-bold mb-6">
              <ShieldCheck size={16} /> Empresa de Triple Impacto
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
              Sumate a la revolución <span className="text-ecly-green">circular</span> en tu barrio.
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
              Sé el primero en ofrecer productos con tecnología Ecly. Atraé nuevos clientes, reducís residuos y sos parte del cambio real.
            </p>

            <div className="flex flex-wrap gap-6 mb-12">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                  <Star size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Pionero</p>
                  <p className="text-xs text-slate-500">Liderá en tu zona</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-ecly-green">
                  <Star size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">+ Sostenible</p>
                  <p className="text-xs text-slate-500">100% Retornable</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Formulario de Inscripción */}
          <div className="relative">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-ecly-green/10 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Inscribí tu comercio</h3>
              <p className="text-slate-500 mb-8">Completá los datos y te contactamos en menos de 24hs.</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 ml-1">Nombre del Comercio</label>
                  <Input 
                    placeholder="Ej: Almacén Los Amigos" 
                    className="h-14 rounded-2xl border-slate-200 focus:ring-ecly-green" 
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email de contacto</label>
                  <Input 
                    type="email" 
                    placeholder="contacto@tucomercio.com" 
                    className="h-14 rounded-2xl border-slate-200 focus:ring-ecly-green"
                    required 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 ml-1">Tipo de Negocio</label>
                  <select className="flex h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ecly-green">
                    <option>Kiosko / Almacén</option>
                    <option>Minimercado</option>
                    <option>Distribuidora</option>
                    <option>Otro</option>
                  </select>
                </div>
                
                <Button className="w-full h-16 rounded-2xl bg-ecly-green hover:bg-green-700 text-lg font-bold shadow-lg shadow-ecly-green/20 transition-all hover:scale-[1.02] active:scale-95">
                  Sumate ahora <ArrowRight className="ml-2" />
                </Button>
                
                <p className="text-center text-xs text-slate-400 mt-4">
                  Unirse a la red de Triple Impacto no tiene costo inicial.
                </p>
              </form>
            </div>
            
            {/* Badge de confianza */}
            <div className="absolute -bottom-6 -right-6 md:right-0 bg-slate-900 text-white p-4 rounded-2xl shadow-xl hidden sm:block">
              <p className="text-xs font-medium opacity-80 uppercase tracking-widest mb-1">Impacto Real</p>
              <p className="text-lg font-bold">50% Menos Plástico</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;