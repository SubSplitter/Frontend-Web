// components/SubscriptionCard.tsx
import React from 'react';
import Link from 'next/link';

interface SubscriptionCardProps {
  id: string;
  name: string;
  provider: string;
  cost: number;
  renewalDate: string;
  status: 'active' | 'expired' | 'pending';
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  id, name, provider, cost, renewalDate, status
}) => {
  const statusClass = {
    active: 'bg-green-100 text-green-800',
    expired: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <span className={`text-sm px-2 py-1 rounded ${statusClass[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        <p className="text-gray-600 mb-3">{provider}</p>
        <div className="flex justify-between text-sm">
          <span>Renews: {renewalDate}</span>
          <span className="font-medium">${cost}/month</span>
        </div>
      </div>
      <Link 
        href={`/subscriptions/${id}`}
        className="block w-full py-2 bg-gray-50 text-center text-blue-600 hover:bg-gray-100 transition-colors border-t"
      >
        View Details
      </Link>
    </div>
  );
};

export default SubscriptionCard;