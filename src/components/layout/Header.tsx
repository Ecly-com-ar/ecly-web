"use client";

import React from 'react';
import { Recycle, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Recycle className="h-8 w-8 text-ecly-green" />
          <span className="text-xl font-bold tracking-tight text-slate-900">Ecly</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-sm font-medium text-slate-600 hover:text-ecly-green transition-colors" href="#inicio">Inicio</a>
          <a className="text-sm font-medium text-slate-600 hover:text-ecly-green transition-colors" href="#problema">El Problema</a>
          <a className="text-sm font-medium text-slate-600 hover:text-ecly-green transition-colors" href="#entidades">Entidades Asociadas</a>
          <a className="text-sm font-medium text-slate-600 hover:text-ecly-green transition-colors" href="#waitlist">Inscripción</a>
        </nav>

        <div className="flex items-center gap-4">
          <a href="#waitlist">
            <Button className="hidden sm:flex bg-ecly-green hover:bg-green-700 text-white rounded-full px-6">
              Transforma
            </Button>
          </a>
          <button className="md:hidden text-slate-500">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;