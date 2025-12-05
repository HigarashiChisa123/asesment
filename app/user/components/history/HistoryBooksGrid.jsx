'use client';
import { Book } from 'lucide-react';
import HistoryBookCard from './HistoryBookCard';

export const HistoryBooksGrid = ({ 
  filteredBooks, 
  selectedBooks, 
  toggleBookSelection 
}) => {
  if (filteredBooks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <Book className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
        <p className="text-gray-500">Try adjusting your search or filter</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      {filteredBooks.map((book) => (
        <HistoryBookCard
          key={book.id}
          book={book}
          selectedBooks={selectedBooks}
          toggleBookSelection={toggleBookSelection}
        />
      ))}
    </div>
  );
};

export default HistoryBooksGrid;