"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import { User } from 'lucide-react';

const Blog = () => {
  // Tomamos el primero como principal y los siguientes como destacados
  const mainPost = blogPosts[0];
  const featuredPosts = blogPosts.slice(1, 3); // Solo los dos de la imagen

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-sans bg-white text-slate-900">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Main Hero Section */}
        <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Main Featured Article (Left) */}
            <div className="lg:col-span-8 flex flex-col">
              <Link to={`/blog/${mainPost.id}`} className="group block">
                <div className="relative aspect-[16/10] rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-sm mb-12">
                  <img 
                    src={mainPost.image} 
                    alt={mainPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="flex justify-center gap-4 text-sm font-black uppercase tracking-[0.3em] text-ecly-green mb-6">
                    <span>ECLY</span>
                    <span>•</span>
                    <span>LIMPIEZA</span>
                    <span>•</span>
                    <span>SUSTENTABLE</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl font-black leading-[1.1] text-slate-900 group-hover:text-ecly-green transition-colors max-w-4xl mx-auto line-clamp-2">
                    {mainPost.title}
                  </h1>
                </div>
              </Link>
            </div>

            {/* Featured Sidebar (Right) */}
            <div className="lg:col-span-4 lg:pl-4 mt-4">
              <div className="flex items-center gap-6 mb-12">
                <h2 className="text-4xl font-black tracking-tight text-slate-900 italic">Destacados</h2>
                <div className="h-[2px] flex-1 bg-ecly-green/20"></div>
              </div>

              <div className="space-y-12">
                {featuredPosts.map((post) => (
                  <Link 
                    key={post.id} 
                    to={`/blog/${post.id}`}
                    className="flex gap-6 group items-center"
                  >
                    <div className="w-32 h-32 shrink-0 rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col justify-center space-y-2">
                      <h3 className="text-xl font-black leading-tight text-slate-900 group-hover:text-ecly-green transition-colors line-clamp-2">
                        {post.title}
                      </h3>
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

        {/* Separator / Additional Grid */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-slate-100 pt-24">
            <h2 className="text-4xl font-black text-slate-900 mb-16">Más historias</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {blogPosts.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.id}`}
                  className="group flex flex-col"
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-[2.5rem] mb-8 shadow-sm">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="px-2">
                    <div className="text-xs font-black text-ecly-green mb-3 uppercase tracking-widest">{post.category}</div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-ecly-green transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-900 font-bold text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
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