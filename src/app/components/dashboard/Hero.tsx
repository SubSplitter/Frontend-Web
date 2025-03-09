'use client'
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SubscriptionSearchBar from '../SubscriptionSearchBar';

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef(isAutoPlay);
  
  const subscriptions = [
    {
      name: "Netflix",
      color: "bg-gradient-to-br from-red-600 to-red-700",
      price: "₹799/mo",
      icon: "🎬",
      savings: "Save ₹479/mo",
      features: ["4K Streaming", "Multiple Profiles"]
    },
    {
      name: "Amazon Prime",
      color: "bg-gradient-to-br from-blue-700 to-blue-800",
      price: "₹1499/mo",
      icon: "📦",
      savings: "Save ₹899/mo",
      features: ["Free Shipping", "Prime Video"]
    },
    {
      name: "YouTube Premium",
      color: "bg-gradient-to-br from-red-500 to-red-600",
      price: "₹189/mo",
      icon: "▶️",
      savings: "Save ₹113/mo",
      features: ["Ad-free Videos", "Background Play"]
    },
    {
      name: "Spotify",
      color: "bg-gradient-to-br from-green-600 to-green-700",
      price: "₹119/mo",
      icon: "🎵",
      savings: "Save ₹71/mo",
      features: ["Ad-free Music", "Offline Downloads"]
    },
    {
      name: "Disney+",
      color: "bg-gradient-to-br from-blue-600 to-purple-700",
      price: "₹299/mo",
      icon: "✨",
      savings: "Save ₹179/mo",
      features: ["4K Content", "Multiple Devices"]
    }
  ];

  // Update ref when state changes
  useEffect(() => {
    autoPlayRef.current = isAutoPlay;
  }, [isAutoPlay]);

  // Auto-rotate cards with pause capability
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoPlayRef.current) {
        setActiveIndex((current) => (current + 1) % subscriptions.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [subscriptions.length]);

  // Handle card click
  const handleCardClick = (index) => {
    setActiveIndex(index);
    setIsAutoPlay(false);
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  return (
    <div className="relative w-full">
      {/* Main Hero Section with full-width gradient background */}
      <div className="w-full bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900 overflow-hidden">
        {/* Animated decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute -bottom-16 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          ></motion.div>
          <motion.div 
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.25, 0.1] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-16 right-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          ></motion.div>
          <motion.div 
            initial={{ opacity: 0.05 }}
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/4 left-1/3 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          ></motion.div>
        </div>
        
        <div className="container mx-auto px-4 py-20 sm:py-28 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left content - Hero Text with animations */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-left"
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block px-4 py-1 rounded-full bg-white/10 text-blue-200 text-sm font-medium mb-4 backdrop-blur-sm"
              >
                Save up to 60% on your subscriptions
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
              >
                Share Subscriptions.
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="block text-blue-300"
                >
                  Save Money.
                </motion.span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl text-blue-100 mb-10 max-w-lg mx-auto md:mx-0"
              >
                Split the cost of premium subscriptions with trusted members.
                Pay less than half, enjoy full benefits.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <Link href="/register" className="group bg-white text-indigo-900 px-8 py-3 rounded-lg font-medium transition duration-300 text-center text-lg shadow-md hover:shadow-xl hover:bg-blue-50 relative overflow-hidden">
                  <span className="relative z-10">Get Started</span>
                  <span className="absolute inset-0 bg-blue-100 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                </Link>
                
                <Link href="/how-it-works" className="group border border-white text-white px-8 py-3 rounded-lg font-medium transition duration-300 text-center text-lg relative overflow-hidden">
                  <span className="relative z-10">How It Works</span>
                  <span className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                </Link>
              </motion.div>
              
              {/* Animated Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="grid grid-cols-3 gap-6 mt-12 text-center md:text-left"
              >
                {[
                  { value: "14+", label: "Services" },
                  { value: "60%", label: "Avg. Savings" },
                  { value: "10k+", label: "Happy Users" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                    className="group"
                  >
                    <motion.p 
                      className="text-3xl lg:text-4xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300"
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-sm text-blue-200">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Right content - Interactive Subscription Cards */}
            <div className="relative flex items-center justify-center h-96 sm:h-[450px]">
              <div className="absolute w-full h-full flex items-center justify-center perspective-1000">
                {subscriptions.map((subscription, index) => {
                  // Calculate position based on active index
                  const position = (index - activeIndex + subscriptions.length) % subscriptions.length;
                  
                  // Only render cards that are visible or about to be visible
                  if (position > 2 && position < subscriptions.length - 1) return null;
                  
                  return (
                    <motion.div 
                      key={subscription.name}
                      className={`absolute w-64 h-96 rounded-xl shadow-xl cursor-pointer ${position === 0 ? 'z-30' : 'z-10'}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: position === 0 ? 1 : position === 1 ? 0.85 : position === subscriptions.length - 1 ? 0.85 : 0.7,
                        opacity: position <= 1 || position === subscriptions.length - 1 ? 1 : 0,
                        x: position === 0 ? 0 : position === 1 ? '35%' : position === subscriptions.length - 1 ? '-35%' : 0,
                        rotateY: position === 0 ? 0 : position === 1 ? 10 : position === subscriptions.length - 1 ? -10 : 0,
                        filter: position === 0 ? 'brightness(1)' : 'brightness(0.8)',
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      onClick={() => handleCardClick(index)}
                      whileHover={{ scale: position === 0 ? 1.05 : position === 1 ? 0.9 : position === subscriptions.length - 1 ? 0.9 : 0.75 }}
                      style={{
                        boxShadow: position === 0 ? '0 25px 50px -12px rgba(0, 0, 0, 0.4)' : '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      <div className={`w-full h-full ${subscription.color} rounded-xl p-6 flex flex-col relative overflow-hidden`}>
                        {/* Shine effect on active card */}
                        {position === 0 && (
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                            initial={{ x: '-100%', y: '-100%' }}
                            animate={{ x: '100%', y: '100%' }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 3 }}
                          />
                        )}
                        
                        <div className="flex justify-between items-start">
                          <div className="text-white">
                            <h3 className="text-xl font-bold">{subscription.name}</h3>
                            <p className="text-lg opacity-90">{subscription.price}</p>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl backdrop-blur-sm">
                            {subscription.icon}
                          </div>
                        </div>
                        
                        <div className="mt-8">
                          <div className="bg-white/15 text-white font-medium px-3 py-1.5 rounded-lg inline-block backdrop-blur-sm shadow-sm">
                            {subscription.savings}
                          </div>
                        </div>
                        
                        {/* Feature list (only visible on active card) */}
                        {position === 0 && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4"
                          >
                            <ul className="space-y-1">
                              {subscription.features.map((feature, i) => (
                                <li key={i} className="text-white/90 text-sm flex items-center">
                                  <span className="mr-1.5 text-xs">✓</span> {feature}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                        
                        <div className="mt-auto">
                          <div className="text-white/90 text-sm mb-4">
                            Share with up to 5 friends
                          </div>
                          <div className="flex -space-x-2">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
                              </div>
                            ))}
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs border-2 border-white/30 backdrop-blur-sm">
                              +2
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Card navigation indicators */}
              <div className="absolute bottom-0 flex justify-center space-x-2">
                {subscriptions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleCardClick(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex ? 'bg-white w-4' : 'bg-white/40'
                    }`}
                    aria-label={`View ${subscriptions[index].name} subscription`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Bar Section - Positioned below the hero with proper spacing */}
      <div className="w-full bg-gradient-to-b from-gray-50 to-white py-6 relative z-20 -mt-12 rounded-t-3xl shadow-lg">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <SubscriptionSearchBar />
        </motion.div>
        
        {/* Popular searches */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="container mx-auto px-4 mt-4 flex flex-wrap justify-center"
        >
          <p className="text-gray-500 text-sm mr-2">Popular:</p>
          {["Netflix", "Spotify", "Disney+", "YouTube"].map((term, i) => (
            <button key={i} className="text-sm text-indigo-600 hover:text-indigo-800 mr-4 transition">
              {term}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;