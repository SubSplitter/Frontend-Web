'use client';  // Add this at the top to mark as a client component

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  {
    value: "10,000+",
    label: "Active Users",
    description: "Users managing subscriptions on our platform"
  },
  {
    value: "$2.4M+",
    label: "Saved Annually",
    description: "Total annual savings across all users"
  },
  {
    value: "25,000+",
    label: "Subscriptions Managed",
    description: "Services being shared and managed through SubSplitter"
  },
  {
    value: "4.9/5",
    label: "User Rating",
    description: "Average rating across app stores"
  }
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Making Subscription Sharing <span className="text-indigo-200">Simple</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-indigo-100 max-w-2xl mx-auto"
          >
            Join thousands of users who are saving money every month
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-colors"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-xl font-semibold text-indigo-200 mb-2">{stat.label}</div>
              <div className="text-indigo-100 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;