'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import LogoutConfirmationModal from './components/LogoutConfirmationModal';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    image: '',
  });
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Tentukan menu aktif berdasarkan pathname
  const getActiveMenu = () => {
    if (pathname.includes('/dashboard')) return 'dashboard';
    if (pathname.includes('/user-management')) return 'users';
    if (pathname.includes('/profile')) return 'profile';
    return 'dashboard';
  };

  const activeMenu = getActiveMenu();
  const profileImage = profile.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin';

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoadingProfile(true);
        const res = await fetch('/api/auth/profile', { credentials: 'include' });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || 'Failed to load profile');
        const user = data.profile || data.user || {};
        setProfile({
          name: user.full_name || user.username || 'Admin',
          bio: user.bio || 'Administrator',
          image: user.profile_picture || ''
        });
      } catch (err) {
        // fallback silently
      } finally {
        setLoadingProfile(false);
      }
    };
    loadProfile();

    const handleProfileUpdated = (e) => {
      const detail = e.detail || {};
      setProfile((prev) => ({
        name: detail.name ?? prev.name,
        bio: detail.bio ?? prev.bio,
        image: detail.image ?? prev.image,
      }));
    };

    window.addEventListener('adminProfileUpdated', handleProfileUpdated);
    return () => window.removeEventListener('adminProfileUpdated', handleProfileUpdated);
  }, []);

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
