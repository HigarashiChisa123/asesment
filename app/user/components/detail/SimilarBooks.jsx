'use client'

import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

const SimilarBooks = ({ books }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-xl text-gray-900">Similar Books</h3>
          <p className="text-sm text-gray-500">You might also enjoy these titles</p>
        </div>
        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
          View All <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

const BookCard = ({ book }) => (
  <div className="group cursor-pointer">
    <div className="relative overflow-hidden rounded-xl mb-3 shadow-md group-hover:shadow-xl transition-all duration-300">
      <img 
        src={book.cover} 
        alt={book.title} 
        className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
        {book.rating}
      </div>
    </div>
    <h4 className="font-semibold text-sm text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
      {book.title}
    </h4>
    <p className="text-xs text-gray-500 line-clamp-1">{book.author}</p>
  </div>
);

export default SimilarBooks;