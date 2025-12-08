'use client';
import { Clock, Calendar, AlertCircle } from 'lucide-react';

export const HistoryBookCard = ({ 
  book, 
  selectedBooks, 
  toggleBookSelection 
}) => {
  const isSelected = selectedBooks.includes(book.id);
  
  // Status logic berdasarkan data database
  const getStatusInfo = () => {
    if (book.status === 'returned') {
      return { text: 'Returned', color: 'bg-green-500 text-white', icon: '✓' };
    } else if (book.status === 'overdue') {
      return { text: 'Overdue', color: 'bg-red-500 text-white', icon: '⚠️' };
    } else if (book.status === 'borrowed') {
      const dueDate = book.dueDate ? new Date(book.dueDate) : null;
      const today = new Date();
      
      if (dueDate && dueDate < today) {
        return { text: 'Overdue', color: 'bg-red-500 text-white', icon: '⚠️' };
      } else if (dueDate && dueDate.getDate() === today.getDate() + 1) {
        return { text: 'Due Tomorrow', color: 'bg-yellow-500 text-white', icon: '⏰' };
      } else {
        return { text: 'Borrowed', color: 'bg-blue-500 text-white', icon: '📚' };
      }
    }
    return { text: 'Unknown', color: 'bg-gray-500 text-white', icon: '?' };
  };

  const statusInfo = getStatusInfo();

  const detailUrl = `/user/borrowed?bookId=${book.bookId || book.book_id || book.id}`;

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
        isSelected ? 'ring-4 ring-blue-400' : ''
      }`}
    >
      <div className="relative">
        <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-blue-100">
          <img 
            src={book.coverUrl || "https://via.placeholder.com/300x400/667eea/ffffff?text=Book+Cover"} 
            alt={book.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://via.placeholder.com/300x400/667eea/ffffff?text=${book.title?.substring(0, 2) || 'BK'}`;
            }}
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
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
            {statusInfo.text}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur text-gray-700">
            {book.category || 'General'}
          </span>
        </div>

        {/* Fine indicator */}
        {book.fineAmount > 0 && !book.finePaid && (
          <div className="absolute bottom-3 right-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Fine: ${book.fineAmount}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">
          {book.title || 'Untitled Book'}
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          {book.author || 'Unknown Author'}
        </p>
        
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>Borrowed {book.daysAgo}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span>
              {book.borrowedDate || 'Unknown'} → {book.returnDate || 'Not returned'}
            </span>
          </div>
          {book.returnedDate && (
            <div className="flex items-center gap-2 text-green-600">
              <Calendar className="w-4 h-4" />
              <span>Returned: {new Date(book.returnedDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {book.status === 'borrowed' && (
          <a
            href={detailUrl}
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition text-center block"
          >
            Detail Book
          </a>
        )}
        {book.status === 'returned' && (
          <button className="w-full mt-4 bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition">
            Borrow Again
          </button>
        )}
        {book.status === 'overdue' && (
          <button className="w-full mt-4 bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition">
            Return Now
          </button>
        )}
      </div>
    </div>
  );
};

export default HistoryBookCard;
