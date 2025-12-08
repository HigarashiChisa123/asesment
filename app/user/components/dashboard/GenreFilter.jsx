// app/user/components/dashboard/GenreFilter.jsx
'use client';
import { useState, useEffect } from 'react';
import BookCard from './BookCard';

export const GenreFilter = ({ 
  selectedGenre, 
  onGenreChange, 
  books,
  onBookClick
}) => {
  const [genres, setGenres] = useState(['All']);
  const [displayCount, setDisplayCount] = useState(12);

  const handleBookClick = (bookId) => {
    if (onBookClick) {
      onBookClick(bookId);
    }
  };

  useEffect(() => {
    const uniqueCategories = ['All', ...new Set(books.map(book => book.category))];
    setGenres(uniqueCategories.filter(Boolean));
  }, [books]);

  const filteredBooks = selectedGenre === 'All' 
    ? books 
    : books.filter(book => book.category === selectedGenre);

  const displayedBooks = filteredBooks.slice(0, displayCount);

  const handleShowMore = () => {
    setDisplayCount(prev => Math.min(prev + 12, filteredBooks.length));
  };

  if (books.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Category</h2>
        <p className="text-gray-500">No books available.</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Browse by Category</h2>
        <div className="text-sm text-gray-600">
          Showing {displayedBooks.length} of {filteredBooks.length} books
        </div>
      </div>
      
      <div className="relative mb-8">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4" style={{ scrollbarWidth: 'none' }}>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => {
                onGenreChange(genre);
                setDisplayCount(12);
              }}
              className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all shadow-sm ${
                selectedGenre === genre
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 hover:shadow-md'
              }`}
            >
              {genre}
              {genre !== 'All' && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-white/20 rounded-full">
                  {books.filter(b => b.category === genre).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {displayedBooks.length > 0 ? (
        <>
          <div className="grid grid-cols-4 gap-6">
            {displayedBooks.map((book, index) => (
              <div 
                key={book.id || index} 
                onClick={() => handleBookClick(book.id)}
                className="cursor-pointer"
              >
                <BookCard 
                  title={book.title} 
                  author={book.author} 
                  image={book.image} 
                  rating={book.rating}
                  category={book.category}
                  bookId={book.id}
                />
              </div>
            ))}
          </div>
          
          {displayCount < filteredBooks.length && (
            <div className="mt-8 text-center">
              <button
                onClick={handleShowMore}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
              >
                Show More Books ({filteredBooks.length - displayCount} more)
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-2xl">📚</span>
          </div>
          <p className="text-gray-500 text-lg">No books found in "{selectedGenre}" category.</p>
          <button 
            onClick={() => onGenreChange('All')}
            className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            View All Books
          </button>
        </div>
      )}
    </div>
  );
};

export default GenreFilter;