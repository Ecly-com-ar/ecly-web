"use client";

import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { PlusCircle, FileText, LayoutDashboard, LogOut, Loader2, ShieldAlert } from 'lucide-react';

const AdminDashboard = () => {
  const { user, role, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Sustentabilidad',
    image_url: ''
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="h-12 w-12 text-ecly-green animate-spin mb-4" />
        <p className="font-black text-slate-900">Verificando permisos...</p>
      </div>
    );
  }

  // Si no hay usuario o el rol no es editor/admin, mostrar aviso de falta de permisos
  if (!user || (role !== 'editor' && role !== 'admin')) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl max-w-md border-4 border-white">
          <ShieldAlert className="h-20 w-20 text-ecly-pop mx-auto mb-6" />
          <h1 className="text-3xl font-black text-slate-900 mb-4">Acceso Denegado</h1>
          <p className="text-slate-500 font-bold mb-8">
            Tu cuenta está registrada como <span className="text-ecly-pop uppercase">{role || 'Sin Rol'}</span>. 
            Necesitas permisos de Editor para entrar aquí.
          </p>
          <div className="flex flex-col gap-4">
            <Button onClick={() => navigate('/')} className="rounded-full bg-slate-900 font-black py-6">
              Volver al Inicio
            </Button>
            <Button variant="ghost" onClick={() => signOut()} className="font-bold text-slate-400">
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert([{
          ...formData,
          slug,
          author_id: user.id,
          published: true
        }]);

      if (error) throw error;

      toast.success("¡Publicación creada con éxito!");
      setFormData({ title: '', excerpt: '', content: '', category: 'Sustentabilidad', image_url: '' });
      navigate('/blog');
    } catch (error: any) {
      toast.error("Error al crear la publicación: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900">Panel de Editor</h1>
              <p className="text-slate-500 font-bold mt-2">Bienvenido, {user.email}</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => signOut()}
              className="rounded-full font-black border-2 border-slate-200 gap-2 px-6"
            >
              <LogOut className="h-4 w-4" /> Cerrar Sesión
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-ecly-light p-3 rounded-2xl">
                    <LayoutDashboard className="h-6 w-6 text-ecly-green" />
                  </div>
                  <h2 className="text-xl font-black">Acciones Rápidas</h2>
                </div>
                <div className="space-y-4">
                  <Button className="w-full justify-start gap-3 bg-slate-900 hover:bg-ecly-green text-white rounded-2xl py-6 font-bold transition-all">
                    <PlusCircle className="h-5 w-5" /> Nueva Publicación
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 hover:text-slate-900 rounded-2xl py-6 font-bold" onClick={() => navigate('/blog')}>
                    <FileText className="h-5 w-5" /> Ver Blog Público
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-white p-8 sm:p-12 rounded-[3rem] shadow-sm border border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 mb-8">Crear nuevo artículo</h3>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Título del artículo</Label>
                    <Input 
                      placeholder="Ej: El impacto del plástico en Córdoba"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="py-6 px-6 rounded-2xl border-2 border-slate-100 focus:border-ecly-green focus-visible:ring-0 font-bold text-lg"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Resumen (Excerpt)</Label>
                    <Textarea 
                      placeholder="Una breve descripción..."
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="min-h-[100px] py-4 px-6 rounded-2xl border-2 border-slate-100 focus:border-ecly-green focus-visible:ring-0 font-bold"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Categoría</Label>
                      <select 
                        className="flex h-12 w-full items-center justify-between rounded-2xl border-2 border-slate-100 bg-white px-4 py-2 font-bold focus:outline-none focus:border-ecly-green"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                      >
                        <option value="Sustentabilidad">Sustentabilidad</option>
                        <option value="Comunidad">Comunidad</option>
                        <option value="Economía">Economía</option>
                        <option value="Tecnología">Tecnología</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs font-black uppercase tracking-widest text-slate-500">URL de Imagen</Label>
                      <Input 
                        placeholder="https://images.unsplash.com/..."
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        className="py-6 px-6 rounded-2xl border-2 border-slate-100 focus:border-ecly-green focus-visible:ring-0 font-bold"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Contenido completo</Label>
                    <Textarea 
                      placeholder="Escribe el cuerpo del artículo..."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="min-h-[300px] py-4 px-6 rounded-2xl border-2 border-slate-100 focus:border-ecly-green focus-visible:ring-0 font-bold"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-8 text-xl font-black bg-ecly-green hover:bg-green-600 text-white rounded-[2rem] shadow-[0_8px_0_0_#16a34a] hover:translate-y-1 transition-all active:translate-y-2"
                  >
                    {isSubmitting ? "Publicando..." : "Publicar Artículo"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;