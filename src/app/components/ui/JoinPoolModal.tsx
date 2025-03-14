// components/ui/JoinPoolModal.tsx
'use client'
import React, { useState } from 'react';
import Modal from './Modal';
import { CreditCard, Calendar, Info } from 'lucide-react';

interface JoinPoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  pool: {
    id: string;
    serviceName: string;
    splitCost: number;
    billingDate: string;
  };
  onJoin: () => void;
}

export default function JoinPoolModal({ isOpen, onClose, pool, onJoin }: JoinPoolModalProps) {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleJoin = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onJoin();
      onClose();
    }, 1500);
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Join ${pool.serviceName} Pool`}
      footer={
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleJoin}
            disabled={!isAgreementChecked || isLoading}
            className={`px-4 py-2 rounded-md text-white ${
              isAgreementChecked && !isLoading 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'bg-gray-600 cursor-not-allowed'
            } transition-colors flex items-center`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Join Pool'
            )}
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="text-center p-4 bg-gray-800 rounded-lg">
          <p className="text-gray-400 mb-2">Your monthly contribution</p>
          <p className="text-3xl font-bold text-white">${pool.splitCost.toFixed(2)}</p>
          <p className="text-sm text-gray-400 mt-1">Billed on the {new Date(pool.billingDate).getDate()}th of each month</p>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-3">Payment Method</h4>
          
          <div className="space-y-3">
            <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
              paymentMethod === 'credit-card' 
                ? 'border-purple-500 bg-purple-900 bg-opacity-20' 
                : 'border-gray-700 hover:border-gray-600'
            }`}>
              <input
                type="radio"
                name="paymentMethod"
                value="credit-card"
                checked={paymentMethod === 'credit-card'}
                onChange={() => setPaymentMethod('credit-card')}
                className="sr-only"
              />
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-900 flex items-center justify-center mr-3">
                  <CreditCard size={20} className="text-purple-300" />
                </div>
                <div>
                  <p className="font-medium">Credit/Debit Card</p>
                  <p className="text-sm text-gray-400">Visa ending in 4242</p>
                </div>
              </div>
              <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'credit-card' ? 'border-purple-500' : 'border-gray-600'
              }`}>
                {paymentMethod === 'credit-card' && <div className="w-3 h-3 rounded-full bg-purple-500"></div>}
              </div>
            </label>
            
            <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
              paymentMethod === 'paypal' 
                ? 'border-purple-500 bg-purple-900 bg-opacity-20' 
                : 'border-gray-700 hover:border-gray-600'
            }`}>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => setPaymentMethod('paypal')}
                className="sr-only"
              />
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mr-3">
                  <span className="text-blue-300 font-bold">P</span>
                </div>
                <div>
                  <p className="font-medium">PayPal</p>
                  <p className="text-sm text-gray-400">example@email.com</p>
                </div>
              </div>
              <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'paypal' ? 'border-purple-500' : 'border-gray-600'
              }`}>
                {paymentMethod === 'paypal' && <div className="w-3 h-3 rounded-full bg-purple-500"></div>}
              </div>
            </label>
            
            <button className="flex items-center text-purple-500 hover:text-purple-400 text-sm mt-2">
              <span className="mr-1">+</span> Add new payment method
            </button>
          </div>
        </div>
        
        <div className="p-4 bg-blue-900 bg-opacity-20 rounded-lg border border-blue-800 flex">
          <Info size={20} className="text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-blue-300 font-medium mb-1">Important</p>
            <p className="text-gray-300">
              By joining this pool, you agree to pay your share of {pool.serviceName} subscription. You can leave the pool anytime, but payment is required for the current billing cycle.
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={isAgreementChecked}
              onChange={() => setIsAgreementChecked(!isAgreementChecked)}
              className="mt-1 h-4 w-4 text-purple-600 rounded border-gray-600 focus:ring-purple-500 focus:ring-offset-gray-900"
            />
            <span className="ml-2 text-sm text-gray-300">
              I agree to the <a href="#" className="text-purple-500 hover:text-purple-400">Terms of Service</a> and understand the payment obligations for this pool.
            </span>
          </label>
        </div>
      </div>
    </Modal>
  );
}
