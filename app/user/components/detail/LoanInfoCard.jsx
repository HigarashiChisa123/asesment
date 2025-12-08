'use client'

import React from 'react';
import { BookOpen, Clock, Info } from 'lucide-react';

const LoanInfoCard = ({ loanInfo, onBorrow }) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="w-6 h-6" />
        <h3 className="font-bold text-lg">Borrow This Book</h3>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-blue-100">Available Copies</span>
            <span className="font-bold text-xl">
              <span className={loanInfo.copiesAvailable > 0 ? 'text-green-300' : 'text-red-300'}>
                {loanInfo.copiesAvailable}
              </span>
              /{loanInfo.copiesTotal}
            </span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full"
              style={{ width: `${(loanInfo.copiesAvailable / loanInfo.copiesTotal) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Duration</span>
            </div>
            <p className="font-semibold text-lg">{loanInfo.duration}</p>
          </div>
          
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Info className="w-4 h-4" />
              <span className="text-sm">Late Fee</span>
            </div>
            <p className="font-semibold text-lg">{loanInfo.lateFee}</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm rounded-xl p-3">
          <div className="text-sm mb-1">Renewals Allowed</div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">{loanInfo.renewalCount} times</span>
            <span className="text-xs opacity-80">Max: {loanInfo.maxRenewal}x</span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onBorrow}
        disabled={loanInfo.copiesAvailable === 0}
        className={`w-full py-3.5 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-95 ${
          loanInfo.copiesAvailable > 0 
            ? 'bg-white text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 hover:shadow-2xl' 
            : 'bg-gray-400 cursor-not-allowed text-gray-600'
        }`}
      >
        {loanInfo.copiesAvailable > 0 ? 'Borrow Now →' : 'Out of Stock'}
      </button>
    </div>
  );
};

export default LoanInfoCard;