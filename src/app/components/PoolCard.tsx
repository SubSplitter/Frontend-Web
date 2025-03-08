// components/PoolCard.tsx
import React from 'react';
import Link from 'next/link';

interface PoolCardProps {
  id: string;
  name: string;
  service: string;
  members: number;
  maxMembers: number;
  cost: number;
  available: boolean;
}

const PoolCard: React.FC<PoolCardProps> = ({ 
  id, name, service, members, maxMembers, cost, available 
}) => {
  return (
    <Link href={`/pools/${id}`}>
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <span className={`text-sm px-2 py-1 rounded ${available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {available ? 'Available' : 'Full'}
          </span>
        </div>
        <p className="text-gray-600 mb-3">{service}</p>
        <div className="flex justify-between text-sm">
          <span>Members: {members}/{maxMembers}</span>
          <span className="font-medium">${cost}/month</span>
        </div>
      </div>
    </Link>
  );
};

export default PoolCard;