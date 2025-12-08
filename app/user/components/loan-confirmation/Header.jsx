'use client'

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
          <div className="h-6 w-px bg-gray-300 mx-4"></div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Book Details</h1>
            <p className="text-sm text-gray-500">TB Digital Reads</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;