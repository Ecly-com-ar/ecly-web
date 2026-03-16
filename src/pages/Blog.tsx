"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import { Timer, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Blog = () => {
  // Flag para alternar entre el mensaje de próximamente y el contenido real
  const isAvailable = false;

  // Función para limitar caracteres
  const formatTitle = (title: string, limit: number = 60) => {
    return title.length > limit ? title.substring(0, limit) + "..." : title;
  };

  // Tomamos el primero como principal y los siguientes como destacados
  const mainPost = blogPosts[0];
  const featuredPosts = blogPosts.slice(1, 3);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-sans bg-white text-slate-900">
      <Header />
      
      <main className="flex-1 pt-24 flex items-center justify-center">
        {!isAvailable ? (
          <div className="py-24 px-4 text-center max-w-2xl mx-auto animate-in fade-in zoom-in duration-700">
            <div className="bg-ecly-light w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-ecly-green shadow-sm">
              <Timer className="h-12 w-12" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 italic tracking-tight">
              Próximamente
            </h1>
            <p className="text-xl text-slate-600 font-bold mb-12 leading-relaxed">
              Estamos preparando las mejores historias, consejos de limpieza sustentable y novedades de nuestra comunidad para vos. ¡Falta muy poco!
            </p>
            <Link to="/">
              <Button className="bg-ecly-green hover:bg-green-700 text-white rounded-full px-10 py-8 text-xl font-black shadow-lg hover:translate-y-0.5 transition-all border-none">
                <ArrowLeft className="mr-2 h-6 w-6" /> Volver al inicio
              </Button>
            </Link>
          </div>
        ) : (
          /* El contenido del blog se mantiene aquí pero no se renderiza por el flag isAvailable */
          <div className="w-full">
            {/* Main Hero Section */}
            <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                {/* Main Featured Article (Left) */}
                <div className="lg:col-span-8 flex flex-col">
                  <Link to={`/blog/${mainPost.id}`} className="group block">
                    <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm mb-8">
                      <img 
                        src={mainPost.image} 
                        alt={mainPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="flex justify-center gap-4 text-sm font-black uppercase tracking-[0.3em] text-ecly-green">
                        <span>ECLY</span>
                        <span>•</span>
                        <span>LIMPIEZA</span>
                        <span>•</span>
                        <span>SUSTENTABLE</span>
                      </div>
                      <h1 className="text-3xl md:text-5xl font-black leading-[1.2] text-slate-900 group-hover:text-ecly-green transition-colors max-w-2xl mx-auto">
                        {formatTitle(mainPost.title)}
                      </h1>
                    </div>
                  </Link>
                </div>

                {/* Featured Sidebar (Right) */}
                <div className="lg:col-span-4 lg:pl-4 mt-2">
                  <div className="flex items-center gap-6 mb-10">
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 italic">Destacados</h2>
                    <div className="h-[2px] flex-1 bg-ecly-green/20"></div>
                  </div>
                  <div className="space-y-10">
                    {featuredPosts.map((post) => (
                      <Link key={post.id} to={`/blog/${post.id}`} className="flex gap-6 group items-center">
                        <div className="w-24 h-24 shrink-0 rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        </div>
                        <div className="flex flex-col justify-center space-y-1">
                          <h3 className="text-lg font-black leading-tight text-slate-900 group-hover:text-ecly-green transition-colors line-clamp-2">{formatTitle(post.title)}</h3>
                          <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                            <span>{post.author}</span>
                            <span className="text-slate-300">•</span>
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Más historias Grid */}
            <section className="py-20 bg-white">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-slate-100 pt-20">
                <h2 className="text-3xl font-black text-slate-900 mb-12">Más historias</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {blogPosts.map((post) => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="group flex flex-col">
                      <div className="aspect-[16/10] overflow-hidden rounded-[2.5rem] mb-6 shadow-sm">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </div>
                      <div className="px-1">
                        <div className="text-[10px] font-black text-ecly-green mb-2 uppercase tracking-widest">{post.category}</div>
                        <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-ecly-green transition-colors leading-tight line-clamp-2">{formatTitle(post.title)}</h3>
                        <p className="text-slate-900 font-bold text-sm leading-relaxed line-clamp-2 opacity-90">{post.excerpt}</p>
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