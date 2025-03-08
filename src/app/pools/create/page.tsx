// pages/pools/create.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface Subscription {
  id: string;
  name: string;
  provider: string;
  maxUsers: number;
}

const CreatePool: React.FC = () => {
  const router = useRouter();
  
  // Mock subscriptions data - replace with API call
  const subscriptions: Subscription[] = [
    { id: '1', name: 'Netflix Premium', provider: 'Netflix', maxUsers: 4 },
    { id: '2', name: 'Netflix Standard', provider: 'Netflix', maxUsers: 2 },
    { id: '3', name: 'YouTube Premium', provider: 'YouTube', maxUsers: 6 },
    { id: '4', name: 'Amazon Prime', provider: 'Amazon', maxUsers: 3 },
  ];

  const [formData, setFormData] = useState({
    name: '',
    subscription: '',
    maxMembers: 0,
    pricePerMember: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'subscription' && value) {
      const selected = subscriptions.find(sub => sub.id === value);
      if (selected) {
        setFormData({
          ...formData,
          [name]: value,
          maxMembers: selected.maxUsers
        });
        return;
      }
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process form data
    console.log(formData);
    // Redirect to the pool detail page (assuming success)
    router.push('/pools/1');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Create a New Pool</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
            Pool Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Family Netflix Plan"
            required
          />
        </div>
        
        <div>
          <label htmlFor="subscription" className="block mb-2 text-sm font-medium text-gray-700">
            Subscription
          </label>
          <select
            id="subscription"
            name="subscription"
            value={formData.subscription}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          >
            <option value="">Select a subscription</option>
            {subscriptions.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name} ({sub.provider})
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="maxMembers" className="block mb-2 text-sm font-medium text-gray-700">
            Maximum Members
          </label>
          <input
            type="number"
            id="maxMembers"
            name="maxMembers"
            value={formData.maxMembers}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            min="1"
            disabled
          />
          <p className="mt-1 text-xs text-gray-500">Based on the selected subscription</p>
        </div>
        
        <div>
          <label htmlFor="pricePerMember" className="block mb-2 text-sm font-medium text-gray-700">
            Price per Member ($/month)
          </label>
          <input
            type="number"
            step="0.01"
            id="pricePerMember"
            name="pricePerMember"
            value={formData.pricePerMember}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="4.99"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Additional information about your pool..."
          />
        </div>
        
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Pool
          </button>
          <button
            type="button"
            onClick={() => router.push('/pools')}
            className="px-5 py-2.5 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePool;