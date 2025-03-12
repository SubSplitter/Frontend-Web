// components/FAQSection.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: "Is it legal to share subscription accounts?",
    answer: "SubSplitter is designed to help you manage subscriptions within the terms of service of subscription providers. Many streaming services offer family or group plans that explicitly allow sharing among a specific number of users. We help you stay compliant with those terms while managing payments and access efficiently."
  },
  {
    question: "How does payment splitting work?",
    answer: "When you add a subscription to SubSplitter, you can invite group members to join. The system automatically calculates each person's share based on the subscription cost and the number of members. Members receive payment reminders, and you can track who has paid and who still owes money."
  },
  {
    question: "What happens if someone doesn't pay their share?",
    answer: "SubSplitter provides automated payment reminders to help ensure everyone pays on time. As the group administrator, you'll be notified if someone is late with a payment. You can then send additional reminders or, if necessary, revoke their access to the shared subscription."
  },
  {
    question: "Can I manage different types of subscriptions?",
    answer: "Absolutely! SubSplitter works with any subscription service, including streaming platforms (Netflix, Disney+, Spotify), cloud storage services, software subscriptions, gaming services, and more. If you pay for it regularly and want to share it with others, SubSplitter can help you manage it."
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, security is our top priority. SubSplitter uses bank-level encryption to protect all payment information. We never store your complete credit card details on our servers. All transactions are processed through secure payment gateways that comply with PCI DSS standards."
  },
  {
    question: "Can I cancel my SubSplitter subscription anytime?",
    answer: "Yes, you can cancel your SubSplitter subscription at any time. There are no long-term contracts or cancellation fees. If you cancel, you'll still have access until the end of your current billing period."
  }
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Frequently Asked <span className="text-indigo-600 dark:text-indigo-400">Questions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Everything you need to know about SubSplitter
          </motion.p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex justify-between items-center text-left p-5 rounded-lg ${
                  openIndex === index 
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' 
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                } transition-colors duration-200`}
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 bg-white dark:bg-gray-800 rounded-b-lg border-t border-gray-100 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {"Still have questions? We're here to help."}
          </p>
          <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300 transform hover:-translate-y-1">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;