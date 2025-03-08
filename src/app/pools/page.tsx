'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface Pool {
  id: string;
  name: string;
  service: string;
  members: number;
  maxMembers: number;
  cost: number;
  available: boolean;
}

const AllPools: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Mock data - replace with actual API call in production
  const pools: Pool[] = [
    { id: '1', name: 'Netflix Premium', service: 'Netflix', members: 3, maxMembers: 4, cost: 4.99, available: true },
    { id: '2', name: 'Prime Family', service: 'Amazon Prime', members: 2, maxMembers: 3, cost: 3.49, available: true },
    { id: '3', name: 'YouTube Premium Group', service: 'YouTube', members: 5, maxMembers: 5, cost: 2.99, available: false },
    { id: '4', name: 'Netflix Standard', service: 'Netflix', members: 1, maxMembers: 2, cost: 6.99, available: true },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Available Pools</h1>
        <Link href="/pools/create" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Create Pool
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pools.map((pool) => (
          <div 
            key={pool.id} 
            className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => router.push(`/pools/${pool.id}`)}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{pool.name}</h3>
              <span className={`text-sm px-2 py-1 rounded ${pool.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {pool.available ? 'Available' : 'Full'}
              </span>
            </div>
            <p className="text-gray-600 mb-3">{pool.service}</p>
            <div className="flex justify-between text-sm">
              <span>Members: {pool.members}/{pool.maxMembers}</span>
              <span className="font-medium">${pool.cost}/month</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPools;
