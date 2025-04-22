import React, { useState } from 'react';
import { Loader2, AlertTriangle, Check, X } from 'lucide-react';

interface LeavePoolModalProps {
  poolId: string;
  poolName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function LeavePoolModal({
  poolId,
  poolName,
  isOpen,
  onClose,
  onSuccess
}: LeavePoolModalProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Handle leaving a pool
  const handleLeavePool = async () => {
    try {
      setStatus('loading');
      // We'll use the poolService to leave the pool
      // This import and function call will be handled in the component where this modal is used
      // await poolService.leavePool(poolId);
      onSuccess(); // This will trigger the leave action in the parent component
      setStatus('success');
      
      // Wait a moment before closing the modal
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error: any) {
      console.error('Error leaving pool:', error);
      setErrorMessage(error.message || 'Failed to leave pool. Please try again later.');
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-md w-full overflow-hidden shadow-xl">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold">Leave Subscription Pool</h3>
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
                Are you sure you want to leave the <span className="font-medium">{poolName}</span> subscription pool?
              </p>
              
              <div className="bg-gray-900 rounded-lg p-4 mb-6">
                <div className="text-sm text-gray-400">
                  <p>When you leave a pool:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>You'll lose access to the subscription immediately</li>
                    <li>You won't be charged in future billing cycles</li>
                    <li>No refunds are provided for the current billing period</li>
                  </ul>
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
                  onClick={handleLeavePool}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Leave Pool
                </button>
              </div>
            </>
          )}
          
          {status === 'loading' && (
            <div className="text-center py-6">
              <Loader2 size={36} className="animate-spin mx-auto text-purple-500 mb-4" />
              <p>Processing your request...</p>
              <p className="text-sm text-gray-400 mt-2">This will only take a moment</p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-400" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Successfully Left Pool</h4>
              <p className="text-gray-400">You've been removed from the {poolName} pool</p>
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
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
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