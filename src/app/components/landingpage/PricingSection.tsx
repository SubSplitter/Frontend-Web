// components/PricingSection.tsx (continued)
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Basic",
    price: { monthly: "Free", annual: "Free" },
    description: "Perfect for individuals starting to share subscriptions",
    features: [
      "Manage up to 3 subscriptions",
      "Up to 5 members per group",
      "Basic payment tracking",
      "Email notifications",
      "Community support"
    ],
    isPopular: false,
    ctaText: "Start Free",
    ctaColor: "bg-gray-600 hover:bg-gray-700"
  },
  {
    name: "Pro",
    price: { monthly: "$4.99", annual: "$3.99" },
    description: "Ideal for friends and roommates sharing multiple services",
    features: [
      "Unlimited subscriptions",
      "Up to 15 members per group",
      "Advanced payment tracking",
      "Custom payment schedules",
      "Priority support",
      "Detailed analytics",
      "Custom reminders"
    ],
    isPopular: true,
    ctaText: "Start 7-Day Trial",
    ctaColor: "bg-indigo-600 hover:bg-indigo-700"
  },
  {
    name: "Family",
    price: { monthly: "$9.99", annual: "$7.99" },
    description: "Perfect for families sharing multiple subscription services",
    features: [
      "Everything in Pro",
      "Unlimited group members",
      "Family account controls",
      "Advanced security features",
      "Dedicated support",
      "API access",
      "Custom integrations"
    ],
    isPopular: false,
    ctaText: "Start 14-Day Trial",
    ctaColor: "bg-purple-600 hover:bg-purple-700"
  }
];

const PricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

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
            Simple, Transparent <span className="text-indigo-600 dark:text-indigo-400">Pricing</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Choose the perfect plan for your subscription sharing needs
          </motion.p>
          
          <div className="flex items-center justify-center mt-8">
            <span className={`mr-3 text-sm font-medium ${!isAnnual ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              type="button"
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 dark:bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none"
              role="switch"
              aria-checked={isAnnual}
            >
              <span
                aria-hidden="true"
                className={`${
                  isAnnual ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
            <span className={`ml-3 text-sm font-medium ${isAnnual ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>
              Annual <span className="text-green-500 font-semibold">(Save 20%)</span>
            </span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border ${
                plan.isPopular 
                  ? 'border-indigo-500 dark:border-indigo-400 transform scale-105 md:-translate-y-4 z-10' 
                  : 'border-gray-100 dark:border-gray-700'
              }`}
            >
              {plan.isPopular && (
                <div className="bg-indigo-500 text-white text-center py-1.5 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {isAnnual ? plan.price.annual : plan.price.monthly}
                  </span>
                  {plan.name !== "Basic" && (
                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                      {isAnnual ? "/year" : "/month"}
                    </span>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="flex-shrink-0 text-green-500 mr-2">
                        <Check className="w-5 h-5" />
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 px-6 rounded-lg text-white font-semibold ${plan.ctaColor} transition duration-300 transform hover:-translate-y-1 hover:shadow-lg`}>
                  {plan.ctaText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Need a custom solution for your organization?{" "}
            <a href="#" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              Contact our sales team
            </a>{" "}
            to learn more about our enterprise options.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;