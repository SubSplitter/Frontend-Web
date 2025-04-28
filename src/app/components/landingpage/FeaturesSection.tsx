// components/landingpage/FeaturesSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Users, Bell, DollarSign, Zap, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: "Simplified Payments",
    description: "Automated payment splitting without the need to exchange account credentials."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Family & Friend Groups",
    description: "Create trusted circles for sharing subscription costs within your household."
  },
  {
    icon: <Bell className="w-8 h-8" />,
    title: "Payment Reminders",
    description: "Never miss a payment with automated reminders for you and your group."
  },
  {
    icon: <DollarSign className="w-8 h-8" />,
    title: "Expense Tracking",
    description: "Track shared expenses and see exactly how much you're saving each month."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Multi-Plan Support",
    description: "Compatible with all popular streaming services' family and multi-user plans."
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Secure Sharing",
    description: "Our system complies with all terms of service and protects your privacy."
  }
];

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-indigo-100 dark:hover:border-indigo-800"
    >
      <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Why Choose <span className="text-indigo-600 dark:text-indigo-400">SubSpliter</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            We've simplified subscription expense management so you can save money without the hassle.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1">
            Start Saving Today
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;