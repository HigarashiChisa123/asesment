'use client'
import React from 'react';
import { Grid, Users, User, Settings, Book } from 'lucide-react';

const Sidebar = ({ activeMenu, onLogoutClick }) => {
  return (
    <div className="w-64 bg-white shadow-lg min-h-screen flex flex-col border-r">
      {/* Logo & Brand */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <Book className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-800">TB Digital</h1>
            <p className="text-xs text-gray-500">Reads</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 flex-1">
        <a
          href="/admin/dashboard"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            activeMenu === 'dashboard'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </a>

        <a
          href="/admin/user-management"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            activeMenu === 'users'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="font-medium">User Management</span>
        </a>

        <a
          href="/admin/profile"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            activeMenu === 'profile'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="font-medium">Profile</span>
        </a>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-gray-600 hover:bg-gray-100">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
      </nav>

      {/* Bottom Buttons */}
      <div className="p-4 border-t bg-white space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span>Support</span>
        </button>
        <button 
          onClick={onLogoutClick}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
