// pages/shipping-delivery.tsx
import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Truck, Zap, Globe, Clock, Shield, AlertCircle, CheckCircle, Wifi } from 'lucide-react';

const ShippingDeliveryPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shipping & Delivery | SubSplitter</title>
        <meta name="description" content="Learn about SubSplitter's digital service delivery and access provisioning for subscription sharing." />
      </Head>
      
      <div className="min-h-screen bg-gray-900 text-gray-100">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 py-4">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                <ArrowLeft size={20} className="mr-2" />
                Back to SubSplitter
              </Link>
              <div className="flex items-center">
                <Truck size={20} className="text-purple-400 mr-2" />
                <span className="font-semibold">Shipping & Delivery</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
              <Zap size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Shipping & Delivery</h1>
            <p className="text-xl text-gray-400 mb-2">
              Instant digital access to your shared subscriptions
            </p>
            <p className="text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-purple max-w-none">
            
            {/* Digital Service Nature */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Wifi size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Digital Service Delivery</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                SubSplitter is a digital platform that provides access to shared subscription services. 
                Unlike physical products, our services are delivered instantly through digital means. 
                There are no physical items to ship or receive.
              </p>
              
              <div className="bg-blue-800/20 border border-blue-600 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <Zap size={20} className="text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-2">Instant Access</h4>
                    <p className="text-gray-300">
                      All services are delivered digitally and access is typically granted within minutes 
                      of successful payment and verification.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Access Delivery Timeline */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Clock size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Access Delivery Timeline</h2>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-green-400">Joining Existing Pools</h4>
                    <span className="text-sm bg-green-600 text-white px-2 py-1 rounded">Instant</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Access credentials are shared immediately after payment confirmation and pool organizer approval.
                  </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-yellow-400">Creating New Pools</h4>
                    <span className="text-sm bg-yellow-600 text-white px-2 py-1 rounded">1-24 Hours</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    New pools require setup time for subscription service activation and member invitation.
                  </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-blue-400">Account Verification</h4>
                    <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded">2-10 Minutes</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    New user accounts may require email verification before accessing shared subscriptions.
                  </p>
                </div>
              </div>
            </section>

            {/* Delivery Methods */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Globe size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">How You Receive Access</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Access Credentials</h3>
              <ul className="text-gray-300 leading-relaxed mb-6 space-y-2">
                <li>• Login details shared through secure, encrypted messages</li>
                <li>• Access links sent via email and in-app notifications</li>
                <li>• Step-by-step setup instructions provided for each service</li>
                <li>• Profile slots assigned where applicable (Netflix, Spotify Family, etc.)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-200 mb-3">Delivery Channels</h3>
              <ul className="text-gray-300 leading-relaxed space-y-2">
                <li>• In-app dashboard notifications</li>
                <li>• Email confirmations and instructions</li>
                <li>• SMS alerts for time-sensitive access</li>
                <li>• Direct messages from pool organizers</li>
              </ul>
            </section>

            {/* Global Availability */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Globe size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Service Availability</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Geographic Coverage</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                SubSplitter operates globally, but access to specific subscription services depends 
                on the service provider's regional availability:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-800/20 border border-green-600 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <CheckCircle size={16} className="text-green-400 mr-2" />
                    <h4 className="font-semibold text-green-400">Supported Regions</h4>
                  </div>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• United States & Canada</li>
                    <li>• European Union</li>
                    <li>• United Kingdom</li>
                    <li>• Australia & New Zealand</li>
                  </ul>
                </div>

                <div className="bg-yellow-800/20 border border-yellow-600 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <AlertCircle size={16} className="text-yellow-400 mr-2" />
                    <h4 className="font-semibold text-yellow-400">Limited Availability</h4>
                  </div>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Asia-Pacific (varies by service)</li>
                    <li>• Latin America (select countries)</li>
                    <li>• Middle East & Africa (varies)</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-200 mb-3">Service-Specific Restrictions</h3>
              <p className="text-gray-300 leading-relaxed">
                Some subscription services have geographic restrictions that may affect access. 
                We clearly indicate regional limitations for each subscription pool before you join.
              </p>
            </section>

            {/* Access Issues & Troubleshooting */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Shield size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Access Issues & Support</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Common Access Issues</h3>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-semibold text-red-400 mb-2">Login Problems</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    If you can't access a shared subscription service:
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Check your internet connection</li>
                    <li>• Verify you're using the correct credentials</li>
                    <li>• Clear browser cache and cookies</li>
                    <li>• Try accessing from a different device</li>
                  </ul>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-semibold text-yellow-400 mb-2">Profile Conflicts</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    If someone else is using your assigned profile:
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Contact the pool organizer immediately</li>
                    <li>• Use our in-app reporting feature</li>
                    <li>• Wait for profile to become available</li>
                    <li>• Request profile reassignment if needed</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-200 mb-3">Getting Help</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you experience any access issues, our support team is available 24/7:
              </p>
              <ul className="text-gray-300 leading-relaxed space-y-2">
                <li>• Live chat support (fastest response)</li>
                <li>• Email support: support@subsplitter.com</li>
                <li>• Phone support: +1 (555) 123-4567</li>
                <li>• In-app help center and FAQs</li>
              </ul>
            </section>

            {/* Service Level Agreement */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <CheckCircle size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Service Level Agreement</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Our Commitments</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-semibold text-purple-400 mb-2">Uptime Guarantee</h4>
                  <p className="text-gray-300 text-sm">
                    99.9% platform availability with prorated credits for any downtime exceeding our SLA.
                  </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-semibold text-purple-400 mb-2">Response Times</h4>
                  <p className="text-gray-300 text-sm">
                    Critical issues resolved within 1 hour, general support within 4 hours during business days.
                  </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-semibold text-purple-400 mb-2">Access Guarantee</h4>
                  <p className="text-gray-300 text-sm">
                    If we can't provide access within 24 hours of joining a pool, you'll receive a full refund.
                  </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-semibold text-purple-400 mb-2">Security Standards</h4>
                  <p className="text-gray-300 text-sm">
                    All credentials encrypted in transit and at rest, with regular security audits and monitoring.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-200 mb-4">Need Immediate Access Help?</h3>
                <p className="text-gray-300 mb-4">
                  Our technical support team is available around the clock for access-related issues:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-purple-400 mb-2">Urgent Issues</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Live Chat: Available 24/7</li>
                      <li>• Phone: +1 (555) 123-4567</li>
                      <li>• Emergency Email: urgent@subsplitter.com</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-400 mb-2">General Support</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Email: support@subsplitter.com</li>
                      <li>• Help Center: In-app documentation</li>
                      <li>• Community Forum: User assistance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-700 pt-8 mt-12 text-center">
            <p className="text-gray-400">
              Digital access delivered instantly - no waiting, no shipping fees, no physical delivery required.
            </p>
            <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mt-4">
              <ArrowLeft size={16} className="mr-2" />
              Return to SubSplitter
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default ShippingDeliveryPage;