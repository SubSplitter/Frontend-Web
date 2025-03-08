// pages/dashboard.tsx
import Head from 'next/head';
import Link from 'next/link';

export default function Dashboard() {
  // Mock data - would come from API in real implementation
  const userSubscriptions = [
    { id: 1, name: 'Netflix Premium', type: 'netflix', status: 'active', nextPayment: '2025-03-15', monthlyCost: 3.99 },
    { id: 2, name: 'YouTube Premium', type: 'youtube', status: 'active', nextPayment: '2025-03-22', monthlyCost: 2.50 },
    { id: 3, name: 'Amazon Prime', type: 'amazon', status: 'active', nextPayment: '2025-04-01', monthlyCost: 2.99 }
  ];

  const userPools = [
    { id: 1, name: 'Netflix Family', service: 'Netflix', members: 4, maxMembers: 5, role: 'Member' },
    { id: 2, name: 'YouTube Group', service: 'YouTube', members: 3, maxMembers: 6, role: 'Owner' }
  ];

  const getServiceColor = (type: string) => {
    switch(type) {
      case 'netflix': return 'bg-red-500';
      case 'youtube': return 'bg-red-600';
      case 'amazon': return 'bg-blue-500';
      default: return 'bg-purple-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Dashboard | SubShare</title>
        <meta name="description" content="Manage your subscription pools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* User stats summary */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900">Your Subscription Summary</h2>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Active Subscriptions</p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">{userSubscriptions.length}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Monthly Savings</p>
                    <p className="mt-1 text-3xl font-semibold text-green-600">
                      ${(userSubscriptions.reduce((acc, sub) => acc + sub.monthlyCost, 0)).toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Pools Joined</p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">{userPools.length}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Pools Owned</p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">
                      {userPools.filter(pool => pool.role === 'Owner').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Link href="/pools/create" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Create New Pool
                  </Link>
                  <Link href="/pools" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Join a Pool
                  </Link>
                  <Link href="/subscriptions" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Manage Subscriptions
                  </Link>
                  <Link href="/profile" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    Update Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Your Subscriptions */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-gray-900">Your Subscriptions</h2>
              <Link href="/subscriptions" className="text-sm text-indigo-600 hover:text-indigo-500">
                View all
              </Link>
            </div>
            <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Service</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Next Payment</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Monthly Cost</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {userSubscriptions.map((subscription) => (
                    <tr key={subscription.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${getServiceColor(subscription.type)} text-white`}>
                            {subscription.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{subscription.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          {subscription.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{subscription.nextPayment}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${subscription.monthlyCost.toFixed(2)}/mo</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link href={`/subscriptions/${subscription.id}`} className="text-indigo-600 hover:text-indigo-900">
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Your Pools */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-gray-900">Your Pools</h2>
              <Link href="/pools" className="text-sm text-indigo-600 hover:text-indigo-500">
                View all
              </Link>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {userPools.map((pool) => (
                <div key={pool.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${pool.service === 'Netflix' ? 'bg-red-500' : 'bg-red-600'} text-white`}>
                          {pool.service.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-5">
                        <h3 className="text-lg font-medium text-gray-900">{pool.name}</h3>
                        <p className="text-sm text-gray-500">{pool.service} - {pool.role}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-500">Members</span>
                        <span className="text-sm text-gray-900">{pool.members}/{pool.maxMembers}</span>
                      </div>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${(pool.members / pool.maxMembers) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-5">
                      <Link href={`/pools/${pool.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        View Details &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-gray-50 overflow-hidden shadow rounded-lg border-2 border-dashed border-gray-300">
                <div className="px-4 py-5 sm:p-6 flex flex-col items-center justify-center h-full">
                  <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Create a new pool
                  </span>
                  <Link href="/pools/create" className="mt-2 text-sm text-indigo-600 hover:text-indigo-500">
                    Get started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}