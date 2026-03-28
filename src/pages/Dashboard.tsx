"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { LogOut, Loader2, Plus, FileText, Trash2, Send, Edit3, X, Eye, Bold, Italic, List, ListOrdered, Heading1, Link as LinkIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Dashboard = () => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  
  const [postData, setPostData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Sustentabilidad',
    image_url: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/access', { replace: true });
    }
    
    if (user && !loading) {
      fetchMyPosts();
    }
  }, [loading, user, navigate]);

  const fetchMyPosts = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('author_id', user?.id)
      .order('created_at', { ascending: false });
    if (data) setMyPosts(data);
  };

  const insertTag = (tag: string, endTag: string = '') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selection = text.substring(start, end);
    
    const before = text.substring(0, start);
    const after = text.substring(end);
    
    const newContent = before + tag + selection + (endTag || tag) + after;
    setPostData({ ...postData, content: newContent });
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tag.length, end + tag.length);
    }, 0);
  };

  const startEditing = (post: any) => {
    setEditingPostId(post.id);
    setPostData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image_url: post.image_url
    });
    setPreviewMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setPostData({ title: '', excerpt: '', content: '', category: 'Sustentabilidad', image_url: '' });
    setPreviewMode(false);
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const slug = postData.title
      .toLowerCase()
      .trim()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    try {
      if (editingPostId) {
        const { error } = await supabase
          .from('blog_posts')
          .update({ ...postData, slug })
          .eq('id', editingPostId);
        if (error) throw error;
        toast.success("Noticia actualizada");
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([{ ...postData, slug, author_id: user?.id, published: true }]);
        if (error) throw error;
        toast.success("Publicado con éxito");
      }
      
      cancelEditing();
      fetchMyPosts();
    } catch (err: any) {
      toast.error("Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("¿Deseas eliminar esta publicación permanentemente?")) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error) {
      toast.success("Eliminado");
      fetchMyPosts();
    }
  };

  if (loading || !user) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin h-10 w-10 text-ecly-green" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-24 px-4 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">Panel Editor</h1>
            <p className="font-bold text-ecly-green text-lg">Sesión de {profile?.first_name || 'Autor'}</p>
          </div>
          <Button variant="outline" onClick={() => signOut()} className="text-slate-500 font-black border-2 rounded-full px-8 py-6 hover:bg-ecly-pop hover:text-white transition-all"><LogOut className="mr-2 h-4 w-4"/> Salir</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className={`bg-white p-6 sm:p-10 rounded-[3.5rem] shadow-sm border-2 ${editingPostId ? 'border-ecly-electric' : 'border-slate-100'}`}>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-4 text-slate-900">
                  {editingPostId ? <Edit3 className="text-ecly-electric h-8 w-8"/> : <Plus className="text-ecly-green h-8 w-8"/>}
                  {editingPostId ? 'Editando Noticia' : 'Nueva Noticia'}
                </h2>
                {editingPostId && (
                  <Button variant="ghost" onClick={cancelEditing} className="text-slate-400 font-bold hover:text-ecly-pop">
                    <X className="h-5 w-5 mr-1"/> Cancelar
                  </Button>
                )}
              </div>
              
              <form onSubmit={handlePostSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label className="font-black text-xs uppercase text-slate-400 ml-2">Título</Label>
                  <Input value={postData.title} onChange={e => setPostData({...postData, title: e.target.value})} required className="font-black py-8 text-xl rounded-2xl border-2"/>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-2">
                    <Label className="font-black text-xs uppercase text-slate-400">Contenido</Label>
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                      <button type="button" onClick={() => setPreviewMode(false)} className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all ${!previewMode ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}>Editor</button>
                      <button type="button" onClick={() => setPreviewMode(true)} className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all ${previewMode ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}>Vista Previa</button>
                    </div>
                  </div>
                  
                  {!previewMode && (
                    <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border-x-2 border-t-2 border-slate-200 rounded-t-2xl">
                      <Button type="button" variant="ghost" size="icon" onClick={() => insertTag('**')} className="h-10 w-10 text-slate-600"><Bold size={18}/></Button>
                      <Button type="button" variant="ghost" size="icon" onClick={() => insertTag('_')} className="h-10 w-10 text-slate-600"><Italic size={18}/></Button>
                      <Button type="button" variant="ghost" size="icon" onClick={() => insertTag('## ')} className="h-10 w-10 text-slate-600"><Heading1 size={18}/></Button>
                      <Button type="button" variant="ghost" size="icon" onClick={() => insertTag('- ')} className="h-10 w-10 text-slate-600"><List size={18}/></Button>
                      <Button type="button" variant="ghost" size="icon" onClick={() => insertTag('1. ')} className="h-10 w-10 text-slate-600"><ListOrdered size={18}/></Button>
                      <Button type="button" variant="ghost" size="icon" onClick={() => insertTag('[texto](', ')') } className="h-10 w-10 text-slate-600"><LinkIcon size={18}/></Button>
                    </div>
                  )}

                  {previewMode ? (
                    <div className="min-h-[400px] rounded-2xl border-2 border-slate-200 bg-white p-8 prose prose-slate prose-green max-w-none overflow-y-auto prose-p:my-3 prose-headings:mt-6 prose-headings:mb-2">
                      {postData.content ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{postData.content}</ReactMarkdown> : <p className="text-slate-300 italic text-center pt-20">No hay contenido...</p>}
                    </div>
                  ) : (
                    <Textarea 
                      id="content-editor"
                      value={postData.content} 
                      onChange={e => setPostData({...postData, content: e.target.value})} 
                      required 
                      className="font-bold h-[400px] rounded-b-2xl rounded-t-none border-2 border-slate-200 bg-slate-50 p-6 focus:bg-white transition-colors resize-none"
                    />
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-black text-xs uppercase text-slate-400 ml-2">Resumen</Label>
                    <Textarea value={postData.excerpt} onChange={e => setPostData({...postData, excerpt: e.target.value})} required className="font-bold h-24 rounded-2xl border-2"/>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="font-black text-xs uppercase text-slate-400 ml-2">Categoría</Label>
                      <select className="flex h-14 w-full items-center justify-between rounded-xl border-2 border-slate-200 bg-background px-4 font-bold appearance-none" value={postData.category} onChange={e => setPostData({...postData, category: e.target.value})}>
                        <option>Sustentabilidad</option>
                        <option>Comunidad</option>
                        <option>Empresa</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-black text-xs uppercase text-slate-400 ml-2">Imagen URL</Label>
                      <Input value={postData.image_url} onChange={e => setPostData({...postData, image_url: e.target.value})} required className="font-bold h-14 rounded-xl border-2"/>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className={`w-full text-white font-black py-10 rounded-[2.5rem] text-2xl shadow-[0_12px_0_0_#000] hover:translate-y-1 transition-all ${editingPostId ? 'bg-ecly-electric hover:bg-blue-600' : 'bg-slate-900 hover:bg-black'}`}
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : editingPostId ? "Guardar Cambios" : "Publicar Noticia"}
                </Button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <h2 className="text-3xl font-black flex items-center gap-4 text-slate-900"><FileText className="text-ecly-green h-8 w-8"/> Historial</h2>
            <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
              {myPosts.map(post => (
                <div key={post.id} className={`bg-white p-5 rounded-[2.5rem] border transition-all ${editingPostId === post.id ? 'border-ecly-electric bg-blue-50/30' : 'border-slate-100 shadow-sm hover:border-ecly-green'}`}>
                  <h3 className="font-black text-slate-800 line-clamp-2 mb-2">{post.title}</h3>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{new Date(post.created_at).toLocaleDateString()}</span>
                    <div className="flex gap-1">
                      <Link to={`/blog/${post.slug || post.id}`} target="_blank">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-ecly-green"><Eye className="h-4 w-4"/></Button>
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => startEditing(post)} className="h-8 w-8 text-slate-400 hover:text-ecly-electric"><Edit3 className="h-4 w-4"/></Button>
                      <Button variant="ghost" size="icon" onClick={() => deletePost(post.id)} className="h-8 w-8 text-slate-400 hover:text-ecly-pop"><Trash2 className="h-4 w-4"/></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;