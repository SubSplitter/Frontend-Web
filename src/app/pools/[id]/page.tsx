// pages/pools/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Member {
  id: string;
  name: string;
  avatar: string;
  joinedDate: string;
  status: 'active' | 'pending' | 'overdue';
}

const PoolDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  
  // Mock data - replace with API call
  const pool = {
    id: id as string,
    name: 'Netflix Premium',
    service: 'Netflix',
    owner: 'Jane Smith',
    cost: 15.99,
    pricePerMember: 4.99,
    maxMembers: 4,
    currentMembers: 3,
    nextBilling: '2025-04-01',
    credentials: {
      email: 'pool***@example.com',
      password: '********'
    },
    isOwner: true
  };
  
  const members: Member[] = [
    { id: '1', name: 'Jane Smith (You)', avatar: '/avatar1.jpg', joinedDate: '2024-12-01', status: 'active' },
    { id: '2', name: 'Michael Brown', avatar: '/avatar2.jpg', joinedDate: '2025-01-15', status: 'active' },
    { id: '3', name: 'Sarah Johnson', avatar: '/avatar3.jpg', joinedDate: '2025-02-10', status: 'overdue' }
  ];

  const [showCredentials, setShowCredentials] = React.useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{pool.name}</h1>
        {pool.currentMembers < pool.maxMembers && !pool.isOwner && (
          <Link href={`/pools/join/${id}`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Join Pool
          </Link>
        )}
        {pool.isOwner && (
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
            Manage Pool
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white rounded-lg border p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Pool Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Service</p>
                <p className="font-medium">{pool.service}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pool Owner</p>
                <p className="font-medium">{pool.owner}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Cost</p>
                <p className="font-medium">${pool.cost}/month</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Your Cost</p>
                <p className="font-medium">${pool.pricePerMember}/month</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Members</p>
                <p className="font-medium">{pool.currentMembers}/{pool.maxMembers}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Billing</p>
                <p className="font-medium">{pool.nextBilling}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Members</h2>
              {pool.isOwner && (
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Invite Member
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {members.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div className="ml-3">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-xs text-gray-500">Joined {member.joinedDate}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    member.status === 'active' ? 'bg-green-100 text-green-800' : 
                    member.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg border p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Account Credentials</h2>
            {showCredentials ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{pool.credentials.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Password</p>
                  <p className="font-medium">{pool.credentials.password}</p>
                </div>
                <button 
                  onClick={() => setShowCredentials(false)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Hide Credentials
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-3">Credentials are hidden for security</p>
                <button 
                  onClick={() => setShowCredentials(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                  Show Credentials
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Next Payment</p>
                <p className="font-medium">${pool.pricePerMember} on {pool.nextBilling}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">Visa ending in 4242</p>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Update Payment Method
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolDetails;