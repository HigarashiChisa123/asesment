'use client';
import { Heart, Star, Trash2 } from 'lucide-react';

export const WishlistBookCard = ({ 
  book, 
  toggleLike, 
  removeFromWishlist,
  onBorrow 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="relative">
        <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-blue-100 relative overflow-hidden">
          {/* Book cover image from database */}
          {book.cover_url ? (
            <img 
              src={book.cover_url} 
              alt={book.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/300x400/667eea/ffffff?text=${encodeURIComponent(book.title.substring(0, 10))}`;
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-200 to-blue-200">
              <span className="text-gray-600 font-semibold">
                {book.title.substring(0, 15)}...
              </span>
            </div>
          )}
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 space-y-2">
              <button
                onClick={() => onBorrow(book.id)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition"
              >
                {book.available ? 'Borrow Now' : 'Notify Me'}
              </button>
              <button 
                onClick={() => removeFromWishlist(book.id)}
                className="w-full bg-white/20 backdrop-blur text-white py-2 rounded-lg font-semibold hover:bg-white/30 transition flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            </div>
          </div>
        </div>
        
        {/* Heart Icon */}
        <button
          onClick={() => toggleLike(book.id)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:scale-110 transition"
        >
          <Heart 
            className={`w-5 h-5 ${book.liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </button>

        {/* Availability Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            book.available 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {book.available ? 'Available' : 'Unavailable'}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur text-gray-700">
            {book.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{book.author}</p>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(book.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700">{book.rating}</span>
          <span className="text-xs text-gray-500">({book.reviews})</span>
        </div>

        {/* Added Date */}
        <div className="text-xs text-gray-500">
          Added: {new Date(book.addedDate).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })}
        </div>
      </div>
    </div>
  );
};

export default WishlistBookCard;
