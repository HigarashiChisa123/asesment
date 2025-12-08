'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/context/auth-context';
import Footer from '@/app/user/components/shared/Footer';
import BookDetailCard from '@/app/user/components/loan-confirmation/BookDetailCard';
import LoanForm from '@/app/user/components/loan-confirmation/LoanForm';
import SuccessNotification from '@/app/user/components/loan-confirmation/SuccessNotification';

export default function ConfirmBorrowPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [bookLoading, setBookLoading] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState(14);

  // Get book data from URL parameters
  const bookId = searchParams.get('bookId');
  const bookTitle = searchParams.get('bookTitle') || 'Unknown Book';
  const author = searchParams.get('author') || 'Unknown Author';

  const [bookDetails, setBookDetails] = useState(null);

  // Loan details from backend
  const [loanDetails, setLoanDetails] = useState({
    borrowDate: '',
    returnDate: '',
    duration: '',
    loanId: ''
  });

  // Safe decode function
  const safeDecodeURI = (str) => {
    try {
      return decodeURIComponent(str || '');
    } catch {
      return str || '';
    }
  };

  // Load user data if logged in
  useEffect(() => {
    if (authLoading) return;
    
    if (user) {
      setStudentName(user.full_name || user.username || user.name || '');
      setStudentClass(user.class || 'XI RPL 1');
      setPageLoading(false);
    } else if (!authLoading) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Fetch book data from API
  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) {
        setBookLoading(false);
        return;
      }
      try {
        setBookLoading(true);
        const res = await fetch(`/api/books/${bookId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.book) {
            const book = data.book;
            const decodedTitle = safeDecodeURI(bookTitle);
            setBookDetails({
              id: book.id,
              title: book.title || decodedTitle,
              subtitle: book.description ? book.description.substring(0, 80) + '...' : '',
              author: book.author || safeDecodeURI(author),
              rating: book.rating || 0,
              reviews: book.totalReviews || 0,
              cover: book.cover || book.coverUrl || `https://via.placeholder.com/300x400/667eea/ffffff?text=${encodeURIComponent((book.title || decodedTitle).substring(0, 10))}`,
              categories: [book.category, book.format, book.language].filter(Boolean)
            });
            return;
          }
        }
      } catch (err) {
        console.error('Failed to fetch book for confirmation:', err);
      } finally {
        const decodedTitle = safeDecodeURI(bookTitle);
        setBookDetails(prev => prev || {
          id: bookId,
          title: decodedTitle,
          subtitle: '',
          author: safeDecodeURI(author),
          rating: 0,
          reviews: 0,
          cover: `https://via.placeholder.com/300x400/667eea/ffffff?text=${encodeURIComponent(decodedTitle.substring(0, 10))}`,
          categories: ['General']
        });
        setBookLoading(false);
      }
    };

    fetchBook();
  }, [bookId, bookTitle, author]);

  // Generate loan details
  useEffect(() => {
    if (!bookId) return;

    const generateLoanDetails = () => {
      const durationDays = selectedDuration;
      const loanId = `LOAN-${Date.now().toString().slice(-8)}`;

      const today = new Date();
      const returnDate = new Date(today);
      returnDate.setDate(today.getDate() + durationDays);

      setLoanDetails({
        borrowDate: formatDate(today),
        returnDate: formatDate(returnDate),
        duration: `${durationDays} days`,
        loanId: loanId
      });
    };

    generateLoanDetails();
  }, [bookId, selectedDuration]);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!studentName.trim()) {
      newErrors.studentName = 'Student name is required';
    }
    
    if (!studentClass) {
      newErrors.studentClass = 'Class selection is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const safeBookTitle = bookDetails?.title || safeDecodeURI(bookTitle) || 'Unknown Book';
  const safeBookAuthor = bookDetails?.author || safeDecodeURI(author) || 'Unknown Author';

  const handleConfirm = async () => {
    if (!validateForm()) {
      return;
    }

    // Call borrow API so loan is saved to DB
    try {
      const res = await fetch(`/api/books/${bookId}/borrow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          durationDays: selectedDuration,
          studentName,
          studentClass
        })
      });
      const borrowRes = await res.json();
      if (!res.ok || !borrowRes.success) {
        throw new Error(borrowRes.message || 'Borrow failed');
      }
    } catch (error) {
      console.error('Borrow API failed:', error);
      alert('Failed to confirm loan: ' + error.message);
      return;
    }

    // Prepare loan data
    const loanData = {
      bookId: bookId,
      bookTitle: safeBookTitle,
      author: safeBookAuthor,
      studentName: studentName,
      studentClass: studentClass,
      borrowDate: loanDetails.borrowDate,
      returnDate: loanDetails.returnDate,
      loanId: loanDetails.loanId,
      durationDays: selectedDuration,
      userId: user?.id || 'guest',
      timestamp: new Date().toISOString(),
      status: 'active',
      userEmail: user?.email,
      userAvatar: user?.avatar
    };

    // Save to localStorage
    try {
      // Save borrowed book
      const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks') || '[]');
      if (!borrowedBooks.some(book => book.id === bookId)) {
        borrowedBooks.push({
          id: bookId,
          title: safeBookTitle,
          borrowDate: new Date().toISOString()
        });
        localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
      }

      // Save loan history
      const loanHistory = JSON.parse(localStorage.getItem('loanHistory') || '[]');
      loanHistory.push(loanData);
      localStorage.setItem('loanHistory', JSON.stringify(loanHistory));

      console.log('Loan data saved:', loanData);
      setShowSuccess(true);
      
      // Auto redirect after success
      setTimeout(() => {
        router.push('/user/dashboard');
      }, 5000);

    } catch (error) {
      console.error('Error saving loan:', error);
      alert('Failed to process loan. Please try again.');
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    router.push('/user/dashboard');
  };

  if (authLoading || pageLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading loan confirmation...</p>
        </div>
      </div>
    );
  }

  if (!bookId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-red-500 text-4xl mb-4 text-center">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Book Not Found</h2>
          <p className="text-gray-600 mb-6 text-center">
            Please select a book to borrow first.
          </p>
          <button
            onClick={() => router.push('/user/dashboard')}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Loan Confirmation</h1>
            <p className="text-sm text-gray-500">Complete your book loan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Book Details */}
          <div className="lg:col-span-1">
            {bookLoading ? (
              <div className="bg-white rounded-3xl shadow-xl p-6 animate-pulse h-[520px]"></div>
            ) : (
              <BookDetailCard bookDetails={bookDetails} />
            )}
          </div>

          {/* Right Side - Loan Form */}
          <div className="lg:col-span-2">
            <LoanForm 
              studentName={studentName}
              setStudentName={setStudentName}
              studentClass={studentClass}
              setStudentClass={setStudentClass}
              selectedDuration={selectedDuration}
              setSelectedDuration={setSelectedDuration}
              errors={errors}
              handleConfirm={handleConfirm}
              handleBack={handleBack}
              loanDetails={loanDetails}
              bookTitle={safeBookTitle}
            />
          </div>
        </div>
      </div>

      {/* Success Notification Modal */}
      <SuccessNotification 
        isOpen={showSuccess}
        onClose={handleCloseSuccess}
        loanDetails={loanDetails}
        studentName={studentName}
        studentClass={studentClass}
        bookTitle={safeBookTitle}
      />
      
      <Footer />
    </div>
  );
}
