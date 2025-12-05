// app/user/components/dashboard/GenreFilter.jsx
'use client';
import { useState } from 'react';
import BookCard from './BookCard';

export const GenreFilter = ({ selectedGenre, onGenreChange, books }) => {
  const [genres] = useState(['All', 'Sci-Fi', 'Fantasy', 'Action', 'Romance', 'Mystery', 'Thriller', 'Horror', 'Comedy', 'Drama', 'Biography', 'History']);

  const filteredBooks = selectedGenre === 'All' 
    ? books 
    : books.filter(book => book.category === selectedGenre);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Browse by Category</h2>
      </div>
      
      <div className="relative mb-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2" style={{ scrollbarWidth: 'none' }}>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreChange(genre)}
              className={`px-6 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all ${
                selectedGenre === genre
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {filteredBooks.slice(0, 16).map((book, index) => (
          <BookCard key={index} title={book.title} author={book.author} image={book.image} />
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;