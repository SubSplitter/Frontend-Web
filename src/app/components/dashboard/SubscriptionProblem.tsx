import React from 'react';
import { AlertCircle } from 'lucide-react';

const SubscriptionProblems = () => {
  return (
    <div className=" py-16 px-4 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 z-0">
        <div className="grid-pattern h-full w-full opacity-20" />
      </div>
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-blue-600/20 filter blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 rounded-full bg-indigo-600/20 filter blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 text-center mb-6">
          Common Subscription Sharing Problems
        </h2>
        
        <p className="text-center text-blue-300 mb-16 max-w-2xl mx-auto">
          After analyzing feedback from hundreds of users, we've identified these key pain points with subscription sharing:
        </p>
        
        <div className="relative h-96 md:h-96">
          {/* Problem card 1 */}
          <div className="absolute left-4 md:left-0 top-0 transform -rotate-6 bg-gradient-to-br from-blue-900 to-indigo-950 rounded-lg p-5 shadow-lg max-w-xs border-l-4 border-yellow-500 transition-all duration-300 hover:shadow-yellow-500/30 hover:scale-105">
            <div className="flex items-start mb-2">
              <AlertCircle className="text-yellow-500 mr-2" size={18} />
              <h3 className="font-bold text-yellow-200">Payment Chaos</h3>
            </div>
            <p className="text-blue-200">
              People struggle to organize who pays for shared subscriptions
              <span className="font-semibold text-yellow-300"> causing payment delays</span> and conflicts
            </p>
            <div className="absolute -top-3 -right-2 bg-yellow-500 rounded-full p-1">
              <span className="text-lg" role="img" aria-label="worried face">😟</span>
            </div>
          </div>
          
          {/* Problem card 2 */}
          <div className="absolute left-1/4 top-1/3 transform rotate-3 bg-gradient-to-br from-blue-900 to-indigo-950 rounded-lg p-5 shadow-lg max-w-xs border-l-4 border-blue-500 transition-all duration-300 hover:shadow-blue-500/30 hover:scale-105">
            <div className="flex items-start mb-2">
              <AlertCircle className="text-blue-500 mr-2" size={18} />
              <h3 className="font-bold text-blue-200">Tracking Hassle</h3>
            </div>
            <p className="text-blue-200">
              <span className="font-semibold text-blue-300">Tracking who owes what</span> for shared Netflix, Spotify, and other services becomes overwhelming
            </p>
            <div className="absolute -top-3 -right-2 bg-blue-500 rounded-full p-1">
              <span className="text-lg" role="img" aria-label="money face">🤑</span>
            </div>
          </div>
          
          {/* Problem card 3 */}
          <div className="absolute right-4 md:right-0 top-0 transform rotate-6 bg-gradient-to-br from-blue-900 to-indigo-950 rounded-lg p-5 shadow-lg max-w-xs border-l-4 border-purple-500 transition-all duration-300 hover:shadow-purple-500/30 hover:scale-105">
            <div className="flex items-start mb-2">
              <AlertCircle className="text-purple-500 mr-2" size={18} />
              <h3 className="font-bold text-purple-200">Cost Division</h3>
            </div>
            <p className="text-blue-200">
              <span className="font-semibold text-purple-300">Unclear division</span> of subscription costs among friends and family
            </p>
            <div className="absolute -top-3 -right-2 bg-purple-500 rounded-full p-1">
              <span className="text-lg" role="img" aria-label="confused face">🤔</span>
            </div>
          </div>
          
          {/* Problem card 4 */}
          <div className="absolute left-8 bottom-0 transform -rotate-6 bg-gradient-to-br from-blue-900 to-indigo-950 rounded-lg p-5 shadow-lg max-w-xs border-l-4 border-green-500 transition-all duration-300 hover:shadow-green-500/30 hover:scale-105">
            <div className="flex items-start mb-2">
              <AlertCircle className="text-green-500 mr-2" size={18} />
              <h3 className="font-bold text-green-200">Date Tracking</h3>
            </div>
            <p className="text-blue-200">
              Keeping track of different subscription
              <span className="font-semibold text-green-300"> payment dates</span> shared across multiple people
            </p>
            <div className="absolute -top-3 -right-2 bg-green-500 rounded-full p-1">
              <span className="text-lg" role="img" aria-label="calendar face">📅</span>
            </div>
          </div>
          
          {/* Problem card 5 */}
          <div className="absolute right-8 bottom-0 transform rotate-6 bg-gradient-to-br from-blue-900 to-indigo-950 rounded-lg p-5 shadow-lg max-w-xs border-l-4 border-red-500 transition-all duration-300 hover:shadow-red-500/30 hover:scale-105">
            <div className="flex items-start mb-2">
              <AlertCircle className="text-red-500 mr-2" size={18} />
              <h3 className="font-bold text-red-200">Fair Usage</h3>
            </div>
            <p className="text-blue-200">
              Finding fair ways to split costs when
              <span className="font-semibold text-red-300"> usage is uneven</span> among group members
            </p>
            <div className="absolute -top-3 -right-2 bg-red-500 rounded-full p-1">
              <span className="text-lg" role="img" aria-label="money face">💰</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Style for grid pattern */}
      <style jsx>{`
        .grid-pattern {
          background-size: 30px 30px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
};



export default SubscriptionProblems;