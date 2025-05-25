'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import DashboardLayout from '../components/layout/DashboardLayout';
import PoolCard from '../components/ui/PoolCard2';
import { Loader, Search, UsersRound, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { poolService } from '../services/poolService';

// Types for joined pools
interface JoinedPool {
  poolId: string;
  name: string;
  serviceId: string;
  slotsTotal: number;
  slotsAvailable: number;
  costPerSlot: string;
  membershipId?: string;
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
  const [createdPools, setCreatedPools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [createdPoolsLoading, setCreatedPoolsLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [createdScrollPosition, setCreatedScrollPosition] = useState(0);
  const [createdMaxScroll, setCreatedMaxScroll] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const createdScrollContainerRef = useRef<HTMLDivElement>(null);

  // Create a fetchUserPools function that can be reused
  const fetchUserPools = useCallback(async () => {
    try {
      setLoading(true);
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
    } catch (error) {
      console.error("Error fetching user pools:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a fetchCreatedPools function to get pools created by the user
  const fetchCreatedPools = useCallback(async () => {
    try {
      setCreatedPoolsLoading(true);
      const pools = await poolService.getCreatedPools();
      setCreatedPools(pools);
    } catch (error) {
      console.error("Error fetching created pools:", error);
    } finally {
      setCreatedPoolsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserPools();
    fetchCreatedPools();
  }, [fetchUserPools, fetchCreatedPools]);

  useEffect(() => {
    // Update max scroll value when container loads or resizes
    const updateMaxScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        setMaxScroll(container.scrollWidth - container.clientWidth);
      }
      
      if (createdScrollContainerRef.current) {
        const container = createdScrollContainerRef.current;
        setCreatedMaxScroll(container.scrollWidth - container.clientWidth);
      }
    };

    // Set initial maxScroll after component mounts
    updateMaxScroll();

    // Add resize listener
    window.addEventListener('resize', updateMaxScroll);
    
    // Add scroll listener to track position for joined pools
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setScrollPosition(scrollContainerRef.current.scrollLeft);
      }
    };
    
    // Add scroll listener to track position for created pools
    const handleCreatedScroll = () => {
      if (createdScrollContainerRef.current) {
        setCreatedScrollPosition(createdScrollContainerRef.current.scrollLeft);
      }
    };
    
    const container = scrollContainerRef.current;
    const createdContainer = createdScrollContainerRef.current;
    
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    
    if (createdContainer) {
      createdContainer.addEventListener('scroll', handleCreatedScroll);
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateMaxScroll);
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      if (createdContainer) {
        createdContainer.removeEventListener('scroll', handleCreatedScroll);
      }
    };
  }, [joinedPools, createdPools]);

  // Handle scroll buttons for joined pools
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

  // Handle scroll buttons for created pools
  const scrollCreatedLeft = () => {
    if (createdScrollContainerRef.current) {
      createdScrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollCreatedRight = () => {
    if (createdScrollContainerRef.current) {
      createdScrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  // Add the scrollToIndex function for joined pools
  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Approximate width of a card + margin
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  // Add scrollToIndex function for created pools
  const scrollCreatedToIndex = (index: number) => {
    if (createdScrollContainerRef.current) {
      const cardWidth = 320; // Approximate width of a card + margin
      createdScrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  // Handle callback when a user leaves a pool
  const handlePoolLeave = useCallback(() => {
    console.log("Pool left successfully, refreshing pools list");
    fetchUserPools(); // Refresh the pools list
  }, [fetchUserPools]);

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
      isUserMember: true,
      membershipId: pool.membershipId,
      isCreator: false
    };
  });

  // Add isCreator: true to created pools
  const transformedCreatedPools = createdPools.map(pool => ({
    ...pool,
    isCreator: true
  }));

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | SubSplitter</title>
      </Head>
      
      {/* Pools Created by You */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Pools You Created</h2>
          <button 
            onClick={() => window.location.href = '/pools/create-pool'}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm py-1.5 px-3 rounded-md flex items-center transition duration-200"
          >
            <Plus size={16} className="mr-1.5" />
            New Pool
          </button>
        </div>
        
        {createdPoolsLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader size={32} className="text-purple-500 animate-spin mb-4" />
            <p className="text-gray-400">Loading your created pools...</p>
          </div>
        ) : transformedCreatedPools.length === 0 ? (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <UsersRound size={24} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Pools Created Yet</h3>
            <p className="text-gray-400 mb-4">
              Create your own subscription pools to share with others and split the costs.
            </p>
            <button 
              onClick={() => window.location.href = '/create-pool'}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition duration-200 mx-auto">
              <Plus size={16} className="mr-2" />
              Create New Pool
            </button>
          </div>
        ) : (
          <div className="relative">
            <div 
              ref={createdScrollContainerRef}
              className="flex overflow-x-auto pb-4 scrollbar-hide snap-x scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {transformedCreatedPools.map(pool => (
                <div key={pool.id} className="flex-none w-80 mr-4 snap-start">
                  <PoolCard 
                    pool={pool}
                    onLeave={handlePoolLeave}
                  />
                </div>
              ))}
              <div className="flex-none w-4"></div>
            </div>
            
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {transformedCreatedPools.length > 1 && (
              <div className="flex items-center justify-center mt-6 gap-4">
                <button 
                  onClick={scrollCreatedLeft}
                  disabled={createdScrollPosition <= 0}
                  className={`h-8 w-8 rounded-full flex items-center justify-center transition ${
                    createdScrollPosition > 0 
                      ? 'bg-purple-600 dark:bg-purple-700 text-white dark:text-white hover:bg-purple-700 dark:hover:bg-purple-600' 
                      : 'bg-gray-600 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  }`}
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={18} />
                </button>
                
                <div className="flex items-center gap-1.5">
                  {transformedCreatedPools.map((_, index) => {
                    const cardWidth = 320;
                    const isActive = 
                      createdScrollPosition >= (index * cardWidth) - cardWidth/2 && 
                      createdScrollPosition < ((index + 1) * cardWidth) - cardWidth/2;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => scrollCreatedToIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isActive 
                            ? 'w-6 bg-purple-500' 
                            : 'w-2 bg-gray-600 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                        }`}
                        aria-label={`Go to created pool ${index + 1}`}
                      />
                    );
                  })}
                </div>
                
                <button 
                  onClick={scrollCreatedRight}
                  disabled={createdScrollPosition >= createdMaxScroll}
                  className={`h-8 w-8 rounded-full flex items-center justify-center transition ${
                    createdScrollPosition < createdMaxScroll 
                      ? 'bg-purple-700 dark:bg-gray-700 text-white dark:text-white hover:bg-purple-700 dark:hover:bg-gray-600' 
                      : 'bg-gray-600 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
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
      
      {/* Your Joined Pools */}
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
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <UsersRound size={24} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Subscription Pools Joined</h3>
            <p className="text-gray-400 mb-4">
              Join subscription pools to share costs and access premium content with other members.
            </p>
            <button 
              onClick={() => window.location.href = '/pools'}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition duration-200 mx-auto">
              <Search size={16} className="mr-2" />
              Browse Available Pools
            </button>
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
                  <PoolCard 
                    pool={pool} 
                    onLeave={handlePoolLeave}
                  />
                </div>
              ))}
              <div className="flex-none w-4"></div>
            </div>
            
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {transformedPools.length > 1 && (
              <div className="flex items-center justify-center mt-6 gap-4">
                <button 
                  onClick={scrollLeft}
                  disabled={scrollPosition <= 0}
                  className={`h-8 w-8 rounded-full flex items-center justify-center transition ${
                    scrollPosition > 0 
                      ? 'bg-purple-600 dark:bg-purple-700 text-white dark:text-white hover:bg-purple-700 dark:hover:bg-purple-600' 
                      : 'bg-gray-600 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  }`}
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={18} />
                </button>
                
                <div className="flex items-center gap-1.5">
                  {transformedPools.map((_, index) => {
                    const cardWidth = 320;
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
                            : 'w-2 bg-gray-600 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                        }`}
                        aria-label={`Go to pool ${index + 1}`}
                      />
                    );
                  })}
                </div>
                
                <button 
                  onClick={scrollRight}
                  disabled={scrollPosition >= maxScroll}
                  className={`h-8 w-8 rounded-full flex items-center justify-center transition ${
                    scrollPosition < maxScroll 
                      ? 'bg-purple-700 dark:bg-gray-700 text-white dark:text-white hover:bg-purple-700 dark:hover:bg-gray-600' 
                      : 'bg-gray-600 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
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
    </DashboardLayout>
  );
};

export default Dashboard;