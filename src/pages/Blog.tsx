"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Blog = () => {
  // Ahora el blog está disponible para todos
  const isAvailable = true;

  const mainPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white text-slate-900 selection:bg-ecly-vibrant selection:text-ecly-dark">
      <Header />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Encabezado del Blog */}
          <div className="mb-16 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-none mb-6">
              Historias de <span className="text-ecly-green">Cambio</span>
            </h1>
            <p className="text-xl text-slate-600 font-bold max-w-2xl leading-relaxed">
              Exploramos el impacto de la economía circular, consejos de vida sustentable y las novedades de la revolución Ecly.
            </p>
          </div>

          {/* Post Destacado */}
          <section className="mb-20">
            <Link to={`/blog/${mainPost.id}`} className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 rounded-[3.5rem] overflow-hidden p-6 sm:p-10 hover:bg-ecly-light/50 transition-all duration-500 border border-slate-100 shadow-sm">
              <div className="lg:col-span-7 aspect-[16/10] overflow-hidden rounded-[2.5rem] shadow-2xl">
                <img 
                  src={mainPost.image} 
                  alt={mainPost.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                <div className="flex items-center gap-4 text-xs font-black text-ecly-green uppercase tracking-widest">
                  <span className="bg-white px-3 py-1 rounded-full shadow-sm">{mainPost.category}</span>
                  <span className="text-slate-400">{mainPost.date}</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 group-hover:text-ecly-green transition-colors leading-tight">
                  {mainPost.title}
                </h2>
                <p className="text-lg text-slate-600 font-medium line-clamp-3 leading-relaxed">
                  {mainPost.excerpt}
                </p>
                <div className="pt-4">
                  <Button className="bg-slate-900 text-white hover:bg-ecly-green rounded-full px-10 py-7 text-lg font-black transition-all group-hover:translate-x-2 border-none">
                    Leer artículo <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Link>
          </section>

          {/* Grilla de otros artículos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {otherPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="group flex flex-col">
                <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-6 shadow-lg border border-slate-100">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs font-black text-ecly-green uppercase tracking-widest">
                    <span>{post.category}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-slate-400">{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-ecly-green transition-colors leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 font-medium line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="pt-2 flex items-center text-slate-900 font-black group-hover:text-ecly-green transition-colors">
                    Seguir leyendo <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;