'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const HeroSection = () => {
  // Define subscription data with user avatars
  const subscriptions = [
    {
      name: 'Netflix', 
      price: '₹649', 
      memberCount: 4,
      members: [
        '/avatar/user1.jpg', 
        '/avatar/user2.jpg', 
        '/avatar/user3.jpg',
        '/avatar/user4.jpg'
      ]
    },
    {
      name: 'Spotify', 
      price: '₹179', 
      memberCount: 6,
      members: [
        '/avatar/user5.jpg', 
        '/avatar/user2.jpg', 
        '/avatar/user6.jpg',
        '/avatar/user3.jpg',
        '/avatar/user7.jpg',
        '/avatar/user1.jpg'
      ]
    },
    {
      name: 'Prime', 
      price: '₹299', 
      memberCount: 2,
      members: [
        '/avatar/user8.jpg',
        '/avatar/user4.jpg'
      ]
    }
  ];

  // Popular subscription service logos for the avatar section
  const popularServices = [
    { name: 'Netflix', icon: '/assets/logos/netflix.svg' },
    { name: 'Spotify', icon: '/assets/logos/youtube-icon-5.svg' },
    { name: 'Prime', icon: '/assets/logos/adobe-2.svg' },
    { name: 'Disney+', icon: '/assets/logos/disney-plus.svg' }
  ];

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
        {/* Left text column - UNCHANGED */}
        <motion.div 
          className="lg:w-1/2 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            <span className="block">Smart Subscription</span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Sharing for Friends
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-xl">
            Split costs, track payments, and manage shared subscriptions in one place. Save up to 70% on your monthly subscription bills.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1">
              Start Saving Today
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-indigo-300 text-indigo-100 font-bold rounded-lg hover:bg-indigo-800/30 transition duration-300 transform hover:-translate-y-1">
              How It Works
            </button>
          </div>
          
          <div className="mt-12 flex items-center">
            <div className="flex -space-x-2">
              {popularServices.slice(0, 3).map((service, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-900 bg-black/40 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                  <Image
                    src={service.icon}
                    alt={service.name}
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-indigo-900 bg-black/40 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-white">
                +
              </div>
            </div>
            <p className="ml-4 text-indigo-200">
              Join <span className="font-bold">5,000+</span> subscription sharers
            </p>
          </div>
        </motion.div>
        
        {/* Right illustration/mockup column - MOBILE RESPONSIVE */}
        <motion.div 
          className="lg:w-1/2 mt-12 lg:mt-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-black/80 backdrop-blur-sm border border-indigo-500/20 rounded-xl overflow-hidden shadow-2xl">
              <div className="p-2 sm:p-3 bg-black/30 border-b border-indigo-500/20 flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <div className="ml-2 text-xs sm:text-sm text-indigo-300">Subspliter Dashboard</div>
              </div>
              <div className="p-3 sm:p-4">
                {/* Mobile: Single column, Desktop: 3 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {/* Subscription cards with real user avatars */}
                  {subscriptions.map((service) => (
                    <div key={service.name} className="bg-indigo-900/30 border border-indigo-500/20 rounded-lg p-3 sm:p-4">
                      <div className="flex justify-between mb-2 sm:mb-3">
                        <span className="text-sm sm:text-base font-medium text-indigo-200">{service.name}</span>
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-500/30">Active</span>
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                        {service.price}
                        <span className="text-xs text-indigo-300">/mo</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex">
                          {/* Show first 3 avatars */}
                          {service.members.slice(0, 3).map((avatar, idx) => (
                            <div key={idx} className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-indigo-500/30 bg-indigo-800 ${idx > 0 ? '-ml-1' : ''}`}>
                              <Image
                                src={avatar}
                                alt="User avatar"
                                width={28}
                                height={28}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Fallback to colored circle if image fails
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
                                }}
                              />
                            </div>
                          ))}
                          {/* Show count of additional members if more than 3 */}
                          {service.memberCount > 3 && (
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-indigo-700/60 flex items-center justify-center text-xs font-semibold text-white -ml-1 border border-indigo-500/30">
                              +{service.memberCount - 3}
                            </div>
                          )}
                        </div>
                        <span className="text-xs sm:text-sm text-indigo-300">{service.memberCount} members</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-indigo-600/20 rounded-lg border border-indigo-500/30">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                    <span className="text-sm sm:text-base font-medium text-white mb-1 sm:mb-0">Your Monthly Savings</span>
                    <span className="text-lg sm:text-xl font-bold text-green-400">₹780</span>
                  </div>
                  <div className="w-full bg-indigo-800/30 rounded-full h-2 sm:h-3">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-400 to-purple-600 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '67%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                  <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-indigo-300">
                    You're saving 67% compared to individual subscriptions
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