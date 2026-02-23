import React from 'react';
import { ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Hero = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "¡EL CAMBIO EMPIEZA HOY!",
      description: "Recibimos tu solicitud. Un asesor te contactará pronto.",
    });
  };

  return (
    <section className="relative bg-white pt-16 pb-32 overflow-hidden">
      {/* Círculos de acento modernos */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-ecly-green/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Lado Izquierdo: Comunicación Directa */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] mb-8"
            >
              <ShieldCheck size={14} className="text-ecly-green" /> Triple Impacto Real
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8"
            >
              LIDERÁ LA <br />
              <span className="text-ecly-green">REVOLUCIÓN</span> <br />
              CIRCULAR.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-500 font-medium leading-tight max-w-lg mb-10"
            >
              Tu comercio es el centro del cambio. Vendé más, reducí residuos y sé el <span className="text-slate-900 font-bold underline decoration-ecly-green decoration-4">primero en tu zona</span>.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="grid grid-cols-2 gap-4 max-w-md"
            >
              <div className="border-l-4 border-ecly-green pl-4">
                <p className="text-3xl font-black text-slate-900">+VENTAS</p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Nuevos Clientes</p>
              </div>
              <div className="border-l-4 border-slate-900 pl-4">
                <p className="text-3xl font-black text-slate-900">ZERO</p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Residuos</p>
              </div>
            </motion.div>
          </div>

          {/* Lado Derecho: Formulario "App-Style" */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            <div className="bg-slate-900 p-8 md:p-12 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(22,163,74,0.2)]">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-3xl font-black text-white leading-none">SUMATE</h3>
                  <p className="text-ecly-green font-bold text-sm uppercase tracking-widest mt-2">Inscripción Express</p>
                </div>
                <Zap className="text-ecly-green h-8 w-8 fill-ecly-green" />
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Input 
                    placeholder="NOMBRE DEL COMERCIO" 
                    className="h-16 rounded-2xl bg-slate-800 border-none text-white placeholder:text-slate-500 font-bold focus-visible:ring-2 focus-visible:ring-ecly-green" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input 
                    type="email" 
                    placeholder="EMAIL DE CONTACTO" 
                    className="h-16 rounded-2xl bg-slate-800 border-none text-white placeholder:text-slate-500 font-bold focus-visible:ring-2 focus-visible:ring-ecly-green"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <select className="flex h-16 w-full rounded-2xl bg-slate-800 border-none text-white px-4 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-ecly-green appearance-none">
                    <option className="bg-slate-900">KIOSKO / ALMACÉN</option>
                    <option className="bg-slate-900">MINIMERCADO</option>
                    <option className="bg-slate-900">DISTRIBUIDORA</option>
                    <option className="bg-slate-900">OTRO</option>
                  </select>
                </div>
                
                <Button type="submit" className="w-full h-20 rounded-2xl bg-ecly-green hover:bg-white hover:text-slate-900 text-slate-900 text-xl font-black transition-all transform hover:scale-[1.02] active:scale-95 group">
                  ENVIAR SOLICITUD <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
              
              <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-8">
                Cupos limitados por zona geográfica
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;