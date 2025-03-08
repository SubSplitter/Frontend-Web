// app/subscriptions/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SubscriptionService {
  serviceId: string;
  name: string;
  description?: string;
  monthlyCost?: string;
  regionsAvailable?: string[];
  createdAt: string;
  updatedAt: string;
}

export default function SubscriptionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;
  
  const [subscription, setSubscription] = useState<SubscriptionService | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<SubscriptionService>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/subscription-services/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch subscription details');
        }
        
        const data = await response.json();
        setSubscription(data);
        setFormData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching subscription:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSubscription();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Split by commas and trim whitespace
    const regions = value.split(',').map(region => region.trim()).filter(region => region !== '');
    setFormData(prev => ({ ...prev, regionsAvailable: regions }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:3001/api/subscription-services/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update subscription');
      }

      const updatedData = await response.json();
      setSubscription(updatedData);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update subscription');
      console.error('Error updating subscription:', err);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this subscription?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/subscription-services/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete subscription');
      }

      router.push('/subscriptions');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete subscription');
      console.error('Error deleting subscription:', err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
        <Link href="/subscriptions" className="text-blue-500 hover:underline">
          Back to Subscriptions
        </Link>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-8">
          <p className="text-gray-500">Subscription not found</p>
        </div>
        <Link href="/subscriptions" className="text-blue-500 hover:underline">
          Back to Subscriptions
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/subscriptions" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Subscriptions
      </Link>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-6">Edit Subscription</h1>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={4}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="monthlyCost">
              Monthly Cost ($)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="monthlyCost"
              type="text"
              name="monthlyCost"
              value={formData.monthlyCost || ''}
              onChange={handleChange}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="regionsAvailable">
              Regions Available (comma separated)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="regionsAvailable"
              type="text"
              name="regionsAvailable"
              value={formData.regionsAvailable?.join(', ') || ''}
              onChange={handleRegionChange}
              placeholder="US, UK, Canada"
            />
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save Changes
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{subscription.name}</h1>
            <div>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            {subscription.description && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{subscription.description}</p>
              </div>
            )}

            {subscription.monthlyCost && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Monthly Cost</h2>
                <p className="text-gray-700">${subscription.monthlyCost}</p>
              </div>
            )}

            {subscription.regionsAvailable && subscription.regionsAvailable.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Regions Available</h2>
                <div className="flex flex-wrap gap-2">
                  {subscription.regionsAvailable.map((region, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 text-sm text-gray-500">
              <p>Created: {new Date(subscription.createdAt).toLocaleString()}</p>
              <p>Last Updated: {new Date(subscription.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}