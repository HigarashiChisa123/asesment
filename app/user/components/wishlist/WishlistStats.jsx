'use client';
import { Heart, Book, Star } from 'lucide-react';

export const WishlistStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-pink-100 text-sm mb-1">Total Books</p>
            <h3 className="text-4xl font-bold">{stats.total}</h3>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Heart className="w-6 h-6" />
          </div>
        </div>
        <p className="text-pink-100 text-sm">In your wishlist</p>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-green-100 text-sm mb-1">Available</p>
            <h3 className="text-4xl font-bold">{stats.available}</h3>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Book className="w-6 h-6" />
          </div>
        </div>
        <p className="text-green-100 text-sm">Ready to borrow</p>
      </div>

      <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-orange-100 text-sm mb-1">Unavailable</p>
            <h3 className="text-4xl font-bold">{stats.unavailable}</h3>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p className="text-orange-100 text-sm">Currently borrowed</p>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-purple-100 text-sm mb-1">Avg Rating</p>
            <h3 className="text-4xl font-bold">{stats.avgRating}</h3>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Star className="w-6 h-6" />
          </div>
        </div>
        <p className="text-purple-100 text-sm">Quality books</p>
      </div>
    </div>
  );
};

export default WishlistStats;