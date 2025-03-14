// pages/subscriptions.tsx
'use client'
import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import DashboardLayout from '../components/layout/DashboardLayout';
import SubscriptionCard from '../components/ui/SubscriptionCard2';
import { Search, Filter, Grid, List } from 'lucide-react';

// Mock data for available subscription services
const services = [
  {
    id: '1',
    name: 'Netflix',
    logo: '/assets/logos/netflix.svg',
    price: 15.99,
    description: 'Premium streaming service with movies, TV shows, and more.',
    color: '#E50914',
    category: 'Entertainment',
    activePools: 8
  },
  {
    id: '2',
    name: 'Spotify',
    logo: '/assets/logos/spotify.svg',
    price: 9.99,
    description: 'Music streaming with millions of songs and podcasts.',
    color: '#1DB954',
    category: 'Music',
    activePools: 12
  },
  {
    id: '3',
    name: 'Disney+',
    logo: '/assets/logos/disneyplus.svg',
    price: 8.99,
    description: 'Stream Disney, Marvel, Star Wars, and more.',
    color: '#0063E5',
    category: 'Entertainment',
    activePools: 6
  },
  {
    id: '4',
    name: 'HBO Max',
    logo: '/assets/logos/hbomax.svg',
    price: 14.99,
    description: 'Streaming platform for HBO content, movies, and exclusives.',
    color: '#5822B4',
    category: 'Entertainment',
    activePools: 5
  },
  {
    id: '5',
    name: 'YouTube Premium',
    logo: '/assets/logos/youtube.svg',
    price: 11.99,
    description: 'Ad-free videos, background play, and YouTube Music.',
    color: '#FF0000',
    category: 'Entertainment',
    activePools: 7
  },
  {
    id: '6',
    name: 'Amazon Prime',
    logo: '/assets/logos/amazon.svg',
    price: 14.99,
    description: 'Prime Video, free shipping, and more Amazon benefits.',
    color: '#00A8E1',
    category: 'Shopping & Entertainment',
    activePools: 4
  },
  {
    id: '7',
    name: 'Apple TV+',
    logo: '/assets/logos/appletv.svg',
    price: 6.99,
    description: 'Original shows and movies from Apple.',
    color: '#000000',
    category: 'Entertainment',
    activePools: 3
  },
  {
    id: '8',
    name: 'Apple Music',
    logo: '/assets/logos/applemusic.svg',
    price: 9.99,
    description: 'Music streaming service by Apple.',
    color: '#FA243C',
    category: 'Music',
    activePools: 6
  },
  {
    id: '9',
    name: 'Adobe Creative Cloud',
    logo: '/assets/logos/adobe.svg',
    price: 52.99,
    description: 'Complete suite of Adobe creative apps and services.',
    color: '#FF0000',
    category: 'Productivity',
    activePools: 10
  }
];

// Categories for filtering
const categories = ['All', 'Entertainment', 'Music', 'Shopping & Entertainment', 'Productivity'];

const SubscriptionsPage: NextPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter services based on search term and category
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
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
      
      {/* Subscriptions Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
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
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default SubscriptionsPage;