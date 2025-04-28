// components/landingpage/HowItWorksSection.tsx
'use client'
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Create Your Financial Group",
    description: "Sign up and create a trusted circle of friends or family members who want to share subscription costs.",
    imagePlaceholder: "group-creation-screen"
  },
  {
    number: "02",
    title: "Add Services",
    description: "Add the subscription services you want to share from our list of supported services with multi-user plans.",
    imagePlaceholder: "add-subscription-screen"
  },
  {
    number: "03",
    title: "Invite Trusted Members",
    description: "Send invites to your trusted circle to join your subscription expense management group.",
    imagePlaceholder: "invite-members-screen"
  },
  {
    number: "04",
    title: "Split & Save",
    description: "Our secure payment system handles the splitting of costs, while you enjoy the savings each month.",
    imagePlaceholder: "dashboard-screen"
  }
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            How Subspace <span className="text-indigo-600 dark:text-indigo-400">Works</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Smart subscription management that respects terms of service
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
              <div className="lg:w-1/2">
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
              
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
                    <div className="p-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <div className="ml-2 text-xs text-gray-500 dark:text-gray-400">Subspace</div>
                    </div>
                    <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 text-lg font-medium">
                        {step.imagePlaceholder} UI Preview
                      </div>
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