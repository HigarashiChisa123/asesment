'use client'
import React from 'react';
import { Users, User, Grid } from 'lucide-react';

const DashboardContent = () => {
  const users = [
    { id: 1, name: 'Amane Yun', email: 'amane.yun@email.com', phone: '+62 812-3456-7890', joinDate: '2024-01-15', status: 'Active', role: 'Admin' },
    { id: 2, name: 'Jessica Thompson', email: 'jessica.t@email.com', phone: '+62 813-4567-8901', joinDate: '2024-02-20', status: 'Active', role: 'User' },
    { id: 3, name: 'Michael Chen', email: 'michael.c@email.com', phone: '+62 814-5678-9012', joinDate: '2024-03-10', status: 'Active', role: 'User' },
    { id: 4, name: 'Sarah Williams', email: 'sarah.w@email.com', phone: '+62 815-6789-0123', joinDate: '2024-03-25', status: 'Inactive', role: 'User' },
    { id: 5, name: 'David Johnson', email: 'david.j@email.com', phone: '+62 816-7890-1234', joinDate: '2024-04-05', status: 'Active', role: 'User' },
  ];

  const stats = [
    { label: 'Total Users', value: '2,543', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Users', value: '1,892', change: '+8%', icon: User, color: 'bg-green-500' },
    { label: 'New Users (Month)', value: '247', change: '+23%', icon: Users, color: 'bg-purple-500' },
    { label: 'Total Books Rented', value: '8,932', change: '+15%', icon: Grid, color: 'bg-orange-500' },
  ];

  return (
    <div className="p-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent User Activity</h3>
          <div className="space-y-4">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user.status === 'Active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <h3 className="text-lg font-bold text-gray-800 mb-4">User Growth</h3>
          <div className="h-64 flex items-end justify-around gap-2">
            {[65, 78, 85, 92, 88, 95, 100].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-500">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;