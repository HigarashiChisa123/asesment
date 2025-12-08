'use client'
import React, { useEffect, useState } from 'react';
import { Users, User, Grid } from 'lucide-react';
import { format } from 'date-fns';

const DashboardContent = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentBorrow, setRecentBorrow] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/stats', { credentials: 'include' });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || 'Failed to load stats');
        setStats(data.stats);
        setRecentUsers(data.recentUsers || []);
        setRecentBorrow(data.recentBorrow || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = stats
    ? [
        { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-blue-500' },
        { label: 'Active Users', value: stats.activeUsers, icon: User, color: 'bg-green-500' },
        { label: 'Total Books', value: stats.books, icon: Grid, color: 'bg-purple-500' },
        { label: 'Active Loans', value: stats.activeLoans, icon: Grid, color: 'bg-orange-500' },
      ]
    : [];

  if (loading) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border text-sm text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold text-gray-800">{stat.value ?? 0}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Users</h3>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {(user.full_name || user.username || 'U')
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{user.full_name || user.username}</p>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {user.role || 'User'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Borrow</h3>
          <div className="space-y-4">
            {recentBorrow.map((item) => (
              <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.book_name}</p>
                    <p className="text-xs text-gray-500">
                      {item.username} • {item.category}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'borrowed'
                        ? 'bg-blue-100 text-blue-700'
                        : item.status === 'overdue'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Borrowed {format(new Date(item.borrowed_date || item.created_at), 'd MMM yyyy')}
                  {item.due_date ? ` • Due ${format(new Date(item.due_date), 'd MMM')}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
