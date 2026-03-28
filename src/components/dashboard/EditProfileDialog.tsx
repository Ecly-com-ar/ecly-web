"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Edit2, Loader2, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthProvider";

const EditProfileDialog = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    bio: profile?.bio || '',
    avatar_url: profile?.avatar_url || ''
  });

  const MAX_BIO_LENGTH = 256;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          bio: formData.bio.substring(0, MAX_BIO_LENGTH),
          avatar_url: formData.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      await refreshProfile();
      toast.success("Perfil actualizado correctamente");
      setOpen(false);
    } catch (err: any) {
      toast.error("Error al actualizar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-2 text-ecly-green hover:text-ecly-dark hover:bg-ecly-light font-black rounded-full px-4">
          <Edit2 className="h-3 w-3" /> Editar Perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <div className="bg-ecly-light p-2 rounded-xl text-ecly-green">
              <User className="h-5 w-5" />
            </div>
            Mi Perfil
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-black text-[10px] uppercase text-slate-400 ml-1">Nombre</Label>
              <Input 
                value={formData.first_name} 
                onChange={e => setFormData({...formData, first_name: e.target.value})}
                className="rounded-xl border-2 font-bold"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-[10px] uppercase text-slate-400 ml-1">Apellido</Label>
              <Input 
                value={formData.last_name} 
                onChange={e => setFormData({...formData, last_name: e.target.value})}
                className="rounded-xl border-2 font-bold"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <Label className="font-black text-[10px] uppercase text-slate-400">Bio</Label>
              <span className={`text-[10px] font-black ${formData.bio.length >= MAX_BIO_LENGTH ? 'text-ecly-pop' : 'text-slate-400'}`}>
                {formData.bio.length}/{MAX_BIO_LENGTH}
              </span>
            </div>
            <Textarea 
              value={formData.bio} 
              onChange={e => setFormData({...formData, bio: e.target.value})}
              maxLength={MAX_BIO_LENGTH}
              placeholder="Cuéntanos un poco sobre ti..."
              className="rounded-xl border-2 font-bold min-h-[100px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-black text-[10px] uppercase text-slate-400 ml-1">Avatar URL</Label>
            <Input 
              value={formData.avatar_url} 
              onChange={e => setFormData({...formData, avatar_url: e.target.value})}
              placeholder="https://ejemplo.com/mi-foto.jpg"
              className="rounded-xl border-2 font-bold"
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-ecly-green hover:bg-ecly-dark text-white font-black py-6 rounded-2xl shadow-[0_6px_0_0_#16a34a] hover:translate-y-0.5 active:translate-y-1 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Guardar Cambios"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;