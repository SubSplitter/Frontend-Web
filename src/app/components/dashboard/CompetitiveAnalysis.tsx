import React from 'react';

const CompetitiveAnalysis = () => {
  return (
    <div className="bg-indigo-900 p-6 rounded-lg w-full max-w-6xl mx-auto text-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Competitive Analysis</h2>
        <p className="text-indigo-200 max-w-3xl mx-auto">
          We compared subscription sharing platforms in the market and identified key differentiators
          based on their Price, Unique Value Proposition, Features, Strengths & Weaknesses
        </p>
      </div>

      <div className="hidden md:grid md:grid-cols-5 gap-3 mb-4">
        {/* Header Row */}
        {['Product price', 'UVP (Unique Value Proposition)', 'Features', 'Strengths', 'Weaknesses'].map((header) => (
          <div key={header} className="bg-blue-600 text-white p-3 rounded-md text-center font-medium">
            {header}
          </div>
        ))}
      </div>

      {/* Comparison Cards */}
      {[{
        name: 'ShareSplit',
        logo: 'S',
        color: 'bg-blue-500',
        price: 'Free + 5% fee',
        uvp: 'Split subscription costs fairly between users',
        features: 'Subscription splitting, automatic payments, user management, savings calculator',
        strengths: 'Simple to use, cost-effective, transparent fee structure',
        weaknesses: 'New platform, limited integration with all subscription services'
      }, {
        name: 'SplitPay',
        logo: 'SP',
        color: 'bg-purple-500',
        price: '$3/month + fees',
        uvp: 'Group payment management for subscriptions',
        features: 'Payment reminders, multi-service support, basic billing',
        strengths: 'Established user base, multiple payment methods',
        weaknesses: 'Higher monthly fee, complex setup process'
      }, {
        name: 'SubShare',
        logo: 'SS',
        color: 'bg-green-500',
        price: '10% per transaction',
        uvp: 'Marketplace for unused subscription seats',
        features: 'Subscription marketplace, credential sharing, profile management',
        strengths: 'Large service catalog, strong security features',
        weaknesses: 'High percentage fee, potential terms of service issues with providers'
      }].map((company, index) => (
        <div key={company.name} className={`md:grid md:grid-cols-5 gap-3 mb-6 rounded-lg overflow-hidden shadow-md ${index === 0 ? 'border-2 border-blue-400 bg-blue-800' : 'bg-indigo-800'}`}>
          <div className="flex items-center p-4 md:block md:h-full">
            <div className="md:hidden font-bold text-indigo-200 mb-1">Company</div>
            <div className="flex items-center">
              <div className={`w-10 h-10 ${company.color} rounded-full flex items-center justify-center text-white font-bold mr-3`}>
                {company.logo}
              </div>
              <div>
                <div className="font-bold text-white">{company.name}</div>
                <div className="text-sm font-medium text-indigo-200">{company.price}</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t md:border-t-0 md:border-l border-indigo-700">
            <div className="md:hidden font-bold text-indigo-200 mb-1">UVP</div>
            <div className="text-indigo-100">{company.uvp}</div>
          </div>
          
          <div className="p-4 border-t md:border-t-0 md:border-l border-indigo-700">
            <div className="md:hidden font-bold text-indigo-200 mb-1">Features</div>
            <ul className="list-disc list-inside text-sm space-y-1 text-indigo-100">
              {company.features.split(', ').map(feature => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="p-4 border-t md:border-t-0 md:border-l border-indigo-700">
            <div className="md:hidden font-bold text-indigo-200 mb-1">Strengths</div>
            <ul className="list-disc list-inside text-sm space-y-1 text-green-300">
              {company.strengths.split(', ').map(strength => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </div>
          
          <div className="p-4 border-t md:border-t-0 md:border-l border-indigo-700">
            <div className="md:hidden font-bold text-indigo-200 mb-1">Weaknesses</div>
            <ul className="list-disc list-inside text-sm space-y-1 text-red-300">
              {company.weaknesses.split(', ').map(weakness => (
                <li key={weakness}>{weakness}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {/* Savings Showcase */}
      <div className="mt-10 bg-indigo-800 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-6 text-center text-white">Sample Savings with ShareSplit</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
            service: 'Netflix Premium',
            icon: '📺',
            users: 6,
            total: '₹2000/month',
            individual: '₹2000/month',
            split: '₹350/month per user',
            savings: '₹1650/month',
            percent: '82.5%'
          }, {
            service: 'Spotify Family',
            icon: '🎵',
            users: 6,
            total: '₹1000/month',
            individual: '₹250/month',
            split: '₹175/month per user',
            savings: '₹75/month',
            percent: '30%'
          }, {
            service: 'YouTube Premium',
            icon: '🎬',
            users: 5,
            total: '₹1500/month',
            individual: '₹500/month',
            split: '₹315/month per user',
            savings: '₹185/month',
            percent: '37%'
          }].map((plan) => (
            <div key={plan.service} className="p-5 bg-indigo-700 rounded-lg border border-indigo-600 hover:shadow-lg transition-shadow">
              <div className="flex items-start">
                <div className="text-3xl mr-3">{plan.icon}</div>
                <div>
                  <p className="font-bold text-white text-lg">{plan.service}</p>
                  <p className="text-sm text-indigo-200">{plan.users} users</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-indigo-300">Standard cost:</span>
                  <span className="text-sm font-medium text-white">{plan.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-indigo-300">Individual price:</span>
                  <span className="text-sm font-medium text-white">{plan.individual}</span>
                </div>
                <div className="h-px bg-indigo-600 my-3"></div>
                <div className="flex justify-between font-semibold">
                  <span className="text-sm text-blue-300">ShareSplit price:</span>
                  <span className="text-sm text-blue-300">{plan.split}</span>
                </div>
                <div className="flex items-center mt-4 bg-green-800 p-2 rounded">
                  <span className="text-xs font-bold text-green-200">SAVINGS</span>
                  <span className="ml-auto text-sm font-bold text-green-200">{plan.savings} ({plan.percent})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetitiveAnalysis;