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
import { PlusCircle, FileText, LogOut, Loader2, UserCircle, Edit3, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
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
    const { error } = await supabase
      .from('profiles')
      .update(onboardingData)
      .eq('id', user?.id);

    if (error) {
      toast.error("Error al actualizar perfil");
    } else {
      toast.success("¡Perfil completado!");
      await refreshProfile();
      setShowOnboarding(false);
    }
    setIsSubmitting(false);
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const slug = postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const { error } = await supabase
      .from('blog_posts')
      .insert([{ ...postData, slug, author_id: user?.id, published: true }]);

    if (error) {
      toast.error("Error al publicar: " + error.message);
    } else {
      toast.success("¡Publicación creada!");
      setPostData({ title: '', excerpt: '', content: '', category: 'Sustentabilidad', image_url: '' });
      fetchMyPosts();
    }
    setIsSubmitting(false);
  };

  const deletePost = async (id: string) => {
    if (!confirm("¿Seguro que quieres borrar este post?")) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error) {
      toast.success("Post eliminado");
      fetchMyPosts();
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-ecly-green" /></div>;
  if (!user) return <div className="p-20 text-center font-black">Acceso denegado</div>;

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-ecly-light flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-lg w-full">
          <h2 className="text-3xl font-black text-slate-900 mb-2">¡Bienvenido Editor!</h2>
          <p className="text-slate-500 font-bold mb-8">Completa tu perfil para empezar a publicar.</p>
          <form onSubmit={handleOnboardingSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase">Tu Nombre Público</Label>
              <Input placeholder="Ej: Juan Pérez" value={onboardingData.first_name} onChange={e => setOnboardingData({...onboardingData, first_name: e.target.value})} required className="rounded-xl py-6 font-bold"/>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase">Breve Biografía</Label>
              <Textarea placeholder="Sobre ti..." value={onboardingData.bio} onChange={e => setOnboardingData({...onboardingData, bio: e.target.value})} required className="rounded-xl font-bold"/>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase">URL de Avatar</Label>
              <Input placeholder="https://..." value={onboardingData.avatar_url} onChange={e => setOnboardingData({...onboardingData, avatar_url: e.target.value})} className="rounded-xl font-bold"/>
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-ecly-green hover:bg-green-600 text-white font-black py-8 rounded-2xl shadow-[0_8px_0_0_#16a34a]">
              Empezar ahora
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900">Panel de Control</h1>
            <p className="font-bold text-ecly-green">Hola, {profile?.first_name}</p>
          </div>
          <Button variant="outline" onClick={() => signOut()} className="rounded-full font-black gap-2">
            <LogOut className="h-4 w-4" /> Salir
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            {/* Formulario de Creación */}
            <div className="bg-white p-8 rounded-[3rem] shadow-sm">
              <h2 className="text-2xl font-black mb-8">Crear nuevo post</h2>
              <form onSubmit={handlePostSubmit} className="space-y-6">
                <Input placeholder="Título" value={postData.title} onChange={e => setPostData({...postData, title: e.target.value})} required className="py-6 font-bold"/>
                <Textarea placeholder="Resumen corto" value={postData.excerpt} onChange={e => setPostData({...postData, excerpt: e.target.value})} required className="font-bold"/>
                <Textarea placeholder="Contenido completo" value={postData.content} onChange={e => setPostData({...postData, content: e.target.value})} required className="min-h-[200px] font-bold"/>
                <Input placeholder="URL Imagen" value={postData.image_url} onChange={e => setPostData({...postData, image_url: e.target.value})} required className="font-bold"/>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 text-white font-black py-8 rounded-2xl">
                  Publicar Artículo
                </Button>
              </form>
            </div>

            {/* Mis Publicaciones */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black">Mis Publicaciones</h2>
              <div className="grid gap-4">
                {myPosts.map(post => (
                  <div key={post.id} className="bg-white p-6 rounded-2xl flex justify-between items-center shadow-sm">
                    <div>
                      <h3 className="font-black text-lg">{post.title}</h3>
                      <p className="text-xs text-slate-400 font-bold">{new Date(post.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-ecly-green">
                        <Edit3 className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-ecly-pop" onClick={() => deletePost(post.id)}>
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-ecly-dark text-white p-8 rounded-[3rem] sticky top-32">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-2xl overflow-hidden bg-white/20">
                  {profile?.avatar_url ? <img src={profile.avatar_url} className="w-full h-full object-cover"/> : <UserCircle className="w-full h-full p-2"/>}
                </div>
                <div>
                  <h3 className="font-black text-xl">{profile?.first_name}</h3>
                  <p className="text-ecly-vibrant font-black text-xs uppercase tracking-widest">Editor</p>
                </div>
              </div>
              <p className="text-slate-300 font-bold text-sm leading-relaxed mb-8">
                {profile?.bio}
              </p>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 font-black rounded-xl py-6" onClick={() => setShowOnboarding(true)}>
                Editar Perfil
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;