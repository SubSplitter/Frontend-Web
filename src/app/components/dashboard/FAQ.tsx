'use client'
import React, { useState } from 'react';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-blue-200 py-4">
      <button 
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-blue-900">{question}</h3>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 pr-12">
          <p className="text-base text-blue-700">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How does subscription sharing work?",
      answer: "Our platform connects users who want to share the costs of subscription services. You can either join an existing group or create your own. Once connected, members split the subscription cost, making premium services more affordable for everyone. Our secure payment system handles all transactions automatically."
    },
    {
      question: "Is subscription sharing legal?",
      answer: "Yes, our platform exclusively supports legal sharing methods that comply with each service's terms of use. We only facilitate sharing when the service explicitly allows for family plans, multi-user accounts, or similar sharing options. We regularly review our policies to ensure compliance with service terms."
    },
    {
      question: "How secure is my payment information?",
      answer: "Very secure. We use bank-level encryption and never store your full credit card details on our servers. All payments are processed through trusted payment processors that comply with PCI DSS standards. We also implement two-factor authentication and regular security audits to protect your information."
    },
    {
      question: "What happens if someone in my group doesn't pay?",
      answer: "We've built safeguards to prevent payment issues. All members pre-authorize monthly payments, and we collect payments a few days before the subscription renewal date. If a payment fails, we immediately notify the group admin and attempt to collect the payment. If necessary, we can help find a replacement member while maintaining service continuity."
    },
    {
      question: "How do I join a subscription sharing group?",
      answer: "Simply browse our available groups, filter by the subscription service you're interested in, and send a join request to the group that fits your needs. The group admin will review your request and approve it if there's space available. Once approved, you'll set up your payment method and gain access to the shared subscription."
    },
    {
      question: "Can I create my own sharing group?",
      answer: "Absolutely! Creating a group is easy. Just select 'Create Group' from your dashboard, choose the subscription service, set your sharing preferences (public or private), add payment details, and invite friends or open it to the public. You'll be the group admin with control over membership and subscription management."
    },
    {
      question: "What subscription services can I share?",
      answer: "We support sharing for a wide range of subscription services including streaming platforms, music services, productivity tools, cloud storage, premium publications, and more. You can view the complete list of supported services on our platform after signing up."
    },
    {
      question: "How are conflicts between group members resolved?",
      answer: "We provide built-in communication tools for group members to resolve minor issues. For more significant disputes, group admins have moderation capabilities. Our support team is also available to mediate conflicts when needed, and we have clear policies for handling various situations that may arise."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">Common Questions.<br/>Simple Answers.</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto my-6 rounded-full"></div>
          <p className="mt-4 text-lg text-blue-700 max-w-2xl mx-auto">
            Everything you need to know about safely sharing subscription costs.
          </p>
        </div>
        
        <div className="mt-12 max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <dl className="space-y-0">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </dl>
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-lg font-medium text-blue-900 mb-4">Still have questions?</h3>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Contact Support
            </button>
            <button className="inline-flex items-center px-6 py-3 border border-blue-300 shadow-sm text-base font-medium rounded-full text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              View Help Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;