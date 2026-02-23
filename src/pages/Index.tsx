"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/home/Hero';
import BrandLogos from '@/components/home/BrandLogos';
import WaitlistForm from '@/components/home/WaitlistForm';
import ProblemSection from '@/components/home/ProblemSection';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-sans">
      <Header />
      <main className="flex-1">
        <Hero />
        <BrandLogos />
        <ProblemSection />
        <WaitlistForm />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;