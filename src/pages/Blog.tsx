"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import { ArrowRight, Clock, User } from 'lucide-react';

const Blog = () => {
  // Tomamos el primero como principal y los siguientes como destacados
  const mainPost = blogPosts[0];
  const featuredPosts = blogPosts.slice(1, 4);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-sans bg-white text-slate-900">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Main Hero Section */}
        <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Main Featured Article (Left) */}
            <div className="lg:col-span-8 flex flex-col">
              <Link to={`/blog/${mainPost.id}`} className="group block text-center">
                <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-slate-200 mb-10 shadow-sm">
                  <img 
                    src={mainPost.image} 
                    alt={mainPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <div className="flex flex-col items-center space-y-6">
                  <div className="flex justify-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-ecly-green">
                    <span>ECLY</span>
                    <span>•</span>
                    <span>LIMPIEZA</span>
                    <span>•</span>
                    <span>SUSTENTABLE</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-black leading-[1.1] text-slate-900 group-hover:text-ecly-green transition-colors max-w-3xl mx-auto">
                    {mainPost.title}
                  </h1>
                  
                  <div className="flex items-center justify-center gap-6 text-sm font-black text-slate-900">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                        <User size={14} className="text-slate-900" />
                      </div>
                      <span>{mainPost.author}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{mainPost.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Featured Sidebar (Right) */}
            <div className="lg:col-span-4 lg:pl-4">
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-black tracking-tight text-slate-900 italic">Destacados</h2>
                <div className="h-[3px] flex-1 bg-ecly-green/20"></div>
              </div>

              <div className="space-y-10">
                {featuredPosts.map((post) => (
                  <Link 
                    key={post.id} 
                    to={`/blog/${post.id}`}
                    className="flex gap-5 group items-center"
                  >
                    <div className="w-28 h-28 shrink-0 rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg font-black leading-tight mb-2 text-slate-900 group-hover:text-ecly-green transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs font-black text-slate-900">
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

        {/* Secondary Grid */}
        <section className="py-24 bg-slate-50 rounded-t-[5rem] border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black text-slate-900 mb-16 text-center">Explorá más artículos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {blogPosts.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.id}`}
                  className="group flex flex-col bg-white rounded-[3rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-10 flex-1 flex flex-col">
                    <div className="text-xs font-black text-ecly-green mb-4 uppercase tracking-[0.2em]">{post.category}</div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-ecly-green transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-slate-900 font-bold mb-8 flex-1 text-base leading-relaxed opacity-80">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-slate-900 font-black text-xs uppercase tracking-widest gap-2 group-hover:text-ecly-green transition-colors">
                      Leer artículo completo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
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