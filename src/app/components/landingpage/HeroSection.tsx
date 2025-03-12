'use client';  // Add this at the top to mark as a client component

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-950 min-h-screen flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-64 -left-64 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-96 -right-64 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-64 left-64 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero content container */}
      <div className="container mx-auto px-6 relative z-10 py-24 flex flex-col lg:flex-row items-center">
        {/* Left text column */}
        <motion.div 
          className="lg:w-1/2 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            <span className="block">Manage Group</span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Subscriptions Effortlessly
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-xl">
            Split costs, track payments, and manage shared subscriptions in one place. No more awkward money talks with friends.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1">
              Get Started
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-indigo-300 text-indigo-100 font-bold rounded-lg hover:bg-indigo-800/30 transition duration-300 transform hover:-translate-y-1">
              How It Works
            </button>
          </div>
          
          <div className="mt-12 flex items-center">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-indigo-900 bg-gradient-to-br from-purple-${i*100} to-indigo-${i*100} flex items-center justify-center text-xs font-bold`}>
                  {i === 4 ? '+' : ''}
                </div>
              ))}
            </div>
            <p className="ml-4 text-indigo-200">
              Join <span className="font-bold">10,000+</span> subscription sharers
            </p>
          </div>
        </motion.div>
        
        {/* Right illustration/mockup column */}
        <motion.div 
          className="lg:w-1/2 mt-12 lg:mt-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-black/80 backdrop-blur-sm border border-indigo-500/20 rounded-xl overflow-hidden shadow-2xl">
              <div className="p-2 bg-black/30 border-b border-indigo-500/20 flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <div className="ml-2 text-xs text-indigo-300">SubSplitter Dashboard</div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-3">
                  {/* Subscription cards */}
                  {['Netflix', 'Spotify', 'Disney+'].map((service, index) => (
                    <div key={service} className="bg-indigo-900/30 border border-indigo-500/20 rounded-lg p-3">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-indigo-200">{service}</span>
                        <span className="text-xs text-green-400">Active</span>
                      </div>
                      <div className="text-lg font-bold text-white">${(9.99 * (index + 1)).toFixed(2)}<span className="text-xs text-indigo-300">/mo</span></div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex">
                          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-xs">U</div>
                          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs -ml-1">J</div>
                          <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs -ml-1">K</div>
                        </div>
                        <span className="text-xs text-indigo-300">3 members</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-indigo-600/20 rounded-lg border border-indigo-500/30">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-white">Total Monthly Savings</span>
                    <span className="text-sm font-bold text-green-400">$26.98</span>
                  </div>
                  <div className="w-full bg-indigo-800/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-400 to-purple-600 h-2 rounded-full w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;