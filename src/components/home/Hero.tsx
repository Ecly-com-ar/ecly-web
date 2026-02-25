"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Phone, Mail, User, Store, Send, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const benefits = [
  {
    top: "Aumenta",
    value: "+20%",
    bottom: "tus ventas",
    bgColor: "bg-ecly-electric",
    textColor: "text-white"
  },
  {
    top: "Elimina el",
    value: "100%",
    bottom: "del plástico descartable",
    bgColor: "bg-ecly-vibrant",
    textColor: "text-ecly-dark"
  }
];

type Step = 'whatsapp' | 'email' | 'name' | 'businessType' | 'zone';

const Hero = () => {
  const [currentBenefit, setCurrentBenefit] = useState(0);
  const [step, setStep] = useState<Step>('whatsapp');
  const [formData, setFormData] = useState({
    whatsapp: "",
    email: "",
    name: "",
    businessType: "",
    zone: ""
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % benefits.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getProgress = () => {
    switch (step) {
      case 'whatsapp': return 20;
      case 'email': return 40;
      case 'name': return 60;
      case 'businessType': return 80;
      case 'zone': return 95;
      default: return 0;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 'whatsapp') {
      if (formData.whatsapp.length < 8) {
        toast.error("Número inválido");
        return;
      }
      setStep('email');
      return;
    }

    if (step === 'email') {
      if (!formData.email.includes('@')) {
        toast.error("Email inválido");
        return;
      }
      setStep('name');
      return;
    }

    if (step === 'name') {
      if (formData.name.length < 2) {
        toast.error("Ingresa tu nombre");
        return;
      }
      setStep('businessType');
      return;
    }

    if (step === 'businessType') {
      if (formData.businessType === "") {
        toast.error("Selecciona tu negocio");
        return;
      }
      setStep('zone');
      return;
    }

    if (step === 'zone') {
      if (formData.zone === "") {
        toast.error("Selecciona tu zona");
        return;
      }
      toast.success("¡Registro completo! Pronto nos contactaremos.");
      setFormData({ whatsapp: "", email: "", name: "", businessType: "", zone: "" });
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
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Lanzamiento en Córdoba</span>
            </div>
            
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6">
              Sumate a la nueva forma de vender productos de limpieza <span className="text-ecly-green">sin plástico</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 font-bold mb-8 leading-snug max-w-lg">
              Estamos lanzando Ecly en Córdoba. Buscamos comercios que quieran ofrecer recargas inteligentes y atraer nuevos clientes.
            </p>

            <div className="flex flex-col items-start gap-3">
              <a href="#waitlist" className="w-full sm:w-auto">
                <Button className="w-full bg-ecly-green hover:bg-green-600 text-white text-lg font-black py-6 px-8 rounded-2xl shadow-[0_8px_0_0_#16a34a] hover:shadow-[0_4px_0_0_#16a34a] transition-all hover:translate-y-1 active:translate-y-2">
                  Quiero tener Ecly en mi local <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <p className="text-sm font-black text-slate-400 pl-2">
                Preinscripción sin costo ni compromiso
              </p>
            </div>
          </div>

          <div className="relative max-w-lg mx-auto lg:max-w-none w-full">
            <div className="aspect-[4/3] sm:aspect-video lg:aspect-square xl:aspect-[4/4] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white transition-all duration-500 relative">
              <img 
                src="/ecly-stand-supermercado.png" 
                alt="Stand de Ecly en Córdoba"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/10 backdrop-blur-xl rounded-[1.5rem] border border-white/20 shadow-2xl transition-all">
                <div className="mb-2 flex justify-between items-center">
                  <p className="text-white text-xs font-black uppercase tracking-widest opacity-80">
                    Tener Ecly en mi local
                  </p>
                  <div className="text-white/60 text-[10px] font-black bg-white/10 px-2 py-0.5 rounded">
                    {step === 'whatsapp' ? '1/5' : step === 'email' ? '2/5' : step === 'name' ? '3/5' : step === 'businessType' ? '4/5' : '5/5'}
                  </div>
                </div>

                <Progress value={getProgress()} className="h-1 mb-4 bg-white/10" />
                
                <form onSubmit={handleSubmit} className="flex flex-row items-center gap-2">
                  <div className="relative flex-1">
                    {step === 'whatsapp' && (
                      <div className="animate-in slide-in-from-right duration-300 relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
                        <Input 
                          type="tel"
                          placeholder="Tu WhatsApp"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 font-bold pl-10 h-12 rounded-xl focus-visible:ring-0 outline-none border-0"
                          required
                        />
                      </div>
                    )}
                    {step === 'email' && (
                      <div className="animate-in slide-in-from-right duration-300 relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
                        <Input 
                          type="email"
                          placeholder="Tu Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 font-bold pl-10 h-12 rounded-xl focus-visible:ring-0 outline-none border-0"
                          autoFocus
                          required
                        />
                      </div>
                    )}
                    {step === 'name' && (
                      <div className="animate-in slide-in-from-right duration-300 relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
                        <Input 
                          type="text"
                          placeholder="Tu Nombre"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 font-bold pl-10 h-12 rounded-xl focus-visible:ring-0 outline-none border-0"
                          autoFocus
                          required
                        />
                      </div>
                    )}
                    {step === 'businessType' && (
                      <div className="animate-in slide-in-from-right duration-300 relative">
                        <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
                        <select 
                          className="flex h-12 w-full items-center justify-between rounded-xl border-0 bg-white/10 pl-10 pr-4 text-white text-sm font-bold focus:outline-none focus:ring-0 appearance-none"
                          value={formData.businessType}
                          onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                          autoFocus
                          required
                        >
                          <option value="" className="text-slate-900">Tipo de negocio</option>
                          <option value="kiosko" className="text-slate-900">Kiosko</option>
                          <option value="minimercado" className="text-slate-900">Minimercado</option>
                          <option value="almacen" className="text-slate-900">Almacén</option>
                          <option value="distribuidora" className="text-slate-900">Distribuidora</option>
                          <option value="supermercado" className="text-slate-900">Supermercado</option>
                        </select>
                      </div>
                    )}
                    {step === 'zone' && (
                      <div className="animate-in slide-in-from-right duration-300 relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
                        <select 
                          className="flex h-12 w-full items-center justify-between rounded-xl border-0 bg-white/10 pl-10 pr-4 text-white text-sm font-bold focus:outline-none focus:ring-0 appearance-none"
                          value={formData.zone}
                          onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                          autoFocus
                          required
                        >
                          <option value="" className="text-slate-900">Tu Zona</option>
                          <option value="sur" className="text-slate-900">Zona Sur</option>
                          <option value="norte" className="text-slate-900">Zona Norte</option>
                          <option value="centro" className="text-slate-900">Zona Centro</option>
                          <option value="otro" className="text-slate-900">Otro</option>
                        </select>
                      </div>
                    )}
                  </div>
                  <Button 
                    type="submit"
                    size="icon"
                    className="bg-ecly-green hover:bg-green-600 text-white h-12 w-12 rounded-xl shadow-lg transition-all shrink-0"
                  >
                    {step === 'zone' ? <Send className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
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