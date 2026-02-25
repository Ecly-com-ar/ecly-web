"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Leaf, History, Target, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-sans selection:bg-ecly-vibrant selection:text-ecly-dark">
      <Header />
      <main className="flex-1 bg-white pt-24">
        {/* Hero Section - About */}
        <section className="bg-ecly-light py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8">
              Nuestro Origen <span className="text-ecly-green">Ecly</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
              Nacimos de una necesidad urgente: transformar la manera en que consumimos 
              productos esenciales para el hogar, eliminando el desperdicio desde la raíz.
            </p>
          </div>
        </section>

        {/* History Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 text-ecly-green font-black uppercase tracking-widest mb-4">
                  <History className="h-6 w-6" />
                  <span>Historia</span>
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-6">El inicio de una revolución circular</h2>
                <div className="space-y-4 text-lg text-slate-600 font-medium leading-relaxed">
                  <p>
                    Ecly surgió en Córdoba con una visión clara: el modelo actual de "comprar, usar y tirar" es insostenible. 
                    Observamos cómo los envases de plástico de un solo uso invadían nuestros hogares y rellenos sanitarios, 
                    siendo la logística de transporte de "aire y plástico" uno de los mayores costos ocultos de la industria.
                  </p>
                  <p>
                    Nos propusimos crear una solución que no solo fuera ecológica, sino también económicamente superior 
                    para los comercios de cercanía y sus clientes.
                  </p>
                </div>
              </div>
              <div className="bg-slate-100 rounded-[3rem] aspect-square overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800" 
                  alt="Sustentabilidad"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Vision/Values */}
        <section className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 mb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="space-y-6">
                <div className="bg-ecly-vibrant/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto">
                  <Target className="h-10 w-10 text-ecly-vibrant" />
                </div>
                <h3 className="text-2xl font-black">Nuestra Misión</h3>
                <p className="text-slate-400 font-bold">Democratizar el acceso al consumo sustentable a través de tecnología de recarga inteligente.</p>
              </div>
              <div className="space-y-6">
                <div className="bg-ecly-vibrant/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto">
                  <Leaf className="h-10 w-10 text-ecly-vibrant" />
                </div>
                <h3 className="text-2xl font-black">Impacto Real</h3>
                <p className="text-slate-400 font-bold">Eliminar toneladas de plástico virgen del mercado argentino conectando productores con comercios locales.</p>
              </div>
              <div className="space-y-6">
                <div className="bg-ecly-vibrant/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto">
                  <Users className="h-10 w-10 text-ecly-vibrant" />
                </div>
                <h3 className="text-2xl font-black">Comunidad</h3>
                <p className="text-slate-400 font-bold">Empoderar al almacén de barrio para que sea el protagonista de la transición ecológica.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;