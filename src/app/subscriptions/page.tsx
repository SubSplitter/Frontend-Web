// app/subscriptions/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SubscriptionService {
  serviceId: string;
  name: string;
  description?: string;
  monthlyCost?: string;
  regionsAvailable?: string[];
  createdAt: string;
  updatedAt: string;
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/subscription-services');
        
        if (!response.ok) {
          throw new Error('Failed to fetch subscription services');
        }
        
        const data = await response.json();
        setSubscriptions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching subscriptions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleCreateNew = () => {
    router.push('/subscriptions/new');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Subscription Services</h1>
        <button 
          onClick={handleCreateNew}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New Subscription
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && subscriptions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No subscription services found. Add your first one!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscriptions.map((subscription) => (
          <Link href={`/subscriptions/${subscription.serviceId}`} key={subscription.serviceId}>
            <div className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">{subscription.name}</h2>
              {subscription.description && (
                <p className="text-gray-600 mb-2">{subscription.description}</p>
              )}
              {subscription.monthlyCost && (
                <p className="font-medium">${subscription.monthlyCost}/month</p>
              )}
              {subscription.regionsAvailable && subscription.regionsAvailable.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {subscription.regionsAvailable.map((region, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {region}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}