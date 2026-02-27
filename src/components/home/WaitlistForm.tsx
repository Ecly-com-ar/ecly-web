"use client";

import React, { useState } from 'react';
import { PartyPopper, Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const WaitlistForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      whatsapp: formData.get('whatsapp') as string,
      business_type: formData.get('business-type') as string,
      zone: formData.get('zone') as string,
    };

    try {
      const { error } = await supabase
        .from('inscriptos')
        .insert([data]);

      if (error) throw error;

      toast({
        title: "¡Genial! Ya estás en la lista",
        description: "Nos pondremos en contacto muy pronto para transformar tu negocio.",
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error("Error al registrar:", err);
      toast({
        title: "Error al registrar",
        description: "Hubo un problema técnico. Por favor, intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-white" id="waitlist">
      <div className="mx-auto max-w-3xl text-center bg-ecly-light p-8 sm:p-16 rounded-[3rem] border-4 border-ecly-vibrant shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <PartyPopper size={120} className="text-ecly-green" />
        </div>

        <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl mb-6 leading-tight">
          Sumá tu comercio a Ecly
        </h2>
        <p className="mt-4 text-xl font-bold text-slate-600 mb-10">
          Completá el formulario y participá del lanzamiento en tu zona. Preinscripción gratuita y sin compromiso.
        </p>
        
        <form onSubmit={handleSubmit} className="mt-10 space-y-8 text-left max-w-xl mx-auto">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-lg font-black text-slate-900">Tu nombre completo</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="Juan Pérez" 
              required 
              className="py-8 rounded-2xl border-2 border-slate-200 focus:border-slate-200 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg font-bold outline-none"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="email" className="text-lg font-black text-slate-900">Email de contacto</Label>
            <Input 
              id="email" 
              name="email" 
              placeholder="hola@tunegocio.com" 
              required 
              type="email"
              className="py-8 rounded-2xl border-2 border-slate-200 focus:border-slate-200 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg font-bold outline-none"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="whatsapp" className="text-lg font-black text-slate-900">WhatsApp de contacto</Label>
            <Input 
              id="whatsapp" 
              name="whatsapp" 
              placeholder="351 1234567" 
              required 
              type="tel"
              className="py-8 rounded-2xl border-2 border-slate-200 focus:border-slate-200 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg font-bold outline-none"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="business-type" className="text-lg font-black text-slate-900">
              ¿Qué tipo de negocio tienes?
            </Label>
            <select 
              className="flex h-16 w-full items-center justify-between rounded-2xl border-2 border-slate-200 bg-background px-4 py-2 text-lg font-bold focus:outline-none focus:ring-0 appearance-none"
              id="business-type" 
              name="business-type" 
              required
            >
              <option value="">Selecciona un tipo</option>
              <option value="kiosko">Kiosko</option>
              <option value="minimercado">Minimercado</option>
              <option value="almacen">Almacén</option>
              <option value="distribuidora">Distribuidora</option>
              <option value="supermercado">Supermercado</option>
              <option value="Otro">Otro emprendimiento</option>
            </select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="zone" className="text-lg font-black text-slate-900">
              ¿En qué zona se encuentra?
            </Label>
            <select 
              className="flex h-16 w-full items-center justify-between rounded-2xl border-2 border-slate-200 bg-background px-4 py-2 text-lg font-bold focus:outline-none focus:ring-0 appearance-none"
              id="zone" 
              name="zone" 
              required
            >
              <option value="">Selecciona tu zona</option>
              <option value="sur">Zona Sur</option>
              <option value="norte">Zona Norte</option>
              <option value="centro">Zona Centro</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-6 sm:py-10 text-xl sm:text-2xl font-black bg-ecly-green hover:bg-green-600 text-white rounded-[2rem] shadow-[0_12px_0_0_#16a34a] hover:translate-y-1 transition-all active:translate-y-2 whitespace-normal h-auto text-center leading-tight flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-6 w-6" /> Registrando...
              </>
            ) : (
              "Quiero tener Ecly en mi local"
            )}
          </Button>
          
          <p className="text-center text-sm font-bold text-slate-400">
            * Al enviar, aceptas participar de la fase de lanzamiento en Córdoba.
          </p>
        </form>
      </div>
    </section>
  );
};

export default WaitlistForm;