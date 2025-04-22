// pages/dashboard.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatsCard from '../components/ui/StatsCard';
import SubscriptionCard from '../components/ui/SubscriptionCard';
import PoolCard from '../components/ui/PoolCard2';
import { CreditCard, DollarSign, Users, ArrowUpRight } from 'lucide-react';
import { poolService } from '../services/poolService';

// Types for joined pools
interface JoinedPool {
  poolId: string;
  name: string;
  serviceId: string;
  slotsTotal: number;
  slotsAvailable: number;
  costPerSlot: string;
  membershipStatus: {
    paymentStatus: string;
    accessStatus: string;
    joinedAt: string;
  };
  serviceName?: string;
  serviceLogoUrl?: string;
}

// Mock data for subscriptions
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

// Service color mapping
const serviceColors: Record<string, string> = {
  'Netflix': '#E50914',
  'Spotify': '#1DB954',
  'Disney+': '#0063E5',
  'Amazon Prime': '#FF9900',
  'YouTube Premium': '#FF0000',
  'HBO Max': '#5822B4',
  'Apple TV+': '#000000',
};

const Dashboard: NextPage = () => {
  const [joinedPools, setJoinedPools] = useState<JoinedPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalMonthlySpending, setTotalMonthlySpending] = useState(0);

  useEffect(() => {
    const fetchUserPools = async () => {
      try {
        const pools = await poolService.getUserPools();
        setJoinedPools(pools);
        
        // Calculate total monthly spending
        const total = pools.reduce((sum, pool) => {
          return sum + parseFloat(pool.costPerSlot);
        }, 0);
        setTotalMonthlySpending(total);
      } catch (error) {
        console.error("Error fetching user pools:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserPools();
  }, []);

  // Transform joined pools to match PoolCard props
  const transformedPools = joinedPools.map(pool => {
    // Use the service color from our mapping, or default to purple
    const serviceColor = serviceColors[pool.serviceName || ''] || '#6366f1';
    
    // Calculate expiration date (1 month from join date)
    const joinDate = new Date(pool.membershipStatus.joinedAt);
    const expiresDate = new Date(joinDate);
    expiresDate.setMonth(joinDate.getMonth() + 1);
    
    // Create default members array with current user as member
    const members = [
      { id: '1', name: 'You', isPrimary: false },
      // Add placeholder members for visualization
      { id: '2', name: 'Primary Owner', isPrimary: true }
    ];
    
    // Add more placeholder members based on slots used
    const slotsUsed = pool.slotsTotal - pool.slotsAvailable;
    if (slotsUsed > 2) {
      for (let i = 3; i <= slotsUsed; i++) {
        members.push({ id: `${i}`, name: `Member ${i-1}`, isPrimary: false });
      }
    }
    
    return {
      id: pool.poolId,
      serviceName: pool.serviceName || 'Subscription Service',
      serviceLogo: pool.serviceLogoUrl || '/assets/logos/default.svg',
      serviceColor: serviceColor,
      totalCost: parseFloat(pool.costPerSlot) * pool.slotsTotal,
      splitCost: parseFloat(pool.costPerSlot),
      members: members,
      capacity: pool.slotsTotal,
      expiresAt: expiresDate.toISOString(),
      status: pool.membershipStatus.accessStatus === 'active' ? 'active' : 'pending'
    };
  });

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
          value={joinedPools.length}
          icon={<CreditCard size={20} />}
          description={`Across ${new Set(joinedPools.map(p => p.serviceName)).size} services`}
        />
        <StatsCard 
          title="Monthly Spending"
          value={`$${totalMonthlySpending.toFixed(2)}`}
          trend={{ value: 15, isPositive: false }}
          icon={<DollarSign size={20} />}
          description="vs. $32.48 last month"
        />
        <StatsCard 
          title="Active Pools"
          value={joinedPools.filter(p => p.membershipStatus.accessStatus === 'active').length}
          icon={<Users size={20} />}
          description={`${joinedPools.length - joinedPools.filter(p => p.membershipStatus.accessStatus === 'active').length} pending`}
        />
        <StatsCard 
          title="Total Saved"
          value="$142.68"
          trend={{ value: 8, isPositive: true }}
          icon={<ArrowUpRight size={20} />}
          description="Lifetime savings"
        />
      </div>
      
      {/* Joined Pools */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Your Joined Pools</h2>
          <button className="text-purple-500 text-sm hover:text-purple-400 transition">
            View All
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <p>Loading your subscription pools...</p>
          </div>
        ) : joinedPools.length === 0 ? (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">You haven't joined any subscription pools yet.</p>
            <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition">
              Browse Available Pools
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {transformedPools.map(pool => (
              <PoolCard key={pool.id} pool={pool} />
            ))}
          </div>
        )}
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