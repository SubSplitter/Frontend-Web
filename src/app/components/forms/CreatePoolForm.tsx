// components/forms/CreatePoolForm.tsx
'use client'
import React, { useState } from 'react';
import { Calendar, DollarSign, Users, Info } from 'lucide-react';

interface CreatePoolFormProps {
  service: {
    id: string;
    name: string;
    logo?: string;
    plans: {
      id: string;
      name: string;
      price: number;
      features: string[];
    }[];
  };
  onSubmit: (data: any) => void;
}

export default function CreatePoolForm({ service, onSubmit }: CreatePoolFormProps) {
  const [selectedPlan, setSelectedPlan] = useState(service.plans[0].id);
  const [capacity, setCapacity] = useState(4);
  const [autoRenew, setAutoRenew] = useState(true);
  const [poolName, setPoolName] = useState(`${service.name} Pool`);
  const [description, setDescription] = useState('');
  
  const currentPlan = service.plans.find(plan => plan.id === selectedPlan);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      serviceId: service.id,
      planId: selectedPlan,
      capacity,
      autoRenew,
      poolName,
      description,
      costPerMember: currentPlan ? (currentPlan.price / capacity).toFixed(2) : 0
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Pool Name</label>
        <input
          type="text"
          value={poolName}
          onChange={(e) => setPoolName(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          placeholder="Enter a name for your pool"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Subscription Plan</label>
        <div className="space-y-3">
          {service.plans.map((plan) => (
            <label key={plan.id} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedPlan === plan.id 
                ? 'border-purple-500 bg-purple-900 bg-opacity-20' 
                : 'border-gray-700 hover:border-gray-600'
            }`}>
              <input
                type="radio"
                name="plan"
                value={plan.id}
                checked={selectedPlan === plan.id}
                onChange={() => setSelectedPlan(plan.id)}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{plan.name}</span>
                  <span className="text-lg font-bold">${plan.price.toFixed(2)}/mo</span>
                </div>
                <ul className="mt-2 space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-400 flex items-start">
                      <span className="text-green-400 mr-2">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`ml-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedPlan === plan.id ? 'border-purple-500' : 'border-gray-600'
              }`}>
                {selectedPlan === plan.id && <div className="w-3 h-3 rounded-full bg-purple-500"></div>}
              </div>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Pool Size</label>
        <div className="bg-gray-800 border border-gray-700 rounded-md p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Users size={18} className="text-gray-400 mr-2" />
              <span>Number of members</span>
            </div>
            <div className="font-bold">{capacity}</div>
          </div>
          <input
            type="range"
            min="2"
            max="6"
            value={capacity}
            onChange={(e) => setCapacity(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="mt-4 bg-gray-900 p-3 rounded-md">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Cost per member</span>
              <span className="font-bold">${currentPlan ? (currentPlan.price / capacity).toFixed(2) : '0.00'}/mo</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-400">Your savings</span>
              <span className="text-green-400 font-bold">${currentPlan ? (currentPlan.price - currentPlan.price / capacity).toFixed(2) : '0.00'}/mo</span>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Pool Description (Optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 h-24"
          placeholder="Add any additional information about your pool"
        />
      </div>
      
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="autoRenew"
            type="checkbox"
            checked={autoRenew}
            onChange={() => setAutoRenew(!autoRenew)}
            className="w-4 h-4 text-purple-600 border-gray-600 rounded focus:ring-purple-500 focus:ring-offset-gray-900"
          />
        </div>
        <label htmlFor="autoRenew" className="ml-2 text-sm text-gray-300">
          Automatically renew subscription (recommended)
        </label>
      </div>
      
      <div className="p-4 bg-blue-900 bg-opacity-20 rounded-lg border border-blue-800 flex">
        <Info size={20} className="text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="text-blue-300 font-medium mb-1">About Pool Creation</p>
          <p className="text-gray-300">
            As the pool creator, you'll be the primary account holder. The subscription will be registered under your payment method, and other members will contribute their share through SubSplitter.
          </p>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 rounded-md text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
        >
          Create Pool
        </button>
      </div>
    </form>
  );
}