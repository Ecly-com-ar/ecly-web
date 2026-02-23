"use client";

import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img 
              src="/Ecly - Logotype.png" 
              alt="Ecly Logo" 
              className="h-12 w-auto object-contain"
            />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-sm font-bold text-slate-600 hover:text-ecly-green transition-colors" to="/">Para Comercios</Link>
          <Link className="text-sm font-bold text-slate-600 hover:text-ecly-green transition-colors" to="/institucional">Institucional</Link>
          <a className="text-sm font-bold text-slate-600 hover:text-ecly-green transition-colors" href="#entidades">Entidades</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/#hero-form">
            <Button className="hidden sm:flex bg-ecly-green hover:bg-green-700 text-white rounded-full px-6 font-bold">
              Sumate
            </Button>
          </Link>
          <button className="md:hidden text-slate-500">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;