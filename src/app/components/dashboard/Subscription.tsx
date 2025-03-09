import React from 'react';
import { CheckCircle, ShieldCheck, Users, Calculator } from 'lucide-react';

const SubscriptionDashboard = () => {
  return (
    <div className="relative  rounded-xl p-8 shadow-lg max-w-4xl mx-auto text-white">
      {/* Inner grid effect with different opacity to create depth */}
      <div className="absolute inset-0 rounded-xl overflow-hidden z-0">
        <div className="grid-pattern-inner h-full w-full opacity-20" />
      </div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="bg-blue-600 rounded-full p-3 flex-shrink-0 shadow-glow">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
              SS
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-6 rounded-lg max-w-md shadow-lg backdrop-blur-sm border border-blue-700/30">
            <h3 className="text-xl font-bold mb-2">Sharing Made Simple</h3>
            <p className="text-lg">
              Ever wanted to share subscription costs with friends but found it hard to manage? Our platform makes it simple and stress-free! 🤝
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
            SplitSub
          </h2>
          <p className="text-xl opacity-90">
            <span className="font-medium text-blue-300">Netflix, Spotify, HBO, Disney+</span> and more - designed to give you total control over your shared subscriptions.
          </p>
        </div>

        <div className="mb-8 bg-blue-900/30 p-6 rounded-lg border-l-4 border-blue-500 backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-3 text-blue-200">
            Split costs effortlessly, without the hassle!
          </h3>
          <p className="leading-relaxed opacity-90">
            SplitSub also lets you customize payment reminders and sync important payment dates directly to your personal calendar. Say goodbye 👋 to awkward money conversations and hello to simplicity and peace of mind.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white rounded-lg p-6 shadow-lg backdrop-blur-sm border border-blue-700/30">
          <h3 className="font-bold text-xl mb-4 text-blue-200">Benefits of sharing subscriptions with us:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start group hover:bg-blue-900/30 p-3 rounded-lg transition-all duration-300">
              <div className="bg-white p-2 rounded-full mr-3 flex-shrink-0 shadow-glow group-hover:shadow-glow-intense transition-all duration-300">
                <Calculator className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="font-semibold text-blue-100">Save up to 75% on subscriptions</p>
                <p className="text-sm text-blue-300">Split costs and maximize your savings</p>
              </div>
            </div>
            <div className="flex items-start group hover:bg-blue-900/30 p-3 rounded-lg transition-all duration-300">
              <div className="bg-white p-2 rounded-full mr-3 flex-shrink-0 shadow-glow group-hover:shadow-glow-intense transition-all duration-300">
                <CheckCircle className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="font-semibold text-blue-100">Automated payment splitting</p>
                <p className="text-sm text-blue-300">Let our system handle the math for you</p>
              </div>
            </div>
            <div className="flex items-start group hover:bg-blue-900/30 p-3 rounded-lg transition-all duration-300">
              <div className="bg-white p-2 rounded-full mr-3 flex-shrink-0 shadow-glow group-hover:shadow-glow-intense transition-all duration-300">
                <Users className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="font-semibold text-blue-100">No more chasing friends</p>
                <p className="text-sm text-blue-300">Automated reminders do the work for you</p>
              </div>
            </div>
            <div className="flex items-start group hover:bg-blue-900/30 p-3 rounded-lg transition-all duration-300">
              <div className="bg-white p-2 rounded-full mr-3 flex-shrink-0 shadow-glow group-hover:shadow-glow-intense transition-all duration-300">
                <ShieldCheck className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="font-semibold text-blue-100">Secure payment handling</p>
                <p className="text-sm text-blue-300">Your financial data is always protected</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-500/30 transition duration-300 transform hover:scale-105 relative overflow-hidden group">
            <span className="relative z-10">Start Sharing & Saving Today</span>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <p className="text-blue-300 mt-2">No credit card required to get started</p>
        </div>
      </div>
      
      {/* Inner grid pattern CSS */}
      <style jsx>{`
        .grid-pattern-inner {
          background-size: 30px 30px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        }
        .shadow-glow {
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
        }
        .shadow-glow-intense {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default SubscriptionDashboard;