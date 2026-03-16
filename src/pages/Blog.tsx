"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BookOpen } from 'lucide-react';

const Blog = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-sans selection:bg-ecly-vibrant selection:text-ecly-dark">
      <Header />
      <main className="flex-1 bg-white pt-24">
        <section className="bg-ecly-light py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-8 w-8 text-ecly-green" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8">
              Nuestro <span className="text-ecly-green">Blog</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Novedades, consejos de sustentabilidad y el impacto de la economía circular en nuestra comunidad.
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {/* Placeholder para artículos futuros */}
              <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <p className="text-2xl font-black text-slate-400">Próximamente compartiremos nuestras primeras historias...</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;