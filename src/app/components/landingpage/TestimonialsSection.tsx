// components/TestimonialsSection.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    content: "SubSplitter has completely changed how my roommates and I manage our shared Netflix, Disney+, and Spotify accounts. No more Venmo requests or awkward reminders!",
    author: "Alex Johnson",
    role: "Student",
    avatarColor: "bg-blue-500"
  },
  {
    id: 2,
    content: "I save over $30 every month by sharing subscriptions with my family. SubSplitter makes it so easy to track who's paid and who owes what.",
    author: "Sarah Williams",
    role: "Software Engineer",
    avatarColor: "bg-purple-500"
  },
  {
    id: 3,
    content: "As someone who manages the family's streaming services, SubSplitter has been a lifesaver. I can finally stop being the 'subscription collector' in our household.",
    author: "Michael Chen",
    role: "Marketing Manager",
    avatarColor: "bg-indigo-500"
  },
  {
    id: 4,
    content: "The payment tracking feature is brilliant! I no longer have to remember who paid what and when. Everything is automated and I get notified when it's time to collect.",
    author: "Emma Rodriguez",
    role: "Graphic Designer",
    avatarColor: "bg-pink-500"
  },
  {
    id: 5,
    content: "My friends and I have been using SubSplitter for our shared gaming subscriptions. It's saved us so much hassle and definitely improved our friendships!",
    author: "James Wilson",
    role: "Game Developer",
    avatarColor: "bg-green-500"
  }
];

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            What Our Users <span className="text-indigo-600 dark:text-indigo-400">Say</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Join thousands of satisfied users who are saving money and simplifying their subscription management.
          </motion.p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
                <div className={`w-16 h-16 rounded-full ${testimonials[activeIndex].avatarColor} flex items-center justify-center text-white text-2xl font-bold`}>
                  {testimonials[activeIndex].author.charAt(0)}
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{testimonials[activeIndex].author}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{testimonials[activeIndex].role}</p>
                </div>
              </div>
              
              <blockquote>
                <svg className="w-12 h-12 text-indigo-200 dark:text-indigo-800 mb-6" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z"></path>
                </svg>
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  {testimonials[activeIndex].content}
                </p>
              </blockquote>
            </motion.div>
            
            <div className="flex justify-center mt-8 space-x-4">
              <button 
                onClick={handlePrev}
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={handleNext}
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="flex justify-center mt-6">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                    index === activeIndex 
                      ? 'bg-indigo-600 dark:bg-indigo-400' 
                      : 'bg-gray-300 dark:bg-gray-700 hover:bg-indigo-400 dark:hover:bg-indigo-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;