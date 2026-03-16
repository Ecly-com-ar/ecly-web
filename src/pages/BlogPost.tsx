"use client";

import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { blogPosts } from '@/data/blogPosts';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogPost = () => {
  const { postID } = useParams();
  const post = blogPosts.find(p => p.id === postID);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-sans bg-white">
      <Header />
      <main className="flex-1 pt-32 pb-24">
        <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-ecly-green font-bold mb-12 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Volver al Blog
          </Link>

          {/* Meta Info */}
          <div className="flex items-center gap-6 mb-8 text-sm font-bold text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> {post.date}
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" /> {post.author}
            </div>
            <span className="px-3 py-1 bg-ecly-light text-ecly-green rounded-full text-[10px] uppercase tracking-widest font-black">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Featured Image */}
          <div className="aspect-video rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-slate">
            <p className="text-xl md:text-2xl font-medium text-slate-600 leading-relaxed mb-8 italic border-l-4 border-ecly-vibrant pl-6">
              {post.excerpt}
            </p>
            <div className="text-lg text-slate-700 font-medium leading-loose space-y-6">
              {post.content}
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>

          {/* Share & Footer of Article */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
            <div className="flex gap-4">
              <Button variant="outline" className="rounded-full font-black border-slate-200 hover:bg-slate-50 gap-2">
                <Share2 className="h-4 w-4" /> Compartir
              </Button>
            </div>
            <Link to="/#waitlist">
              <Button className="bg-ecly-green hover:bg-green-700 text-white font-black rounded-full px-8">
                Sumarme a Ecly
              </Button>
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;