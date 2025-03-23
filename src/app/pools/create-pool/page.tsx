'use client'
import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { ArrowLeft, Plus, Check, Info, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Import the poolService
import { poolService } from '../../services/poolService';

// Types
interface ServiceProvider {
  id: string;
  name: string;
  logo: string;
  color: string;
  plans?: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

const CreatePoolPage: NextPage = () => {
  const router = useRouter();
  
  // Form state
  const [selectedService, setSelectedService] = useState<ServiceProvider | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [customPlanName, setCustomPlanName] = useState('');
  const [totalCost, setTotalCost] = useState<number>(0);
  const [capacity, setCapacity] = useState<number>(2);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  
  // UI state
  const [services, setServices] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  // Calculate split cost
  const splitCost = capacity > 0 ? parseFloat((totalCost / capacity).toFixed(2)) : 0;
  const savingsPercentage = capacity > 1 ? Math.round(((totalCost - splitCost) / totalCost) * 100) : 0;

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/subscription-services`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch services: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform the API data to match your ServiceProvider interface
        const transformedServices = data.map((service: any) => ({
          id: service.serviceId,
          name: service.name,
          logo: service.logoUrl || '/assets/logos/default.svg',
          color: service.color || '#6366f1',
          plans: service.plans ? service.plans.map((plan: any) => ({
            id: plan.planId,
            name: plan.name,
            price: parseFloat(plan.price)
          })) : []
        }));
        
        setServices(transformedServices);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load available services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  // Handle service selection
  const handleServiceSelect = (service: ServiceProvider) => {
    setSelectedService(service);
    setSelectedPlan('');
    setCustomPlanName('');
    setTotalCost(0);
    
    // If service has plans, don't move to next step yet
    if (!service.plans || service.plans.length === 0) {
      setStep(2);
    }
  };

  // Handle plan selection
  const handlePlanSelect = (planId: string, price: number) => {
    setSelectedPlan(planId);
    setTotalCost(price);
    setStep(2);
  };

  // Handle custom plan
  const handleCustomPlan = () => {
    if (customPlanName.trim() === '' || totalCost <= 0) {
      setError('Please provide a valid plan name and cost');
      return;
    }
    
    setSelectedPlan('custom');
    setStep(2);
    setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService) {
      setError('Please select a service');
      return;
    }
    
    if (totalCost <= 0) {
      setError('Please enter a valid total cost');
      return;
    }
    
    if (capacity < 2) {
      setError('Pool capacity must be at least 2');
      return;
    }
    
    // Validate credentials
    if (credentials.email.trim() === '' || credentials.password.trim() === '') {
      setError('Please provide valid credentials');
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      // In a real app, you'd encrypt the credentials
      const encryptedCredentials = JSON.stringify(credentials);
      
      const poolData = {
        serviceId: selectedService.id,
        name: selectedService.name + (selectedPlan === 'custom' ? ` (${customPlanName})` : ''),
        encryptedCredentials,
        slotsTotal: capacity,
        costPerSlot: splitCost,
      };
      
      await poolService.createPool(poolData);
      router.push('/pools');
    } catch (err) {
      console.error('Error creating pool:', err);
      setError('Failed to create pool. Please try again later.');
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Create Subscription Pool | SubSplitter</title>
      </Head>
      
      <div className="mb-8">
        <button 
          onClick={() => router.push('/pools')}
          className="text-gray-400 hover:text-white flex items-center mb-4"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Pools
        </button>
        
        <h1 className="text-3xl font-bold mb-1">Create New Subscription Pool</h1>
        <p className="text-gray-400">Split the cost of your subscription with others</p>
      </div>
      
      {/* Progress Steps */}
      <div className="flex mb-8">
        <div className={`flex items-center ${step >= 1 ? 'text-purple-500' : 'text-gray-500'}`}>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${step >= 1 ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
            {step > 1 ? <Check size={16} /> : 1}
          </div>
          <span className="mr-4">Select Service</span>
        </div>
        <div className={`h-0.5 flex-grow my-auto mx-2 ${step >= 2 ? 'bg-purple-500' : 'bg-gray-700'}`}></div>
        <div className={`flex items-center ${step >= 2 ? 'text-purple-500' : 'text-gray-500'}`}>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${step >= 2 ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
            {step > 2 ? <Check size={16} /> : 2}
          </div>
          <span className="mr-4">Configure Pool</span>
        </div>
        <div className={`h-0.5 flex-grow my-auto mx-2 ${step >= 3 ? 'bg-purple-500' : 'bg-gray-700'}`}></div>
        <div className={`flex items-center ${step >= 3 ? 'text-purple-500' : 'text-gray-500'}`}>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${step >= 3 ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
            3
          </div>
          <span>Review & Create</span>
        </div>
      </div>
      
      {/* Form Container */}
      <div className="bg-gray-800 rounded-xl p-6">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <Loader2 size={36} className="animate-spin mx-auto text-purple-500 mb-4" />
            <p className="text-gray-400">Loading available services...</p>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 mb-6 text-red-400">
            <p>{error}</p>
          </div>
        )}
        
        {!loading && (
          <form onSubmit={handleSubmit}>
            {/* Step 1: Service Selection */}
            {step === 1 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Select a subscription service</h2>
                
                {services.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>No services available. Please try again later.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {services.map(service => (
                      <div 
                        key={service.id}
                        onClick={() => handleServiceSelect(service)}
                        className={`p-4 rounded-lg cursor-pointer transition-all border ${
                          selectedService?.id === service.id 
                            ? 'border-purple-500 bg-purple-900/20' 
                            : 'border-gray-700 bg-gray-700/50 hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="h-12 w-12 relative rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center">
                            <Image 
                              src={service.logo} 
                              alt={service.name} 
                              layout="fill"
                              objectFit="cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = '/assets/logos/default.svg';
                              }}
                            />
                          </div>
                          <div className="ml-3">
                            <h3 className="font-medium">{service.name}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add custom service option */}
                    <div 
                      onClick={() => {
                        setSelectedService({
                          id: 'custom',
                          name: 'Custom Service',
                          logo: '/assets/logos/default.svg',
                          color: '#6d28d9', // Purple
                        });
                        setStep(2);
                      }}
                      className={`p-4 rounded-lg cursor-pointer transition-all border ${
                        selectedService?.id === 'custom' 
                          ? 'border-purple-500 bg-purple-900/20' 
                          : 'border-gray-700 bg-gray-700/50 hover:bg-gray-700'
                      } flex items-center justify-center`}
                    >
                      <Plus size={20} className="mr-2 text-purple-500" />
                      <span>Custom Service</span>
                    </div>
                  </div>
                )}
                
                {/* Service Plan Selection (if applicable) */}
                {selectedService && selectedService.plans && selectedService.plans.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Select a plan for {selectedService.name}</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedService.plans.map(plan => (
                        <div 
                          key={plan.id}
                          onClick={() => handlePlanSelect(plan.id, plan.price)}
                          className={`p-4 rounded-lg cursor-pointer transition-all border ${
                            selectedPlan === plan.id 
                              ? 'border-purple-500 bg-purple-900/20' 
                              : 'border-gray-700 bg-gray-700/50 hover:bg-gray-700'
                          }`}
                        >
                          <h4 className="font-medium mb-1">{plan.name}</h4>
                          <p className="text-gray-400">${plan.price.toFixed(2)}/month</p>
                        </div>
                      ))}
                      
                      {/* Custom Plan Option */}
                      <div className={`p-4 rounded-lg transition-all border ${
                        selectedPlan === 'custom' 
                          ? 'border-purple-500 bg-purple-900/20' 
                          : 'border-gray-700 bg-gray-700/50'
                      }`}>
                        <h4 className="font-medium mb-2">Custom Plan</h4>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Plan name"
                            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm"
                            value={customPlanName}
                            onChange={(e) => setCustomPlanName(e.target.value)}
                          />
                          <div className="flex items-center">
                            <span className="mr-1">$</span>
                            <input
                              type="number"
                              min="0.01"
                              step="0.01"
                              placeholder="Monthly cost"
                              className="flex-1 bg-gray-900 border border-gray-700 rounded p-2 text-sm"
                              value={totalCost || ''}
                              onChange={(e) => setTotalCost(parseFloat(e.target.value) || 0)}
                            />
                            <span className="ml-1">/month</span>
                          </div>
                          <button
                            type="button"
                            onClick={handleCustomPlan}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded text-sm transition duration-200"
                          >
                            Use Custom Plan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedService && (!selectedService.plans || selectedService.plans.length === 0) && (
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-200"
                    >
                      Continue
                    </button>
                  </div>
                )}
              </>
            )}
            
            {/* Step 2: Pool Configuration */}
            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Configure your subscription pool</h2>
                
                <div className="space-y-6">
                  {/* Service Info */}
                  <div className="flex items-center mb-6">
                    <div 
                      className="h-12 w-12 relative rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center"
                      style={{ backgroundColor: selectedService?.color || '#374151' }}
                    >
                      <Image 
                        src={selectedService?.logo || '/assets/logos/default.svg'} 
                        alt={selectedService?.name || 'Custom Service'} 
                        layout="fill"
                        objectFit="cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/assets/logos/default.svg';
                        }}
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">{selectedService?.name || 'Custom Service'}</h3>
                      {selectedPlan && selectedPlan !== 'custom' && selectedService?.plans && (
                        <p className="text-sm text-gray-400">
                          {selectedService.plans.find(p => p.id === selectedPlan)?.name}
                        </p>
                      )}
                      {selectedPlan === 'custom' && (
                        <p className="text-sm text-gray-400">{customPlanName}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Cost and Capacity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Total Cost */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Total Monthly Cost
                      </label>
                      <div className="flex items-center">
                        <span className="mr-2 text-gray-400">$</span>
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          placeholder="0.00"
                          className="flex-1 bg-gray-700 border border-gray-600 rounded-md p-2.5"
                          value={totalCost || ''}
                          onChange={(e) => setTotalCost(parseFloat(e.target.value) || 0)}
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Capacity */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Maximum Members
                      </label>
                      <input
                        type="number"
                        min="2"
                        max="10"
                        className="w-full bg-gray-700 border border-gray-600 rounded-md p-2.5"
                        value={capacity}
                        onChange={(e) => setCapacity(parseInt(e.target.value) || 2)}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Savings Calculator */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <Info size={16} className="mr-2 text-gray-400" />
                      Cost Breakdown
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <p className="text-sm text-gray-400">Total Cost</p>
                        <p className="font-semibold">${totalCost.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Your Share</p>
                        <p className="font-semibold text-green-400">${splitCost.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded p-3 flex items-center">
                      <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center text-green-400 font-bold text-xl mr-3">
                        {savingsPercentage}%
                      </div>
                      <div>
                        <p className="font-semibold">Save money by sharing</p>
                        <p className="text-sm text-gray-400">
                          Each member saves ${(totalCost - splitCost).toFixed(2)} per month
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Account Credentials */}
                  <div>
                    <h3 className="font-medium mb-4">Account Credentials</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      These credentials will be securely encrypted and only used for subscription payments
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email / Username
                        </label>
                        <input
                          type="text"
                          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2.5"
                          value={credentials.email}
                          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2.5"
                          value={credentials.password}
                          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-200"
                    >
                      Back
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        if (totalCost <= 0) {
                          setError('Please enter a valid total cost');
                          return;
                        }
                        
                        if (capacity < 2) {
                          setError('Pool capacity must be at least 2');
                          return;
                        }
                        
                        if (credentials.email.trim() === '' || credentials.password.trim() === '') {
                          setError('Please provide valid credentials');
                          return;
                        }
                        
                        setError(null);
                        setStep(3);
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-200"
                    >
                      Review Pool
                    </button>
                  </div>
                </div>
              </>
            )}
            
            {/* Step 3: Review & Create */}
            {step === 3 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Review and create your pool</h2>
                
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                  {/* Pool Summary Card */}
                  <div 
                    className="h-2 rounded-t-lg mb-6" 
                    style={{ backgroundColor: selectedService?.color || '#6d28d9' }}
                  ></div>
                  
                  <div className="flex items-center mb-6">
                    <div className="h-16 w-16 relative rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center">
                      <Image 
                        src={selectedService?.logo || '/assets/logos/default.svg'} 
                        alt={selectedService?.name || 'Custom Service'} 
                        layout="fill"
                        objectFit="cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/assets/logos/default.svg';
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">{selectedService?.name || 'Custom Service'}</h3>
                      {selectedPlan && selectedPlan !== 'custom' && selectedService?.plans && (
                        <p className="text-gray-400">
                          {selectedService.plans.find(p => p.id === selectedPlan)?.name}
                        </p>
                      )}
                      {selectedPlan === 'custom' && customPlanName && (
                        <p className="text-gray-400">{customPlanName}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Cost Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm text-gray-400 mb-1">Subscription Details</h4>
                      <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                          <span>Total Cost</span>
                          <span className="font-medium">${totalCost.toFixed(2)}/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Maximum Members</span>
                          <span className="font-medium">{capacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cost Per Member</span>
                          <span className="font-medium text-green-400">${splitCost.toFixed(2)}/month</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-gray-400 mb-1">Savings</h4>
                      <div className="bg-gray-800 rounded-lg p-4 flex items-center">
                        <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center text-green-400 font-bold text-xl mr-3">
                          {savingsPercentage}%
                        </div>
                        <div>
                          <p className="font-medium">Each member saves</p>
                          <p className="text-lg font-bold text-green-400">
                            ${(totalCost - splitCost).toFixed(2)} per month
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Account Info */}
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Account Information</h4>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <p className="mb-2">
                        <span className="text-gray-400 mr-2">Login Email:</span>
                        <span className="font-medium">{credentials.email}</span>
                      </p>
                      <p>
                        <span className="text-gray-400 mr-2">Password:</span>
                        <span className="font-medium">••••••••••</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Terms & Conditions */}
                <div className="bg-gray-700/30 rounded-lg p-4 mb-6 text-sm text-gray-300">
                  <p>
                    By creating this pool, you agree to the following:
                  </p>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>You are authorized to share this subscription with others</li>
                    <li>You will ensure all members follow the service's terms of service</li>
                    <li>SubSplitter will handle recurring payments from all pool members</li>
                    <li>You are responsible for maintaining valid payment information</li>
                  </ul>
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-200"
                  >
                    Back
                  </button>
                  
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center transition duration-200 disabled:bg-purple-900 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin mr-2" />
                        Creating Pool...
                      </>
                    ) : (
                      <>
                        <Plus size={18} className="mr-2" />
                        Create Pool
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CreatePoolPage;