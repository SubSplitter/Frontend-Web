import React, { useState } from 'react';
import { poolService } from '../../services/poolService';
import { Loader2, AlertTriangle, Check, X } from 'lucide-react';

interface JoinPoolModalProps {
  poolId: string;
  poolName: string;
  costPerMonth: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function JoinPoolModal({
  poolId,
  poolName,
  costPerMonth,
  isOpen,
  onClose,
  onSuccess
}: JoinPoolModalProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Handle joining a pool
  const handleJoinPool = async () => {
    try {
      setStatus('loading');
      await poolService.joinPool(poolId);
      setStatus('success');
      // Wait a moment before closing the modal
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Error joining pool:', error);
      setErrorMessage('Failed to join pool. Please try again later.');
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-md w-full overflow-hidden shadow-xl">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold">Join Subscription Pool</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            disabled={status === 'loading'}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {status === 'idle' && (
            <>
              <p className="mb-4">
                You're about to join the <span className="font-medium">{poolName}</span> subscription pool.
              </p>
              
              <div className="bg-gray-900 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Your monthly cost:</span>
                  <span className="text-lg font-bold text-green-400">${costPerMonth.toFixed(2)}</span>
                </div>
                
                <div className="text-sm text-gray-400">
                  You'll be charged when the subscription renews. You can leave the pool anytime before the renewal date.
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button 
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleJoinPool}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  Join Pool
                </button>
              </div>
            </>
          )}
          
          {status === 'loading' && (
            <div className="text-center py-6">
              <Loader2 size={36} className="animate-spin mx-auto text-purple-500 mb-4" />
              <p>Joining pool...</p>
              <p className="text-sm text-gray-400 mt-2">This will only take a moment</p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-400" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Successfully Joined!</h4>
              <p className="text-gray-400">You are now a member of the {poolName} pool</p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} className="text-red-400" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-red-400">Error</h4>
              <p className="text-gray-400 mb-4">{errorMessage}</p>
              <div className="flex justify-center gap-3">
                <button 
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setStatus('idle');
                    setErrorMessage('');
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}