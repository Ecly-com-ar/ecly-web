"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, ArrowRight, Loader2, MessageSquareOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*, author:profiles(*)')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (data) setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="animate-spin h-12 w-12 text-ecly-green" />
        </main>
        <Footer />
      </div>
    );
  }

  const mainPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white text-slate-900 selection:bg-ecly-vibrant selection:text-ecly-dark">
      <Header />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-none mb-6">
              Historias de <span className="text-ecly-green">Cambio</span>
            </h1>
            <p className="text-xl text-slate-600 font-bold max-w-2xl leading-relaxed">
              Exploramos el impacto de la economía circular, consejos de vida sustentable y las novedades de la revolución Ecly.
            </p>
          </div>

          {posts.length > 0 ? (
            <>
              {/* Post Destacado */}
              <section className="mb-20">
                <Link to={`/blog/${mainPost.slug || mainPost.id}`} className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 rounded-[3.5rem] overflow-hidden p-6 sm:p-10 hover:bg-ecly-light/50 transition-all duration-500 border border-slate-100 shadow-sm">
                  <div className="lg:col-span-7 aspect-[16/10] overflow-hidden rounded-[2.5rem] shadow-2xl">
                    <img 
                      src={mainPost.image_url} 
                      alt={mainPost.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                    <div className="flex items-center gap-4 text-xs font-black text-ecly-green uppercase tracking-widest">
                      <span className="bg-white px-3 py-1 rounded-full shadow-sm">{mainPost.category}</span>
                      <span className="text-slate-400">{new Date(mainPost.created_at).toLocaleDateString()}</span>
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
                  <Link key={post.id} to={`/blog/${post.slug || post.id}`} className="group flex flex-col">
                    <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-6 shadow-lg border border-slate-100">
                      <img 
                        src={post.image_url} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs font-black text-ecly-green uppercase tracking-widest">
                        <span>{post.category}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="text-slate-400">{new Date(post.created_at).toLocaleDateString()}</span>
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
            </>
          ) : (
            <div className="bg-slate-50 rounded-[4rem] p-20 text-center border-4 border-dashed border-slate-100 flex flex-col items-center">
              <div className="bg-white p-6 rounded-full shadow-sm mb-6">
                <MessageSquareOff className="h-12 w-12 text-slate-300" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2">No hay noticias por el momento</h3>
              <p className="text-slate-500 font-bold text-lg">Vuelve pronto para descubrir nuestras últimas novedades.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;