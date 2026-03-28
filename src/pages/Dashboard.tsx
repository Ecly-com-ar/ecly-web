"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { LogOut, Loader2, UserCircle, Edit3, Trash2, Plus, FileText } from 'lucide-react';

const Dashboard = () => {
  const { user, profile, loading, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const [onboardingData, setOnboardingData] = useState({
    first_name: '',
    bio: '',
    avatar_url: ''
  });

  const [postData, setPostData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Sustentabilidad',
    image_url: ''
  });

  useEffect(() => {
    if (!loading && profile && (!profile.first_name || !profile.bio)) {
      setShowOnboarding(true);
    }
    if (user) fetchMyPosts();
  }, [loading, profile, user]);

  const fetchMyPosts = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('author_id', user?.id)
      .order('created_at', { ascending: false });
    if (data) setMyPosts(data);
  };

  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.from('profiles').update(onboardingData).eq('id', user?.id);
    if (!error) {
      toast.success("Perfil listo");
      await refreshProfile();
      setShowOnboarding(false);
    }
    setIsSubmitting(false);
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const slug = postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const { error } = await supabase
      .from('blog_posts')
      .insert([{ ...postData, slug, author_id: user?.id, published: true }]);

    if (error) {
      toast.error("Error al publicar");
    } else {
      toast.success("Noticia publicada");
      setPostData({ title: '', excerpt: '', content: '', category: 'Sustentabilidad', image_url: '' });
      fetchMyPosts();
    }
    setIsSubmitting(false);
  };

  const deletePost = async (id: string) => {
    if (!confirm("¿Borrar esta noticia?")) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error) {
      toast.success("Noticia eliminada");
      fetchMyPosts();
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-ecly-green" /></div>;
  
  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-ecly-light flex items-center justify-center p-4">
        <form onSubmit={handleOnboardingSubmit} className="bg-white p-10 rounded-[2.5rem] shadow-xl max-w-md w-full space-y-6">
          <h2 className="text-3xl font-black">Tu Perfil de Editor</h2>
          <div className="space-y-4">
            <Input placeholder="Tu Nombre" value={onboardingData.first_name} onChange={e => setOnboardingData({...onboardingData, first_name: e.target.value})} required className="rounded-xl font-bold"/>
            <Textarea placeholder="Sobre ti (Bio)" value={onboardingData.bio} onChange={e => setOnboardingData({...onboardingData, bio: e.target.value})} required className="rounded-xl font-bold"/>
            <Input placeholder="URL de Foto (Avatar)" value={onboardingData.avatar_url} onChange={e => setOnboardingData({...onboardingData, avatar_url: e.target.value})} className="rounded-xl font-bold"/>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full bg-ecly-green text-white font-black py-6 rounded-xl">Guardar y Continuar</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-24 px-4 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900">Dashboard</h1>
            <p className="font-bold text-ecly-green">Panel de {profile?.first_name || 'Editor'}</p>
          </div>
          <Button variant="ghost" onClick={() => signOut()} className="text-slate-400 font-bold hover:text-ecly-pop"><LogOut className="mr-2 h-4 w-4"/> Salir</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-2"><Plus className="text-ecly-green"/> Nueva Noticia</h2>
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <Input placeholder="Título de la noticia" value={postData.title} onChange={e => setPostData({...postData, title: e.target.value})} required className="font-bold py-6"/>
                <Textarea placeholder="Breve resumen para la lista" value={postData.excerpt} onChange={e => setPostData({...postData, excerpt: e.target.value})} required className="font-bold h-20"/>
                <div className="grid grid-cols-2 gap-4">
                  <select className="rounded-xl border-slate-200 font-bold px-4" value={postData.category} onChange={e => setPostData({...postData, category: e.target.value})}>
                    <option>Sustentabilidad</option>
                    <option>Comunidad</option>
                    <option>Empresa</option>
                  </select>
                  <Input placeholder="URL de Imagen" value={postData.image_url} onChange={e => setPostData({...postData, image_url: e.target.value})} required className="font-bold"/>
                </div>
                <Textarea placeholder="Contenido (Usa Markdown: # Título, **Negrita**, [Link](url)...)" value={postData.content} onChange={e => setPostData({...postData, content: e.target.value})} required className="font-bold h-64 font-mono text-sm bg-slate-50"/>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 text-white font-black py-6 rounded-2xl">Publicar Noticia</Button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-2"><FileText className="text-ecly-green"/> Tus Posts</h2>
            <div className="space-y-3">
              {myPosts.map(post => (
                <div key={post.id} className="bg-white p-5 rounded-2xl flex justify-between items-center border border-slate-100 shadow-sm group">
                  <div className="truncate pr-4">
                    <h3 className="font-black text-slate-800 truncate">{post.title}</h3>
                    <span className="text-[10px] uppercase font-black text-slate-400">{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deletePost(post.id)} className="text-slate-300 hover:text-ecly-pop shrink-0">
                    <Trash2 className="h-4 w-4"/>
                  </Button>
                </div>
              ))}
              {myPosts.length === 0 && <p className="text-slate-400 font-bold text-sm italic">Aún no has publicado nada.</p>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;