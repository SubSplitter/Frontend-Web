'use client'
import React from 'react';

import Hero from './components/dashboard/Hero';
import SubscriptionDashboard from './components/dashboard/Subscription';
import SubscriptionProblems from './components/dashboard/SubscriptionProblem';
import SubscriptionShowcase from './components/dashboard/SubscriptionShowcase';
import CompetitiveAnalysis from './components/dashboard/CompetitiveAnalysis';
import TestimonialPage from './components/dashboard/TestimonialPage';
import UserFlows from './components/dashboard/UsersFlow';
import TrustUsComponent from './components/dashboard/TrustUsComponent';
import FAQ from './components/dashboard/FAQ';
import Footer from './components/dashboard/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#010214] relative">
      {/* Grid background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="grid-pattern h-full w-full opacity-30" />
      </div>
      
      <main className="relative z-10">
        <Hero />
        
        {/* Main content sections with consistent spacing */}
        <div className="relative container mx-auto px-4">
          <section className="py-16">
            <SubscriptionDashboard />
          </section>
          
          <section className="py-16 -mx-4 px-4">
            <SubscriptionProblems />
          </section>
          
          <section className="py-16">
            <SubscriptionShowcase />
          </section>
          
          <section className="py-16 -mx-4 px-4">
            <CompetitiveAnalysis />
          </section>
          
          <section className="py-16">
            <TestimonialPage />
          </section>
          
          <section className="py-16 -mx-4 px-4">
            <UserFlows />
          </section>
          
          <section className="py-16">
            <TrustUsComponent />
          </section>
          
          <section className="py-16 -mx-4 px-4">
            <FAQ />
          </section>
        </div>
      </main>
      
      <Footer />
      
      {/* Add this CSS to your global stylesheet or create a new stylesheet */}
      <style jsx global>{`
        .grid-pattern {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
}