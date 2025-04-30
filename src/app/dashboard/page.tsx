// pages/dashboard.tsx
'use client';
import React, { useEffect, useState, useRef } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatsCard from '../components/ui/StatsCard';
import SubscriptionCard from '../components/ui/SubscriptionCard';
import PoolCard from '../components/ui/PoolCard2';
import { CreditCard, DollarSign, Users, ArrowUpRight, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
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
  const [popularServices, setPopularServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalMonthlySpending, setTotalMonthlySpending] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserPools = async () => {
      try {
        const pools = await poolService.getUserPools();
        
        // Fetch service info for each pool if not already included
        const enrichedPools = await Promise.all(pools.map(async (pool) => {
          if (!pool.serviceName || !pool.serviceLogoUrl) {
            try {
              const serviceInfo = await poolService.getServiceInfo(pool.serviceId);
              return {
                ...pool,
                serviceName: serviceInfo.name,
                serviceLogoUrl: serviceInfo.logoUrl
              };
            } catch (error) {
              console.error(`Error fetching service info for pool ${pool.poolId}:`, error);
              return pool;
            }
          }
          return pool;
        }));
        
        setJoinedPools(enrichedPools);
        
        // Calculate total monthly spending
        const total = enrichedPools.reduce((sum, pool) => {
          return sum + parseFloat(pool.costPerSlot);
        }, 0);
        setTotalMonthlySpending(total);
      } catch (error) {
        console.error("Error fetching user pools:", error);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchPopularServices = async () => {
      try {
        // In a real scenario, you would fetch this from your API
        // For now, using the mock data but structuring it as if from an API
        setPopularServices([
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
        ]);
      } catch (error) {
        console.error("Error fetching popular services:", error);
      }
    };
    
    fetchUserPools();
    fetchPopularServices();
  }, []);

  useEffect(() => {
    // Update max scroll value when container loads or resizes
    const updateMaxScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        setMaxScroll(container.scrollWidth - container.clientWidth);
      }
    };

    // Set initial maxScroll after component mounts
    updateMaxScroll();

    // Add resize listener
    window.addEventListener('resize', updateMaxScroll);
    
    // Add scroll listener to track position
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setScrollPosition(scrollContainerRef.current.scrollLeft);
      }
    };
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateMaxScroll);
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [joinedPools]);

  // Handle scroll buttons
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  // Transform joined pools to match PoolCard props
  const transformedPools = joinedPools.map(pool => {
    // Use the service color from our mapping, or default to purple
    const serviceColor = serviceColors[pool.serviceName || ''] || '#6366f1';
    
    // Calculate expiration date (1 month from join date)
    const joinDate = new Date(pool.membershipStatus?.joinedAt || new Date());
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
      slotsAvailable: pool.slotsAvailable || 0,
      expiresAt: expiresDate.toISOString(),
      status: pool.membershipStatus?.accessStatus === 'active' ? 'active' : 'pending',
      isUserMember: true 
    };
  });

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | SubSplitter</title>
      </Head>
      
      {/* <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Welcome back, John</h1>
        <p className="text-gray-400">Here's what's happening with your subscriptions</p>
      </div> */}
      
      {/* Stats Row */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          value={joinedPools.filter(p => p.membershipStatus?.accessStatus === 'active').length}
          icon={<Users size={20} />}
          description={`${joinedPools.length - joinedPools.filter(p => p.membershipStatus?.accessStatus === 'active').length} pending`}
        />
        <StatsCard 
          title="Total Saved"
          value="$142.68"
          trend={{ value: 8, isPositive: true }}
          icon={<ArrowUpRight size={20} />}
          description="Lifetime savings"
        />
      </div> */}
      
      {/* Joined Pools - Horizontal Sliding Layout */}
{/* Joined Pools - Horizontal Sliding Layout */}
<div className="mb-8">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-bold">Your Joined Pools</h2>
  </div>
  
  {loading ? (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader size={32} className="text-purple-500 animate-spin mb-4" />
      <p className="text-gray-400">Loading subscription pools...</p>
    </div>
  ) : joinedPools.length === 0 ? (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex flex-col items-center">
        <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full mb-4">
          <UsersRound size={32} className="text-purple-500 dark:text-purple-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">No Subscription Pools Joined</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
          Join subscription pools to share costs and access premium content with other members.
        </p>
        <button className="bg-purple-500 hover:bg-purple-600 text-white font-medium px-6 py-2.5 rounded-lg transition shadow-sm hover:shadow flex items-center gap-2">
          <Search size={16} />
          Browse Available Pools
        </button>
      </div>
    </div>
  ) : (
    <div className="relative">
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-4 scrollbar-hide snap-x scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {transformedPools.map(pool => (
          <div key={pool.id} className="flex-none w-80 mr-4 snap-start">
            <PoolCard pool={pool} />
          </div>
        ))}
        {/* Add an empty div at the end for better scrolling */}
        <div className="flex-none w-4"></div>
      </div>
      
      {/* Add CSS for hiding scrollbar in different browsers */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Navigation controls and progress indicators moved to bottom */}
      {transformedPools.length > 1 && (
        <div className="flex items-center justify-center mt-6 gap-4">
          {/* Left scroll button */}
          <button 
            onClick={scrollLeft}
            disabled={scrollPosition <= 0}
            className={`h-8 w-8 rounded-full flex items-center justify-center transition ${
              scrollPosition > 0 
                ? 'bg-purple-100 dark:bg-gray-700 text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-gray-600' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          
          {/* Progress indicators */}
          <div className="flex items-center gap-1.5">
            {transformedPools.map((_, index) => {
              // Calculate if this indicator represents the current visible card
              const cardWidth = 320; // Approximate width of a card + margin
              const isActive = 
                scrollPosition >= (index * cardWidth) - cardWidth/2 && 
                scrollPosition < ((index + 1) * cardWidth) - cardWidth/2;
              
              return (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'w-6 bg-purple-500' 
                      : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                  }`}
                  aria-label={`Go to pool ${index + 1}`}
                />
              );
            })}
          </div>
          
          {/* Right scroll button */}
          <button 
            onClick={scrollRight}
            disabled={scrollPosition >= maxScroll}
            className={`h-8 w-8 rounded-full flex items-center justify-center transition ${
              scrollPosition < maxScroll 
                ? 'bg-purple-100 dark:bg-gray-700 text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-gray-600' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  )}
</div>
      
      {/* Popular Subscriptions */}
      {/* <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Popular Subscriptions</h2>
          <button className="text-purple-500 text-sm hover:text-purple-400 transition">
            Browse All
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularServices.map(service => (
            <SubscriptionCard key={service.id} service={service} />
          ))}
        </div>
      </div> */}
    </DashboardLayout>
  );
};

export default Dashboard;