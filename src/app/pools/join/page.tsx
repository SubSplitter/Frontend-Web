// pages/pools/join/[id].tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const JoinPool: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [agreed, setAgreed] = useState(false);
  
  // Mock pool data - replace with API call
  const pool = {
    id: id as string,
    name: 'Netflix Premium',
    service: 'Netflix',
    cost: 4.99,
    rules: [
      'Payment due on the 1st of each month',
      'No sharing of credentials outside the pool',
      'Admin can remove members for payment violations',
      'Two weeks notice required before leaving the pool'
    ],
    paymentMethods: ['Credit Card', 'PayPal']
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    // Process join request
    router.push('/payment?pool=' + id);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Join Pool: {pool.name}</h1>
      
      <div className="bg-white rounded-lg border p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Pool Details</h2>
          <p className="text-gray-700 mb-1">Service: {pool.service}</p>
          <p className="text-gray-700 mb-4">Cost: ${pool.cost}/month</p>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium mb-2">Pool Rules</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            {pool.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <form onSubmit={handleJoin}>
        <div className="mb-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agree"
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                required
              />
            </div>
            <label htmlFor="agree" className="ml-2 text-sm text-gray-700">
              I agree to the pool rules and payment terms
            </label>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={!agreed}
            className={`px-5 py-2.5 rounded-md ${
              agreed ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue to Payment
          </button>
          <Link href="/pools" className="px-5 py-2.5 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default JoinPool;