'use client';
import { Heart } from 'lucide-react';
import WishlistBookCard from './WishlistBookCard';

export const WishlistBooksGrid = ({ 
  filteredBooks, 
  toggleLike, 
  removeFromWishlist,
  onBorrow 
}) => {
  if (filteredBooks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-12 h-12 text-pink-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No books in wishlist</h3>
        <p className="text-gray-500 mb-4">Start adding books you want to read!</p>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg transition">
          Browse Books
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      {filteredBooks.map((book) => (
        <WishlistBookCard
          key={book.id}
          book={book}
          toggleLike={toggleLike}
          removeFromWishlist={removeFromWishlist}
          onBorrow={onBorrow}
        />
      ))}
    </div>
  );
};

export default WishlistBooksGrid;
