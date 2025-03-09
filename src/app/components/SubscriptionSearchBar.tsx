import React, { useState, useEffect } from 'react';
import { Search, X, TrendingUp, Users, Shield } from 'lucide-react';

// Sample subscription services data
const subscriptionServices = [
  { id: 1, name: 'Netflix', icon: '🎬', color: 'bg-red-600', popular: true, price: '₹799/mo' },
  { id: 2, name: 'Amazon Prime', icon: '📦', color: 'bg-blue-700', popular: true, price: '₹1499/mo' },
  { id: 3, name: 'Disney+', icon: '✨', color: 'bg-indigo-700', popular: true, price: '₹299/mo' },
  { id: 4, name: 'Spotify', icon: '🎵', color: 'bg-green-600', popular: true, price: '₹119/mo' },
  { id: 5, name: 'YouTube Premium', icon: '▶️', color: 'bg-red-700', popular: true, price: '₹189/mo' },
  { id: 6, name: 'HBO Max', icon: '🎭', color: 'bg-purple-800', popular: false, price: '₹399/mo' },
  { id: 7, name: 'Hulu', icon: '📺', color: 'bg-green-700', popular: false, price: '₹299/mo' },
  { id: 8, name: 'Apple TV+', icon: '🍎', color: 'bg-gray-800', popular: false, price: '₹199/mo' },
  { id: 9, name: 'Discovery+', icon: '🌍', color: 'bg-blue-500', popular: false, price: '₹299/mo' },
  { id: 10, name: 'Paramount+', icon: '🏔️', color: 'bg-blue-800', popular: false, price: '₹249/mo' },
  { id: 11, name: 'Claude AI', icon: '🤖', color: 'bg-purple-600', popular: false, price: '₹999/mo' },
  { id: 12, name: 'EA Play', icon: '🎮', color: 'bg-red-500', popular: false, price: '₹199/mo' },
  { id: 13, name: 'Crunchyroll', icon: '🍥', color: 'bg-orange-500', popular: false, price: '₹149/mo' },
  { id: 14, name: 'Peacock', icon: '🦚', color: 'bg-teal-600', popular: false, price: '₹249/mo' }
];

const SubscriptionSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Filter services based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults(subscriptionServices.filter(service => service.popular));
    } else {
      const filteredResults = subscriptionServices.filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  }, [searchQuery]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  const clearSelection = () => {
    setSelectedService(null);
  };

  // Added click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      const searchContainer = document.getElementById('search-container');
      if (searchContainer && !searchContainer.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Calculate potential savings
  const calculateSavings = (price) => {
    const fullPrice = parseInt(price.replace(/[^\d]/g, ''));
    const sharedPrice = Math.round(fullPrice * 0.4); // 60% savings
    return `₹${sharedPrice}/mo`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-20"> {/* Adjusted with px-20 for spacing */}
      <div className="relative bg-white rounded-2xl shadow-lg p-6 border border-gray-100" style={{height: '300px'}} id="search-container">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Find Your Next Shared Subscription</h2>
          <p className="text-md text-gray-600">
            Join communities and save up to 60% on premium services
          </p>
        </div>

        {/* Search input field with gradient border */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-indigo-500" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            className="block w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all bg-gray-50 hover:bg-white text-lg"
            placeholder="Netflix, Spotify, Disney+..."
            style={{background: 'linear-gradient(to right, white, white), linear-gradient(to right, #e0e7ff, #ffffff)'}}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
              aria-label="Clear search"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        
        {/* Selected service display with animation */}
        {selectedService && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-indigo-100 shadow-sm flex items-center justify-between animate-fadeIn">
            <div className="flex items-center">
              <span className={`${selectedService.color} text-white p-2 rounded-md mr-3 flex items-center justify-center w-10 h-10`}>
                {selectedService.icon}
              </span>
              <div>
                <p className="font-medium">{selectedService.name}</p>
                <p className="text-sm text-green-600">Ready to share • 3 spots available</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm text-gray-500 line-through">{selectedService.price}</p>
                <p className="font-medium text-green-600">{calculateSavings(selectedService.price)}</p>
              </div>
              <button 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                onClick={() => alert(`Joining ${selectedService.name} sharing group!`)}
              >
                Join Group
              </button>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={clearSelection}
                aria-label="Clear selection"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
        
        {/* Search results dropdown with improved styling */}
        {isSearchFocused && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto">
            {searchResults.length > 0 ? (
              <ul className="py-1">
                {searchResults.map(service => (
                  <li 
                    key={service.id}
                    className="px-4 py-3 hover:bg-indigo-50 cursor-pointer flex items-center justify-between group transition-colors"
                    onClick={() => handleServiceSelect(service)}
                  >
                    <div className="flex items-center">
                      <span className={`${service.color} text-white p-2 rounded-md mr-3 flex items-center justify-center w-10 h-10 group-hover:scale-110 transition-transform`}>
                        {service.icon}
                      </span>
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-green-600">
                          {service.popular ? '🔥 Popular choice' : 'Available for sharing'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 line-through">{service.price}</p>
                      <p className="font-medium text-green-600">{calculateSavings(service.price)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-6 text-center text-gray-500">
                <p>No subscription services found. Please try another search term.</p>
                <p className="mt-2 text-sm">Don't see what you're looking for? <a href="#" className="text-indigo-600 hover:underline">Request a new service</a></p>
              </div>
            )}
          </div>
        )}
      
        {/* Feature highlights - only visible when not focused */}
        {!isSearchFocused && !selectedService && (
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-indigo-500 mr-2" />
              <span className="text-sm font-medium">Save up to 60%</span>
            </div>
            <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
              <Users className="h-5 w-5 text-indigo-500 mr-2" />
              <span className="text-sm font-medium">Trusted community</span>
            </div>
            <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
              <Shield className="h-5 w-5 text-indigo-500 mr-2" />
              <span className="text-sm font-medium">Secure payments</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionSearchBar;