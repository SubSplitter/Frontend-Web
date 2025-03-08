// pages/payment.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Payment: React.FC = () => {
  const router = useRouter();
  const { pool } = router.query;
  
  // Mock data - replace with API call
  const poolData = {
    id: pool as string,
    name: 'Netflix Premium',
    service: 'Netflix',
    cost: 4.99
  };
  
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: '',
    saveCard: false
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push(`/pools/${pool}`);
    }, 1500);
  };

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = 0; i < 10; i++) {
    years.push(currentYear + i);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Payment Details</h1>
      
      <div className="bg-white rounded-lg border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">{poolData.service} Pool</span>
          <span className="font-medium">${poolData.cost}/month</span>
        </div>
        <div className="flex justify-between font-medium text-lg pt-3 border-t mt-3">
          <span>Total</span>
          <span>${poolData.cost}/month</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="cardName" className="block mb-1 text-sm font-medium text-gray-700">
              Name on Card
            </label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="John Smith"
              required
            />
          </div>
          
          <div>
            <label htmlFor="cardNumber" className="block mb-1 text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="4242 4242 4242 4242"
              maxLength={19}
              required
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label htmlFor="expMonth" className="block mb-1 text-sm font-medium text-gray-700">
                Month
              </label>
              <select
                id="expMonth"
                name="expMonth"
                value={formData.expMonth}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option value="">MM</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                  <option key={month} value={month.toString().padStart(2, '0')}>
                    {month.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-span-1">
              <label htmlFor="expYear" className="block mb-1 text-sm font-medium text-gray-700">
                Year
              </label>
              <select
                id="expYear"
                name="expYear"
                value={formData.expYear}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option value="">YYYY</option>
                {years.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-span-1">
              <label htmlFor="cvv" className="block mb-1 text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="123"
                maxLength={4}
                required
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="saveCard"
              name="saveCard"
              type="checkbox"
              checked={formData.saveCard}
              onChange={handleChange}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
            />
            <label htmlFor="saveCard" className="ml-2 text-sm text-gray-700">
              Save this card for future payments
            </label>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-5 py-2.5 text-center rounded-md ${
              loading 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;