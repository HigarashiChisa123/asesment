// app/user/components/dashboard/BookCarousel.jsx
'use client';
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import BookCard from './BookCard';

export const BookCarousel = ({ 
  title, 
  books, 
  showSeeAll = true,
  onBookClick,
  onSeeAll
}) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    console.log(`📚 BookCarousel "${title}": ${books?.length || 0} books`);
  }, [title, books]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });

      setTimeout(updateArrowVisibility, 300);
    }
  };

  const updateArrowVisibility = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateArrowVisibility();
    window.addEventListener('resize', updateArrowVisibility);
    return () => window.removeEventListener('resize', updateArrowVisibility);
  }, [books]);

  const handleBookClick = (bookId) => {
    if (onBookClick) {
      onBookClick(bookId);
    } else {
      console.log(`Book ${bookId} clicked`);
    }
  };

  if (!books || books.length === 0) {
    return (
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        <div className="text-center py-8 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No books available in "{title}"</p>
        </div>
      </div>
    );
  }

  const displayBooks = books.slice(0, 10);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {displayBooks.length} books
          </span>
        </div>
        <div className="flex items-center gap-4">
          {showSeeAll && books.length > 5 && (
            <button 
              onClick={onSeeAll}
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 hover:gap-3 transition-all group"
            >
              <span>See All {books.length}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          )}
          
          <div className="flex gap-2">
            {showLeftArrow && (
              <button 
                onClick={() => scroll('left')}
                className="p-2.5 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
            )}
            {showRightArrow && (
              <button 
                onClick={() => scroll('right')}
                className="p-2.5 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all hover:scale-105"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-6 px-1"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none'
          }}
          onScroll={updateArrowVisibility}
        >
          {displayBooks.map((book, index) => (
            <div 
              key={book.id || index} 
              className="flex-none w-64 cursor-pointer"
              onClick={() => handleBookClick(book.id)}
            >
              <BookCard 
                title={book.title}
                author={book.author}
                image={book.image || book.coverUrl}
                rating={book.rating}
                category={book.category}
                bookId={book.id}
              />
            </div>
          ))}
        </div>
        
        {showRightArrow && (
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        )}
      </div>
    </div>
  );
};

export default BookCarousel;