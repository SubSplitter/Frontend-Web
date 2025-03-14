// components/ui/PoolCard.tsx
import React from 'react';
import Image from 'next/image';
import { Users } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  avatar?: string;
  isPrimary?: boolean;
}

interface PoolCardProps {
  pool: {
    id: string;
    serviceName: string;
    serviceLogo: string;
    serviceColor: string;
    totalCost: number;
    splitCost: number;
    members: Member[];
    capacity: number;
    expiresAt: string;
  };
  onClick?: () => void;
}

export default function PoolCard({ pool, onClick }: PoolCardProps) {
  const remainingSlots = pool.capacity - pool.members.length;
  
  return (
    <div 
      className="bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
      onClick={onClick}
    >
      <div className="h-2" style={{ backgroundColor: pool.serviceColor }}></div>
      
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 relative rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center mr-3">
            <Image 
              src={pool.serviceLogo} 
              alt={pool.serviceName} 
              width={24} 
              height={24} 
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{pool.serviceName}</h3>
            <p className="text-gray-400 text-xs">
              Renews on {new Date(pool.expiresAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-xs text-gray-400">Total</div>
            <div className="text-lg font-bold">${pool.totalCost.toFixed(2)}</div>
          </div>
          <div className="text-2xl">→</div>
          <div>
            <div className="text-xs text-gray-400">Your share</div>
            <div className="text-lg font-bold text-green-400">${pool.splitCost.toFixed(2)}</div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-300">Members</div>
            <div className="flex items-center text-sm">
              <Users size={14} className="mr-1 text-gray-400" />
              <span>{pool.members.length}/{pool.capacity}</span>
            </div>
          </div>
          
          <div className="flex -space-x-2 overflow-hidden">
            {pool.members.slice(0, 5).map((member) => (
              <div 
                key={member.id}
                className={`w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs ring-2 ${member.isPrimary ? 'ring-green-500' : 'ring-gray-800'}`}
              >
                {member.avatar ? (
                  <Image src={member.avatar} alt={member.name} width={32} height={32} className="rounded-full" />
                ) : (
                  member.name.substring(0, 2).toUpperCase()
                )}
              </div>
            ))}
            
            {pool.members.length > 5 && (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs ring-2 ring-gray-800">
                +{pool.members.length - 5}
              </div>
            )}
          </div>
        </div>
        
        <button 
          className={`w-full py-2 px-4 rounded-md flex items-center justify-center transition duration-200 ${
            remainingSlots > 0 
              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
          disabled={remainingSlots === 0}
        >
          {remainingSlots > 0 ? `Join Pool (${remainingSlots} spots left)` : 'Pool is Full'}
        </button>
      </div>
    </div>
  );
}
