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
import { LogOut, Loader2, Plus, FileText, Trash2, UserCircle } from 'lucide-react';

const Dashboard = () => {
  const { user, profile, loading, signOut, refreshProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const [onboardingData, setOnboardingData] = useState({
    first_name: '',
    last_name: '',
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
    if (!loading && profile) {
      if (!profile.first_name || !profile.last_name || !profile.bio) {
        setShowOnboarding(true);
        setOnboardingData({
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
          bio: profile.bio || '',
          avatar_url: profile.avatar_url || ''
        });
      }
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
    if (onboardingData.bio.length > 256) {
      toast.error("La biografía no puede superar los 256 caracteres.");
      return;
    }
    setIsSubmitting(true);
    const { error } = await supabase.from('profiles').update(onboardingData).eq('id', user?.id);
    if (!error) {
      toast.success("Perfil actualizado correctamente");
      await refreshProfile();
      setShowOnboarding(false);
    } else {
      toast.error("Error al actualizar el perfil");
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
      toast.error("Error al publicar la noticia");
    } else {
      toast.success("¡Noticia publicada con éxito!");
      setPostData({ title: '', excerpt: '', content: '', category: 'Sustentabilidad', image_url: '' });
      fetchMyPosts();
    }
    setIsSubmitting(false);
  };

  const deletePost = async (id: string) => {
    if (!confirm("¿Deseas eliminar permanentemente esta noticia?")) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error) {
      toast.success("Noticia eliminada");
      fetchMyPosts();
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-ecly-green" /></div>;
  if (!user) return <div className="p-20 text-center font-black">Debes iniciar sesión para acceder.</div>;

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-ecly-light flex items-center justify-center p-4">
        <form onSubmit={handleOnboardingSubmit} className="bg-white p-8 sm:p-12 rounded-[3rem] shadow-2xl max-w-xl w-full space-y-8 border-4 border-white">
          <div className="text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-2">¡Casi listo!</h2>
            <p className="text-slate-500 font-bold">Completa tu información para empezar a publicar.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-slate-400">Nombre</Label>
              <Input placeholder="Nombre" value={onboardingData.first_name} onChange={e => setOnboardingData({...onboardingData, first_name: e.target.value})} required className="rounded-2xl font-bold h-14"/>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-slate-400">Apellido</Label>
              <Input placeholder="Apellido" value={onboardingData.last_name} onChange={e => setOnboardingData({...onboardingData, last_name: e.target.value})} required className="rounded-2xl font-bold h-14"/>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-black text-xs uppercase tracking-widest text-slate-400">URL de Avatar (Foto)</Label>
            <Input placeholder="https://ejemplo.com/foto.jpg" value={onboardingData.avatar_url} onChange={e => setOnboardingData({...onboardingData, avatar_url: e.target.value})} className="rounded-2xl font-bold h-14"/>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="font-black text-xs uppercase tracking-widest text-slate-400">Biografía</Label>
              <span className={`text-[10px] font-black ${onboardingData.bio.length > 256 ? 'text-ecly-pop' : 'text-slate-300'}`}>
                {onboardingData.bio.length}/256
              </span>
            </div>
            <Textarea 
              placeholder="Escribe una breve descripción sobre ti..." 
              value={onboardingData.bio} 
              onChange={e => setOnboardingData({...onboardingData, bio: e.target.value})} 
              required 
              className="rounded-2xl font-bold min-h-[120px]"
              maxLength={256}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-ecly-green hover:bg-green-600 text-white font-black py-8 rounded-[2rem] text-xl shadow-[0_12px_0_0_#16a34a] hover:translate-y-1 transition-all active:translate-y-2">
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Guardar Perfil"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-24 px-4 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">Dashboard</h1>
            <p className="font-bold text-ecly-green text-lg">Panel de Editor — {profile?.first_name} {profile?.last_name}</p>
          </div>
          <Button variant="outline" onClick={() => signOut()} className="text-slate-500 font-black border-2 rounded-full px-8 py-6 hover:bg-ecly-pop hover:text-white hover:border-ecly-pop transition-all"><LogOut className="mr-2 h-4 w-4"/> Cerrar Sesión</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Formulario de Creación */}
          <div className="lg:col-span-8">
            <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100">
              <h2 className="text-3xl font-black mb-8 flex items-center gap-4 text-slate-900"><Plus className="text-ecly-green h-8 w-8"/> Nueva Noticia</h2>
              <form onSubmit={handlePostSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label className="font-black text-xs uppercase tracking-widest text-slate-400 ml-2">Título Impactante</Label>
                  <Input placeholder="Título de la noticia" value={postData.title} onChange={e => setPostData({...postData, title: e.target.value})} required className="font-black py-8 text-xl rounded-2xl border-2 focus:border-ecly-green transition-all"/>
                </div>
                
                <div className="space-y-2">
                  <Label className="font-black text-xs uppercase tracking-widest text-slate-400 ml-2">Bajada / Resumen</Label>
                  <Textarea placeholder="Un breve resumen que invite a leer..." value={postData.excerpt} onChange={e => setPostData({...postData, excerpt: e.target.value})} required className="font-bold h-24 rounded-2xl border-2"/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-black text-xs uppercase tracking-widest text-slate-400 ml-2">Categoría</Label>
                    <select className="flex h-16 w-full items-center justify-between rounded-2xl border-2 border-slate-200 bg-background px-4 py-2 text-lg font-bold focus:outline-none focus:ring-0 appearance-none" value={postData.category} onChange={e => setPostData({...postData, category: e.target.value})}>
                      <option>Sustentabilidad</option>
                      <option>Comunidad</option>
                      <option>Empresa</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-black text-xs uppercase tracking-widest text-slate-400 ml-2">URL de Imagen Principal</Label>
                    <Input placeholder="https://ejemplo.com/banner.jpg" value={postData.image_url} onChange={e => setPostData({...postData, image_url: e.target.value})} required className="font-bold h-16 rounded-2xl border-2"/>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-black text-xs uppercase tracking-widest text-slate-400 ml-2">Cuerpo de la Noticia (Markdown)</Label>
                  <Textarea placeholder="Escribe aquí... Puedes usar # Títulos, **Negrita**, etc." value={postData.content} onChange={e => setPostData({...postData, content: e.target.value})} required className="font-bold h-80 rounded-2xl border-2 font-mono text-sm bg-slate-50 p-6"/>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 text-white font-black py-10 rounded-[2.5rem] text-2xl shadow-[0_12px_0_0_#000] hover:translate-y-1 transition-all active:translate-y-2">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : "Publicar Noticia Ahora"}
                </Button>
              </form>
            </div>
          </div>

          {/* Lista de Mis Posts */}
          <div className="lg:col-span-4 space-y-8">
            <h2 className="text-3xl font-black flex items-center gap-4 text-slate-900"><FileText className="text-ecly-green h-8 w-8"/> Mis Publicaciones</h2>
            <div className="space-y-4">
              {myPosts.length > 0 ? (
                myPosts.map(post => (
                  <div key={post.id} className="bg-white p-6 rounded-3xl flex justify-between items-center border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="truncate pr-4">
                      <h3 className="font-black text-slate-800 truncate text-lg group-hover:text-ecly-green transition-colors">{post.title}</h3>
                      <span className="text-[10px] uppercase font-black text-slate-400">{new Date(post.created_at).toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deletePost(post.id)} className="text-slate-300 hover:text-ecly-pop shrink-0 transition-colors">
                      <Trash2 className="h-5 w-5"/>
                    </Button>
                  </div>
                ))
              ) : (
                <div className="bg-white p-12 rounded-[2.5rem] text-center border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold italic">Aún no has publicado noticias.</p>
                </div>
              )}
            </div>
            
            {/* Miniatura de Perfil */}
            <div className="bg-ecly-dark text-white p-8 rounded-[3rem] shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-2xl overflow-hidden bg-white/10 ring-2 ring-white/20">
                  {profile?.avatar_url ? <img src={profile.avatar_url} className="w-full h-full object-cover"/> : <UserCircle className="w-full h-full p-2 text-white/20"/>}
                </div>
                <div>
                  <h4 className="font-black text-lg leading-none">{profile?.first_name} {profile?.last_name}</h4>
                  <span className="text-[10px] uppercase font-black text-ecly-vibrant tracking-widest">Autor Ecly</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm font-bold leading-relaxed line-clamp-4">
                {profile?.bio}
              </p>
              <Button variant="ghost" className="w-full mt-6 text-white/50 hover:text-white hover:bg-white/10 font-black" onClick={() => setShowOnboarding(true)}>Editar Perfil</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;