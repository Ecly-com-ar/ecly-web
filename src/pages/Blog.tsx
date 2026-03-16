"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import { Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Blog = () => {
  // Flag para alternar entre el mensaje de próximamente y el contenido real
  const isAvailable = false;

  // Función para limitar caracteres
  const formatTitle = (title: string, limit: number = 60) => {
    return title.length > limit ? title.substring(0, limit) + "..." : title;
  };

  // Datos para cuando se habilite
  const mainPost = blogPosts[0];
  const featuredPosts = blogPosts.slice(1, 3);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white text-slate-900">
      <Header />
      
      <main className="flex-1 pt-32 pb-20">
        {!isAvailable ? (
          /* Vista de Próximamente */
          <div className="mx-auto max-w-2xl px-4 text-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-ecly-light text-ecly-green mb-8 shadow-sm">
              <Clock className="h-10 w-10" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 italic tracking-tight">
              Próximamente
            </h1>
            
            <p className="text-xl text-slate-600 font-bold mb-12 leading-relaxed max-w-lg mx-auto">
              Estamos preparando las mejores historias, consejos de limpieza sustentable y novedades para vos.
            </p>
            
            <Link to="/">
              <Button className="bg-ecly-green hover:bg-green-700 text-white rounded-full px-10 py-7 text-lg font-black shadow-lg transition-all border-none">
                <ArrowLeft className="mr-2 h-5 w-5" /> Volver al inicio
              </Button>
            </Link>
          </div>
        ) : (
          /* Contenido del Blog (Oculto hasta que isAvailable sea true) */
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-8">
                <Link to={`/blog/${mainPost.id}`} className="group block">
                  <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden border border-slate-100 mb-8">
                    <img src={mainPost.image} alt={mainPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-black text-ecly-green mb-4 tracking-[0.2em] uppercase">Ecly • Sustentable</div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 line-clamp-2">{formatTitle(mainPost.title)}</h2>
                  </div>
                </Link>
              </div>
              
              <div className="lg:col-span-4">
                <h3 className="text-2xl font-black mb-8 italic">Destacados</h3>
                <div className="space-y-8">
                  {featuredPosts.map((post) => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="flex gap-4 group items-center">
                      <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-slate-100">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-black text-slate-900 group-hover:text-ecly-green line-clamp-2">{formatTitle(post.title)}</h4>
                        <span className="text-xs font-bold text-slate-400">{post.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;