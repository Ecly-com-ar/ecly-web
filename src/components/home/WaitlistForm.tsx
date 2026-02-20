"use client";

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const WaitlistForm = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "¡Registro exitoso!",
      description: "Te has unido a nuestra lista de espera. Pronto nos contactaremos contigo.",
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-ecly-light" id="waitlist">
      <div className="mx-auto max-w-2xl text-center bg-white/50 p-8 sm:p-12 rounded-3xl border border-white shadow-sm">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Únete a la lista de espera para tu negocio</h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Incorpora la tecnología de Ecly en tu establecimiento y forma parte de la revolución circular.
        </p>
        
        <form onSubmit={handleSubmit} className="mt-10 space-y-6 text-left">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-semibold text-slate-900">Correo electrónico</Label>
            <Input 
              id="email" 
              name="email" 
              placeholder="ejemplo@empresa.com" 
              required 
              type="email"
              className="py-6 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-type" className="font-semibold text-slate-900">Elige el que mejor describa a tu negocio</Label>
            <select 
              className="flex h-12 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="business-type" 
              name="business-type" 
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="kiosko">Kiosko</option>
              <option value="minimercado">Minimercado</option>
              <option value="almacen">Almacén</option>
              <option value="distribuidora-alimentos">Distribuidora de alimentos</option>
              <option value="distribuidora-limpieza">Distribuidora de productos de limpieza</option>
              <option value="supermercado">Supermercado de cercanía</option>
              <option value="tienda-conveniencia">Tienda de conveniencia</option>
            </select>
          </div>

          <div className="space-y-4">
            <span className="block text-sm font-semibold leading-6 text-slate-900">Rango de facturación mensual aproximado</span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {['Menos de $1,000', '$1,000 - $5,000', '$5,000 - $10,000', 'Más de $10,000'].map((range, idx) => (
                <label key={idx} className="relative flex cursor-pointer rounded-lg border border-slate-200 bg-white p-4 shadow-sm focus:outline-none hover:border-ecly-green transition-colors">
                  <input className="sr-only peer" name="billing-range" type="radio" value={range.toLowerCase().replace(/ /g, '-')} />
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <span className="block text-sm font-medium text-slate-900">{range}</span>
                    </span>
                  </span>
                  <CheckCircle2 className="h-5 w-5 text-ecly-green opacity-0 peer-checked:opacity-100 transition-opacity" />
                  <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent peer-checked:border-ecly-green"></span>
                </label>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full py-7 text-lg font-bold bg-ecly-green hover:bg-green-700 shadow-lg transform transition-all hover:-translate-y-0.5">
            Unirse a la lista de espera
          </Button>
        </form>
      </div>
    </section>
  );
};

export default WaitlistForm;