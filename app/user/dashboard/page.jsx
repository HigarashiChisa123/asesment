// app/user/dashboard/page.jsx
'use client';
import { useState, useEffect } from 'react';
import Sidebar from './../components/layout/SideBar';
import Header from './../components/layout/Header';
import HeroCarousel from './../components/dashboard/HeroCarousel';
import BookCarousel from './../components/dashboard/BookCarousel';
import GenreFilter from './../components/dashboard/GenreFilter';
import Footer from './../components/shared/Footer';
import LogoutConfirmationModal from './../components/shared/LogoutConfirmationModal';
import { 
  recommendedBooks, 
  schoolBooks, 
  computerBooks,
  allBooks 
} from './../components/dashboard/data/booksData';
import { getUserFromCookie } from '@/lib/auth';

export default function DashboardPage() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data on component mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Coba ambil dari API
      console.log('📥 Loading user data for dashboard...');
      const response = await fetch('/api/auth/profile');
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          console.log('✅ User data from API:', data.user);
          setUser(data.user);
          return;
        }
      }
      
      // Fallback ke cookie
      console.log('🔄 Fallback to cookie...');
      const cookieUser = getUserFromCookie();
      if (cookieUser) {
        console.log('✅ User from cookie:', cookieUser);
        setUser(cookieUser);
      }
    } catch (error) {
      console.error('❌ Error loading user data:', error);
      
      // Fallback ke cookie
      const cookieUser = getUserFromCookie();
      if (cookieUser) {
        setUser(cookieUser);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsLoggedIn(false);
      setShowLogoutModal(false);
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  // If user is logged out, show login page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You have been logged out. Please login again.</p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Login Again
          </button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar 
        activePage="dashboard" 
        onLogoutClick={handleLogoutClick} 
        user={user}
      />
      
      <LogoutConfirmationModal 
        isOpen={showLogoutModal}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
      
      <div className="ml-64">
        <Header user={user} />
        
        <div className="px-8 py-8">
          <HeroCarousel />
        </div>

        <div className="px-8 pb-8">
          <BookCarousel title="Recommended Books" books={recommendedBooks} />
          <BookCarousel title="School Books" books={schoolBooks} />
          <BookCarousel title="Computer Science Books" books={computerBooks} />

          <GenreFilter 
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            books={allBooks}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}