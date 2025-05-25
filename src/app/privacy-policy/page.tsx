// pages/privacy-policy.tsx
import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Lock, Users, Mail, Calendar } from 'lucide-react';

const PrivacyPolicyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | SubSplitter</title>
        <meta name="description" content="Learn how SubSplitter protects your privacy and handles your personal information." />
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
                <Shield size={20} className="text-purple-400 mr-2" />
                <span className="font-semibold">Privacy Policy</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
              <Shield size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-400 mb-2">
              Your privacy is important to us
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
                <Eye size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Introduction</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Welcome to SubSplitter. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you use our 
                subscription sharing platform.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Users size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Information We Collect</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Personal Information</h3>
              <ul className="text-gray-300 leading-relaxed mb-6 space-y-2">
                <li>• Name and email address when you create an account</li>
                <li>• Payment information processed securely through our payment providers</li>
                <li>• Profile information you choose to provide</li>
                <li>• Communication preferences and settings</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-200 mb-3">Usage Information</h3>
              <ul className="text-gray-300 leading-relaxed mb-6 space-y-2">
                <li>• Information about how you use our platform</li>
                <li>• Subscription pools you join or create</li>
                <li>• Transaction history and payment records</li>
                <li>• Device information and browser data</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Lock size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">How We Use Your Information</h2>
              </div>
              <ul className="text-gray-300 leading-relaxed space-y-2">
                <li>• To provide and maintain our subscription sharing services</li>
                <li>• To process payments and manage your subscriptions</li>
                <li>• To communicate with you about your account and our services</li>
                <li>• To improve our platform and develop new features</li>
                <li>• To prevent fraud and ensure platform security</li>
                <li>• To comply with legal obligations and resolve disputes</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Users size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Information Sharing</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your 
                information only in the following circumstances:
              </p>
              <ul className="text-gray-300 leading-relaxed space-y-2">
                <li>• With other members of subscription pools you join (limited to necessary information)</li>
                <li>• With payment processors to handle transactions securely</li>
                <li>• With service providers who help us operate our platform</li>
                <li>• When required by law or to protect our rights and users</li>
                <li>• In connection with a business transfer or acquisition</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Shield size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Data Security</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. This includes 
                encryption, secure servers, and regular security assessments.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Eye size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Your Rights</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="text-gray-300 leading-relaxed space-y-2">
                <li>• Access and review your personal information</li>
                <li>• Correct or update your information</li>
                <li>• Delete your account and associated data</li>
                <li>• Export your data in a portable format</li>
                <li>• Opt out of marketing communications</li>
                <li>• Withdraw consent where applicable</li>
              </ul>
            </section>

            {/* Cookies and Tracking */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Eye size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Cookies and Tracking</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
                and provide personalized content. You can control cookie settings through your browser preferences.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Calendar size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Data Retention</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                We retain your personal information only as long as necessary to provide our services, 
                comply with legal obligations, resolve disputes, and enforce our agreements. When you 
                delete your account, we will delete or anonymize your personal information within 30 days.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Shield size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Children's Privacy</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Our services are not intended for children under 18 years of age. We do not knowingly 
                collect personal information from children under 18. If you are a parent or guardian and 
                believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Calendar size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Changes to This Policy</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes 
                by posting the new policy on this page and updating the "last updated" date. We encourage 
                you to review this policy periodically.
              </p>
            </section>

            {/* Contact Us */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Mail size={24} className="text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold mb-0">Contact Us</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about this privacy policy or our privacy practices, please contact us:
              </p>
              <div className="bg-gray-800 rounded-lg p-6">
                <ul className="text-gray-300 space-y-2">
                  <li>• Email: privacy@subsplitter.com</li>
                  <li>• Address: [Your Company Address]</li>
                  <li>• Phone: [Your Contact Number]</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-700 pt-8 mt-12 text-center">
            <p className="text-gray-400">
              By using SubSplitter, you acknowledge that you have read and understood this privacy policy.
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

export default PrivacyPolicyPage;