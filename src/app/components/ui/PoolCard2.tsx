import React, { useState } from 'react';
import Image from 'next/image';
import { Users } from 'lucide-react';
import JoinPoolModal from '../forms/JoinPoolModal';

interface Member {
  id: string;
  name: string;
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
    slotsAvailable: number;
    expiresAt: string;
    status?: 'active' | 'pending' | 'expired';
  };
  onClick?: () => void;
  onJoin?: () => void;
  onLeave?: () => void;
  currentUserId?: string;
}

export default function PoolCard({ pool, onClick, onJoin, onLeave, currentUserId }: PoolCardProps) {
  const [showJoinModal, setShowJoinModal] = useState(false);
  
  const remainingSlots = pool.slotsAvailable;
  const formattedExpiryDate = new Date(pool.expiresAt).toLocaleDateString();
  const savings = (pool.totalCost / pool.capacity) * (pool.capacity - 1);
  const savingsPercentage = ((savings / pool.totalCost) * 100).toFixed(0);
  
  // Check if the current user is already a member
  const isUserMember = pool.members.some(member => member.id === currentUserId);
  
  // Handle missing images gracefully
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = '/assets/logos/default.svg';
  };
  
  // Handle leave action
  const handleLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onLeave) onLeave();
  };
  
  return (
    <>
      <div 
        className="bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] cursor-pointer border border-gray-700"
        onClick={onClick}
      >
        {/* Top color banner based on service */}
        <div className="h-1" style={{ backgroundColor: pool.serviceColor }}></div>
        
        <div className="p-5">
          {/* Header with service details */}
          <div className="flex items-center mb-5">
            <div className="h-12 w-12 relative rounded-lg overflow-hidden bg-gray-900">
              <Image 
                src={pool.serviceLogo} 
                alt={pool.serviceName} 
                layout="fill"
                objectFit="cover"
                onError={handleImageError}
              />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-lg font-bold">{pool.serviceName}</h3>
              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-xs">
                  Renews on {formattedExpiryDate}
                </p>
                <div className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded-full">
                  Save {savingsPercentage}%
                </div>
              </div>
            </div>
          </div>
          
          {/* Pricing comparison */}
          <div className="flex justify-between items-center mb-5 bg-gray-900 rounded-lg p-3">
            <div>
              <div className="text-xs text-gray-400">Total</div>
              <div className="text-lg font-bold">${pool.totalCost.toFixed(2)}</div>
            </div>
            <div className="text-gray-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-400">Your share</div>
              <div className="text-lg font-bold text-green-400">${pool.splitCost.toFixed(2)}</div>
            </div>
          </div>
          
          {/* Member status */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-300">
                <Users size={14} className="inline mr-1 text-gray-400" />
                Members
              </div>
              <div className="text-sm bg-gray-700 px-2 py-1 rounded-full">
              {pool.capacity - pool.slotsAvailable}/{pool.capacity}
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div 
  className="bg-purple-600 h-1.5 rounded-full" 
  style={{ width: `${((pool.capacity - pool.slotsAvailable)/pool.capacity)*100}%` }}
></div>
            </div>
          </div>
          
          {/* Join/Leave button */}
          {isUserMember ? (
            <button 
              className="w-full py-2.5 px-4 rounded-lg font-medium flex items-center justify-center transition duration-200 bg-gray-700 hover:bg-gray-600 text-white"
              onClick={handleLeave}
            >
              Leave Pool
            </button>
          ) : (
            <button 
              className={`w-full py-2.5 px-4 rounded-lg font-medium flex items-center justify-center transition duration-200 ${
                remainingSlots > 0 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
              disabled={remainingSlots === 0}
              onClick={(e) => {
                e.stopPropagation();
                setShowJoinModal(true);
              }}
            >
              {remainingSlots > 0 
                ? `Join Pool (${remainingSlots} ${remainingSlots === 1 ? 'spot' : 'spots'} left)` 
                : 'Pool is Full'
              }
            </button>
          )}
        </div>
      </div>
      
      {/* Join Pool Modal */}
      <JoinPoolModal 
        poolId={pool.id}
        poolName={pool.serviceName}
        costPerMonth={pool.splitCost}
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onSuccess={() => {
          if (onJoin) onJoin();
        }}
      />
    </>
  );
}