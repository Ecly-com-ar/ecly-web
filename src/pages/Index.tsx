"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/home/Hero';
import BrandLogos from '@/components/home/BrandLogos';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/layout/Footer';
import { Store, TrendingUp, Users } from 'lucide-react';
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-sans bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        
        {/* Sección de Beneficios con estilo de Tarjetas Modernas */}
        <section className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase">
                  Por qué tu comercio <br />
                  <span className="text-ecly-green">necesita</span> Ecly.
                </h2>
              </div>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Deslizá para conocer más</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  icon: <Store size={40} />, 
                  title: "DIFERENCIACIÓN", 
                  desc: "Sé el referente sustentable. Los clientes eligen marcas con propósito.",
                  color: "bg-ecly-green" 
                },
                { 
                  icon: <TrendingUp size={40} />, 
                  title: "MÁS VENTAS", 
                  desc: "Atraé al consumidor consciente que busca activamente envases retornables.",
                  color: "bg-blue-600" 
                },
                { 
                  icon: <Users size={40} />, 
                  title: "TRIPLE IMPACTO", 
                  desc: "Cuidás el ambiente, generás empleo local y hacés crecer tu economía.",
                  color: "bg-orange-500" 
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50"
                >
                  <div className={`w-20 h-20 ${item.color} text-white rounded-3xl flex items-center justify-center mb-8 shadow-lg`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tighter uppercase">{item.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <BrandLogos />
        
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="bg-ecly-green rounded-[3rem] p-12 md:p-24 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <Users size={300} strokeWidth={1} />
              </div>
              <h2 className="text-4xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase mb-10 relative z-10">
                ¿LISTO PARA <br />EL CAMBIO?
              </h2>
              <CTASection />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;