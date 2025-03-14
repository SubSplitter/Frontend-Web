import React from 'react';
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
  };
  onClick?: () => void;
}

export default function SubscriptionCard({ service, onClick }: SubscriptionCardProps) {
  return (
    <div 
      className="bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]" 
      style={{ borderTop: `4px solid ${service.color}` }}
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="h-12 w-12 relative rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center">
            <Image 
              src={service.logo} 
              alt={service.name} 
              width={36} 
              height={36} 
            />
          </div>
          <div className="text-xl font-bold text-white">${service.price.toFixed(2)}<span className="text-sm text-gray-400">/mo</span></div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
        <p className="text-gray-400 text-sm mb-4">{service.description}</p>
        
        {service.activePools !== undefined && (
          <div className="text-sm text-gray-300 mb-4">
            <span className="font-medium">{service.activePools}</span> active pools
          </div>
        )}
        
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition duration-200">
          <Plus size={16} className="mr-2" />
          Join Pool
        </button>
      </div>
    </div>
  );
}