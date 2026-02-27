"use client";

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center mb-4">
            <img 
              src="/Ecly_Logotype.png" 
              alt="Ecly Logo" 
              className="h-10 w-auto object-contain border-0" 
            />
          </div>
          <p className="text-slate-400 text-sm font-bold">Transformando el consumo para un planeta más limpio.</p>
        </div>
        <div>
          <h3 className="font-black mb-4 uppercase tracking-wider text-ecly-vibrant">Plataforma</h3>
          <ul className="space-y-2 text-sm text-slate-400 font-bold">
            <li><a className="hover:text-white transition-colors" href="/">Inicio</a></li>
            <li><a className="hover:text-white transition-colors" href="/#problema">Cómo funciona</a></li>
            <li><a className="hover:text-white transition-colors" href="/#waitlist">Inscripción</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-black mb-4 uppercase tracking-wider text-ecly-vibrant">Compañía</h3>
          <ul className="space-y-2 text-sm text-slate-400 font-bold">
            <li><a className="hover:text-white transition-colors" href="/quienes-somos">Sobre nosotros</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500 font-bold gap-4">
        <p>© 2026 Ecly Inc. Todos los derechos reservados.</p>
        <div className="flex gap-6">
          <a 
            href="https://www.linkedin.com/company/eclyautorecarga/about/?viewAsMember=true" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cursor-pointer hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="https://www.instagram.com/ecly.autorecarga?igsh=Y3p6ZXBnbDhpbzVh" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cursor-pointer hover:text-white transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;