// app/page.tsx
import React from 'react';
import Navbar from './components/landingpage/Navbar';
import HeroSection from './components/landingpage/HeroSection';
import FeaturesSection from './components/landingpage/FeaturesSection';
import HowItWorksSection from './components/landingpage/HowItWorksSection';
import StatsSection from './components/landingpage/StatsSection';
import TestimonialsSection from './components/landingpage/TestimonialsSection';
import TrustedBySection from './components/landingpage/TrustedBySection';
import PricingSection from './components/landingpage/PricingSection';
import FAQSection from './components/landingpage/FAQSection';
import CTASection from './components/landingpage/CTASection';
import Footer from './components/landingpage/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustedBySection />
        <div id="features">
          <FeaturesSection />
        </div>
        <StatsSection />
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
        <TestimonialsSection />
        <div id="pricing">
          <PricingSection />
        </div>
        <div id="faq">
          <FAQSection />
        </div>
        <CTASection />
      </main>
      <Footer />
    </>
  );
}