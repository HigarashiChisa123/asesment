'use client'

import React from 'react';
import { ChevronLeft } from 'lucide-react';

const BookHeader = () => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center">
          <div className="ml-4">
            <h1 className="text-lg font-bold text-gray-900">Book Details</h1>
            <p className="text-xs text-gray-500">TB Digital Reads</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BookHeader;