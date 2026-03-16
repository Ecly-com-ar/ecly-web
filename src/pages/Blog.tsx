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
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-sans bg-[#050505] text-white">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Dark Hero Section */}
        <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Main Featured Article (Left) */}
            <div className="lg:col-span-8 flex flex-col">
              <Link to={`/blog/${mainPost.id}`} className="group block">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 mb-8">
                  <img 
                    src={mainPost.image} 
                    alt={mainPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-3 text-[10px] font-black uppercase tracking-widest text-ecly-green">
                    <span>ECLY</span>
                    <span>•</span>
                    <span>LIMPIEZA</span>
                    <span>•</span>
                    <span>SUSTENTABLE</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black leading-tight group-hover:text-ecly-green transition-colors">
                    {mainPost.title}
                  </h1>
                  <div className="flex items-center gap-4 text-xs font-bold text-white/40">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                        <User size={12} className="text-white/60" />
                      </div>
                      <span>{mainPost.author}</span>
                    </div>
                    <span>|</span>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{mainPost.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Featured Sidebar (Right) */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white italic">Destacados</h2>
                <div className="h-[2px] flex-1 bg-ecly-green/30"></div>
              </div>

              <div className="space-y-8">
                {featuredPosts.map((post) => (
                  <Link 
                    key={post.id} 
                    to={`/blog/${post.id}`}
                    className="flex gap-4 group"
                  >
                    <div className="w-32 h-20 shrink-0 rounded-lg overflow-hidden border border-white/10">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-sm font-black leading-snug mb-2 group-hover:text-ecly-green transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-white/40">
                        <span>{post.author}</span>
                        <span>|</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Optional: Secondary Grid for more posts */}
        <section className="py-20 bg-white text-slate-900 rounded-t-[4rem]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black mb-12">Más noticias</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogPosts.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.id}`}
                  className="group flex flex-col bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-ecly-green/10 transition-all duration-500"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">{post.category}</div>
                    <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-ecly-green transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 font-medium mb-6 flex-1 text-sm">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-ecly-green font-black text-xs uppercase tracking-widest gap-2">
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