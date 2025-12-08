'use client';

import React, { useState } from 'react';
import { Heart, Star, BookOpen, Eye } from 'lucide-react';

const BookCoverCard = ({ book, isFavorited, onToggleFavorite, onBorrow }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
      <div className="mb-4">
        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
          ★ {book.rating} Rating
        </span>
      </div>
      
      <img 
        src={book.cover} 
        alt={book.title}
        className="w-full h-80 object-cover rounded-2xl shadow-lg mb-6"
      />
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h2>
      <p className="text-gray-600 mb-4">{book.subtitle}</p>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
          {book.author?.charAt(0) || 'A'}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{book.author}</p>
          <p className="text-sm text-gray-500">Author</p>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-500 text-2xl">★</span>
          <span className="text-2xl font-bold text-gray-800">{book.rating}</span>
        </div>
        <p className="text-sm text-gray-500">Overall rating</p>
      </div>
      
      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {book.categories?.map((cat, index) => (
          <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            {cat}
        </span>
        ))}
      </div>
    </div>
  );
};

export default BookCoverCard;