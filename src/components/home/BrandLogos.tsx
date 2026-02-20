"use client";

import React from 'react';
import { Leaf } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const brands = [
  { name: 'Ciff', type: 'italic' },
  { name: 'Pritty', type: 'serif' },
  { name: 'Coca-Cola', type: 'red' },
  { name: 'BioTech', type: 'bold' },
  { name: 'PureLife', type: 'leaf' },
  { name: 'EcoVibe', type: 'italic' },
  { name: 'GreenWay', type: 'bold' },
];

const BrandLogos = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 3000, stopOnInteraction: false })
  ]);

  return (
    <section className="border-y border-slate-100 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="mb-8 text-sm font-semibold uppercase tracking-wider text-slate-400">Entidades que impulsan el cambio</p>
        
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex items-center opacity-75 grayscale transition-all hover:grayscale-0">
            {brands.concat(brands).map((brand, idx) => (
              <div 
                key={idx} 
                className="flex-[0_0_50%] min-w-0 sm:flex-[0_0_33%] md:flex-[0_0_25%] lg:flex-[0_0_20%] px-4 flex justify-center items-center"
              >
                {brand.type === 'italic' && (
                  <span className="text-2xl font-black italic text-slate-800 tracking-tight whitespace-nowrap">{brand.name}</span>
                )}
                {brand.type === 'serif' && (
                  <span className="text-2xl font-black text-slate-800 tracking-tighter whitespace-nowrap" style={{ fontFamily: 'serif' }}>{brand.name}</span>
                )}
                {brand.type === 'red' && (
                  <span className="text-2xl font-bold text-red-600 tracking-tight whitespace-nowrap">{brand.name}</span>
                )}
                {brand.type === 'bold' && (
                  <span className="text-xl font-bold text-slate-600 whitespace-nowrap">{brand.name}</span>
                )}
                {brand.type === 'leaf' && (
                  <span className="flex items-center gap-1 font-bold text-slate-700 whitespace-nowrap">
                    <Leaf className="h-5 w-5 text-ecly-green" /> {brand.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;