import React from 'react';

const FlowStep = ({ text, isHighlighted = false, className = "" }) => (
  <div className={`py-2 px-4 rounded-md text-center text-sm font-medium transition-all duration-200 ${
    isHighlighted 
      ? "bg-blue-600 text-white shadow-md" 
      : "bg-indigo-700 text-indigo-100 hover:bg-indigo-600"
  } ${className}`}>
    {text}
  </div>
);

const FlowArrow = ({ direction = "down", className = "" }) => {
  if (direction === "down") {
    return (
      <div className={`flex justify-center my-2 ${className}`}>
        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 18L0.5 6.5L3 4L12 13L21 4L23.5 6.5L12 18Z" fill="#94A3B8"/>
        </svg>
      </div>
    );
  }
  return (
    <div className={`flex justify-center my-2 ${className}`}>
      <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 24L0 15L2.5 12.5L7 17V0H11V17L15.5 12.5L18 15L9 24Z" fill="#94A3B8"/>
      </svg>
    </div>
  );
};

const UserFlows = () => {
  return (
    <div className="bg-indigo-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-3">User Flows</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-indigo-200 max-w-3xl mx-auto text-lg">
            We visually mapped key touchpoints to optimize 3 specific goals of our users.
            These flows helped us make data-informed choices about implementation,
            features prioritization, and UX improvements.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Column - Join Group Flow */}
          <div className="bg-indigo-800 rounded-xl shadow-xl p-8 border border-indigo-700 hover:shadow-2xl transition-all duration-300">
            <div className="mb-8 flex items-center">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-blue-700 flex-shrink-0 shadow-md border-2 border-blue-500">
                <img src="/api/placeholder/48/48" alt="User avatar" className="w-full h-full object-cover" />
              </div>
              <div className="ml-4 p-4 bg-blue-700 text-blue-100 rounded-lg max-w-xs shadow">
                <p className="text-sm font-medium">I want to join an existing subscription group to save money on premium streaming services</p>
              </div>
            </div>
            
            <div className="border-2 border-indigo-700 rounded-lg p-6 bg-indigo-800/50">
              <h3 className="text-xl font-bold text-center mb-6 text-white">Join Group Flow</h3>
              <div className="flex flex-col items-center space-y-1">
                <FlowStep text="Browse Groups" isHighlighted={true} className="w-64" />
                <FlowArrow />
                <FlowStep text="Filter by Service" className="w-64" />
                <FlowArrow />
                <FlowStep text="View Group Details" isHighlighted={true} className="w-64" />
                <FlowArrow />
                <FlowStep text="Check Reviews" className="w-64" />
                <FlowArrow />
                <FlowStep text="Send Join Request" isHighlighted={true} className="w-64" />
                <FlowArrow />
                <FlowStep text="Payment Setup" className="w-64" />
                <FlowArrow />
                <FlowStep text="Verify Identity" className="w-64" />
                <FlowArrow />
                <FlowStep text="Confirm Payment Method" isHighlighted={true} className="w-64" />
                <FlowArrow />
                <FlowStep text="Access Shared Account" className="w-64" />
                <FlowArrow />
                <FlowStep text="Rate Experience" className="w-64" />
              </div>
            </div>
          </div>
          
          {/* Right Column - Create Group Flow */}
          <div className="bg-indigo-800 rounded-xl shadow-xl p-8 border border-indigo-700 hover:shadow-2xl transition-all duration-300">
            <div className="mb-8 flex items-center">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-blue-700 flex-shrink-0 shadow-md border-2 border-blue-500">
                <img src="/api/placeholder/48/48" alt="User avatar" className="w-full h-full object-cover" />
              </div>
              <div className="ml-4 p-4 bg-blue-700 text-blue-100 rounded-lg max-w-xs shadow">
                <p className="text-sm font-medium">I want to create a new subscription group and invite friends to share the costs</p>
              </div>
            </div>
            
            <div className="border-2 border-indigo-700 rounded-lg p-6 bg-indigo-800/50">
              <h3 className="text-xl font-bold text-center mb-6 text-white">Create Group Flow</h3>
              <div className="flex flex-col items-center">
                <FlowStep text="Create Group" isHighlighted={true} className="w-64" />
                <FlowArrow />
                <FlowStep text="Select Service" className="w-64" />
                <FlowArrow />
                <FlowStep text="Set Sharing Terms" isHighlighted={true} className="w-64" />
                <div className="grid grid-cols-2 w-full gap-4 mt-3">
                  <div className="flex flex-col items-center">
                    <FlowStep text="Public Group" className="w-full" />
                    <FlowArrow />
                    <FlowStep text="Set Member Limit" className="w-full" />
                  </div>
                  <div className="flex flex-col items-center">
                    <FlowStep text="Private Group" className="w-full" />
                    <FlowArrow />
                    <FlowStep text="Add Friends" isHighlighted={true} className="w-full" />
                  </div>
                </div>
                <div className="w-full flex justify-center mt-3">
                  <FlowStep text="Add Payment Details" isHighlighted={true} className="w-3/4" />
                </div>
                <FlowArrow />
                <FlowStep text="Invite Members" className="w-64" />
                <FlowArrow />
                <FlowStep text="Payment Collection" isHighlighted={true} className="w-64" />
                <FlowArrow />
                <FlowStep text="Share Access" className="w-64" />
                <FlowArrow />
                <FlowStep text="Manage Group" className="w-64" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-indigo-200 italic">These user flows help us continuously improve our subscription sharing platform to deliver a seamless experience.</p>
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition-colors">
            Learn More About Our Process
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFlows;