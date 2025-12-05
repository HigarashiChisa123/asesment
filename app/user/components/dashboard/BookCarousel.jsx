// app/user/components/dashboard/BookCarousel.jsx
'use client';
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import BookCard from './BookCard';

export const BookCarousel = ({ title, books, showSeeAll = true }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="flex items-center gap-3">
          {showSeeAll && (
            <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              See All <ArrowRight className="w-4 h-4" />
            </button>
          )}
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 transition"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 transition"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {books.map((book, index) => (
          <div key={index} className="flex-none w-56">
            <BookCard {...book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCarousel;