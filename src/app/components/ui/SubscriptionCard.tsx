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
  // Check if logo is a valid URL or path
  const isValidImageSrc = service.logo && (
    service.logo.startsWith('/') || 
    service.logo.startsWith('http://') || 
    service.logo.startsWith('https://')
  );

  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-white border border-gray-200">
      <div className="p-4">
        <div className="flex items-center space-x-3">
          {isValidImageSrc ? (
            <div className="flex-shrink-0">
              <Image 
                src={service.logo} 
                alt={`${service.name} logo`}
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          ) : (
            <div 
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: service.color || '#4F46E5' }}
            >
              <span className="text-white font-bold text-sm">
                {service.name.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <p className="text-lg font-semibold text-gray-900">${service.price.toFixed(2)}/mo</p>
            <h3 className="text-xl font-bold">{service.name}</h3>
            <p className="text-gray-500">{service.description}</p>
            {service.activePools !== undefined && (
              <p className="text-sm text-gray-500 mt-1">
                {service.activePools} active pools
              </p>
            )}
          </div>
        </div>
        <button
          onClick={onClick}
          className="mt-4 w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Join Pool
        </button>
      </div>
    </div>
  );
}