'use client'

import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessState = ({ 
  loanDetails, 
  studentName, 
  studentClass, 
  handleBack 
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-2xl mx-auto">
      <div className="mb-8 flex justify-center">
        <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-full p-6 animate-bounce">
          <CheckCircle size={80} className="text-white" />
        </div>
      </div>
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Loan Successful!</h2>
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
        <p className="text-gray-600 mb-2">Loan ID</p>
        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          {loanDetails.loanId}
        </p>
        <div className="grid grid-cols-2 gap-4 text-left">
          <div>
            <p className="text-sm text-gray-500">Student Name</p>
            <p className="font-semibold text-gray-800">{studentName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Class</p>
            <p className="font-semibold text-gray-800">{studentClass}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Return Date</p>
            <p className="font-semibold text-gray-800">{loanDetails.returnDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-semibold text-gray-800">{loanDetails.duration}</p>
          </div>
        </div>
      </div>
      <p className="text-gray-600 mb-8">The book has been successfully borrowed and added to your collection</p>
      <button 
        onClick={handleBack}
        className="px-8 py-3 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
      >
        Back to Homepage
      </button>
    </div>
  );
};

export default SuccessState;