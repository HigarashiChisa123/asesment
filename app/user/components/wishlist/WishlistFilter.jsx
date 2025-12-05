'use client';
import { Filter, ShoppingCart } from 'lucide-react';

export const WishlistFilter = ({ 
  selectedFilter, 
  setSelectedFilter, 
  stats, 
  borrowAllAvailable 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-semibold text-gray-700">Filter by:</span>
          </div>
          <div className="flex gap-3 overflow-x-auto">
            {['all', 'Subject Books', 'Computer Books', 'Comics'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                  selectedFilter === filter
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter === 'all' ? 'All' : filter}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={borrowAllAvailable}
          className="ml-4 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition flex items-center gap-2 whitespace-nowrap"
        >
          <ShoppingCart className="w-4 h-4" />
          Borrow All ({stats.available})
        </button>
      </div>
    </div>
  );
};

export default WishlistFilter;