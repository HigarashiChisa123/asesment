'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/auth-context';
import BookHeader from '@/app/user/components/detail/BookHeader';
import StatsBanner from '@/app/user/components/detail/StatsBanner';
import BookCoverCard from '@/app/user/components/detail/BookCoverCard';
import BookInfoCard from '@/app/user/components/detail/BookInfoCard';
import SimilarBooks from '@/app/user/components/detail/SimilarBooks';
import BorrowButton from '@/app/user/components/detail/BorrowButton';
import BorrowSuccessModal from '@/app/user/components/detail/BorrowSuccessModal';

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showBorrowSuccess, setShowBorrowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookData, setBookData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [similarBooks, setSimilarBooks] = useState([]);

  useEffect(() => {
    if (!authLoading && params.id) {
      fetchBookDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, authLoading, user]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/books/${params.id}`, {
        cache: 'no-store',
        credentials: 'include'
      });

      if (!res.ok) throw new Error('Failed to fetch book');
      const data = await res.json();
      if (!data.success || !data.book) throw new Error(data.message || 'Book not found');

      const b = data.book;
      const mappedBook = {
        id: b.id,
        title: b.title,
        subtitle: b.description?.substring(0, 80) || '',
        author: b.author,
        description: b.description,
        rating: b.rating,
        totalReviews: b.totalReviews || b.reviews || 0,
        pages: b.pages,
        readingTime: b.readingTime,
        currentReaders: b.currentReaders,
        totalBorrowed: b.totalBorrowed,
        publisher: b.publisher,
        published: b.year,
        language: b.language,
        isbn: b.isbn,
        level: b.level,
        categories: b.categories || [b.category, b.format, b.language].filter(Boolean),
        cover: b.cover || b.coverUrl || b.image,
        isInWishlist: b.isInWishlist || false
      };

      setBookData(mappedBook);
      setIsFavorited(mappedBook.isInWishlist);
      setReviews(data.reviews || []);
      setSimilarBooks((data.similarBooks || []).map(sb => ({
        ...sb,
        cover: sb.cover || sb.coverUrl || sb.image
      })));
      
    } catch (err) {
      console.error('Error fetching book:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      alert('Please login to manage wishlist');
      return;
    }

    try {
      const res = await fetch(`/api/books/${params.id}/wishlist`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Wishlist update failed');

      const newFavoriteStatus = data.isInWishlist;
      setIsFavorited(newFavoriteStatus);
      
      if (bookData) {
        setBookData({
          ...bookData,
          isInWishlist: newFavoriteStatus
        });
      }
      
    } catch (err) {
      console.error('Error toggling wishlist:', err);
      alert(err.message || 'Failed to update wishlist');
    }
  };

  const handleBorrow = () => {
    if (!user) {
      alert('Please login to borrow books');
      return;
    }

    // Navigate to loan confirmation page with book data
    router.push(`/loan-confirmation?bookId=${bookData.id}&bookTitle=${encodeURIComponent(bookData.title)}&author=${encodeURIComponent(bookData.author)}`);
  };

  const handleBorrowSuccess = () => {
    setShowBorrowSuccess(true);
    setTimeout(() => {
      setShowBorrowSuccess(false);
      // Refresh book data to update borrow status
      fetchBookDetails();
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/50 to-purple-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/50 to-purple-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Book</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!bookData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/50 to-purple-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-2xl mb-4">📚</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Book Not Found</h2>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/50 to-purple-50/50">
      <BorrowSuccessModal 
        isOpen={showBorrowSuccess}
        onClose={() => setShowBorrowSuccess(false)}
        bookTitle={bookData.title}
      />
      
      <BookHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsBanner totalBooks={18} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <BookCoverCard 
              book={bookData}
              isFavorited={isFavorited}
              onToggleFavorite={handleToggleFavorite}
              onBorrow={handleBorrow}
            />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <BookInfoCard 
              book={bookData}
              reviews={reviews}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              onBorrow={handleBorrow}
              onToggleFavorite={handleToggleFavorite}
              isWishlisted={isFavorited}
            />
            
            {similarBooks.length > 0 && (
              <SimilarBooks books={similarBooks} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
