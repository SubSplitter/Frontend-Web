// app/pool/[id]/page.tsx
'use client';
// pages/pools/[service].tsx
import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter, useParams } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';
import DashboardLayout from '../../components/layout/DashboardLayout';
import PoolCard from '../../components/ui/PoolCard';
import DataTable from '../../components/ui/DataTable';
import { Users, Percent, Calendar, AlertCircle, Filter, Plus, Clock } from 'lucide-react';

// Mock data for service details
const serviceDetails = {
  'netflix': {
    id: 'netflix',
    name: 'Netflix',
    logo: '/assets/logos/netflix.svg',
    color: '#E50914',
    description: 'Premium streaming service with movies, TV shows, and more.',
    plans: [
      { id: 'basic', name: 'Basic', price: 9.99, description: 'Good video quality in SD (480p).' },
      { id: 'standard', name: 'Standard', price: 15.49, description: 'Better video quality in Full HD (1080p).' },
      { id: 'premium', name: 'Premium', price: 19.99, description: 'Best video quality in Ultra HD (4K) and HDR.' }
    ]
  },
  'spotify': {
    id: 'spotify',
    name: 'Spotify',
    logo: '/assets/logos/spotify.svg',
    color: '#1DB954',
    description: 'Music streaming with millions of songs and podcasts.',
    plans: [
      { id: 'individual', name: 'Individual', price: 9.99, description: 'Ad-free music listening for 1 account.' },
      { id: 'duo', name: 'Duo', price: 12.99, description: '2 Premium accounts for a couple under one roof.' },
      { id: 'family', name: 'Family', price: 15.99, description: '6 Premium accounts for family members living under one roof.' }
    ]
  }
};

// Mock data for pools
const servicePools = {
  'netflix': [
    {
      id: '1',
      serviceName: 'Netflix',
      serviceLogo: '/assets/logos/netflix.svg',
      serviceColor: '#E50914',
      plan: 'Premium',
      totalCost: 19.99,
      splitCost: 4.99,
      members: [
        { id: '1', name: 'Alice Johnson', isPrimary: true },
        { id: '2', name: 'Bob Williams' },
        { id: '3', name: 'Chris Moore' },
        { id: '4', name: 'David Lee' }
      ],
      capacity: 4,
      expiresAt: '2025-04-15T00:00:00Z',
      createdAt: '2024-10-15T00:00:00Z',
      status: 'active'
    },
    {
      id: '2',
      serviceName: 'Netflix',
      serviceLogo: '/assets/logos/netflix.svg',
      serviceColor: '#E50914',
      plan: 'Premium',
      totalCost: 19.99,
      splitCost: 5.00,
      members: [
        { id: '5', name: 'Eva Brown', isPrimary: true },
        { id: '6', name: 'Frank Miller' },
        { id: '7', name: 'Grace Wilson' }
      ],
      capacity: 4,
      expiresAt: '2025-03-28T00:00:00Z',
      createdAt: '2024-11-28T00:00:00Z',
      status: 'active'
    },
    {
      id: '3',
      serviceName: 'Netflix',
      serviceLogo: '/assets/logos/netflix.svg',
      serviceColor: '#E50914',
      plan: 'Standard',
      totalCost: 15.49,
      splitCost: 5.16,
      members: [
        { id: '8', name: 'Hannah Clark', isPrimary: true },
        { id: '9', name: 'Ian Lewis' },
        { id: '10', name: 'Jane Adams' }
      ],
      capacity: 3,
      expiresAt: '2025-04-05T00:00:00Z',
      createdAt: '2024-09-05T00:00:00Z',
      status: 'active'
    }
  ],
  'spotify': [
    {
      id: '4',
      serviceName: 'Spotify',
      serviceLogo: '/assets/logos/spotify.svg',
      serviceColor: '#1DB954',
      plan: 'Family',
      totalCost: 15.99,
      splitCost: 2.67,
      members: [
        { id: '11', name: 'Kevin Rogers', isPrimary: true },
        { id: '12', name: 'Laura Phillips' },
        { id: '13', name: 'Mike Johnson' },
        { id: '14', name: 'Nancy Davis' },
        { id: '15', name: 'Oscar Thompson' },
        { id: '16', name: 'Pam White' }
      ],
      capacity: 6,
      expiresAt: '2025-03-10T00:00:00Z',
      createdAt: '2024-10-10T00:00:00Z',
      status: 'active'
    },
    {
      id: '5',
      serviceName: 'Spotify',
      serviceLogo: '/assets/logos/spotify.svg',
      serviceColor: '#1DB954',
      plan: 'Duo',
      totalCost: 12.99,
      splitCost: 6.50,
      members: [
        { id: '17', name: 'Quinn Martinez', isPrimary: true },
        { id: '18', name: 'Rachel Lee' }
      ],
      capacity: 2,
      expiresAt: '2025-04-22T00:00:00Z',
      createdAt: '2024-11-22T00:00:00Z',
      status: 'active'
    }
  ]
};

type FilterOption = 'all' | 'available' | 'full';

const ServicePools: NextPage = () => {
  const router = useRouter();
  const { service } = useParams();
  const [filter, setFilter] = useState<FilterOption>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  if (!service || !(service in serviceDetails)) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <AlertCircle size={48} className="text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Service Not Found</h1>
          <p className="text-gray-400 mb-6">The service you're looking for doesn't exist or is not available.</p>
          <button 
            onClick={() => router.push('/subscriptions')}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md transition duration-200"
          >
            Browse Services
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const currentService = serviceDetails[service];
  const pools = servicePools[service] || [];
  
  const filteredPools = filter === 'all' 
    ? pools 
    : filter === 'available' 
      ? pools.filter(pool => pool.members.length < pool.capacity)
      : pools.filter(pool => pool.members.length === pool.capacity);

  const tableColumns = [
    {
      header: 'Plan',
      accessor: (pool) => (
        <div className="flex items-center">
          <div className="h-8 w-8 relative rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center mr-3">
            <Image 
              src={pool.serviceLogo} 
              alt={pool.serviceName} 
              width={20} 
              height={20} 
            />
          </div>
          <div>
            <div className="font-medium">{pool.plan}</div>
            <div className="text-gray-400 text-xs">{pool.status === 'active' ? 'Active' : 'Inactive'}</div>
          </div>
        </div>
      ),
      width: '25%'
    },
    {
      header: 'Members',
      accessor: (pool) => (
        <div className="flex items-center">
          <Users size={16} className="text-gray-400 mr-2" />
          <span>{pool.members.length}/{pool.capacity}</span>
        </div>
      ),
      width: '15%'
    },
    {
      header: 'Cost',
      accessor: (pool) => (
        <div>
          <div className="font-medium">${pool.splitCost.toFixed(2)}</div>
          <div className="text-gray-400 text-xs">
            <span className="text-green-400">
              <Percent size={12} className="inline mr-1" />
              {((1 - pool.splitCost / pool.totalCost) * 100).toFixed(0)}% saved
            </span>
          </div>
        </div>
      ),
      width: '20%'
    },
    {
      header: 'Renewal',
      accessor: (pool) => (
        <div className="flex items-center">
          <Calendar size={16} className="text-gray-400 mr-2" />
          <span>{new Date(pool.expiresAt).toLocaleDateString()}</span>
        </div>
      ),
      width: '20%'
    },
    {
      header: 'Created',
      accessor: (pool) => (
        <div className="flex items-center">
          <Clock size={16} className="text-gray-400 mr-2" />
          <span>{new Date(pool.createdAt).toLocaleDateString()}</span>
        </div>
      ),
      width: '20%'
    }
  ];

  return (
    <DashboardLayout>
      <Head>
        <title>{currentService.name} Pools | SubSplitter</title>
      </Head>
      
      {/* Service Header */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-start md:items-center">
        <div className="h-16 w-16 relative rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center mb-4 md:mb-0 md:mr-6" style={{ backgroundColor: currentService.color + '20' }}>
          <Image 
            src={currentService.logo} 
            alt={currentService.name} 
            width={40} 
            height={40} 
          />
        </div>
        
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1">{currentService.name} Pools</h1>
          <p className="text-gray-400">{currentService.description}</p>
        </div>
        
        <button 
          onClick={() => setShowCreateModal(true)}
          className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center transition duration-200"
        >
          <Plus size={16} className="mr-2" />
          Create Pool
        </button>
      </div>
      
      {/* Filter Options */}
      <div className="flex items-center mb-6">
        <div className="text-gray-400 mr-4 flex items-center">
          <Filter size={16} className="mr-2" />
          <span>Filter:</span>
        </div>
        
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-md text-sm ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setFilter('all')}
          >
            All Pools
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm ${filter === 'available' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setFilter('available')}
          >
            Available
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm ${filter === 'full' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setFilter('full')}
          >
            Full
          </button>
        </div>
      </div>
      
      {/* Mobile View: Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:hidden">
        {filteredPools.map(pool => (
          <PoolCard key={pool.id} pool={pool} />
        ))}
      </div>
      
      {/* Desktop View: Table */}
      <div className="hidden md:block">
        <DataTable 
          columns={tableColumns}
          data={filteredPools}
          keyExtractor={(pool) => pool.id}
          onRowClick={(pool) => {/* Handle pool click */}}
          emptyMessage={
            filter === 'all' 
              ? "No pools available for this service" 
              : filter === 'available' 
                ? "No available pools found" 
                : "No full pools found"
          }
        />
      </div>
      
      {/* Plans Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Available Plans</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentService.plans.map(plan => (
            <div key={plan.id} className="bg-gray-800 rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="text-xl font-bold">${plan.price.toFixed(2)}<span className="text-sm text-gray-400">/mo</span></div>
              </div>
              
              <p className="text-gray-400 text-sm mb-5">{plan.description}</p>
              
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition duration-200">
                <Plus size={16} className="mr-2" />
                Create Pool
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ServicePools;