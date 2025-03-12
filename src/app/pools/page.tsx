'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Subscription {
  userSubscriptionId: string;
  userId: string;
  serviceId: string;
  encryptedCredentials: string;
  slotsTotal: number;
  slotsAvailable: number;
  costPerSlot: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

interface SubscriptionService {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
}

export default function PoolPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [services, setServices] = useState<Record<string, SubscriptionService>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3001/api/subscriptions');
        
        if (!response.ok) {
          throw new Error('Failed to fetch subscriptions');
        }
        
        const data = await response.json();
        setSubscriptions(data);
        
        // Fetch service details for each subscription
        const serviceDetails: Record<string, SubscriptionService> = {};
        
        await Promise.all(
          data.map(async (sub: Subscription) => {
            if (!serviceDetails[sub.serviceId]) {
              const serviceResponse = await fetch(
                `http://localhost:3001/api/subscription-services/${sub.serviceId}`
              );
              
              if (serviceResponse.ok) {
                const serviceData = await serviceResponse.json();
                serviceDetails[sub.serviceId] = serviceData;
              }
            }
          })
        );
        
        setServices(serviceDetails);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl font-semibold text-gray-700">Loading subscription pools...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Error Loading Pools</h1>
          <p className="text-gray-600 text-center">{error}</p>
          <button 
            onClick={() => router.reload()}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Subscription Pools
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Manage and share your subscription slots with others
          </p>
        </div>

        {subscriptions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h2 className="text-lg font-medium text-gray-900">No subscription pools found</h2>
            <p className="mt-1 text-sm text-gray-500">Get started by creating your first subscription pool.</p>
            <div className="mt-6">
              <Link href="/new-subscription">
                <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  Create New Pool
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subscriptions.map((subscription) => {
              const service = services[subscription.serviceId];
              const usagePercentage = ((subscription.slotsTotal - subscription.slotsAvailable) / subscription.slotsTotal) * 100;
              
              return (
                <div 
                  key={subscription.userSubscriptionId} 
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center mb-4">
                      {service?.logoUrl ? (
                        <img 
                          src={service.logoUrl} 
                          alt={service?.name || 'Service logo'} 
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {service?.name || 'Subscription Service'}
                        </h3>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {service?.description || 'Subscription details'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Slots Usage: {subscription.slotsTotal - subscription.slotsAvailable}/{subscription.slotsTotal}
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          ${subscription.costPerSlot}/slot
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${usagePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div>
                        <span className="block text-sm font-medium text-gray-500">Available</span>
                        <span className="text-2xl font-semibold text-gray-900">{subscription.slotsAvailable}</span>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-500">Created</span>
                        <span className="text-sm text-gray-700">{formatDate(subscription.createdAt)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <Link href={`/pools/${subscription.userSubscriptionId}`}>
                        <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
                          View Details
                        </span>
                      </Link>
                      
                      {subscription.slotsAvailable > 0 && (
                        <button 
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                        >
                          Share Slot
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <span className={`h-3 w-3 rounded-full ${subscription.isActive ? 'bg-green-500' : 'bg-gray-300'} mr-2`}></span>
                        <span className="font-medium text-gray-700">
                          {subscription.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div>
                        <Link href={service?.websiteUrl || '#'} target="_blank" rel="noopener noreferrer">
                          <span className="text-blue-600 hover:text-blue-500">Visit service →</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {subscriptions.length > 0 && (
          <div className="mt-8 text-center">
            <Link href="/pools/create">
              <span className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                New Pool Creation
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}