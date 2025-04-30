// pages/settings.tsx
'use client'
import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Bell, CreditCard, Lock, User, Moon, Globe, Save } from 'lucide-react';

const Settings: NextPage = () => {
  const [activeTab, setActiveTab] = useState('account');
  
  const [settings, setSettings] = useState({
    account: {
      email: 'john.smith@example.com',
      name: 'John Smith',
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
      autoRenew: true
    },
    appearance: {
      theme: 'dark',
      colorScheme: 'purple',
      compactMode: false
    },
    privacy: {
      profileVisibility: 'friends',
      showActivity: true
    }
  });

  const updateSetting = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'appearance', label: 'Appearance', icon: Moon },
    { id: 'privacy', label: 'Privacy', icon: Lock }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-6">
            <div>
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
            </div>
            
            <div>
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
        
      case 'payment':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
              <div className="bg-gray-700 rounded-lg p-4 mb-4 flex items-center">
                <div className="h-12 w-12 bg-gray-600 rounded-md flex items-center justify-center mr-4">
                  <CreditCard size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-xs text-gray-400">Visa • Expires 12/26</p>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-purple-600 text-xs rounded-full px-2 py-1">Default</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="text-sm text-purple-400 hover:text-purple-300">
                + Add new payment method
              </button>
            </div>
            
            <div>
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
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Compact Mode</h4>
                <p className="text-xs text-gray-400">Reduce spacing between elements</p>
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
          </div>
        );
        
      case 'privacy':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Profile Visibility</label>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) => updateSetting('privacy', 'profileVisibility', e.target.value)}
                className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-white focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="public">Public - Visible to everyone</option>
                <option value="friends">Friends Only - Visible to people you know</option>
                <option value="private">Private - Only visible to you</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Show Activity Status</h4>
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
            
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-medium mb-4">Data & Security</h3>
              
              <div className="space-y-4">
                <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
                  <Lock size={16} className="mr-2" />
                  Change Password
                </button>
                
                <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
                  <Globe size={16} className="mr-2" />
                  Manage Account Data
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
        <title>Settings | SubSplitter</title>
      </Head>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Settings</h1>
        <p className="text-gray-400">Manage your account preferences</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <ul>
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left ${
                      activeTab === tab.id 
                        ? 'bg-gray-700 text-white' 
                        : 'text-gray-400 hover:bg-gray-750 hover:text-white'
                    }`}
                  >
                    <tab.icon size={18} className="mr-3" />
                    <span>{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="bg-gray-800 rounded-xl p-6">
            {renderTabContent()}
            
            <div className="mt-8 pt-6 border-t border-gray-700 flex justify-end">
              <button className="flex items-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-200">
                <Save size={16} className="mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;