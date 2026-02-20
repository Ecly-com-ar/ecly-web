"use client";

import React from 'react';
import { Leaf } from 'lucide-react';

const BrandLogos = () => {
  return (
    <section className="border-y border-slate-100 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="mb-8 text-sm font-semibold uppercase tracking-wider text-slate-400">Marcas que impulsan el cambio</p>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:flex lg:justify-center lg:items-center lg:gap-16 opacity-75 grayscale transition-all hover:grayscale-0">
          <div className="flex items-center justify-center">
            <span className="text-2xl font-black italic text-slate-800 tracking-tight">Ciff</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-2xl font-black text-slate-800 tracking-tighter" style={{ fontFamily: 'serif' }}>Pritty</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-2xl font-bold text-red-600 tracking-tight">Coca-Cola</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-xl font-bold text-slate-600">BioTech</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="flex items-center gap-1 font-bold text-slate-700">
              <Leaf className="h-5 w-5 text-ecly-green" /> PureLife
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;