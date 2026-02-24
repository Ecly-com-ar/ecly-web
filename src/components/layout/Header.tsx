"use client";

import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img 
              src="/Ecly - Logotype.png" 
              alt="Ecly Logo" 
              className="h-16 w-auto object-contain"
            />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-10">
          <Link className="text-base font-black text-slate-600 hover:text-ecly-green transition-colors" to="/">Inicio</Link>
          <a className="text-base font-black text-slate-600 hover:text-ecly-green transition-colors" href="/#problema">El Problema</a>
          <a className="text-base font-black text-slate-600 hover:text-ecly-green transition-colors" href="/#waitlist">Inscripción</a>
          <Link className="text-base font-black text-slate-600 hover:text-ecly-green transition-colors" to="/quienes-somos">Quiénes Somos</Link>
        </nav>

        <div className="flex items-center gap-4">
          <a href="#waitlist">
            <Button className="hidden lg:flex bg-ecly-green hover:bg-green-700 text-white rounded-full px-8 py-6 text-lg font-black shadow-lg hover:translate-y-0.5 transition-all">
              Quiero sumar mi comercio
            </Button>
          </a>
          <button className="md:hidden text-slate-500">
            <Menu className="h-8 w-8" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;