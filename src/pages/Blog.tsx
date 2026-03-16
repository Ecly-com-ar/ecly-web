"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import { ArrowRight, Sparkles } from 'lucide-react';

const Blog = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-sans selection:bg-ecly-vibrant selection:text-ecly-dark bg-white">
      <Header />
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-slate-50 border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ecly-vibrant/10 text-ecly-dark mb-6 border border-ecly-vibrant/20">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-black uppercase tracking-widest">Novedades Ecly</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">
              Nuestro <span className="text-ecly-green">Blog</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Explorá historias sobre sustentabilidad, consejos para un hogar más limpio y el impacto de la economía circular.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogPosts.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.id}`}
                  className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-ecly-green/10 transition-all duration-500"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs font-black text-slate-900 uppercase tracking-widest">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="text-sm font-bold text-slate-400 mb-3">{post.date}</div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-ecly-green transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 font-medium mb-8 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-ecly-green font-black text-sm uppercase tracking-widest gap-2">
                      Leer más <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;