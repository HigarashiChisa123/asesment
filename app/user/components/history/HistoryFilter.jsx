'use client';
import { Filter, Trash2 } from 'lucide-react';

export const HistoryFilter = ({ 
  selectedFilter, 
  setSelectedFilter, 
  selectedBooks, 
  filteredBooks,
  selectAll, 
  deleteSelected 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-semibold text-gray-700">Filter by:</span>
          </div>
          <div className="flex gap-2">
            {['all', 'Educational', 'Computer Science', 'Self-Help', 'Psychology'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
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

        <div className="flex gap-3">
          <button
            onClick={selectAll}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            {selectedBooks.length === filteredBooks.length ? 'Deselect All' : 'Select All'}
          </button>
          {selectedBooks.length > 0 && (
            <button
              onClick={deleteSelected}
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete ({selectedBooks.length})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryFilter;