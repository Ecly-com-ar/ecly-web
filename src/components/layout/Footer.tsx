"use client";

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <img 
              src="/Ecly - Logotype.png" 
              alt="Ecly Logo" 
              className="h-10 w-auto object-contain brightness-0 invert" 
            />
          </div>
          <p className="text-slate-400 text-sm">Transformando el consumo para un planeta más limpio.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Plataforma</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a className="hover:text-white transition-colors" href="#">Explorar</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Cómo funciona</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Precios</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Compañía</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a className="hover:text-white transition-colors" href="#">Sobre nosotros</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Carreras</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Blog</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a className="hover:text-white transition-colors" href="#">Privacidad</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Términos</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500 gap-4">
        <p>© 2025 Ecly Inc. Todos los derechos reservados.</p>
        <div className="flex gap-6">
          <span className="cursor-pointer hover:text-white transition-colors">Twitter</span>
          <span className="cursor-pointer hover:text-white transition-colors">LinkedIn</span>
          <span className="cursor-pointer hover:text-white transition-colors">Instagram</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;