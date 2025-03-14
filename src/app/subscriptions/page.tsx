// pages/subscriptions.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import DashboardLayout from '../components/layout/DashboardLayout';
import SubscriptionCard from '../components/ui/SubscriptionCard';
import { Search, Filter, Grid, List, Loader } from 'lucide-react';

// Define interfaces for the backend and frontend data structures
interface BackendSubscriptionService {
  serviceId: string;
  name: string;
  description: string;
  monthlyCost: string;
  regionsAvailable: string[];
  createdAt: string;
  updatedAt: string;
}

// Frontend interface remains the same
interface SubscriptionService {
  id: string;
  name: string;
  logo: string;
  price: number;
  description: string;
  color: string;
  category: string;
  activePools: number;
}

// Categories for filtering
const categories = ['All', 'Entertainment', 'Music', 'Shopping & Entertainment', 'Productivity'];

const SubscriptionsPage: NextPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [services, setServices] = useState<SubscriptionService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Helper function to generate consistent colors based on service name
  const getServiceColor = (name: string): string => {
    // Simple hash function to generate consistent colors
    const hash = Array.from(name).reduce(
      (acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0
    );
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  // Helper function to assign categories based on service name
  const determineCategory = (name: string): string => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('netflix') || nameLower.includes('hulu') || 
        nameLower.includes('youtube') || nameLower.includes('disney')) {
      return 'Entertainment';
    } else if (nameLower.includes('spotify') || nameLower.includes('music') || 
              nameLower.includes('apple music')) {
      return 'Music';
    } else if (nameLower.includes('amazon') || nameLower.includes('prime')) {
      return 'Shopping & Entertainment';
    } else {
      return 'Productivity';
    }
  };

  // Helper function to generate consistent but random-looking number of active pools
  const getRandomActivePools = (name: string): number => {
    // Create a deterministic but seemingly random number based on the name
    const hash = Array.from(name).reduce(
      (acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0
    );
    return (hash % 15) + 1; // 1-15 active pools
  };

  // Transform backend data to frontend format
  const transformBackendData = (backendData: BackendSubscriptionService[]): SubscriptionService[] => {
    return backendData.map(service => ({
      logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(service.name)}&background=${getServiceColor(service.name).replace('#', '')}&color=fff`,
      
      id: service.serviceId,
      name: service.name,
      logo: service.name.substring(0, 2), // Placeholder for logo
      price: parseFloat(service.monthlyCost),
      description: service.description,
      color: getServiceColor(service.name),
      category: determineCategory(service.name),
      activePools: getRandomActivePools(service.name),
    }));
  };

  // Fetch subscription services from API
  useEffect(() => {
    const fetchSubscriptionServices = async () => {
      try {
        setLoading(true);
        // Fetch directly from your backend API
        const response = await fetch('http://localhost:3001/api/subscription-services');
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const backendData: BackendSubscriptionService[] = await response.json();
        
        // Transform data to match frontend interface
        const transformedServices = transformBackendData(backendData);
        setServices(transformedServices);
        setLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(`Error loading subscription services: ${errorMessage}`);
        setLoading(false);
        console.error('Error fetching subscription services:', err);
      }
    };

    fetchSubscriptionServices();
  }, []);

  // Filter services based on search term and category
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle filtering and search reset
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };
  
  return (
    <DashboardLayout>
      <Head>
        <title>Available Subscriptions | SubSplitter</title>
      </Head>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Available Subscriptions</h1>
        <p className="text-gray-400">Browse and join subscription pools</p>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search subscriptions..."
            className="w-full bg-gray-800 text-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        
        <div className="flex space-x-2">
          <div className="relative">
            <select
              className="appearance-none bg-gray-800 text-gray-200 rounded-md py-2 pl-10 pr-8 focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <Filter size={18} className="absolute left-3 top-2.5 text-gray-400" />
            <div className="absolute right-2 top-2.5 pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-md flex items-center">
            <button
              className={`p-2 ${viewMode === 'grid' ? 'text-purple-500' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
            >
              <Grid size={18} />
            </button>
            <button
              className={`p-2 ${viewMode === 'list' ? 'text-purple-500' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setViewMode('list')}
              aria-label="List View"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader size={32} className="text-purple-500 animate-spin" />
        </div>
      )}
      
      {/* Error state */}
      {error && !loading && (
        <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 text-center">
          <p className="text-red-400 mb-2">{error}</p>
          <button 
            className="bg-red-700 hover:bg-red-800 text-white py-1 px-4 rounded-md text-sm transition duration-200"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Subscriptions Grid/List */}
      {!loading && !error && (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <SubscriptionCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900 text-gray-400 text-left">
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Active Pools</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredServices.map(service => (
                    <tr key={service.id} className="hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 relative rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center mr-3">
                            <div 
                              style={{ 
                                backgroundColor: service.color,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {/* This would normally be an Image component */}
                              <span className="text-xs text-white font-bold">{service.name.substring(0, 2)}</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-gray-400 text-xs truncate max-w-xs">{service.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{service.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">${service.price.toFixed(2)}/mo</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{service.activePools}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded-md text-sm transition duration-200">
                          View Pools
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Empty state */}
          {filteredServices.length === 0 && (
            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No subscriptions found</h3>
              <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
              <button 
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-200"
                onClick={resetFilters}
              >
                Clear Filters
              </button>
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default SubscriptionsPage;