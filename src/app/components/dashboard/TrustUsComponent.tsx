import React from 'react';
import { Shield, Lock, RefreshCw, CreditCard, CheckCircle, Users } from 'lucide-react';

const TrustCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1">
    <div className="flex flex-col items-center text-center mb-4">
      <div className="p-4 bg-blue-100 rounded-full mb-4">
        <Icon className="h-8 w-8 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    </div>
    <p className="text-gray-600 text-center">
      {description}
    </p>
  </div>
);

const StatCard = ({ value, label }) => (
  <div className="text-center">
    <p className="text-3xl font-bold text-blue-600 mb-1">{value}</p>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);

const TrustUsComponent = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-700 to-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-3">Trust Our System.<br/>Share Safely.</h2>
          <div className="w-24 h-1 bg-white mx-auto mb-6 rounded-full"></div>
          <p className="text-xl max-w-2xl mx-auto">
            Our secure escrow payment system ensures fair subscription sharing for everyone.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <TrustCard 
            icon={Shield}
            title="Secure Escrow System"
            description="All payments are held in our secure escrow system until service delivery is confirmed, preventing fraud and ensuring everyone gets what they paid for."
          />
          
          <TrustCard
            icon={Lock}
            title="Password Protection"
            description="Our system monitors password changes and access, automatically pausing payments and notifying all group members if suspicious activity is detected."
          />
          
          <TrustCard
            icon={RefreshCw}
            title="Fair Refund Policy"
            description="If service access is interrupted or compromised, our automated system instantly processes prorated refunds to affected members without hassle."
          />
          
          <TrustCard
            icon={CreditCard}
            title="Transparent Payments"
            description="All members see exactly what they're paying for, when payments are processed, and who's in their sharing group, with detailed transaction histories."
          />
          
          <TrustCard
            icon={CheckCircle}
            title="Dispute Resolution"
            description="Our dedicated team resolves sharing disputes within 24 hours, with automated evidence collection to ensure fair outcomes for all members."
          />
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="p-4 bg-blue-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Trust by the Numbers</h3>
            </div>
            
            <div className="p-6 bg-blue-50 rounded-xl mb-6 shadow-inner">
              <div className="grid grid-cols-2 gap-6">
                <StatCard value="99.8%" label="Trouble-free Shares" />
                <StatCard value="<2hrs" label="Issue Resolution" />
                <StatCard value="15,000+" label="Active Groups" />
                <StatCard value="4.9/5" label="Trust Rating" />
              </div>
            </div>
            
            <p className="text-gray-600 text-center italic font-medium">
              "Join thousands of members who safely share subscriptions without the risks."
            </p>
          </div>
        </div>
        
        <div className="text-center bg-white p-10 rounded-2xl shadow-xl max-w-3xl mx-auto border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to start sharing safely?</h3>
          <p className="text-gray-600 mb-6">
            Our platform handles all the complex parts so you can enjoy premium services at a fraction of the cost.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-colors text-lg">
            Get Started
          </button>
          <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
            <Shield className="h-4 w-4 mr-2" />
            <p>Protected by our 30-day money-back guarantee</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustUsComponent;