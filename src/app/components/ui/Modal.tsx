// components/ui/Modal.tsx
import React, { Fragment, ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footerContent?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footerContent,
  size = 'md' 
}: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl'
  };
  
  // Close when clicking outside the modal content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Fragment>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        {/* Modal */}
        <div className={`bg-gray-800 rounded-xl shadow-2xl w-full ${sizeClasses[size]} transform transition-all`}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Body */}
          <div className="px-6 py-4">
            {children}
          </div>
          
          {/* Footer */}
          {footerContent && (
            <div className="px-6 py-4 border-t border-gray-700 flex justify-end space-x-3">
              {footerContent}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}