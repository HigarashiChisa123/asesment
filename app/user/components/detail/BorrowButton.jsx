'use client';

import React, { useState, useEffect } from 'react';
import { Download, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BorrowButton = ({ bookId, bookTitle, onSuccess }) => {
  const router = useRouter();
  const [isBorrowed, setIsBorrowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if book is already borrowed
    const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks') || '[]');
    setIsBorrowed(borrowedBooks.includes(bookId));
  }, [bookId]);

  const handleBorrow = () => {
    if (isBorrowed) {
      alert('You have already borrowed this book!');
      return;
    }

    // Navigate to loan confirmation page
    router.push(`/loan-confirmation?bookId=${bookId}&bookTitle=${encodeURIComponent(bookTitle)}`);
  };

  return (
    <button
      onClick={handleBorrow}
      disabled={isBorrowed || isLoading}
      className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
        isBorrowed
          ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 cursor-not-allowed'
          : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:scale-[1.02]'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Processing...
        </>
      ) : isBorrowed ? (
        <>
          <CheckCircle className="w-4 h-4" />
          Already Borrowed
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Borrow This Book
        </>
      )}
    </button>
  );
};

export default BorrowButton;