"use client";

import React from 'react';
import { CheckCircle2, PartyPopper } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const WaitlistForm = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "¡Genial! Ya estás en la lista 🎉",
      description: "Nos pondremos en contacto muy pronto para transformar tu negocio.",
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-white" id="waitlist">
      <div className="mx-auto max-w-3xl text-center bg-ecly-light p-8 sm:p-16 rounded-[3rem] border-4 border-ecly-vibrant shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <PartyPopper size={120} className="text-ecly-green" />
        </div>

        <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl mb-6">
          ¡Sumate a Ecly y transforma tu espacio! 🌟
        </h2>
        <p className="mt-4 text-xl font-bold text-slate-600 mb-10">
          ¿Listo para ser el próximo caso de éxito? Déjanos tus datos y nos encargamos del resto.
        </p>
        
        <form onSubmit={handleSubmit} className="mt-10 space-y-8 text-left max-w-xl mx-auto">
          <div className="space-y-3">
            <Label htmlFor="email" className="text-lg font-black text-slate-900">¿Cuál es tu email de contacto? 📧</Label>
            <Input 
              id="email" 
              name="email" 
              placeholder="hola@tunegocio.com" 
              required 
              type="email"
              className="py-8 rounded-2xl border-2 border-slate-200 focus:border-ecly-green text-lg font-bold"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="business-type" className="text-lg font-black text-slate-900">¿Qué tipo de negocio tienes? 🏪</Label>
            <select 
              className="flex h-16 w-full items-center justify-between rounded-2xl border-2 border-slate-200 bg-background px-4 py-2 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-ecly-green appearance-none"
              id="business-type" 
              name="business-type" 
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="kiosko">Kiosko con onda</option>
              <option value="minimercado">Minimercado de barrio</option>
              <option value="almacen">Almacén tradicional</option>
              <option value="distribuidora">Distribuidora mayorista</option>
              <option value="supermercado">Súper de cercanía</option>
              <option value="Otro">Otro emprendimiento</option>
            </select>
          </div>

          <div className="space-y-4">
            <span className="block text-lg font-black text-slate-900">¿Cuánto facturas aproximadamente? (USD) 💰</span>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {['Menos de $1,000', '$1,000 - $5,000', '$5,000 - $10,000', 'Más de $10,000'].map((range, idx) => (
                <label key={idx} className="relative flex cursor-pointer rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm hover:border-ecly-green transition-all peer-checked:bg-ecly-light">
                  <input className="sr-only peer" name="billing-range" type="radio" value={range.toLowerCase().replace(/ /g, '-')} />
                  <span className="flex flex-1">
                    <span className="text-md font-black text-slate-900">{range}</span>
                  </span>
                  <CheckCircle2 className="h-6 w-6 text-ecly-green opacity-0 peer-checked:opacity-100 transition-opacity" />
                  <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-2xl border-2 border-transparent peer-checked:border-ecly-green"></span>
                </label>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full py-10 text-2xl font-black bg-ecly-green hover:bg-green-600 text-white rounded-[2rem] shadow-[0_12px_0_0_#16a34a] hover:translate-y-1 transition-all active:translate-y-2">
            ¡Quiero empezar ya! 🚀
          </Button>
          
          <p className="text-center text-sm font-bold text-slate-400">
            * No spam, solo soluciones reales para tu negocio.
          </p>
        </form>
      </div>
    </section>
  );
};

export default WaitlistForm;