'use client'

import React, { useEffect } from 'react';
import { CheckCircle, Home, ArrowRight, Calendar, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SuccessNotification = ({ 
  isOpen, 
  onClose, 
  loanDetails, 
  studentName, 
  studentClass, 
  bookTitle 
}) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      // Auto close dan redirect setelah 5 detik
      const timer = setTimeout(() => {
        onClose();
        router.push('/user/dashboard');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, router]);

  if (!isOpen) return null;

  const handleGoHome = () => {
    onClose();
    router.push('/user/dashboard');
  };

  const handleViewBook = () => {
    onClose();
    // You can modify this to go back to the book detail
    router.back();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-in zoom-in duration-300 border border-gray-100">
        {/* Success Icon with Animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-5 shadow-2xl">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Borrow Successful! 🎉
        </h2>
        <p className="text-center text-gray-600 mb-6">
          "{bookTitle}" has been added to your reading list
        </p>

        {/* Loan ID Badge */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">Loan ID</span>
            </div>
            <span className="font-mono font-bold text-emerald-800 bg-white px-3 py-1 rounded-lg">
              {loanDetails?.loanId || 'BK-12345'}
            </span>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-blue-700">Return By</span>
            </div>
            <p className="font-semibold text-sm text-gray-800">{loanDetails?.returnDate || 'Dec 19, 2025'}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">👤</span>
              </div>
              <span className="text-xs text-purple-700">Student</span>
            </div>
            <p className="font-semibold text-sm text-gray-800">{studentName || 'Student Name'}</p>
          </div>
        </div>

        {/* Progress Bar (Auto Redirect) */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Redirecting to dashboard...</span>
            <span>5s</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full animate-progress"
              style={{ animation: 'progress 5s linear forwards' }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleGoHome}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <Home className="w-4 h-4" />
            Go Dashboard
          </button>
          <button
            onClick={handleViewBook}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            View Book
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-center text-gray-500 mt-4">
          Don't forget to return the book before the due date
        </p>
      </div>

      {/* CSS Animation for Progress Bar */}
      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 5s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default SuccessNotification;