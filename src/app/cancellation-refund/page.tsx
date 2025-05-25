// pages/cancellation-refund.tsx
import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, DollarSign, Clock, AlertTriangle, CheckCircle, XCircle, Calendar } from 'lucide-react';

const CancellationRefundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cancellation & Refund Policy | SubSplitter</title>
        <meta name="description" content="Learn about SubSplitter's cancellation and refund policies for subscription sharing services." />
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
                <RefreshCw size={20} className="text-purple-400 mr-2" />
                <span className="font-semibold">Cancellation & Refund Policy</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
              <RefreshCw size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Cancellation & Refund Policy</h1>
            <p className="text-xl text-gray-400 mb-2">
              Understanding your options for cancellations and refunds
            </p>
            <p className="text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-purple max-w-none">
            
            {/* Overview */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <DollarSign size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Overview</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                At SubSplitter, we understand that circumstances change. This policy outlines our 
                cancellation and refund procedures for our subscription sharing services. We strive 
                to be fair and transparent while maintaining the integrity of our platform.
              </p>
            </section>

            {/* Cancellation Policy */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <XCircle size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Cancellation Policy</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Subscription Pool Cancellations</h3>
              <ul className="text-gray-300 leading-relaxed mb-6 space-y-2">
                <li>• You can cancel your participation in any subscription pool at any time</li>
                <li>• Cancellations take effect at the end of your current billing cycle</li>
                <li>• You'll retain access to shared subscriptions until the cancellation date</li>
                <li>• Pool organizers will be notified of your cancellation</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-200 mb-3">Pool Organizer Cancellations</h3>
              <ul className="text-gray-300 leading-relaxed mb-6 space-y-2">
                <li>• Pool organizers must provide 30 days notice before canceling a pool</li>
                <li>• All pool members will be notified immediately of the cancellation</li>
                <li>• Members will have access until the end of the current billing period</li>
                <li>• Organizers are responsible for handling the underlying subscription service</li>
              </ul>

              <div className="bg-yellow-800/20 border border-yellow-600 rounded-lg p-6 mt-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle size={20} className="text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-400 mb-2">Important Notice</h4>
                    <p className="text-gray-300">
                      Canceling your SubSplitter participation does not automatically cancel the underlying 
                      subscription service. You must handle that separately with the service provider.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Refund Policy */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <DollarSign size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Refund Policy</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Eligible Refund Scenarios</h3>
              <div className="space-y-4 mb-6">
                <div className="bg-green-800/20 border border-green-600 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-green-400 mb-1">Technical Issues</h4>
                      <p className="text-gray-300 text-sm">
                        Full refund if our platform fails to provide access for more than 48 hours
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-800/20 border border-green-600 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-green-400 mb-1">Pool Organizer Issues</h4>
                      <p className="text-gray-300 text-sm">
                        Prorated refund if pool organizer fails to maintain the subscription service
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-800/20 border border-green-600 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-green-400 mb-1">Billing Errors</h4>
                      <p className="text-gray-300 text-sm">
                        Full refund for any incorrect charges or duplicate payments
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-200 mb-3">Non-Refundable Scenarios</h3>
              <ul className="text-gray-300 leading-relaxed space-y-2">
                <li>• Voluntary cancellations without technical issues</li>
                <li>• Partial month usage (except for technical failures)</li>
                <li>• Changes of mind or personal circumstances</li>
                <li>• Issues with the underlying subscription service (Netflix, Spotify, etc.)</li>
                <li>• Violations of our Terms of Service</li>
              </ul>
            </section>

            {/* Refund Process */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Clock size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Refund Process</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-200 mb-3">How to Request a Refund</h3>
              <ol className="text-gray-300 leading-relaxed mb-6 space-y-2">
                <li>1. Contact our support team at support@subsplitter.com</li>
                <li>2. Provide your account details and reason for the refund request</li>
                <li>3. Include any relevant documentation or screenshots</li>
                <li>4. Our team will review your request within 2-3 business days</li>
              </ol>

              <h3 className="text-xl font-semibold text-gray-200 mb-3">Processing Times</h3>
              <ul className="text-gray-300 leading-relaxed space-y-2">
                <li>• Credit/Debit Cards: 5-10 business days</li>
                <li>• PayPal: 3-5 business days</li>
                <li>• Bank Transfers: 7-14 business days</li>
                <li>• Digital Wallets: 1-3 business days</li>
              </ul>
            </section>

            {/* Special Circumstances */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <AlertTriangle size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Special Circumstances</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Service Interruptions</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                If a shared subscription service becomes unavailable due to changes in the service 
                provider's policies or other factors beyond our control, we will:
              </p>
              <ul className="text-gray-300 leading-relaxed mb-6 space-y-2">
                <li>• Notify all affected users immediately</li>
                <li>• Provide prorated refunds for remaining subscription time</li>
                <li>• Assist in finding alternative subscription pools where possible</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-200 mb-3">Account Violations</h3>
              <p className="text-gray-300 leading-relaxed">
                Users whose accounts are suspended or terminated for violating our Terms of Service 
                are not eligible for refunds. This includes sharing account credentials outside of 
                approved pool members or engaging in fraudulent activities.
              </p>
            </section>

            {/* Dispute Resolution */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <CheckCircle size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Dispute Resolution</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you're not satisfied with our refund decision, you can:
              </p>
              <ul className="text-gray-300 leading-relaxed space-y-2">
                <li>• Request a review by our senior support team</li>
                <li>• Provide additional evidence or documentation</li>
                <li>• Contact us through our formal dispute process</li>
                <li>• Escalate to relevant consumer protection agencies if needed</li>
              </ul>
            </section>

            {/* Policy Changes */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Calendar size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Policy Changes</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                We may update this cancellation and refund policy from time to time. Any changes 
                will be posted on this page with an updated revision date. Continued use of our 
                services after changes constitutes acceptance of the new policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-200 mb-4">Need Help?</h3>
                <p className="text-gray-300 mb-4">
                  For questions about cancellations, refunds, or to start the process:
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>• Email: support@subsplitter.com</li>
                  <li>• Phone: +1 (555) 123-4567</li>
                  <li>• Live Chat: Available on our website</li>
                  <li>• Support Hours: Monday-Friday, 9 AM - 6 PM PST</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-700 pt-8 mt-12 text-center">
            <p className="text-gray-400">
              This policy is designed to be fair to all parties while maintaining service quality.
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

export default CancellationRefundPage;