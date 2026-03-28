"use client";

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Calendar, User, Share2, Loader2, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogPost = () => {
  const { postID } = useParams();
  const [post, setPost] = useState<any>(null);
  const [author, setAuthor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Intentar buscar por ID o por Slug
      const { data: postData } = await supabase
        .from('blog_posts')
        .select('*, author:profiles(*)')
        .or(`id.eq.${postID},slug.eq.${postID}`)
        .single();

      if (postData) {
        setPost(postData);
        setAuthor(postData.author);
      }
      setLoading(false);
    };
    fetchData();
  }, [postID]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-ecly-green" /></div>;
  if (!post) return <div className="p-20 text-center font-black">Artículo no encontrado</div>;

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <Header />
      <main className="flex-1 pt-32 pb-24">
        <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-ecly-green font-bold mb-12 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Volver al Blog
          </Link>

          <div className="flex items-center gap-6 mb-8 text-sm font-bold text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> {new Date(post.created_at).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" /> {author?.first_name || 'Equipo Ecly'}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="aspect-video rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover"/>
          </div>

          <div className="prose prose-lg max-w-none mb-16">
            <p className="text-xl md:text-2xl font-medium text-slate-600 leading-relaxed mb-8 italic border-l-4 border-ecly-vibrant pl-6">
              {post.excerpt}
            </p>
            <div className="text-lg text-slate-700 font-medium leading-loose whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          {/* Caja del Autor */}
          <div className="bg-slate-50 p-8 sm:p-12 rounded-[3rem] flex flex-col md:flex-row gap-8 items-center md:items-start border border-slate-100">
            <div className="h-24 w-24 rounded-[1.5rem] overflow-hidden bg-white shrink-0 shadow-sm">
              {author?.avatar_url ? <img src={author.avatar_url} className="w-full h-full object-cover"/> : <UserCircle className="w-full h-full p-4 text-slate-200"/>}
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-black text-slate-900 mb-2">Escrito por {author?.first_name || 'Equipo Ecly'}</h4>
              <p className="text-slate-500 font-bold leading-relaxed">
                {author?.bio || 'Colaborador apasionado por la sustentabilidad y el cambio circular en Córdoba.'}
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;