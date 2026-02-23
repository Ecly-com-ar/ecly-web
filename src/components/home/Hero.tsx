"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Phone, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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
  const [step, setStep] = useState<'whatsapp' | 'email'>('whatsapp');
  const [formData, setFormData] = useState({
    whatsapp: "",
    email: ""
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % benefits.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 'whatsapp') {
      if (formData.whatsapp.length < 8) {
        toast.error("Por favor ingresa un número de celular válido");
        return;
      }
      setStep('email');
      return;
    }

    if (step === 'email') {
      if (!formData.email.includes('@')) {
        toast.error("Por favor ingresa un email válido");
        return;
      }
      toast.success("¡Genial! Ya iniciamos tu inscripción. Te contactaremos pronto.");
      setFormData({ whatsapp: "", email: "" });
      setStep('whatsapp');
    }
  };

  const benefit = benefits[currentBenefit];

  return (
    <section id="inicio" className="relative overflow-hidden bg-ecly-light py-8 lg:py-12 min-h-[calc(100vh-96px)] flex items-center">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-ecly-vibrant/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-ecly-accent/10 rounded-full blur-[80px]"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
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
            </div>
          </div>

          <div className="relative max-w-lg mx-auto lg:max-w-none w-full">
            <div className="aspect-[4/3] sm:aspect-video lg:aspect-square xl:aspect-[4/4] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white transition-all duration-500 relative">
              <img 
                src="/ecly-stand-supermercado.png" 
                alt="Stand de Ecly en supermercado"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Formulario de inscripción sobre la imagen - Versión dinámica */}
              <div className="absolute bottom-8 left-6 right-6 p-6 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-2xl transition-all">
                <div className="mb-4">
                  <h3 className="text-white text-2xl font-black leading-tight">Inscribite ahora 🚀</h3>
                  <p className="text-white/80 text-sm font-bold">Se de los primeros</p>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="relative overflow-hidden">
                    {step === 'whatsapp' ? (
                      <div className="animate-in slide-in-from-right duration-300">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                        <Input 
                          type="tel"
                          placeholder="Tu celular (WhatsApp)"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 font-bold pl-12 h-14 rounded-xl focus-visible:ring-ecly-green"
                          required
                        />
                      </div>
                    ) : (
                      <div className="animate-in slide-in-from-right duration-300">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                        <Input 
                          type="email"
                          placeholder="Tu correo electrónico"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 font-bold pl-12 h-14 rounded-xl focus-visible:ring-ecly-green"
                          autoFocus
                          required
                        />
                      </div>
                    )}
                  </div>
                  <Button 
                    type="submit"
                    className="bg-ecly-green hover:bg-green-600 text-white font-black text-lg h-14 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {step === 'whatsapp' ? 'Inscribirse' : 'Finalizar registro'}
                  </Button>
                </form>
              </div>
            </div>
            
            <div 
              key={currentBenefit}
              className={`absolute -top-6 -right-2 sm:-right-4 ${benefit.bgColor} ${benefit.textColor} p-4 rounded-full w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center justify-center text-center font-black -rotate-12 shadow-lg z-20 transition-all duration-1000 animate-in zoom-in-50 fade-in duration-500`}
            >
              <span className="text-[8px] sm:text-[10px] uppercase tracking-tighter">{benefit.top}</span>
              <span className="text-2xl sm:text-3xl leading-none my-0.5">{benefit.value}</span>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-tighter">{benefit.bottom}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;