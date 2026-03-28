"use client";

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Calendar, User, Loader2, UserCircle, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { postID } = useParams();
  const [post, setPost] = useState<any>(null);
  const [author, setAuthor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!postID) return;
      
      try {
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(postID);
        
        let query = supabase
          .from('blog_posts')
          .select('*, author:profiles(*)');

        if (isUUID) {
          query = query.or(`id.eq.${postID},slug.eq.${postID}`);
        } else {
          query = query.eq('slug', postID);
        }

        const { data: postData, error } = await query.maybeSingle();

        if (postData) {
          setPost(postData);
          setAuthor(postData.author);
        }
      } catch (err) {
        console.error("[BlogPost] Error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [postID]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin h-10 w-10 text-ecly-green" />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center bg-white p-12 rounded-[3rem] shadow-xl border-4 border-white max-w-lg">
          <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-10 w-10 text-ecly-pop" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4">Artículo no encontrado</h1>
          <p className="text-slate-500 font-bold mb-8">Parece que el enlace es incorrecto o la publicación ya no está disponible.</p>
          <Link to="/blog">
            <button className="bg-slate-900 text-white font-black px-10 py-5 rounded-2xl hover:bg-ecly-green transition-all">
              Volver al Blog
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <Header />
      <main className="flex-1 pt-32 pb-24">
        <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-ecly-green font-bold mb-12 transition-colors group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Volver al Blog
          </Link>

          <div className="flex flex-wrap items-center gap-6 mb-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {new Date(post.created_at).toLocaleDateString('es-AR')}</div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" /> 
              {author ? `${author.first_name} ${author.last_name}` : 'Equipo Ecly'}
            </div>
            <div className="bg-ecly-light text-ecly-green px-3 py-1 rounded-full text-[10px] font-black">{post.category}</div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="aspect-video rounded-[3rem] overflow-hidden mb-12 shadow-2xl border-4 border-white">
            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover"/>
          </div>

          {/* Contenedor Compacto de Markdown */}
          <div className="prose prose-slate max-w-none mb-16 prose-p:my-3 prose-headings:mt-8 prose-headings:mb-4 prose-p:leading-relaxed prose-headings:leading-tight">
            <p className="text-xl font-bold text-ecly-green/80 italic mb-10 border-l-4 border-ecly-green pl-6 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="markdown-content font-medium text-slate-700">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>

          <div className="bg-slate-50 p-10 rounded-[3rem] flex flex-col md:flex-row gap-8 items-center border border-slate-100">
            <div className="h-24 w-24 rounded-2xl overflow-hidden bg-white shrink-0 shadow-sm border-4 border-white">
              {author?.avatar_url ? (
                <img src={author.avatar_url} className="w-full h-full object-cover" alt="Autor"/>
              ) : (
                <UserCircle className="w-full h-full p-4 text-slate-200"/>
              )}
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-black text-slate-900 mb-1">
                {author ? `${author.first_name} ${author.last_name}` : 'Equipo Ecly'}
              </h4>
              <p className="text-slate-500 font-bold text-base leading-relaxed max-w-lg">
                {author?.bio || 'Colaborador oficial de la comunidad Ecly.'}
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