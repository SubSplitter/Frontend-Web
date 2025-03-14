// pages/dashboard.tsx
import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatsCard from '../components/ui/StatsCard';
import SubscriptionCard from '../components/ui/SubscriptionCard';
import PoolCard from '../components/ui/PoolCard';
import { CreditCard, DollarSign, Users, ArrowUpRight } from 'lucide-react';

// Mock data
const subscriptions = [
  {
    id: '1',
    name: 'Netflix',
    logo: '/assets/logos/netflix.svg',
    price: 15.99,
    description: 'Premium streaming service with movies, TV shows, and more.',
    color: '#E50914',
    activePools: 3
  },
  {
    id: '2',
    name: 'Spotify',
    logo: '/assets/logos/spotify.svg',
    price: 9.99,
    description: 'Music streaming with millions of songs and podcasts.',
    color: '#1DB954',
    activePools: 5
  },
  {
    id: '3',
    name: 'Disney+',
    logo: '/assets/logos/disneyplus.svg',
    price: 8.99,
    description: 'Stream Disney, Marvel, Star Wars, and more.',
    color: '#0063E5',
    activePools: 2
  }
];

const pools = [
  {
    id: '1',
    serviceName: 'Netflix',
    serviceLogo: '/assets/logos/netflix.svg',
    serviceColor: '#E50914',
    totalCost: 15.99,
    splitCost: 3.99,
    members: [
      { id: '1', name: 'John Smith', isPrimary: true },
      { id: '2', name: 'Alice Johnson' },
      { id: '3', name: 'Bob Williams' },
      { id: '4', name: 'Emma Davis' }
    ],
    capacity: 5,
    expiresAt: '2025-04-15T00:00:00Z'
  },
  {
    id: '2',
    serviceName: 'Spotify',
    serviceLogo: '/assets/logos/spotify.svg',
    serviceColor: '#1DB954',
    totalCost: 14.99,
    splitCost: 3.75,
    members: [
      { id: '1', name: 'John Smith' },
      { id: '2', name: 'Alice Johnson', isPrimary: true },
      { id: '3', name: 'Chris Moore' },
      { id: '5', name: 'David Lee' }
    ],
    capacity: 6,
    expiresAt: '2025-03-28T00:00:00Z'
  }
];

const Dashboard: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | SubSplitter</title>
      </Head>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Welcome back, John</h1>
        <p className="text-gray-400">Here's what's happening with your subscriptions</p>
      </div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Total Subscriptions"
          value={5}
          icon={<CreditCard size={20} />}
          description="Across 3 services"
        />
        <StatsCard 
          title="Monthly Spending"
          value="$27.48"
          trend={{ value: 15, isPositive: false }}
          icon={<DollarSign size={20} />}
          description="vs. $32.48 last month"
        />
        <StatsCard 
          title="Active Pools"
          value={2}
          icon={<Users size={20} />}
          description="4 members on average"
        />
        <StatsCard 
          title="Total Saved"
          value="$142.68"
          trend={{ value: 8, isPositive: true }}
          icon={<ArrowUpRight size={20} />}
          description="Lifetime savings"
        />
      </div>
      
      {/* Active Pools */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Your Active Pools</h2>
          <button className="text-purple-500 text-sm hover:text-purple-400 transition">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pools.map(pool => (
            <PoolCard key={pool.id} pool={pool} />
          ))}
        </div>
      </div>
      
      {/* Popular Subscriptions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Popular Subscriptions</h2>
          <button className="text-purple-500 text-sm hover:text-purple-400 transition">
            Browse All
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map(subscription => (
            <SubscriptionCard key={subscription.id} service={subscription} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;