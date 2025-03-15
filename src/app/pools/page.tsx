'use client'// pages/pools.tsx
import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import DashboardLayout from '../components/layout/DashboardLayout';
import PoolCard from '../components/ui/PoolCard';
import { Plus, Search, Filter, ArrowDown, Settings, Users } from 'lucide-react';
import Image from 'next/image';

// Mock data
const poolsData = [
  {
    id: '1',
    serviceName: 'Netflix',
    serviceLogo: '/assets/logos/netflix.svg',
    serviceColor: '#E50914',
    plan: 'Premium',
    totalCost: 15.99,
    splitCost: 3.99,
    members: [
      { id: '1', name: 'John Smith', isPrimary: true },
      { id: '2', name: 'Alice Johnson' },
      { id: '3', name: 'Bob Williams' },
      { id: '4', name: 'Emma Davis' }
    ],
    capacity: 5,
    expiresAt: '2025-04-15T00:00:00Z',
    status: 'active',
    lastPayment: '2025-03-15T00:00:00Z'
  },
  {
    id: '2',
    serviceName: 'Spotify',
    serviceLogo: '/assets/logos/spotify.svg',
    serviceColor: '#1DB954',
    plan: 'Family Plan',
    totalCost: 14.99,
    splitCost: 3.75,
    members: [
      { id: '1', name: 'John Smith' },
      { id: '2', name: 'Alice Johnson', isPrimary: true },
      { id: '3', name: 'Chris Moore' },
      { id: '5', name: 'David Lee' }
    ],
    capacity: 6,
    expiresAt: '2025-03-28T00:00:00Z',
    status: 'active',
    lastPayment: '2025-02-28T00:00:00Z'
  },
  {
    id: '3',
    serviceName: 'Disney+',
    serviceLogo: '/assets/logos/disneyplus.svg',
    serviceColor: '#0063E5',
    plan: 'Standard',
    totalCost: 8.99,
    splitCost: 2.25,
    members: [
      { id: '1', name: 'John Smith' },
      { id: '6', name: 'Sarah Thompson', isPrimary: true },
      { id: '7', name: 'Michael Brown' },
      { id: '8', name: 'Laura Wilson' }
    ],
    capacity: 4,
    expiresAt: '2025-04-05T00:00:00Z',
    status: 'active',
    lastPayment: '2025-03-05T00:00:00Z'
  },
  {
    id: '4',
    serviceName: 'YouTube Premium',
    serviceLogo: '/assets/logos/youtube.svg',
    serviceColor: '#FF0000',
    plan: 'Family',
    totalCost: 17.99,
    splitCost: 3.60,
    members: [
      { id: '3', name: 'Chris Moore', isPrimary: true },
      { id: '1', name: 'John Smith' },
      { id: '9', name: 'Emily Clark' },
      { id: '10', name: 'Ryan Lewis' },
      { id: '11', name: 'Olivia Green' }
    ],
    capacity: 6,
    expiresAt: '2025-03-22T00:00:00Z',
    status: 'pending',
    lastPayment: '2025-02-22T00:00:00Z'
  },
  {
    id: '5',
    serviceName: 'Adobe Creative Cloud',
    serviceLogo: '/assets/logos/adobe.svg',
    serviceColor: '#FF0000',
    plan: 'Complete',
    totalCost: 52.99,
    splitCost: 17.66,
    members: [
      { id: '12', name: 'Jessica Hall', isPrimary: true },
      { id: '1', name: 'John Smith' },
      { id: '13', name: 'Daniel Taylor' }
    ],
    capacity: 3,
    expiresAt: '2025-04-10T00:00:00Z',
    status: 'active',
    lastPayment: '2025-03-10T00:00:00Z'
  }
];

// Filter options
const filters = {
  status: ['All', 'Active', 'Pending', 'Expired'],
  sortBy: ['Recently Updated', 'Price: Low to High', 'Price: High to Low', 'Expiring Soon']
};

const PoolsPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Recently Updated');
  const [showMyPools, setShowMyPools] = useState(true);
  
  // Filter and sort pools
  const filteredPools = poolsData.filter(pool => {
    const matchesSearch = pool.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || pool.status === statusFilter.toLowerCase();
    const matchesUserFilter = !showMyPools || pool.members.some(member => member.id === '1'); // '1' is the current user
    
    return matchesSearch && matchesStatus && matchesUserFilter;
  });
  
  // Sort pools based on selected option
  const sortedPools = [...filteredPools].sort((a, b) => {
    if (sortBy === 'Price: Low to High') {
      return a.splitCost - b.splitCost;
    } else if (sortBy === 'Price: High to Low') {
      return b.splitCost - a.splitCost;
    } else if (sortBy === 'Expiring Soon') {
      return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
    }
    // Default: Recently Updated
    return new Date(b.lastPayment).getTime() - new Date(a.lastPayment).getTime();
  });
  
  return (
    <DashboardLayout>
      <Head>
        <title>Subscription Pools | SubSplitter</title>
      </Head>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Subscription Pools</h1>
          <p className="text-gray-400">Manage your shared subscriptions</p>
        </div>
        
        <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition duration-200">
          <Plus size={18} className="mr-2" />
          Create New Pool
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search pools..."
              className="w-full bg-gray-700 text-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="myPoolsOnly" 
                className="w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-700"
                checked={showMyPools}
                onChange={() => setShowMyPools(!showMyPools)}
              />
              <label htmlFor="myPoolsOnly" className="text-sm">My pools only</label>
            </div>
            
            <div className="relative">
              <select
                className="appearance-none bg-gray-700 text-gray-200 rounded-md py-2 pl-10 pr-8 focus:outline-none focus:ring-1 focus:ring-purple-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {filters.status.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <Filter size={18} className="absolute left-3 top-2.5 text-gray-400" />
              <div className="absolute right-2 top-2.5 pointer-events-none text-gray-400">
                <ArrowDown size={16} />
              </div>
            </div>
            
            <div className="relative">
              <select
                className="appearance-none bg-gray-700 text-gray-200 rounded-md py-2 pl-10 pr-8 focus:outline-none focus:ring-1 focus:ring-purple-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {filters.sortBy.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <Settings size={18} className="absolute left-3 top-2.5 text-gray-400" />
              <div className="absolute right-2 top-2.5 pointer-events-none text-gray-400">
                <ArrowDown size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedPools.map(pool => (
          <PoolCard key={pool.id} pool={pool} />
        ))}
      </div>
      
      {/* Empty State */}
      {sortedPools.length === 0 && (
        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <Users size={24} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No pools found</h3>
          <p className="text-gray-400 mb-4">
            {searchTerm || statusFilter !== 'All' || !showMyPools 
              ? "Try adjusting your search or filters" 
              : "Start by creating a new subscription pool or joining an existing one"}
          </p>
          {searchTerm || statusFilter !== 'All' || !showMyPools ? (
            <button 
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-200"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
                setShowMyPools(true);
              }}
            >
              Clear Filters
            </button>
          ) : (
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition duration-200 mx-auto">
              <Plus size={18} className="mr-2" />
              Create New Pool
            </button>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default PoolsPage;