'use client';  // Add this at the top to mark as a client component

import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  {
    name: "Company One",
    letter: "A",
    bgColor: "bg-gray-200 dark:bg-gray-800"
  },
  {
    name: "Company Two",
    letter: "B",
    bgColor: "bg-gray-200 dark:bg-gray-800"
  },
  {
    name: "Company Three",
    letter: "C",
    bgColor: "bg-gray-200 dark:bg-gray-800"
  },
  {
    name: "Company Four",
    letter: "D",
    bgColor: "bg-gray-200 dark:bg-gray-800"
  },
  {
    name: "Company Five",
    letter: "E",
    bgColor: "bg-gray-200 dark:bg-gray-800"
  },
  {
    name: "Company Six",
    letter: "F",
    bgColor: "bg-gray-200 dark:bg-gray-800"
  }
];

const TrustedBySection: React.FC = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6">
        <motion.h3 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-lg font-medium text-gray-600 dark:text-gray-400 mb-8"
        >
          TRUSTED BY LEADING COMPANIES
        </motion.h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {logos.map((logo, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className={`w-24 h-12 ${logo.bgColor} rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300`}>
                <span className="font-bold text-lg">{logo.letter}-Corp</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;