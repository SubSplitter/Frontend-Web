import React, { useState } from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';

interface SubscriptionCardProps {
  service: {
    id: string;
    name: string;
    logo: string;
    price: number;
    description: string;
    color: string;
    activePools?: number;
    features?: string[];
  };
  onClick?: () => void;
}

export default function SubscriptionCard({ service, onClick }: SubscriptionCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div 
      className="h-96 w-full perspective-1000 group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={onClick}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card - Just Logo */}
        <div 
          className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden transition-all duration-300 shadow-md" 
          style={{ 
            background: 'linear-gradient(to bottom, #1a1f2e, #131722)',
            borderTop: `3px solid ${service.color}`,
            borderLeft: `1px solid ${service.color}30`,
            borderRight: `1px solid ${service.color}30`,
          }}
        >
          <div className="p-5 flex flex-col items-center justify-center h-full">
            <div className="h-32 w-32 relative rounded-2xl overflow-hidden bg-gray-700 flex items-center justify-center shadow-xl mb-8">
              <Image 
                src={service.logo} 
                alt={service.name} 
                width={80} 
                height={80} 
              />
            </div>
            
            <h3 className="text-2xl font-bold text-white text-center mb-2">{service.name}</h3>
            <div className="text-purple-400 font-medium text-sm">Hover to see details</div>
          </div>
        </div>
        
        {/* Back of card - Full Details */}
        <div 
          className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-md rotate-y-180" 
          style={{ 
            background: 'linear-gradient(to bottom, #1a1f2e, #131722)',
            borderTop: `3px solid ${service.color}`,
            borderLeft: `1px solid ${service.color}30`,
            borderRight: `1px solid ${service.color}30`,
          }}
        >
          <div className="flex flex-col h-full">
            {/* Header section */}
            <div className="p-4 flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center">
                <div className="h-8 w-8 relative rounded-md overflow-hidden bg-gray-700 flex items-center justify-center mr-3">
                  <Image 
                    src={service.logo} 
                    alt={service.name} 
                    width={20} 
                    height={20} 
                  />
                </div>
                <h3 className="text-lg font-semibold text-white">{service.name}</h3>
              </div>
              <div className="text-xl font-bold text-white">${service.price.toFixed(2)}<span className="text-sm text-gray-400">/mo</span></div>
            </div>
            
            {/* Content section */}
            <div className="p-4 flex-grow flex flex-col">
              <p className="text-gray-300 text-sm mb-4">{service.description}</p>
              
              <div className="text-white text-sm font-medium mb-2">Plan includes:</div>
              <ul className="space-y-2 mb-4">
                {service.features ? (
                  service.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-300 text-sm">
                      <div className="text-green-400 mr-2">✓</div>
                      {feature}
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start text-gray-300 text-sm">
                      <div className="text-green-400 mr-2">✓</div>
                      Premium {service.name} service
                    </li>
                    <li className="flex items-start text-gray-300 text-sm">
                      <div className="text-green-400 mr-2">✓</div>
                      24/7 customer support
                    </li>
                  </>
                )}
              </ul>
              
              {service.activePools !== undefined && (
                <div className="text-sm text-gray-300 mt-auto mb-4">
                  <span className="font-medium">{service.activePools}</span> active pools
                </div>
              )}
            </div>
            
            {/* Button section */}
            <div className="p-4 pt-0">
              <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-4 rounded-md flex items-center justify-center transition duration-200">
                <Plus size={16} className="mr-2" />
                Join Pool
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}