// pages/settings.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import DashboardLayout from '../components/layout/DashboardLayout';
import DataTable from '../components/ui/DataTable';
import { 
  User, CreditCard, Shield, Bell, Key, Clock, Calendar, 
  DollarSign, ChevronRight, Edit, LogOut, Trash2,
  Moon, Globe, Save, Lock
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

type SettingsTab = 'profile' | 'subscriptions' | 'payments' | 'billing_history' | 'notifications' | 'appearance' | 'security';

const Settings: NextPage = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const { user, isLoading, isAuthenticated } = useKindeBrowserClient();
  
  // Combined settings state
  const [settings, setSettings] = useState({
    account: {
      id: '',
      name: '',
      email: '',
      avatar: null as string | null,
      joinedAt: '',
      timezone: 'America/New_York'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      paymentReminders: true,
      poolInvitations: true,
      marketingEmails: false
    },
    payment: {
      defaultMethod: 'card',
      autoRenew: true,
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
      ]
    },
    appearance: {
      theme: 'dark',
      colorScheme: 'purple',
      compactMode: false
    },
    privacy: {
      profileVisibility: 'friends',
      showActivity: true
    },
    subscriptions: [
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
      setSettings(prevSettings => ({
        ...prevSettings,
        account: {
          ...prevSettings.account,
          id: user.id || '',
          name: `${user.given_name || ''} ${user.family_name || ''}`.trim() || 'User',
          email: user.email || '',
          avatar: user.picture || null,
          joinedAt: user.created_at || new Date().toISOString(),
        }
      }));
    }
  }, [user, isLoading]);

  const updateSetting = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

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

  // Define navigation tabs
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    // { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
    { id: 'payments', label: 'Payment Methods', icon: DollarSign },
    { id: 'billing_history', label: 'Billing History', icon: Clock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    // { id: 'appearance', label: 'Appearance', icon: Moon },
    { id: 'security', label: 'Security & Privacy', icon: Shield }
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
          <h2 className="text-xl font-bold mb-4">Please sign in to view your settings</h2>
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* User Header with Avatar */}
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mr-6">
                {settings.account.avatar ? (
                  <Image 
                    src={settings.account.avatar} 
                    alt={settings.account.name} 
                    width={80} 
                    height={80} 
                    className="rounded-full" 
                  />
                ) : (
                  settings.account.name.split(' ').map(n => n[0]).join('')
                )}
              </div>
              
              <div>
                <h2 className="text-2xl font-bold">{settings.account.name}</h2>
                <div className="text-gray-400 flex items-center mt-1">
                  <Clock size={16} className="mr-2" />
                  <span>Member since {formatDate(settings.account.joinedAt)}</span>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  value={settings.account.name}
                  onChange={(e) => updateSetting('account', 'name', e.target.value)}
                  className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-white focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={settings.account.email}
                  onChange={(e) => updateSetting('account', 'email', e.target.value)}
                  className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-white focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Regional Settings</h3>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Timezone</label>
                <select
                  value={settings.account.timezone}
                  onChange={(e) => updateSetting('account', 'timezone', e.target.value)}
                  className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-white focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="America/New_York">Eastern Time (US & Canada)</option>
                  <option value="America/Chicago">Central Time (US & Canada)</option>
                  <option value="America/Denver">Mountain Time (US & Canada)</option>
                  <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                  <option value="Europe/London">London</option>
                  <option value="Europe/Paris">Paris</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-700 mt-6">
              <button 
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center justify-center transition duration-200 mb-3"
                onClick={() => window.location.href = "/api/auth/logout"}
              >
                <LogOut size={16} className="mr-2" />
                Sign Out
              </button>
              
              <button className="w-full text-left flex items-center text-red-400 hover:text-red-300 transition-colors p-2">
                <Trash2 size={18} className="mr-3" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        );
        
      case 'subscriptions':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium mb-4">Your Subscriptions</h3>
            <div className="bg-gray-850 rounded-xl overflow-hidden">
              <DataTable 
                data={settings.subscriptions}
                columns={subscriptionColumns}
              />
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-200">
                Manage Subscription Pools
              </button>
            </div>
          </div>
        );
        
      case 'payments':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
            {settings.payment.paymentMethods.map((method) => (
              <div key={method.id} className="bg-gray-700 rounded-lg p-4 mb-4 flex items-center">
                <div className="h-12 w-12 bg-gray-600 rounded-md flex items-center justify-center mr-4">
                  <CreditCard size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">•••• •••• •••• {method.last4}</p>
                      <p className="text-xs text-gray-400">{method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} • Expires {method.expMonth}/{method.expYear}</p>
                    </div>
                    <div className="flex items-center">
                      {method.isDefault && (
                        <span className="bg-purple-600 text-xs rounded-full px-2 py-1">Default</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <button className="text-sm text-purple-400 hover:text-purple-300">
              + Add new payment method
            </button>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Billing Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Auto-renew subscriptions</h4>
                    <p className="text-xs text-gray-400">Automatically renew your subscription pools</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.payment.autoRenew}
                      onChange={(e) => updateSetting('payment', 'autoRenew', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'billing_history':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium mb-4">Payment History</h3>
            <div className="bg-gray-850 rounded-xl overflow-hidden">
              <DataTable 
                data={settings.paymentHistory}
                columns={paymentHistoryColumns}
              />
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Email Notifications</h4>
                  <p className="text-xs text-gray-400">Receive emails about important updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.emailNotifications}
                    onChange={(e) => updateSetting('notifications', 'emailNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Push Notifications</h4>
                  <p className="text-xs text-gray-400">Receive alerts on your devices</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.pushNotifications}
                    onChange={(e) => updateSetting('notifications', 'pushNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Payment Reminders</h4>
                  <p className="text-xs text-gray-400">Get notified before payments are due</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.paymentReminders}
                    onChange={(e) => updateSetting('notifications', 'paymentReminders', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Pool Invitations</h4>
                  <p className="text-xs text-gray-400">Receive notifications about pool invites</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.poolInvitations}
                    onChange={(e) => updateSetting('notifications', 'poolInvitations', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Marketing Emails</h4>
                  <p className="text-xs text-gray-400">Receive news and promotional offers</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.marketingEmails}
                    onChange={(e) => updateSetting('notifications', 'marketingEmails', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>
        );
        
      case 'appearance':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium mb-4">Display Settings</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Theme</label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`border ${settings.appearance.theme === 'dark' ? 'border-purple-500 ring-2 ring-purple-500 ring-opacity-50' : 'border-gray-600'} rounded-lg p-4 cursor-pointer`}
                  onClick={() => updateSetting('appearance', 'theme', 'dark')}
                >
                  <div className="h-24 bg-gray-900 rounded-md mb-2 flex items-center justify-center">
                    <div className="w-3/4 h-2 bg-gray-700 rounded"></div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Dark</p>
                  </div>
                </div>
                
                <div 
                  className={`border ${settings.appearance.theme === 'light' ? 'border-purple-500 ring-2 ring-purple-500 ring-opacity-50' : 'border-gray-600'} rounded-lg p-4 cursor-pointer`}
                  onClick={() => updateSetting('appearance', 'theme', 'light')}
                >
                  <div className="h-24 bg-gray-200 rounded-md mb-2 flex items-center justify-center">
                    <div className="w-3/4 h-2 bg-gray-300 rounded"></div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Light</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Color Scheme</label>
              <div className="grid grid-cols-4 gap-4">
                {['purple', 'blue', 'green', 'pink'].map((color) => (
                  <div 
                    key={color}
                    className={`border ${settings.appearance.colorScheme === color ? 'border-purple-500 ring-2 ring-purple-500 ring-opacity-50' : 'border-gray-600'} rounded-lg p-3 cursor-pointer`}
                    onClick={() => updateSetting('appearance', 'colorScheme', color)}
                  >
                    <div className={`h-10 rounded-md mb-2 bg-${color}-500`}></div>
                    <div className="text-center">
                      <p className="text-xs font-medium capitalize">{color}</p>
                    </div>
                  </div>
                ))}
              </div>
              </div>
            
            <div className="flex items-center justify-between mt-6">
              <div>
                <h4 className="text-sm font-medium">Compact Mode</h4>
                <p className="text-xs text-gray-400">Reduce spacing and size of UI elements</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.appearance.compactMode}
                  onChange={(e) => updateSetting('appearance', 'compactMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            
            <div className="pt-6 mt-6 border-t border-gray-700">
              <button 
                className="flex items-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-200"
                onClick={() => alert('Settings saved!')}
              >
                <Save size={16} className="mr-2" />
                Save Appearance Settings
              </button>
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium mb-4">Security Settings</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium">Change Password</h4>
                <p className="text-sm text-gray-400 mb-4">Update your password regularly to keep your account secure</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Current Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-purple-500 focus:border-purple-500"
                      />
                      <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white">
                        <Lock size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-purple-500 focus:border-purple-500"
                      />
                      <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white">
                        <Lock size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-purple-500 focus:border-purple-500"
                      />
                      <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white">
                        <Lock size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-200">
                  Update Password
                </button>
              </div>
              
              <div className="pt-6 border-t border-gray-700">
                <h4 className="text-base font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-400 mb-4">Add an extra layer of security to your account</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium">Enable 2FA</h5>
                    <p className="text-xs text-gray-400">Require a verification code when signing in</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-700">
                <h4 className="text-base font-medium">Privacy Settings</h4>
                <p className="text-sm text-gray-400 mb-4">Control your profile visibility and data</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Profile Visibility</label>
                    <select
                      value={settings.privacy.profileVisibility}
                      onChange={(e) => updateSetting('privacy', 'profileVisibility', e.target.value)}
                      className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-white focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="public">Public - Anyone can see your profile</option>
                      <option value="friends">Friends - Only pool members can see your profile</option>
                      <option value="private">Private - Only you can see your profile</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium">Show Activity Status</h5>
                      <p className="text-xs text-gray-400">Let others see when you're active</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.privacy.showActivity}
                        onChange={(e) => updateSetting('privacy', 'showActivity', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-700">
                <h4 className="text-base font-medium">Sessions</h4>
                <p className="text-sm text-gray-400 mb-4">Manage your active login sessions</p>
                
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                        <Globe size={18} />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">Current Session</h5>
                        <p className="text-xs text-gray-400">Chrome on Windows • San Francisco, CA</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-600 bg-opacity-20 text-green-400 rounded-full text-xs">
                      Active
                    </span>
                  </div>
                </div>
                
                <button className="text-red-400 hover:text-red-300 text-sm font-medium">
                  Sign out of all other sessions
                </button>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Settings | SubShare</title>
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-8">Account Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1 bg-gray-800 rounded-lg p-4">
            <nav className="flex flex-col space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab.id as SettingsTab)}
                  >
                    <Icon size={18} className="mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
          
          {/* Main Content Area */}
          <div className="md:col-span-4 bg-gray-800 rounded-lg p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;