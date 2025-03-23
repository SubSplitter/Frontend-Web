'use client'
// pages/pools.tsx
import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import DashboardLayout from '../components/layout/DashboardLayout';
import PoolCard from '../components/ui/PoolCard2';
import { Plus, Search, Filter, ArrowDown, Settings, Users } from 'lucide-react';
import { poolService } from '../services/poolService';
import { Pool } from '../types';

// Filter options
const filters = {
  status: ['All', 'Active', 'Pending', 'Expired'],
  sortBy: ['Recently Updated', 'Price: Low to High', 'Price: High to Low', 'Expiring Soon']
};

const PoolsPage: NextPage = () => {
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Recently Updated');
  const [showMyPools, setShowMyPools] = useState(false);
  
  // Get user ID from session or local storage
  const getCurrentUserId = (): string => {
    // This would be replaced with actual auth logic
    return localStorage.getItem('userId') || '1';
  };
  
  // Fetch pools from the API
  useEffect(() => {
    const fetchPools = async () => {
      try {
        setLoading(true);
        const data = await poolService.getAllPools();
        setPools(data);
      } catch (err) {
        console.error('Error fetching pools:', err);
        setError('Failed to load subscription pools. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPools();
  }, []);
  
  // Handle joining a pool
  const handleJoinPool = async (poolId: string) => {
    try {
      // No need for direct API call here as it's now handled by the modal
      // Just refresh the pools list after successful join
      setLoading(true);
      const data = await poolService.getAllPools();
      setPools(data);
      setLoading(false);
    } catch (err) {
      console.error('Error refreshing pools:', err);
      setError('Failed to refresh pool list. Please reload the page.');
      setLoading(false);
    }
  };
  
  // Handle creating a new pool
  const handleCreatePool = () => {
    window.location.href = '/pools/create-pool'; // Redirect to pool creation page
  };
  
  // Handle leaving a pool
  const handleLeavePool = async (poolId: string) => {
    try {
      await poolService.leavePool(poolId);
      // Refresh the pools list
      const data = await poolService.getAllPools();
      setPools(data);
    } catch (err) {
      console.error('Error leaving pool:', err);
      setError('Failed to leave pool. Please try again later.');
    }
  };
  
  // Filter and sort pools
  const filteredPools = pools.filter(pool => {
    const matchesSearch = pool.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || pool.status === statusFilter.toLowerCase();
    const currentUserId = getCurrentUserId();
    const matchesUserFilter = !showMyPools || pool.members.some(member => member.id === currentUserId);
    
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
    return new Date(b.lastPayment || b.expiresAt).getTime() - new Date(a.lastPayment || a.expiresAt).getTime();
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
        
        <button 
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition duration-200"
          onClick={handleCreatePool}
        >
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
      
      {/* Loading State */}
      {loading && (
        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Users size={24} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Loading pools...</h3>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <Users size={24} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-red-400">Error</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-200"
            onClick={() => {
              setError(null);
              setLoading(true);
              poolService.getAllPools()
                .then(data => {
                  setPools(data);
                  setLoading(false);
                })
                .catch(err => {
                  console.error('Error retrying pools fetch:', err);
                  setError('Failed to load subscription pools. Please try again later.');
                  setLoading(false);
                });
            }}
          >
            Retry
          </button>
        </div>
      )}
      
      {/* Pools Grid */}
      {!loading && !error && sortedPools.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedPools.map(pool => (
            <PoolCard 
              key={pool.id} 
              pool={pool} 
              onJoin={() => handleJoinPool(pool.id)}
              onLeave={() => handleLeavePool(pool.id)}
              currentUserId={getCurrentUserId()}
              onClick={() => {
                // Handle click to view pool details
                window.location.href = `/pools/${pool.id}`;
              }}
            />
          ))}
        </div>
      )}
      
      {/* Empty State */}
      {!loading && !error && sortedPools.length === 0 && (
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
              }
            }
            >
              Clear Filters
            </button>
          ) : (
            <button 
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition duration-200 mx-auto"
              onClick={handleCreatePool}
            >
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