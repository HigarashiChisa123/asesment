'use client';
import { Clock, Calendar } from 'lucide-react';

export const HistoryBookCard = ({ 
  book, 
  selectedBooks, 
  toggleBookSelection 
}) => {
  const isSelected = selectedBooks.includes(book.id);

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
        isSelected ? 'ring-4 ring-blue-400' : ''
      }`}
    >
      <div className="relative">
        <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-blue-100">
          <img 
            src="https://via.placeholder.com/300x400/667eea/ffffff?text=Book+Cover" 
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Checkbox */}
        <div className="absolute top-3 left-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleBookSelection(book.id)}
            className="w-6 h-6 rounded cursor-pointer accent-blue-500"
          />
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            book.status === 'returned' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {book.status === 'returned' ? 'Returned' : 'Overdue'}
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
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{book.title}</h3>
        <p className="text-sm text-gray-500 mb-3">{book.author}</p>
        
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>Last borrowed {book.daysAgo}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span>{book.borrowedDate} → {book.returnDate}</span>
          </div>
        </div>

        <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition">
          Borrow Again
        </button>
      </div>
    </div>
  );
};

export default HistoryBookCard;