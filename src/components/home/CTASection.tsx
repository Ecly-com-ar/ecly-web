"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="bg-ecly-green">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          ¿Listo para sumarte al cambio?<br />
          Empieza a vender o comprar de forma sostenible.
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <Button className="bg-white text-ecly-green hover:bg-slate-100 font-semibold px-6 py-6">
            Registrar mi Marca
          </Button>
          <a className="text-sm font-semibold leading-6 text-white hover:text-green-100 flex items-center gap-1" href="#">
            Contactar soporte <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;