// app/pool/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  category: string;
  price: string;
}

interface PoolMember {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  avatar?: string;
}

export default function PoolDetailPage() {
  const params = useParams();
  const router = useRouter();
  const poolId = params.id as string;

  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [service, setService] = useState<SubscriptionService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Mock pool members data - in a real app, this would come from an API
  const [poolMembers, setPoolMembers] = useState<PoolMember[]>([]);

  useEffect(() => {
    const fetchPoolDetails = async () => {
      if (!poolId) return;
      
      try {
        setIsLoading(true);
        
        // Fetch all subscriptions
        const subscriptionsResponse = await fetch('http://localhost:3001/api/subscriptions');
        
        if (!subscriptionsResponse.ok) {
          throw new Error('Failed to fetch subscriptions');
        }
        
        const subscriptionsData = await subscriptionsResponse.json();
        
        // Find the specific subscription by ID
        const foundSubscription = subscriptionsData.find(
          (sub: Subscription) => sub.userSubscriptionId === poolId
        );
        
        if (!foundSubscription) {
          throw new Error('Subscription pool not found');
        }
        
        setSubscription(foundSubscription);
        
        // Fetch service details
        const serviceResponse = await fetch(
          `http://localhost:3001/api/subscription-services/${foundSubscription.serviceId}`
        );
        
        if (serviceResponse.ok) {
          const serviceData = await serviceResponse.json();
          setService(serviceData);
        }
        
        // In a real app, you would fetch real pool members here
        // For now, generate some example members based on slots used
        const slotsUsed = foundSubscription.slotsTotal - foundSubscription.slotsAvailable;
        const mockMembers: PoolMember[] = [];
        
        // Add owner/admin (current user)
        mockMembers.push({
          id: '1',
          name: 'You (Admin)',
          email: 'you@example.com',
          joinedAt: foundSubscription.createdAt,
          avatar: '/api/placeholder/64/64',
        });
        
        // Add other members if slots are being used
        for (let i = 1; i < slotsUsed; i++) {
          mockMembers.push({
            id: `member-${i}`,
            name: `Member ${i}`,
            email: `member${i}@example.com`,
            joinedAt: new Date(Date.now() - i * 86400000).toISOString(), // Random join dates
            avatar: '/api/placeholder/64/64',
          });
        }
        
        setPoolMembers(mockMembers);
        
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoolDetails();
  }, [poolId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(parseFloat(amount));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl font-semibold text-gray-700">Loading pool details...</p>
        </div>
      </div>
    );
  }

  if (error || !subscription) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Error Loading Pool</h1>
          <p className="text-gray-600 text-center">{error || "Subscription pool not found"}</p>
          <div className="mt-6 flex justify-center space-x-4">
            <button 
              onClick={() => router.refresh()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
              Try Again
            </button>
            <Link href="/pools">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition duration-200">
                Back to Pools
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate usage metrics
  const usagePercentage = ((subscription.slotsTotal - subscription.slotsAvailable) / subscription.slotsTotal) * 100;
  const monthlyCost = parseFloat(subscription.costPerSlot) * subscription.slotsTotal;
  const costPerUser = monthlyCost / Math.max(poolMembers.length, 1);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/pools">
            <button className="flex items-center text-blue-600 hover:text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to All Pools
            </button>
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Header */}
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50">
            <div className="flex items-center">
              <div className="mr-4">
                {service?.logoUrl ? (
                  <img 
                    src={service.logoUrl} 
                    alt={service.name || 'Subscription service'} 
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg bg-blue-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{service?.name || 'Subscription Pool'}</h1>
                <p className="text-sm text-gray-500">
                  ID: {subscription.userSubscriptionId.substring(0, 8)}...
                </p>
              </div>
            </div>
            <div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                subscription.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {subscription.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          {/* Pool Details */}
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Subscription Details</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Service</p>
                    <p className="mt-1 text-sm text-gray-900">{service?.name || 'Unknown Service'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Created On</p>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(subscription.createdAt)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Last Updated</p>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(subscription.updatedAt)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Slots</p>
                    <p className="mt-1 text-sm text-gray-900">{subscription.slotsTotal}</p>
                  </div>
                </div>

                {service && (
                  <div className="mt-6">
                    <p className="text-sm font-medium text-gray-500">Service Description</p>
                    <p className="mt-1 text-sm text-gray-900">{service.description}</p>
                    
                    <div className="mt-4">
                      <a 
                        href={service.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Visit Service Website →
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Usage & Costs</h2>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Slots Usage: {subscription.slotsTotal - subscription.slotsAvailable}/{subscription.slotsTotal}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {usagePercentage.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${usagePercentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Cost Per Slot</p>
                    <p className="mt-1 text-sm text-gray-900">{formatCurrency(subscription.costPerSlot)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Monthly Total</p>
                    <p className="mt-1 text-sm text-gray-900">{formatCurrency(monthlyCost.toString())}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Available Slots</p>
                    <p className="mt-1 text-sm text-gray-900">{subscription.slotsAvailable}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Cost Per Member</p>
                    <p className="mt-1 text-sm text-gray-900">{formatCurrency(costPerUser.toString())}/month</p>
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  {subscription.slotsAvailable > 0 ? (
                    <button 
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-medium"
                    >
                      Invite Member
                    </button>
                  ) : (
                    <button 
                      className="flex-1 bg-gray-300 text-gray-500 py-2 px-4 rounded font-medium cursor-not-allowed"
                      disabled
                    >
                      No Slots Available
                    </button>
                  )}
                  
                  <button 
                    className="flex-1 bg-blue-100 text-blue-700 hover:bg-blue-200 py-2 px-4 rounded font-medium"
                  >
                    Manage Subscription
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pool Members */}
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Pool Members</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {poolMembers.length} member{poolMembers.length !== 1 ? 's' : ''} using this subscription
              </p>
            </div>
            
            <div className="border-t border-gray-200">
              <ul role="list" className="divide-y divide-gray-200">
                {poolMembers.map((member) => (
                  <li key={member.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {member.avatar ? (
                            <img 
                              className="h-10 w-10 rounded-full" 
                              src={member.avatar} 
                              alt={member.name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 font-medium">
                                {member.name.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {member.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-sm text-gray-500 mr-4">
                          Joined {formatDate(member.joinedAt)}
                        </div>
                        {!member.name.includes('Admin') && (
                          <button 
                            className="text-red-600 hover:text-red-900"
                            title="Remove member"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <button 
                className="text-gray-500 hover:text-gray-700 font-medium flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
                Pool Settings
              </button>
              
              <button 
                className="text-red-600 hover:text-red-800 font-medium flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Delete Pool
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}