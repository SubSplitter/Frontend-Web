// pages/terms.tsx

import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, FileText, Scale, AlertCircle, DollarSign, Users, Shield, Clock, Gavel } from 'lucide-react';

const TermsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions | SubSplitter</title>
        <meta name="description" content="Read SubSplitter's terms and conditions to understand your rights and responsibilities when using our platform." />
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
                <FileText size={20} className="text-purple-400 mr-2" />
                <span className="font-semibold">Terms and Conditions</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
              <Scale size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
            <p className="text-xl text-gray-400 mb-2">
              Legal terms for using SubSplitter
            </p>
            <p className="text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-purple max-w-none">
            
            {/* Introduction */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <FileText size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Agreement to Terms</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Welcome to SubSplitter. These Terms and Conditions ("Terms") govern your use of our subscription 
                sharing platform and services. By accessing or using SubSplitter, you agree to be bound by these 
                Terms. If you disagree with any part of these terms, you may not access our service.
              </p>
            </section>

            {/* Service Description */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Users size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Service Description</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                SubSplitter is a platform that enables users to share subscription costs with others. Our service includes:
              </p>
              <ul className="text-gray-300 leading-relaxed space-y-2">
                <li>• Creating and joining subscription sharing pools</li>
                <li>• Managing payments and cost distribution</li>
                <li>• Facilitating communication between pool members</li>
                <li>• Providing account management tools</li>
                <li>• Processing secure payments through third-party providers</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Shield size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">User Accounts</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Account Creation</h3>
              <ul className="text-gray-300 leading-relaxed mb-6 space-y-2">
                <li>• You must be at least 18 years old to create an account</li>
                <li>• You must provide accurate and complete information</li>
                <li>• You are responsible for maintaining account security</li>
                <li>• One person may only maintain one account</li>
                <li>• You must notify us immediately of any unauthorized use</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-200 mb-3">Account Responsibilities</h3>
              <ul className="text-gray-300 leading-relaxed space-y-2">
                <li>• Keep your login credentials secure and confidential</li>
                <li>• Update your information when changes occur</li>
                <li>• Use the service in compliance with these Terms</li>
                <li>• Respect other users and maintain appropriate conduct</li>
              </ul>
            </section>

            {/* Subscription Pools */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Users size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Subscription Pools</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Pool Creation and Management</h3>
              <ul className="text-gray-300 leading-relaxed mb-6 space-y-2">
                <li>• Pool creators are responsible for managing their pools</li>
                <li>• Pool details must be accurate and updated regularly</li>
                <li>• Pool creators must have valid subscriptions to share</li>
                <li>• Pool capacity and pricing must be clearly stated</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-200 mb-3">Pool Participation</h3>
              <ul className="text-gray-300 leading-relaxed space-y-2">
                <li>• Pool members must pay their share on time</li>
                <li>• Members must follow pool-specific rules and guidelines</li>
                <li>• Members may leave pools with appropriate notice</li>
                <li>• Inappropriate behavior may result in removal from pools</li>
              </ul>
            </section>

            {/* Payments and Billing */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <DollarSign size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Payments and Billing</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Payment Processing</h3>
              <ul className="text-gray-300 leading-relaxed mb-6 space-y-2">
                <li>• All payments are processed through secure third-party providers</li>
                <li>• We do not store your payment information directly</li>
                <li>• Payment methods must be valid and have sufficient funds</li>
                <li>• You authorize us to charge your payment method for services</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-200 mb-3">Fees and Charges</h3>
              <ul className="text-gray-300 leading-relaxed mb-6 space-y-2">
                <li>• SubSplitter charges a small service fee for transactions</li>
                <li>• Fees are clearly displayed before completing transactions</li>
                <li>• Pool creators may be charged additional management fees</li>
                <li>• Failed payments may incur additional charges</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-200 mb-3">Refunds and Disputes</h3>
              <ul className="text-gray-300 leading-relaxed space-y-2">
                <li>• Refunds are handled on a case-by-case basis</li>
                <li>• Service fees are generally non-refundable</li>
                <li>• Disputes should be reported immediately</li>
                <li>• We reserve the right to investigate and resolve disputes</li>
              </ul>
            </section>

            {/* Prohibited Uses */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <AlertCircle size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Prohibited Uses</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                You may not use SubSplitter for any unlawful or prohibited activities, including:
              </p>
              <ul className="text-gray-300 leading-relaxed space-y-2">
                <li>• Violating any applicable laws or regulations</li>
                <li>• Sharing accounts without proper authorization from service providers</li>
                <li>• Creating fake accounts or providing false information</li>
                <li>• Attempting to circumvent payment systems</li>
                <li>• Harassing, threatening, or abusing other users</li>
                <li>• Engaging in fraudulent or deceptive practices</li>
                <li>• Interfering with the platform's operation or security</li>
                <li>• Using automated tools to access the service</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Shield size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Intellectual Property</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                SubSplitter and its content are protected by intellectual property rights:
              </p>
              <ul className="text-gray-300 leading-relaxed space-y-2">
                <li>• The SubSplitter platform and software are our property</li>
                <li>• Our trademarks, logos, and branding are protected</li>
                <li>• You may not copy, modify, or distribute our content</li>
                <li>• You retain ownership of content you submit to the platform</li>
                <li>• You grant us a license to use your content for service provision</li>
              </ul>
            </section>

            {/* Disclaimers */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <AlertCircle size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Disclaimers</h2>
              </div>
              <ul className="text-gray-300 leading-relaxed space-y-2">
                <li>• SubSplitter is provided "as is" without warranties</li>
                <li>• We do not guarantee uninterrupted or error-free service</li>
                <li>• We are not responsible for third-party subscription services</li>
                <li>• Users are responsible for compliance with subscription terms</li>
                <li>• We do not guarantee the behavior of other users</li>
                <li>• Service availability may vary by location</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Scale size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Limitation of Liability</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                To the maximum extent permitted by law, SubSplitter shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including lost profits, data loss, 
                or business interruption, arising from your use of the service. Our total liability to you 
                for any claims shall not exceed the amount you paid to us in the 12 months preceding the claim.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Clock size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Termination</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Account Termination</h3>
              <ul className="text-gray-300 leading-relaxed mb-6 space-y-2">
                <li>• You may terminate your account at any time</li>
                <li>• We may suspend or terminate accounts for Terms violations</li>
                <li>• Termination does not relieve payment obligations</li>
                <li>• We will provide notice before termination when possible</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-200 mb-3">Effect of Termination</h3>
              <ul className="text-gray-300 leading-relaxed space-y-2">
                <li>• Access to your account and data will be discontinued</li>
                <li>• Outstanding balances become immediately due</li>
                <li>• Pool memberships will be cancelled</li>
                <li>• Certain provisions of these Terms will survive termination</li>
              </ul>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Gavel size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Governing Law</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of 
                California, United States, without regard to conflict of law principles. Any disputes arising 
                from these Terms or your use of SubSplitter shall be resolved through binding arbitration 
                in accordance with the rules of the American Arbitration Association.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <FileText size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Changes to Terms</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of material 
                changes by email or through the platform. Continued use of SubSplitter after changes 
                constitutes acceptance of the new Terms. We encourage you to review these Terms periodically.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Scale size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Contact Information</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-800 rounded-lg p-6">
                <ul className="text-gray-300 space-y-2">
                  <li>• Email: legal@subsplitter.com</li>
                  <li>• Address: 123 Tech Street, San Francisco, CA 94105</li>
                  <li>• Phone: +1 (555) 123-4567</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-700 pt-8 mt-12 text-center">
            <p className="text-gray-400 mb-4">
              By using SubSplitter, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
            </p>
            <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              Return to SubSplitter
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default TermsPage;