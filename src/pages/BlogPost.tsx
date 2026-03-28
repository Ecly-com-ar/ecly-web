"use client";

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Calendar, User, Loader2, UserCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { postID } = useParams();
  const [post, setPost] = useState<any>(null);
  const [author, setAuthor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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

          <div className="flex items-center gap-6 mb-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {new Date(post.created_at).toLocaleDateString()}</div>
            <div className="flex items-center gap-2"><User className="h-4 w-4" /> {author?.first_name || 'Equipo Ecly'}</div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">{post.title}</h1>

          <div className="aspect-video rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover"/>
          </div>

          <div className="prose prose-lg prose-slate max-w-none mb-16">
            <p className="text-xl font-bold text-ecly-green/80 italic mb-10 border-l-4 border-ecly-green pl-6 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="markdown-content font-medium leading-relaxed text-slate-700">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>

          <div className="bg-slate-50 p-10 rounded-[3rem] flex flex-col md:flex-row gap-8 items-center border border-slate-100">
            <div className="h-20 w-20 rounded-2xl overflow-hidden bg-white shrink-0 shadow-sm">
              {author?.avatar_url ? <img src={author.avatar_url} className="w-full h-full object-cover"/> : <UserCircle className="w-full h-full p-4 text-slate-200"/>}
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-xl font-black text-slate-900 mb-1">Escrito por {author?.first_name || 'Equipo Ecly'}</h4>
              <p className="text-slate-500 font-bold text-sm leading-relaxed">{author?.bio || 'Colaborador de Ecly.'}</p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;