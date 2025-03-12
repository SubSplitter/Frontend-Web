'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SubscriptionService {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
  category: string;
  price: string;
}

export default function CreatePoolPage() {
  const router = useRouter();
  const [services, setServices] = useState<SubscriptionService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [selectedService, setSelectedService] = useState<string>('');
  const [credentials, setCredentials] = useState<string>('');
  const [slotsTotal, setSlotsTotal] = useState<number>(1);
  const [costPerSlot, setCostPerSlot] = useState<string>('0');

  const getAccessToken = async () => {
    try {
      const response = await fetch('/api/auth');
      if (!response.ok) {
        throw new Error('Failed to get access token');
      }
      const data = await response.json();
      return data.accessToken;
    } catch (err) {
      console.error(err);
      setError('Authentication error. Please try again.');
      return null;
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        
        const accessToken = await getAccessToken();
        if(!accessToken){
          console.log("Failed to get access token");
          return;
        }
       
        const response = await fetch('http://localhost:3001/api/subscription-services', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch subscription services');
        }
        
        const data = await response.json();
        setServices(data);
        
        // Set default selected service if there are services
        if (data.length > 0) {
          console.log('Setting initial service:', data[0]);
          setSelectedService(data[0].id);
          setCostPerSlot(data[0].price || '0');
        }
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const serviceId = e.target.value;
    console.log('Selected service ID:', serviceId);
    setSelectedService(serviceId);
    
    // Update cost per slot based on selected service
    const service = services.find(s => s.id === serviceId);
    console.log('Found service:', service);
    if (service) {
      setCostPerSlot(service.price || '0');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService) {
      setError('Please select a subscription service');
      return;
    }

    if (!credentials) {
      setError('Please enter account credentials');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Get access token
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error('Failed to get access token');
      }
      
      // Ensure we're sending the actual service ID, not the display string
      const serviceToSubmit = services.find(s => s.id === selectedService);
      if (!serviceToSubmit) {
        throw new Error('Invalid service selected');
      }

      // Parse cost to ensure it's a valid number
      const parsedCost = parseFloat(costPerSlot);
      if (isNaN(parsedCost)) {
        throw new Error('Invalid cost value');
      }
      
      const response = await fetch('http://localhost:3001/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          serviceId: selectedService,
          encryptedCredentials: credentials,
          slotsTotal: slotsTotal,
          costPerSlot: parsedCost
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to create subscription pool');
      }
      
      // Redirect to pools page after successful creation
      router.push('/pools');
      
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl font-semibold text-gray-700">Loading subscription services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/pools">
            <span className="flex items-center text-blue-600 hover:text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to Pools
            </span>
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-900">Create New Subscription Pool</h1>
            <p className="mt-1 text-sm text-gray-500">
              Set up a new subscription to share with others
            </p>
          </div>

          {error && (
            <div className="mx-6 mt-4 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6 space-y-6">
            {/* Service Selection */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                Select Subscription Service *
              </label>
              <div className="mt-1">
                {services.length === 0 ? (
                  <div className="text-sm text-gray-500 p-2 border border-gray-200 rounded">
                    No subscription services available
                  </div>
                ) : (
                  <select
                    id="service"
                    name="service"
                    value={selectedService}
                    onChange={handleServiceChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    required
                  >
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} - {service.price ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(service.price)) : '$0.00'}/month
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Service Details */}
            {selectedService && (
              <div className="bg-gray-50 rounded-lg p-4">
                {(() => {
                  const selectedServiceObj = services.find(s => s.id === selectedService);
                  if (selectedServiceObj) {
                    return (
                      <div>
                        <div className="flex items-center mb-4">
                          {selectedServiceObj.logoUrl ? (
                            <img 
                              src={selectedServiceObj.logoUrl} 
                              alt={selectedServiceObj.name || 'Service logo'} 
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
                              {selectedServiceObj.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {selectedServiceObj.category || 'Subscription Service'}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {selectedServiceObj.description}
                        </p>
                        {selectedServiceObj.websiteUrl && (
                          <a 
                            href={selectedServiceObj.websiteUrl} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Visit website →
                          </a>
                        )}
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            )}

            {/* Credentials Field */}
            <div>
              <label htmlFor="credentials" className="block text-sm font-medium text-gray-700">
                Account Credentials *
              </label>
              <div className="mt-1">
                <textarea
                  id="credentials"
                  name="credentials"
                  rows={3}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your subscription login details (these will be encrypted)"
                  value={credentials}
                  onChange={(e) => setCredentials(e.target.value)}
                  required
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Securely share login details with pool members
              </p>
            </div>

            {/* Slots Configuration */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="slotsTotal" className="block text-sm font-medium text-gray-700">
                  Number of Slots *
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="slotsTotal"
                    id="slotsTotal"
                    min="1"
                    max="10"
                    value={slotsTotal}
                    onChange={(e) => setSlotsTotal(parseInt(e.target.value))}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  How many users can share this subscription
                </p>
              </div>

              <div>
                <label htmlFor="costPerSlot" className="block text-sm font-medium text-gray-700">
                  Cost Per Slot ($) *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="costPerSlot"
                    id="costPerSlot"
                    min="0.01"
                    step="0.01"
                    value={costPerSlot}
                    onChange={(e) => setCostPerSlot(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">USD</span>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Monthly cost per user sharing the subscription
                </p>
              </div>
            </div>

            {/* Total Cost Calculation */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Total Monthly Cost:</span>
                <span className="text-lg font-bold text-blue-700">
                  {new Intl.NumberFormat('en-US', { 
                    style: 'currency', 
                    currency: 'USD' 
                  }).format(slotsTotal * (parseFloat(costPerSlot) || 0))}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-medium text-gray-700">Your Cost (1 slot):</span>
                <span className="text-md font-semibold text-blue-700">
                  {new Intl.NumberFormat('en-US', { 
                    style: 'currency', 
                    currency: 'USD' 
                  }).format(parseFloat(costPerSlot) || 0)}
                </span>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-3">
              <Link href="/pools">
                <span className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Cancel
                </span>
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || services.length === 0}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                  isSubmitting || services.length === 0
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  'Create Subscription Pool'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}