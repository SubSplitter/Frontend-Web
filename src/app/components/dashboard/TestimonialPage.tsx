import React from 'react';

const TestimonialPage = () => {
  return (
    <div className="bg-indigo-900 py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Understanding our users</h2>
          <p className="text-lg text-indigo-200">
            We gathered meaningful insights from <span className="font-semibold text-blue-300">5,000+</span> users by conducting planned interviews and user testing using
            quantitative surveys.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* First Persona */}
          <div className="bg-indigo-800 rounded-lg shadow-md overflow-hidden transform transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6 pb-8 relative">
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <div className="w-24 h-24 rounded-full border-4 border-indigo-800 overflow-hidden bg-gray-200">
                  <img src="/api/placeholder/96/96" alt="Alex profile" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            
            <div className="pt-16 px-6 pb-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white">Alex, 28</h3>
                <p className="text-indigo-200">Software Developer</p>
              </div>
              
              <p className="text-indigo-100 mb-6 bg-indigo-700 p-4 rounded-lg italic border-l-4 border-blue-400">
                "I subscribe to so many services but rarely use them all to their full potential. I wish there was an easy way to share costs with friends without the awkwardness of reminding them to pay me back."
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-blue-100 flex items-center justify-center mr-2 text-sm">✓</span>
                    Goals
                  </h4>
                  <ul className="text-sm text-indigo-200 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      <span>Find subscription sharing partners</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      <span>Manage all payments in one place</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      <span>Save at least 40% on monthly expenses</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      <span>Ensure secure payment methods</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-red-800 text-red-200 flex items-center justify-center mr-2 text-sm">!</span>
                    Pain points
                  </h4>
                  <ul className="text-sm text-indigo-200 space-y-2">
                    <li className="flex items-start">
                      <span className="text-red-300 mr-2">•</span>
                      <span>Tracking total spending is difficult</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-300 mr-2">•</span>
                      <span>Account security concerns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-300 mr-2">•</span>
                      <span>Needs reliable payment splitting</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-300 mr-2">•</span>
                      <span>Concerned about subscription overlap</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Second Persona */}
          <div className="bg-indigo-800 rounded-lg shadow-md overflow-hidden transform transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="bg-gradient-to-r from-purple-700 to-purple-900 p-6 pb-8 relative">
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <div className="w-24 h-24 rounded-full border-4 border-indigo-800 overflow-hidden bg-gray-200">
                  <img src="/api/placeholder/96/96" alt="Maya profile" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            
            <div className="pt-16 px-6 pb-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white">Maya, 31</h3>
                <p className="text-indigo-200">Digital Creator</p>
              </div>
              
              <p className="text-indigo-100 mb-6 bg-indigo-700 p-4 rounded-lg italic border-l-4 border-purple-400">
                "As a creator, I need so many professional tools, but they're expensive. I'd love to find other creators to share costs with people who only need occasional access like me."
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-blue-100 flex items-center justify-center mr-2 text-sm">✓</span>
                    Goals
                  </h4>
                  <ul className="text-sm text-indigo-200 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      <span>Connect with trusted sharing partners</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      <span>Access more professional tools</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      <span>Maximize value while minimizing costs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      <span>Switch easily between shared accounts</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-red-800 text-red-200 flex items-center justify-center mr-2 text-sm">!</span>
                    Pain points
                  </h4>
                  <ul className="text-sm text-indigo-200 space-y-2">
                    <li className="flex items-start">
                      <span className="text-red-300 mr-2">•</span>
                      <span>Tracking subscriptions is messy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-300 mr-2">•</span>
                      <span>Multiple payment methods are frustrating</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-300 mr-2">•</span>
                      <span>Costs vary with group participation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-300 mr-2">•</span>
                      <span>Privacy and security concerns</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">User Journey Map</h2>
            <p className="text-indigo-200">
              We analyze every step of our users' subscription sharing journey to understand their needs, identify pain points, and create personalized solutions.
            </p>
          </div>
          
          <div className="bg-indigo-800 p-8 rounded-lg shadow-md">
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-indigo-600 -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-500 -translate-y-1/2 w-3/4"></div>
              
              <div className="flex justify-between relative z-10">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <p className="font-medium text-white">Discover</p>
                  <p className="text-xs text-indigo-200 mt-1 max-w-24">Find services to share</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <p className="font-medium text-white">Connect</p>
                  <p className="text-xs text-indigo-200 mt-1 max-w-24">Join trusted groups</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <p className="font-medium text-white">Share</p>
                  <p className="text-xs text-indigo-200 mt-1 max-w-24">Access subscriptions</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-indigo-600 text-indigo-300 flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <span className="text-xl font-bold">4</span>
                  </div>
                  <p className="font-medium text-indigo-300">Save</p>
                  <p className="text-xs text-indigo-400 mt-1 max-w-24">Monitor and maximize savings</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-indigo-200">
                Our platform makes it easy to find subscription sharing partners, manage payments securely, and save money consistently.
              </p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full text-sm shadow-sm">
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialPage;