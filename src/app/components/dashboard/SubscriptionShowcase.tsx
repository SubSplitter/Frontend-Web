import React from 'react';
import { Share2, Bookmark, Link, ExternalLink, CreditCard, Bell, Users, UserPlus, HelpCircle } from 'lucide-react';

const SubscriptionShowcase = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-950 to-blue-950 py-16 px-4 relative">
      {/* Background grid pattern */}
      <div className="absolute inset-0 z-0">
        <div className="grid-pattern h-full w-full opacity-20" />
      </div>
      
      {/* Background glow effects */}
      <div className="absolute top-1/3 -left-20 w-64 h-64 rounded-full bg-blue-600/20 filter blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-20 w-64 h-64 rounded-full bg-indigo-600/20 filter blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 mb-4">How SplitSub Works</h2>
          <p className="text-blue-300 max-w-2xl mx-auto">A smarter way to manage your subscription expenses with friends and family</p>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2 mb-8 justify-center">
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2 rounded-full text-sm hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg shadow-blue-500/20">
            <Share2 size={16} />
            <span>Start Sharing</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-900/60 text-white px-5 py-2 rounded-full text-sm hover:bg-blue-800/60 transition-colors shadow-md backdrop-blur-sm border border-blue-700/30">
            <Bookmark size={16} />
            <span>Save for Later</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-900/60 text-white px-5 py-2 rounded-full text-sm hover:bg-blue-800/60 transition-colors shadow-md backdrop-blur-sm border border-blue-700/30">
            <Link size={16} />
            <span>Learn More</span>
          </button>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Description */}
          <div className="bg-gradient-to-br from-blue-900/80 to-indigo-900/80 rounded-xl p-6 flex flex-col justify-between shadow-lg hover:shadow-blue-500/10 transition-shadow backdrop-blur-sm border border-blue-800/40">
            <div>
              <h3 className="text-xl font-bold text-blue-300 mb-4">Why Share Subscriptions?</h3>
              <p className="text-blue-100 text-lg mb-4">
                We provide a <span className="font-bold text-white">wide range of subscription management tools</span> for sharing
                <span className="text-blue-200"> with friends and family members and help you </span>
                <span className="font-bold text-white">manage</span>
                <span className="text-blue-200"> them effectively.</span>
              </p>
              <div className="space-y-3 mt-4">
                <div className="flex items-center group hover:bg-blue-800/30 p-2 rounded-lg transition-all duration-300">
                  <div className="text-blue-300 mr-2 group-hover:text-blue-200 transition-colors" size={18}>
                    <CreditCard size={18} />
                  </div>
                  <span className="text-blue-100">Save up to 75% on monthly costs</span>
                </div>
                <div className="flex items-center group hover:bg-blue-800/30 p-2 rounded-lg transition-all duration-300">
                  <div className="text-blue-300 mr-2 group-hover:text-blue-200 transition-colors" size={18}>
                    <Bell size={18} />
                  </div>
                  <span className="text-blue-100">Automated payment reminders</span>
                </div>
                <div className="flex items-center group hover:bg-blue-800/30 p-2 rounded-lg transition-all duration-300">
                  <div className="text-blue-300 mr-2 group-hover:text-blue-200 transition-colors" size={18}>
                    <Users size={18} />
                  </div>
                  <span className="text-blue-100">Easy member management</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-full text-sm font-medium hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg shadow-blue-500/20">
                <ExternalLink size={16} />
                <span>Explore Features</span>
              </button>
            </div>
          </div>

          {/* Middle column - App screenshot */}
          <div className="bg-gradient-to-br from-blue-900/80 to-indigo-900/80 rounded-xl p-6 flex items-center justify-center shadow-lg hover:shadow-blue-500/10 transition-shadow backdrop-blur-sm border border-blue-800/40">
            <div className="bg-white rounded-3xl border-8 border-gray-900 pt-2 pb-4 px-2 shadow-xl max-w-xs transform hover:scale-105 transition-transform duration-500 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
              <div className="relative">
                <div className="flex justify-between items-center mb-2 px-2">
                  <div className="w-12"></div>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-1 bg-black rounded-full"></div>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-4 h-1 bg-black rounded-full"></div>
                    <div className="w-1 h-4 bg-black rounded-full"></div>
                  </div>
                </div>

                <div className="px-3 py-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">S</div>
                    <div>
                      <p className="text-sm font-semibold">Sarah Johnson</p>
                      <p className="text-xs text-gray-500">Subscription Manager</p>
                    </div>
                    <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Pro</span>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-blue-800">₹4,856</h3>
                    <p className="text-sm text-gray-500">Total expenses of March</p>
                  </div>

                  <div className="mb-4">
                    <p className="font-medium mb-2">My Subscriptions</p>
                    <div className="flex space-x-2 mb-4 text-xs">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full shadow-sm">All subs</span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full">Hot</span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full">Recent</span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full">Active</span>
                    </div>

                    {/* Subscription cards */}
                    <div className="space-y-3">
                      <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center hover:shadow-md transition-shadow">
                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm">N</div>
                        <div className="ml-3">
                          <p className="font-medium">Netflix</p>
                          <p className="text-xs text-gray-500">OTT Entertainment</p>
                        </div>
                        <div className="ml-auto">
                          <p className="font-medium">₹149/mo</p>
                          <p className="text-xs text-gray-500">08 Apr 2024</p>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center hover:shadow-md transition-shadow">
                        <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm">A</div>
                        <div className="ml-3">
                          <p className="font-medium">Adobe</p>
                          <p className="text-xs text-gray-500">Creative Tools</p>
                        </div>
                        <div className="ml-auto">
                          <p className="font-medium">₹1,834/mo</p>
                          <p className="text-xs text-gray-500">08 Apr 2024</p>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center hover:shadow-md transition-shadow">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm">S</div>
                        <div className="ml-3">
                          <p className="font-medium">Spotify</p>
                          <p className="text-xs text-gray-500">Music App</p>
                        </div>
                        <div className="ml-auto">
                          <p className="font-medium">₹199/2mo</p>
                          <p className="text-xs text-gray-500">08 Apr 2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex justify-center space-x-2">
                  <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-700 transition-colors shadow-sm">Home</button>
                  <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-700 transition-colors shadow-sm">Add</button>
                  <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-700 transition-colors shadow-sm">Explore</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Two sections */}
          <div className="flex flex-col gap-6">
            {/* User with notification */}
            <div className="bg-gradient-to-br from-blue-900/80 to-indigo-900/80 rounded-xl p-6 flex items-center justify-center relative shadow-lg hover:shadow-blue-500/10 transition-shadow backdrop-blur-sm border border-blue-800/40 h-64">
              <h3 className="text-xl font-bold text-blue-300 mb-4 absolute top-4 left-4">Smart Notifications</h3>
              <div className="absolute bottom-4 right-4 bg-white rounded-lg p-4 max-w-xs shadow-lg transform hover:scale-105 transition-transform">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0 shadow-md">
                    <span className="text-white text-xs font-bold">N</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Upcoming Netflix Renewal</p>
                    <p className="text-xs text-gray-500 mt-1">Your group has a payment due in 3 days</p>
                    <div className="flex mt-2 space-x-2">
                      <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-sm hover:bg-blue-700 transition-colors">Pay Now</button>
                      <button className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full hover:bg-gray-300 transition-colors">Remind Later</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing plans */}
            <div className="bg-gradient-to-br from-blue-900/80 to-indigo-900/80 rounded-xl p-6 flex items-center justify-center relative shadow-lg hover:shadow-blue-500/10 transition-shadow backdrop-blur-sm border border-blue-800/40">
              <h3 className="text-xl font-bold text-blue-300 mb-4 absolute top-4 left-4">Pricing Plans</h3>
              <div className="bg-white rounded-lg p-6 w-full shadow-lg">              
                <div className="flex justify-between items-end mt-4">
                  <div className="text-center px-4 py-2 rounded-lg group hover:bg-gray-50 transition-colors">
                    <p className="text-xs text-gray-500 mb-1">Basic</p>
                    <p className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">₹199</p>
                    <p className="text-xs text-gray-500">/month</p>
                    <button className="mt-2 bg-gray-200 text-gray-700 text-xs px-4 py-1 rounded-full hover:bg-gray-300 transition-colors">Select</button>
                  </div>
                  
                  <div className="text-center bg-blue-50 p-4 rounded-lg -mb-4 shadow-lg border-t-4 border-blue-600">
                    <span className="text-xs font-medium bg-blue-600 text-white px-2 py-1 rounded-full absolute -mt-8">Popular</span>
                    <p className="text-xs text-blue-600 font-medium mb-1">Premium</p>
                    <p className="text-2xl font-bold text-blue-800">₹499</p>
                    <p className="text-xs text-blue-600">/month</p>
                    <button className="mt-2 bg-blue-600 text-white text-xs px-4 py-1 rounded-full hover:bg-blue-700 transition-colors">Select</button>
                  </div>
                  
                  <div className="text-center px-4 py-2 rounded-lg group hover:bg-gray-50 transition-colors">
                    <p className="text-xs text-gray-500 mb-1">Family</p>
                    <p className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">₹899</p>
                    <p className="text-xs text-gray-500">/month</p>
                    <button className="mt-2 bg-gray-200 text-gray-700 text-xs px-4 py-1 rounded-full hover:bg-gray-300 transition-colors">Select</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer info */}
        <div className="mt-16 text-center">
          <p className="text-blue-300 mb-4">Join thousands of users already saving money with SplitSub</p>
          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-full text-sm font-medium hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg shadow-blue-500/20">
              <UserPlus size={16} />
              <span>Sign Up Now</span>
            </button>
            <button className="flex items-center gap-2 bg-blue-900/60 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-blue-800/60 transition-colors shadow-md backdrop-blur-sm border border-blue-700/30">
              <HelpCircle size={16} />
              <span>Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionShowcase;

