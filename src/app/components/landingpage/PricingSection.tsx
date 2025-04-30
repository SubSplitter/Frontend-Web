// components/landingpage/SubscriptionCalculatorSection.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Users, Check, Share2, CreditCard, BadgeIndianRupee } from 'lucide-react';

// Popular subscription services with their prices in INR
const popularServices = [
  { name: "Netflix Premium", price: 649, maxUsers: 6 },
  { name: "Disney+ Hotstar Premium", price: 299, maxUsers: 4 },
  { name: "Spotify Family", price: 179, maxUsers: 6 },
  { name: "YouTube Premium Family", price: 189, maxUsers: 6 },
  { name: "Apple One Family", price: 595, maxUsers: 6 },
  { name: "Amazon Prime", price: 299, maxUsers: 2 },
  { name: "SonyLIV Premium", price: 299, maxUsers: 5 },
  { name: "Custom", price: 0, maxUsers: 10 }
];

const SubscriptionCalculatorSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState(popularServices[0]);
  const [customPrice, setCustomPrice] = useState<number | ''>('');
  const [groupSize, setGroupSize] = useState(2);
  const [individualCost, setIndividualCost] = useState(0);
  const [savings, setSavings] = useState(0);
  const [savingsPercentage, setSavingsPercentage] = useState(0);
  const [annualSavings, setAnnualSavings] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [paymentFrequency, setPaymentFrequency] = useState<'monthly' | 'yearly'>('monthly');

  // Calculate costs whenever inputs change
  useEffect(() => {
    const currentPrice = selectedService.name === "Custom" ? Number(customPrice) : selectedService.price;
    
    if (currentPrice && groupSize > 0) {
      // Apply yearly discount if yearly plan is selected (typically 10% less than monthly x 12)
      const monthlyPrice = paymentFrequency === 'yearly' ? currentPrice * 0.9 : currentPrice;
      
      // Calculate base cost per person
      const baseCostPerPerson = monthlyPrice / groupSize;
      
      // Calculate monthly savings
      const individualSavings = monthlyPrice - baseCostPerPerson;
      
      // Calculate savings percentage
      const savingsPercent = Math.round((individualSavings / monthlyPrice) * 100);
      
      // Calculate annual savings
      const yearlySavings = individualSavings * 12;
      
      setIndividualCost(baseCostPerPerson);
      setSavings(individualSavings);
      setSavingsPercentage(savingsPercent);
      setAnnualSavings(yearlySavings);
    } else {
      setIndividualCost(0);
      setSavings(0);
      setSavingsPercentage(0);
      setAnnualSavings(0);
    }
  }, [selectedService, customPrice, groupSize, paymentFrequency]);

  // Handle service selection
  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = popularServices.find(service => service.name === event.target.value);
    if (selected) {
      setSelectedService(selected);
      if (selected.maxUsers < groupSize) {
        setGroupSize(selected.maxUsers);
      }
    }
  };

  // Format currency in INR
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleSaveButtonClick = () => {
    setIsButtonClicked(true);
    
    // Reset the button state after animation
    setTimeout(() => {
      setIsButtonClicked(false);
    }, 2000);
  };

  return (
    <section id="calculator" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-4 rounded-full bg-indigo-100 dark:bg-indigo-900 px-4 py-2"
          >
            <span className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-300">
              <BadgeIndianRupee className="w-4 h-4 mr-2" />
              Save Money on Subscriptions
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Calculate Your <span className="text-indigo-600 dark:text-indigo-400">Savings</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            See how much you can save by sharing subscription costs with friends and family
          </motion.p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Calculator Section */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Calculator className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                Subscription Calculator
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Select Subscription Service
                  </label>
                  <select 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800"
                    value={selectedService.name}
                    onChange={handleServiceChange}
                  >
                    {popularServices.map((service) => (
                      <option key={service.name} value={service.name}>
                        {service.name} {service.name !== "Custom" ? `(${formatCurrency(service.price)}/mo)` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                
                {selectedService.name === "Custom" && (
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      Custom Subscription Price (₹/month)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-500 dark:text-gray-400">₹</span>
                      <input 
                        type="number" 
                        className="w-full pl-8 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800"
                        placeholder="Enter price"
                        value={customPrice}
                        onChange={(e) => setCustomPrice(e.target.value === '' ? '' : Number(e.target.value))}
                        min="0"
                        step="1"
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium flex items-center">
                    <Users className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                    Number of People in Group
                  </label>
                  <div className="flex items-center">
                    <button 
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-l-lg text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                      aria-label="Decrease group size"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      className="w-20 text-center py-2 bg-gray-50 dark:bg-gray-700 border-y border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                      value={groupSize}
                      onChange={(e) => setGroupSize(Math.min(selectedService.maxUsers, Math.max(1, Number(e.target.value))))}
                      min="1"
                      max={selectedService.maxUsers}
                      aria-label="Group size"
                    />
                    <button 
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-r-lg text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      onClick={() => setGroupSize(Math.min(selectedService.maxUsers, groupSize + 1))}
                      aria-label="Increase group size"
                    >
                      +
                    </button>
                    <span className="ml-3 text-gray-500 dark:text-gray-400 text-sm">
                      (Max: {selectedService.maxUsers})
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                    Billing Frequency
                  </label>
                  <div className="flex mt-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button
                      className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
                        paymentFrequency === 'monthly'
                          ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-white shadow'
                          : 'text-gray-600 dark:text-gray-300'
                      } transition-all`}
                      onClick={() => setPaymentFrequency('monthly')}
                    >
                      Monthly
                    </button>
                    <button
                      className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
                        paymentFrequency === 'yearly'
                          ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-white shadow'
                          : 'text-gray-600 dark:text-gray-300'
                      } transition-all`}
                      onClick={() => setPaymentFrequency('yearly')}
                    >
                      Yearly (10% off)
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Results Section */}
            <motion.div 
              className="bg-gradient-to-br from-indigo-600 to-indigo-700 dark:from-indigo-800 dark:to-indigo-900 rounded-2xl shadow-xl p-8 text-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Share2 className="w-6 h-6 mr-2" />
                Your Savings
              </h3>
              
              <div className="space-y-6">
                <div className="border-b border-indigo-400 pb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span>Regular Price:</span>
                    <span className="font-semibold text-lg">
                      {selectedService.name === "Custom" 
                        ? (customPrice ? formatCurrency(Number(customPrice)) : '₹0') 
                        : formatCurrency(selectedService.price)}
                      <span className="text-indigo-200 text-sm ml-1">/mo</span>
                    </span>
                  </div>
                  {paymentFrequency === 'yearly' && (
                    <div className="text-right text-indigo-200 text-sm">
                      Including 10% yearly discount
                    </div>
                  )}
                </div>
                
                <div className="border-b border-indigo-400 pb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span>Your Share:</span>
                    <span className="font-semibold text-lg">
                      {formatCurrency(individualCost)}
                      <span className="text-indigo-200 text-sm ml-1">/mo</span>
                    </span>
                  </div>
                </div>
                
                <div className="bg-indigo-700/70 dark:bg-indigo-900/70 backdrop-blur-sm rounded-lg p-4 mt-6">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Monthly Savings:</span>
                    <span className="text-2xl font-bold text-green-300">
                      {formatCurrency(savings)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-indigo-200">Off regular price</span>
                    <span className="font-semibold text-green-300">
                      {savingsPercentage}% saved
                    </span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-indigo-600">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Annual Savings:</span>
                      <span className="text-xl font-bold text-green-300">
                        {formatCurrency(annualSavings)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <motion.button 
                  className="w-full py-3 px-6 bg-white text-indigo-600 rounded-lg font-semibold mt-4 hover:bg-indigo-50 transition duration-300 flex justify-center items-center"
                  onClick={handleSaveButtonClick}
                  whileTap={{ scale: 0.95 }}
                  initial={{ backgroundColor: "#ffffff" }}
                  animate={{ 
                    backgroundColor: isButtonClicked ? "#4ade80" : "#ffffff",
                    color: isButtonClicked ? "#ffffff" : "#4f46e5"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {isButtonClicked ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      <span>Processing</span>
                    </>
                  ) : (
                    "Start Saving Now"
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 bg-indigo-50 dark:bg-gray-700/50 rounded-xl p-6 shadow-md"
          >
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Why Share Subscriptions?</h4>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                Join Subspace today and start sharing the cost of your favorite subscription services with friends and family the right way.
              </p>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h5 className="font-medium text-indigo-600 dark:text-indigo-400">Save Money</h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Split costs to save up to 83% on your monthly bills</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h5 className="font-medium text-indigo-600 dark:text-indigo-400">Easy Payments</h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Automated payment reminders and splitting</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h5 className="font-medium text-indigo-600 dark:text-indigo-400">No Hassles</h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">One platform to manage all your shared subscriptions</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionCalculatorSection;