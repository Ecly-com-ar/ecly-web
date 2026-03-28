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
import { LogOut, Loader2, Plus, FileText, Trash2, UserCircle, Send } from 'lucide-react';

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
    console.log("[Dashboard] 🔍 Verificando estado:", { loading, profile, userId: user?.id });

    if (!loading && profile) {
      const needsOnboarding = !profile.first_name || !profile.last_name || !profile.bio;
      console.log("[Dashboard] 📊 ¿Necesita completar perfil?:", needsOnboarding);
      
      if (needsOnboarding) {
        setShowOnboarding(true);
        setOnboardingData({
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
          bio: profile.bio || '',
          avatar_url: profile.avatar_url || ''
        });
      } else {
        setShowOnboarding(false);
      }
    }
    
    if (user && !loading) {
      fetchMyPosts();
    }
  }, [loading, profile, user]);

  const fetchMyPosts = async () => {
    try {
      console.log("[Dashboard] 📡 Trayendo publicaciones del usuario...");
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('author_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) console.error("[Dashboard] ❌ Error posts:", error);
      if (data) {
        console.log("[Dashboard] ✅ Posts cargados:", data.length);
        setMyPosts(data);
      }
    } catch (err) {
      console.error("[Dashboard] 💥 Excepción posts:", err);
    }
  };

  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[Dashboard] 🚀 Iniciando guardado de perfil...", onboardingData);
    
    if (onboardingData.bio.length > 256) {
      toast.error("La biografía es demasiado larga (máx 256 caracteres).");
      return;
    }

    setIsSubmitting(true);
    try {
      // Usamos upsert para garantizar que la fila exista
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...onboardingData,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error("[Dashboard] ❌ Error en el servidor al guardar perfil:", error);
        toast.error("Error al guardar: " + error.message);
      } else {
        console.log("[Dashboard] ✅ Perfil guardado correctamente. Refrescando contexto...");
        toast.success("¡Perfil configurado con éxito!");
        await refreshProfile();
        setShowOnboarding(false);
      }
    } catch (err) {
      console.error("[Dashboard] 💥 Error inesperado en Onboarding:", err);
      toast.error("Ocurrió un error inesperado al guardar.");
    } finally {
      setIsSubmitting(false);
      console.log("[Dashboard] 🏁 Proceso de Onboarding finalizado.");
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[Dashboard] 📝 Publicando nueva noticia...");
    setIsSubmitting(true);
    
    const slug = postData.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert([{ 
          ...postData, 
          slug, 
          author_id: user?.id, 
          published: true 
        }]);

      if (error) {
        console.error("[Dashboard] ❌ Error al insertar post:", error);
        toast.error("Error al publicar la noticia.");
      } else {
        console.log("[Dashboard] ✅ Noticia publicada.");
        toast.success("¡Noticia publicada correctamente!");
        setPostData({ title: '', excerpt: '', content: '', category: 'Sustentabilidad', image_url: '' });
        fetchMyPosts();
      }
    } catch (err) {
      console.error("[Dashboard] 💥 Error fatal al publicar:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta publicación?")) return;
    console.log("[Dashboard] 🗑️ Eliminando post:", id);
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error) {
      toast.success("Publicación eliminada.");
      fetchMyPosts();
    } else {
      console.error("[Dashboard] ❌ Error al eliminar post:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin h-10 w-10 text-ecly-green mb-4" />
        <p className="font-bold text-slate-400">Verificando tu perfil...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-[3rem] shadow-xl border-4 border-white max-w-sm">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Acceso Denegado</h2>
          <p className="text-slate-500 font-bold mb-6">Debes iniciar sesión para ver esta página.</p>
          <Button onClick={() => window.location.href = '/access'} className="w-full bg-ecly-green hover:bg-green-600 text-white font-black py-6 rounded-2xl">Ir a Acceso</Button>
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-ecly-light flex items-center justify-center p-4">
        <form onSubmit={handleOnboardingSubmit} className="bg-white p-8 sm:p-12 rounded-[3rem] shadow-2xl max-w-xl w-full space-y-8 border-4 border-white">
          <div className="text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-2">Crea tu Firma</h2>
            <p className="text-slate-500 font-bold">Completa estos datos para que los lectores sepan quién escribe.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-slate-400 ml-1">Nombre</Label>
              <Input placeholder="Ej: Juan" value={onboardingData.first_name} onChange={e => setOnboardingData({...onboardingData, first_name: e.target.value})} required className="rounded-2xl font-bold h-14 border-2 focus:border-ecly-green"/>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-slate-400 ml-1">Apellido</Label>
              <Input placeholder="Ej: Pérez" value={onboardingData.last_name} onChange={e => setOnboardingData({...onboardingData, last_name: e.target.value})} required className="rounded-2xl font-bold h-14 border-2 focus:border-ecly-green"/>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-black text-xs uppercase tracking-widest text-slate-400 ml-1">URL de tu Foto (Avatar)</Label>
            <Input placeholder="https://ejemplo.com/tu-foto.jpg" value={onboardingData.avatar_url} onChange={e => setOnboardingData({...onboardingData, avatar_url: e.target.value})} className="rounded-2xl font-bold h-14 border-2 focus:border-ecly-green"/>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <Label className="font-black text-xs uppercase tracking-widest text-slate-400">Breve Biografía</Label>
              <span className={`text-[10px] font-black ${onboardingData.bio.length > 256 ? 'text-ecly-pop' : 'text-slate-300'}`}>
                {onboardingData.bio.length}/256
              </span>
            </div>
            <Textarea 
              placeholder="Ej: Apasionado por la tecnología y el medio ambiente..." 
              value={onboardingData.bio} 
              onChange={e => setOnboardingData({...onboardingData, bio: e.target.value})} 
              required 
              className="rounded-2xl font-bold min-h-[120px] border-2 focus:border-ecly-green"
              maxLength={256}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-ecly-green hover:bg-green-600 text-white font-black py-8 rounded-[2rem] text-xl shadow-[0_12px_0_0_#16a34a] hover:translate-y-1 transition-all active:translate-y-2">
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Empezar como Editor"}
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
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">Panel Editor</h1>
            <p className="font-bold text-ecly-green text-lg">Hola, {profile?.first_name} {profile?.last_name}</p>
          </div>
          <Button variant="outline" onClick={() => signOut()} className="text-slate-500 font-black border-2 rounded-full px-8 py-6 hover:bg-ecly-pop hover:text-white hover:border-ecly-pop transition-all"><LogOut className="mr-2 h-4 w-4"/> Salir</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Formulario de Nueva Noticia */}
          <div className="lg:col-span-8">
            <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 animate-in fade-in zoom-in-95 duration-500">
              <h2 className="text-3xl font-black mb-8 flex items-center gap-4 text-slate-900"><Plus className="text-ecly-green h-8 w-8"/> Nueva Publicación</h2>
              <form onSubmit={handlePostSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label className="font-black text-xs uppercase tracking-widest text-slate-400 ml-2">Título de la Noticia</Label>
                  <Input placeholder="Escribe un título atractivo..." value={postData.title} onChange={e => setPostData({...postData, title: e.target.value})} required className="font-black py-8 text-xl rounded-2xl border-2 focus:border-ecly-green"/>
                </div>
                
                <div className="space-y-2">
                  <Label className="font-black text-xs uppercase tracking-widest text-slate-400 ml-2">Bajada / Resumen Ejecutivo</Label>
                  <Textarea placeholder="Resume el impacto de esta noticia..." value={postData.excerpt} onChange={e => setPostData({...postData, excerpt: e.target.value})} required className="font-bold h-24 rounded-2xl border-2 focus:border-ecly-green"/>
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
                    <Label className="font-black text-xs uppercase tracking-widest text-slate-400 ml-2">URL de la Imagen (Banner)</Label>
                    <Input placeholder="https://unsplash.com/foto..." value={postData.image_url} onChange={e => setPostData({...postData, image_url: e.target.value})} required className="font-bold h-16 rounded-2xl border-2 focus:border-ecly-green"/>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-black text-xs uppercase tracking-widest text-slate-400 ml-2">Contenido (Soporta Markdown)</Label>
                  <Textarea placeholder="Desarrolla la noticia aquí..." value={postData.content} onChange={e => setPostData({...postData, content: e.target.value})} required className="font-bold h-80 rounded-2xl border-2 font-mono text-sm bg-slate-50 p-6 focus:border-ecly-green"/>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 text-white font-black py-10 rounded-[2.5rem] text-2xl shadow-[0_12px_0_0_#000] hover:translate-y-1 transition-all active:translate-y-2 flex items-center justify-center gap-4">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send className="h-6 w-6"/> Lanzar Noticia</>}
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar: Mis Posts y Perfil */}
          <div className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 delay-200">
            <h2 className="text-3xl font-black flex items-center gap-4 text-slate-900"><FileText className="text-ecly-green h-8 w-8"/> Historial</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {myPosts.length > 0 ? (
                myPosts.map(post => (
                  <div key={post.id} className="bg-white p-6 rounded-3xl flex justify-between items-center border border-slate-100 shadow-sm hover:shadow-md transition-all group hover:border-ecly-green/20">
                    <div className="truncate pr-4">
                      <h3 className="font-black text-slate-800 truncate text-lg group-hover:text-ecly-green transition-colors">{post.title}</h3>
                      <span className="text-[10px] uppercase font-black text-slate-400">{new Date(post.created_at).toLocaleDateString('es-AR')}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deletePost(post.id)} className="text-slate-300 hover:text-ecly-pop hover:bg-red-50 shrink-0 transition-colors">
                      <Trash2 className="h-5 w-5"/>
                    </Button>
                  </div>
                ))
              ) : (
                <div className="bg-white p-12 rounded-[2.5rem] text-center border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold italic">No hay publicaciones aún.</p>
                </div>
              )}
            </div>
            
            {/* Tarjeta de Perfil de Autor */}
            <div className="bg-ecly-dark text-white p-8 rounded-[3rem] shadow-xl relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:rotate-12 transition-transform">
                <UserCircle size={150} />
              </div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="h-16 w-16 rounded-2xl overflow-hidden bg-white/10 ring-2 ring-white/20 shadow-lg">
                  {profile?.avatar_url ? <img src={profile.avatar_url} className="w-full h-full object-cover"/> : <UserCircle className="w-full h-full p-2 text-white/20"/>}
                </div>
                <div>
                  <h4 className="font-black text-lg leading-none">{profile?.first_name} {profile?.last_name}</h4>
                  <span className="text-[10px] uppercase font-black text-ecly-vibrant tracking-widest">Autor Verificado</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm font-bold leading-relaxed line-clamp-4 relative z-10">
                {profile?.bio}
              </p>
              <Button variant="ghost" className="w-full mt-6 text-white/50 hover:text-white hover:bg-white/10 font-black relative z-10" onClick={() => setShowOnboarding(true)}>Actualizar Perfil</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;