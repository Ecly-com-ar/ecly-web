"use client";

import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="border-none outline-none focus:ring-0 focus:outline-none">
          <img 
            src="/Ecly - Logotype.png" 
            alt="Ecly Logo" 
            className="h-16 w-auto object-contain"
            style={{ border: 'none !important', outline: 'none !important', boxShadow: 'none !important' }}
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
          <a href="#waitlist">
            <Button className="hidden lg:flex bg-ecly-green hover:bg-green-700 text-white rounded-full px-8 py-6 text-lg font-black shadow-lg hover:translate-y-0.5 transition-all border-none">
              Quiero sumar mi comercio
            </Button>
          </a>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-slate-900 p-2 border-none outline-none focus:ring-0">
                  <Menu className="h-8 w-8" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-0 bg-white p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-slate-100">
                    <img 
                      src="/Ecly - Logotype.png" 
                      alt="Ecly Logo" 
                      className="h-12 w-auto object-contain border-none outline-none"
                    />
                  </div>
                  <nav className="flex flex-col gap-6 p-8">
                    <SheetClose asChild>
                      <Link className="text-2xl font-black text-slate-900 hover:text-ecly-green transition-colors" to="/">Inicio</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <a className="text-2xl font-black text-slate-900 hover:text-ecly-green transition-colors" href="/#problema">El Problema</a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a className="text-2xl font-black text-slate-900 hover:text-ecly-green transition-colors" href="/#waitlist">Inscripción</a>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link className="text-2xl font-black text-slate-900 hover:text-ecly-green transition-colors" to="/quienes-somos">Quiénes Somos</Link>
                    </SheetClose>
                    
                    <div className="mt-8">
                      <SheetClose asChild>
                        <a href="#waitlist">
                          <Button className="w-full bg-ecly-green hover:bg-green-700 text-white rounded-2xl py-8 text-xl font-black shadow-lg border-none">
                            Sumar mi comercio
                          </Button>
                        </a>
                      </SheetClose>
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