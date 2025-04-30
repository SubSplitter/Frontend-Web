// pages/profile.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import DashboardLayout from '../components/layout/DashboardLayout';
import DataTable from '../components/ui/DataTable';
import { 
  User, CreditCard, Shield, Bell, Key, Clock, Calendar, 
  DollarSign, ChevronRight, Edit, LogOut, Trash2 
} from 'lucide-react';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

// Define the user interface based on Kinde's user properties
interface KindeUser {
  id: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  picture?: string;
  created_at?: string;
}

type ProfileTab = 'notifications' | 'payments' | 'history' | 'security';

const Profile: NextPage = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('notifications');
  const { user, isLoading, isAuthenticated } = useKindeBrowserClient();
  
  // We'll still need subscription data (this would ideally come from your database)
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    avatar: null as string | null,
    joinedAt: '',
    paymentMethods: [
      {
        id: 'pm1',
        type: 'card',
        brand: 'visa',
        last4: '4242',
        expMonth: 12,
        expYear: 2026,
        isDefault: true
      },
      {
        id: 'pm2',
        type: 'card', 
        brand: 'mastercard',
        last4: '5555',
        expMonth: 8,
        expYear: 2025,
        isDefault: false
      }
    ],
    notifications: [
      {
        id: 's1',
        service: 'Netflix',
        serviceLogo: '/assets/logos/netflix.svg',
        serviceColor: '#E50914',
        pool: 'Premium Pool',
        role: 'Member',
        amount: 4.99,
        nextPayment: '2025-04-15T00:00:00Z',
        status: 'Active'
      },
      {
        id: 's2',
        service: 'Spotify',
        serviceLogo: '/assets/logos/spotify.svg',
        serviceColor: '#1DB954',
        pool: 'Family Plan',
        role: 'Member',
        amount: 2.67,
        nextPayment: '2025-03-28T00:00:00Z',
        status: 'Active'
      },
      {
        id: 's3',
        service: 'Disney+',
        serviceLogo: '/assets/logos/disneyplus.svg',
        serviceColor: '#0063E5',
        pool: 'Standard Pool',
        role: 'Owner',
        amount: 3.49,
        nextPayment: '2025-04-05T00:00:00Z',
        status: 'Active'
      }
    ],
    paymentHistory: [
      {
        id: 'ph1',
        date: '2025-03-01T00:00:00Z',
        service: 'Netflix',
        serviceLogo: '/assets/logos/netflix.svg',
        amount: 4.99,
        status: 'Paid'
      },
      {
        id: 'ph2',
        date: '2025-03-01T00:00:00Z',
        service: 'Spotify',
        serviceLogo: '/assets/logos/spotify.svg',
        amount: 2.67,
        status: 'Paid'
      },
      {
        id: 'ph3',
        date: '2025-02-01T00:00:00Z',
        service: 'Netflix',
        serviceLogo: '/assets/logos/netflix.svg',
        amount: 4.99,
        status: 'Paid'
      },
      {
        id: 'ph4',
        date: '2025-02-01T00:00:00Z',
        service: 'Spotify',
        serviceLogo: '/assets/logos/spotify.svg',
        amount: 2.67,
        status: 'Paid'
      },
      {
        id: 'ph5',
        date: '2025-02-01T00:00:00Z',
        service: 'Disney+',
        serviceLogo: '/assets/logos/disneyplus.svg',
        amount: 3.49,
        status: 'Paid'
      }
    ]
  });

  // Update userData with Kinde user data when it's available
  useEffect(() => {
    if (user && !isLoading) {
      setUserData(prevData => ({
        ...prevData,
        id: user.id || '',
        name: `${user.given_name || ''} ${user.family_name || ''}`.trim() || 'User',
        email: user.email || '',
        avatar: user.picture || null,
        joinedAt: user.created_at || new Date().toISOString(),
      }));
    }
  }, [user, isLoading]);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const subscriptionColumns = [
    {
      header: 'Service',
      accessor: (subscription) => (
        <div className="flex items-center">
          <div className="h-8 w-8 relative rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center mr-3">
            <Image 
              src={subscription.serviceLogo} 
              alt={subscription.service} 
              width={20} 
              height={20} 
            />
          </div>
          <div>
            <div className="font-medium">{subscription.service}</div>
            <div className="text-gray-400 text-xs">{subscription.pool}</div>
          </div>
        </div>
      ),
      width: '30%'
    },
    {
      header: 'Role',
      accessor: (subscription) => (
        <span className={`px-2 py-1 rounded-md text-xs ${
          subscription.role === 'Owner' 
            ? 'bg-purple-600 bg-opacity-20 text-purple-400' 
            : 'bg-gray-700 text-gray-400'
        }`}>
          {subscription.role}
        </span>
      ),
      width: '15%'
    },
    {
      header: 'Amount',
      accessor: (subscription) => (
        <div className="font-medium">${subscription.amount.toFixed(2)}/mo</div>
      ),
      width: '15%'
    },
    {
      header: 'Next Payment',
      accessor: (subscription) => (
        <div className="flex items-center">
          <Calendar size={16} className="text-gray-400 mr-2" />
          <span>{formatDate(subscription.nextPayment)}</span>
        </div>
      ),
      width: '25%'
    },
    {
      header: 'Status',
      accessor: (subscription) => (
        <span className={`px-2 py-1 rounded-md text-xs ${
          subscription.status === 'Active' 
            ? 'bg-green-600 bg-opacity-20 text-green-400' 
            : 'bg-yellow-600 bg-opacity-20 text-yellow-400'
        }`}>
          {subscription.status}
        </span>
      ),
      width: '15%'
    }
  ];
  
  const paymentHistoryColumns = [
    {
      header: 'Date',
      accessor: (payment) => (
        <div className="flex items-center">
          <Clock size={16} className="text-gray-400 mr-2" />
          <span>{formatDate(payment.date)}</span>
        </div>
      ),
      width: '25%'
    },
    {
      header: 'Service',
      accessor: (payment) => (
        <div className="flex items-center">
          <div className="h-8 w-8 relative rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center mr-3">
            <Image 
              src={payment.serviceLogo} 
              alt={payment.service} 
              width={20} 
              height={20} 
            />
          </div>
          <div className="font-medium">{payment.service}</div>
        </div>
      ),
      width: '40%'
    },
    {
      header: 'Amount',
      accessor: (payment) => (
        <div className="flex items-center">
          <DollarSign size={16} className="text-gray-400 mr-1" />
          <span className="font-medium">{payment.amount.toFixed(2)}</span>
        </div>
      ),
      width: '15%'
    },
    {
      header: 'Status',
      accessor: (payment) => (
        <span className={`px-2 py-1 rounded-md text-xs ${
          payment.status === 'Paid' 
            ? 'bg-green-600 bg-opacity-20 text-green-400' 
            : payment.status === 'Pending'
              ? 'bg-yellow-600 bg-opacity-20 text-yellow-400'
              : 'bg-red-600 bg-opacity-20 text-red-400'
        }`}>
          {payment.status}
        </span>
      ),
      width: '20%'
    }
  ];

  // Show loading state if user data is loading
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  // Redirect or show login prompt if not authenticated
  if (!isAuthenticated && !isLoading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col justify-center items-center h-96">
          <h2 className="text-xl font-bold mb-4">Please sign in to view your profile</h2>
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-200"
            onClick={() => window.location.href = "/api/auth/login"}
          >
            Sign In
          </button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <Head>
        <title>Profile | SubSplitter</title>
      </Head>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
                {userData.avatar ? (
                  <Image 
                    src={userData.avatar} 
                    alt={userData.name} 
                    width={96} 
                    height={96} 
                    className="rounded-full" 
                  />
                ) : (
                  userData.name.split(' ').map(n => n[0]).join('')
                )}
              </div>
              
              <h2 className="text-xl font-bold">{userData.name}</h2>
              <p className="text-gray-400 text-sm">{userData.email}</p>
            </div>
            
            <div className="text-sm text-gray-400 mb-6">
              <div className="flex items-center mb-2">
                <Clock size={16} className="mr-2" />
                <span>Member since {formatDate(userData.joinedAt)}</span>
              </div>
              <div className="flex items-center">
                <CreditCard size={16} className="mr-2" />
                <span>{userData.notifications.length} active notifications</span>
              </div>
            </div>
            
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition duration-200 mb-3">
              <Edit size={16} className="mr-2" />
              Edit Profile
            </button>
            
            <button 
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center justify-center transition duration-200"
              onClick={() => window.location.href = "/api/auth/logout"}
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </button>
          </div>
          
          {/* Account Settings */}
          <div className="bg-gray-800 rounded-xl overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-700">
                        <h3 className="font-medium">Account Settings</h3>
                      </div>
                      
                      <div>
                        <button 
                          className={`w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-750 transition-colors ${activeTab === 'notifications' ? 'bg-gray-750' : ''}`}
                          onClick={() => setActiveTab('notifications')}
                        >
                          <div className="flex items-center">
                            <CreditCard size={18} className={`mr-3 ${activeTab === 'notifications' ? 'text-purple-500' : 'text-gray-400'}`} />
                            <span>Notifications</span>
                          </div>
                          <ChevronRight size={18} className="text-gray-400" />
                        </button>
                        
                        <button 
                          className={`w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-750 transition-colors ${activeTab === 'payments' ? 'bg-gray-750' : ''}`}
                          onClick={() => setActiveTab('payments')}
                        >
                          <div className="flex items-center">
                            <DollarSign size={18} className={`mr-3 ${activeTab === 'payments' ? 'text-purple-500' : 'text-gray-400'}`} />
                            <span>Payment Methods</span>
                          </div>
                          <ChevronRight size={18} className="text-gray-400" />
                        </button>
                        
                        <button 
                          className={`w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-750 transition-colors ${activeTab === 'history' ? 'bg-gray-750' : ''}`}
                          onClick={() => setActiveTab('history')}
                        >
                          <div className="flex items-center">
                            <Clock size={18} className={`mr-3 ${activeTab === 'history' ? 'text-purple-500' : 'text-gray-400'}`} />
                            <span>Payment History</span>
                          </div>
                          <ChevronRight size={18} className="text-gray-400" />
                        </button>
                        
                        <button 
                          className={`w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-750 transition-colors ${activeTab === 'security' ? 'bg-gray-750' : ''}`}
                          onClick={() => setActiveTab('security')}
                        >
                          <div className="flex items-center">
                            <Shield size={18} className={`mr-3 ${activeTab === 'security' ? 'text-purple-500' : 'text-gray-400'}`} />
                            <span>Security</span>
                          </div>
                          <ChevronRight size={18} className="text-gray-400" />
                        </button>
                      </div>
                      
                      <div className="px-6 py-4 border-t border-gray-700">
                        <button className="w-full text-left flex items-center text-red-400 hover:text-red-300 transition-colors">
                          <Trash2 size={18} className="mr-3" />
                          <span>Delete Account</span>
                        </button>
                      </div>
                    </div>
        </div>
        
      
      </div>
    </DashboardLayout>
  );
};

export default Profile;