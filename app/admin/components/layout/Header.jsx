'use client'
import React from 'react';
import { Bell } from 'lucide-react';

const Header = ({ activeMenu, profileImage, profile }) => {
  const getPageTitle = () => {
    switch (activeMenu) {
      case 'dashboard': return 'Dashboard';
      case 'users': return 'User Management';
      case 'profile': return 'My Profile';
      default: return 'Dashboard';
    }
  };

  const getPageDescription = () => {
    switch (activeMenu) {
      case 'dashboard': return 'Overview of your platform statistics';
      case 'users': return 'Manage all registered users';
      case 'profile': return 'Manage your personal information';
      default: return 'Overview of your platform statistics';
    }
  };

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h2>
          <p className="text-gray-500 text-sm">{getPageDescription()}</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-md">
            <img 
              src={profileImage}
              alt="Avatar" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm text-gray-800">{profile.name}</p>
              <p className="text-xs text-gray-500">{profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;