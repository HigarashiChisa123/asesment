'use client'

import React from 'react';
import { CheckCircle } from 'lucide-react';

const BorrowSuccessModal = ({ isOpen, onClose, bookTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl transform animate-in zoom-in duration-300">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping opacity-75"></div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Borrow Successful!</h3>
          <p className="text-gray-600 mb-6">"{bookTitle}" has been added to your reading list.</p>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};

export default BorrowSuccessModal;