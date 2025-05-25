// pages/contact.tsx
'use client';
import React, { use, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare, Phone, MapPin, Clock, Send, User, AlertCircle } from 'lucide-react';

const ContactPage: NextPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>Contact Us | SubSplitter</title>
        <meta name="description" content="Get in touch with the SubSplitter team. We're here to help with any questions or concerns." />
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
                <Mail size={20} className="text-purple-400 mr-2" />
                <span className="font-semibold">Contact Us</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
              <MessageSquare size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-400 mb-2">
              We'd love to hear from you
            </p>
            <p className="text-gray-500">
              Get in touch with our team for support, questions, or feedback
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Send size={24} className="text-purple-400 mr-3" />
                Send us a message
              </h2>
              
              {submitted ? (
                <div className="bg-green-800/20 border border-green-600 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-400 mb-2">Message Sent!</h3>
                  <p className="text-gray-300">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Bug Report</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Phone size={24} className="text-purple-400 mr-3" />
                Get in touch
              </h2>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-200 mb-1">Email Support</h3>
                    <p className="text-gray-400 mb-2">Get help from our support team</p>
                    <a href="mailto:support@subsplitter.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                      support@subsplitter.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-200 mb-1">Phone Support</h3>
                    <p className="text-gray-400 mb-2">Speak directly with our team</p>
                    <a href="tel:+1-555-123-4567" className="text-purple-400 hover:text-purple-300 transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-200 mb-1">Office Address</h3>
                    <p className="text-gray-400 mb-2">Visit us in person</p>
                    <address className="text-gray-300 not-italic">
                      123 Tech Street<br />
                      San Francisco, CA 94105<br />
                      United States
                    </address>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-200 mb-1">Support Hours</h3>
                    <p className="text-gray-400 mb-2">When we're available to help</p>
                    <div className="text-gray-300 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                      <p>Saturday: 10:00 AM - 4:00 PM PST</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-start space-x-3">
                  <AlertCircle size={20} className="text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-200 mb-2">Quick Help</h3>
                    <p className="text-gray-400 mb-3">
                      Need immediate assistance? Check out our FAQ section for common questions and solutions.
                    </p>
                    <Link href="/faq" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                      View FAQ →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-700 pt-8 mt-12 text-center">
            <p className="text-gray-400 mb-4">
              We typically respond to all inquiries within 24 hours during business days.
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

export default ContactPage;