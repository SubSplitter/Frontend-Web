import React, { useState, useEffect } from 'react';
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
    category?: string;
    activePools?: number;
  };
  onClick?: () => void;
}

export default function SubscriptionCard({ service, onClick }: SubscriptionCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Function to truncate text if needed
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };
  
  // Adjust description length based on content amount
  const getDescriptionLength = () => {
    // If service name is long or price is high (more digits), reduce description length
    const nameLength = service.name.length;
    const priceLength = service.price.toString().length;
    
    if (nameLength > 15 || priceLength > 4) {
      return 60;
    }
    return 85;
  };
  useEffect(() => {
    if (isHovering) {
      const timer = setTimeout(() => setIsFlipped(true), 100);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setIsFlipped(false), 100);
      return () => clearTimeout(timer);
    }
  }, [isHovering]);
  
  return (
    <div 
    className={`
      aspect-square w-full perspective-1000 group cursor-pointer
      transition-transform duration-300 
      ${isHovering ? 'scale-[1]' : ''}
    `}
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
    onClick={onClick}
  >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card - Full Logo */}
        <div 
  className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden transition-all duration-300 shadow-md" 
  style={{ 
    background: 'linear-gradient(to bottom, #1a1f2e, #131722)',
    borderTop: `3px solid ${service.color}`,
    borderLeft: `1px solid ${service.color}30`,
    borderRight: `1px solid ${service.color}30`,
    boxShadow: isHovering ? `0 0 15px ${service.color}20` : 'none',
  }}
>
          {/* Logo fills entire card */}
          <div className="flex flex-col items-center justify-center h-full relative">
            {/* Large logo as background */}
            <div className="absolute inset-0 flex items-center justify-center p-0">
              <div className="relative w-full h-full">
                <Image 
                  src={service.logo} 
                  alt={service.name}
                  layout="fill"
                  objectFit="cover"
                  className="transform scale-110"
                />
              </div>
            </div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
            
            {/* Service name at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
              <h3 className="text-xl font-bold text-white mb-1">{service.name}</h3>
              {/* <div className="text-purple-400 text-xs font-medium">Hover to see details</div> */}
            </div>
          </div>
        </div>
        
        {/* Back of card - Compact layout */}
       {/* Back of card - Compact layout */}
<div 
  className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-md rotate-y-180" 
  style={{ 
    background: 'linear-gradient(to bottom, #1a1f2e, #131722)',
    borderTop: `3px solid ${service.color}`,
    borderLeft: `1px solid ${service.color}30`,
    borderRight: `1px solid ${service.color}30`,
    boxShadow: isHovering ? `0 0 15px ${service.color}20` : 'none',
  }}
>
          <div className="flex flex-col h-full justify-between">
            {/* Top section with service info */}
            <div>
              {/* Header with logo, name and price */}
              <div className="px-3 py-2 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center">
                  <div className="h-6 w-6 relative rounded-md overflow-hidden bg-gray-700 flex items-center justify-center mr-2">
                    <Image 
                      src={service.logo} 
                      alt={service.name} 
                      width={24} 
                      height={24} 
                    />
                  </div>
                  <h3 className="text-base font-semibold text-white truncate max-w-32">{service.name}</h3>
                </div>
                <div className="text-base font-bold text-white whitespace-nowrap">${service.price.toFixed(2)}<span className="text-xs text-gray-400">/mo</span></div>
              </div>
              
              {/* Description - conditionally rendered based on length */}
              {service.description && (
                <p className="px-3 pt-2 text-xs text-gray-300">
                  {truncateText(service.description, getDescriptionLength())}
                </p>
              )}
              
              {/* Active pools info */}
              {service.activePools !== undefined && (
                <div className="px-3 pt-1 text-xs text-gray-300">
                  <span className="font-medium">{service.activePools}</span> active pools
                </div>
              )}
            </div>
            
            {/* Middle section with features */}
            <div className="px-3 flex-shrink">
              <div className="text-xs text-white font-medium mb-1">Plan includes:</div>
              <ul className="space-y-1">
                <li className="flex items-start text-xs text-gray-300">
                  <div className="text-green-400 mr-1">✓</div>
                  <div className="truncate">Premium {service.name} service</div>
                </li>
                {service.activePools && (
                  <li className="flex items-start text-xs text-gray-300">
                    <div className="text-green-400 mr-1">✓</div>
                    <div className="truncate">24/7 customer support</div>
                  </li>
                )}
              </ul>
            </div>
            
            {/* Button - always at bottom */}
            <div className="px-3 pb-3 pt-2 mt-auto">
              <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2 px-3 rounded-md flex items-center justify-center transition duration-200 text-sm">
                <Plus size={14} className="mr-1" />
                Join Pool
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}