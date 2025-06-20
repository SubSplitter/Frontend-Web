// components/landingpage/HowItWorksSection.tsx
'use client'
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Browse Available Subscriptions",
    description: "Explore our curated catalog of subscription services with multi-user plans that support legitimate family and group sharing.",
    imageSrc: "/howItWorks/services.png",
    altText: "Browse subscription services interface"
  },
  {
    number: "02",
    title: "Join or Create Sharing Pools",
    description: "Choose from existing subscription pools with open slots or create your own to invite trusted friends and family members.",
    imageSrc: "/howItWorks/pools.png",
    altText: "Subscription pools interface"
  },
  {
    number: "03",
    title: "Create Your Sharing Group",
    description: "Set up your subscription group in minutes, customize access levels, and send secure invitations to your trusted circle.",
    imageSrc: "/howItWorks/createpool.png",
    altText: "Group creation interface"
  },
  {
    number: "04",
    title: "Manage Everything in One Dashboard",
    description: "Track expenses, monitor usage, handle payments, and maximize your savings all from our intuitive dashboard.",
    imageSrc: "/howItWorks/dashboard.png",
    altText: "subSpliter dashboard interface"
  }
];

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            How subSpliter <span className="text-indigo-600 dark:text-indigo-400">Works</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Smart subscription sharing that respects terms of service while maximizing your savings
          </motion.p>
        </div>
        
        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
            >
              <div className="lg:w-1/2 order-2 lg:order-none">
                <div className="flex items-start mb-4">
                  <span className="text-5xl font-black text-indigo-200 dark:text-indigo-800 mr-4">{step.number}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">{step.description}</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center group">
                    Learn more 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 order-1 lg:order-none">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
                    <div className="p-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <div className="ml-2 text-xs text-gray-500 dark:text-gray-400">subSpliter</div>
                    </div>
                    <div className="aspect-[4/3] sm:aspect-video bg-gray-100 dark:bg-gray-700 relative overflow-hidden min-h-[300px] sm:min-h-[200px]">
                      <Image
                        src={step.imageSrc}
                        alt={step.altText}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;