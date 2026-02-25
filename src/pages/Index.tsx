"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/home/Hero';
import BenefitsSection from '@/components/home/BenefitsSection';
import ProblemSection from '@/components/home/ProblemSection';
import FAQSection from '@/components/home/FAQSection';
import WaitlistForm from '@/components/home/WaitlistForm';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-sans selection:bg-ecly-vibrant selection:text-ecly-dark">
      <Header />
      <main className="flex-1 pt-24">
        <Hero />
        <BenefitsSection />
        <ProblemSection />
        <FAQSection />
        <WaitlistForm />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;