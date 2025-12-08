'use client';
import { Book, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';

export const HistoryStats = ({ stats, userStats }) => {
  // Gunakan stats dari props jika ada, atau dari user.borrowing_stats
  const displayStats = stats || userStats || {
    total: 0,
    thisMonth: 0,
    returned: 0,
    overdue: 0
  };

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-blue-100 text-sm mb-1">Total Books</p>
            <h3 className="text-4xl font-bold">{displayStats.total || displayStats.total_borrowed || 0}</h3>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Book className="w-6 h-6" />
          </div>
        </div>
        <p className="text-blue-100 text-sm">All time borrowed</p>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-purple-100 text-sm mb-1">This Month</p>
            <h3 className="text-4xl font-bold">{displayStats.thisMonth || 0}</h3>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
        <p className="text-purple-100 text-sm">Books borrowed</p>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-green-100 text-sm mb-1">Returned</p>
            <h3 className="text-4xl font-bold">{displayStats.returned || displayStats.completed || 0}</h3>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
        <p className="text-green-100 text-sm">Successfully returned</p>
      </div>

      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-red-100 text-sm mb-1">Overdue</p>
            <h3 className="text-4xl font-bold">{displayStats.overdue || 0}</h3>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
        <p className="text-red-100 text-sm">Need attention</p>
      </div>
    </div>
  );
};

export default HistoryStats;