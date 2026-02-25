"use client";

import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string, isHash: boolean = false) => {
    setIsOpen(false);
    
    if (isHash && location.pathname === '/') {
      return;
    }
    
    if (!isHash) {
      navigate(path);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full bg-white/90 backdrop-blur-lg border-b border-slate-100 shadow-sm">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="block border-none outline-none focus:ring-0">
            <img 
              src="/Ecly_Logotype.png" 
              alt="Ecly Logo" 
              className="h-14 w-auto object-contain"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <Link className="text-base font-black text-slate-600 hover:text-ecly-green transition-colors" to="/">Inicio</Link>
          <a className="text-base font-black text-slate-600 hover:text-ecly-green transition-colors" href="/#problema">El Problema</a>
          <a className="text-base font-black text-slate-600 hover:text-ecly-green transition-colors" href="/#waitlist">Inscripción</a>
          <Link className="text-base font-black text-slate-600 hover:text-ecly-green transition-colors" to="/quienes-somos">Quiénes Somos</Link>
        </nav>

        <div className="flex items-center gap-4">
          <a href="#waitlist" className="hidden lg:block">
            <Button className="bg-ecly-green hover:bg-green-700 text-white rounded-full px-8 py-6 text-lg font-black shadow-lg hover:translate-y-0.5 transition-all border-none">
              Quiero tener Ecly en mi local
            </Button>
          </a>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="text-slate-900 p-2 border-none outline-none focus:ring-0">
                  <Menu className="h-8 w-8" />
                </button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[300px] sm:w-[400px] border-l-0 bg-white p-0"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-slate-100">
                    <img 
                      src="/Ecly_Logotype.png" 
                      alt="Ecly Logo" 
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <nav className="flex flex-col gap-6 p-8">
                    <Link 
                      className="text-2xl font-black text-slate-900 hover:text-ecly-green transition-colors" 
                      to="/"
                      onClick={() => setIsOpen(false)}
                    >
                      Inicio
                    </Link>
                    <a 
                      className="text-2xl font-black text-slate-900 hover:text-ecly-green transition-colors" 
                      href="/#problema"
                      onClick={() => handleNavigation('/#problema', true)}
                    >
                      El Problema
                    </a>
                    <a 
                      className="text-2xl font-black text-slate-900 hover:text-ecly-green transition-colors" 
                      href="/#waitlist"
                      onClick={() => handleNavigation('/#waitlist', true)}
                    >
                      Inscripción
                    </a>
                    <Link 
                      className="text-2xl font-black text-slate-900 hover:text-ecly-green transition-colors" 
                      to="/quienes-somos"
                      onClick={() => setIsOpen(false)}
                    >
                      Quiénes Somos
                    </Link>
                    
                    <div className="mt-8">
                      <a href="#waitlist" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-ecly-green hover:bg-green-700 text-white rounded-2xl py-8 text-xl font-black shadow-lg border-none">
                          Tener Ecly en mi local
                        </Button>
                      </a>
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;