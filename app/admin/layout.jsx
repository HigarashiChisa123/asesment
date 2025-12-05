'use client'
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import LogoutConfirmationModal from './components/LogoutConfirmationModal';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Tentukan menu aktif berdasarkan pathname
  const getActiveMenu = () => {
    if (pathname.includes('/dashboard')) return 'dashboard';
    if (pathname.includes('/users')) return 'users';
    if (pathname.includes('/profile')) return 'profile';
    return 'dashboard';
  };

  const activeMenu = getActiveMenu();
  const profileImage = 'https://api.dicebear.com/7.x/avataaars/svg?seed=AmaneYun';
  const profile = {
    name: 'Amane Yun',
    bio: 'I like reading books and managing TB Digital platform'
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    window.location.href = '/login';
    setShowLogoutModal(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Sidebar Component */}
      <Sidebar activeMenu={activeMenu} onLogoutClick={handleLogoutClick} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header Component */}
        <Header 
          activeMenu={activeMenu} 
          profileImage={profileImage} 
          profile={profile} 
        />

        {/* Children (Content dari masing-masing halaman) */}
        {children}
      </div>

      {/* Logout Modal */}
      <LogoutConfirmationModal 
        isOpen={showLogoutModal}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}