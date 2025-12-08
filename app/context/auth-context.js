'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Clear semua data user lama
  const clearOldUserData = () => {
    console.log('🧹 Clearing all old user data...');
    localStorage.removeItem('userData');
    localStorage.removeItem('borrowedBooks');
    localStorage.removeItem('loanHistory');
    localStorage.removeItem('wishlist');
    // Hapus semua cookies yang berhubungan dengan auth
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Clear session storage juga
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('authToken');
    
    console.log('✅ All old user data cleared');
  };

  // Fetch user profile dengan cache busting
  const fetchUserProfile = async (forceRefresh = false) => {
    setLoading(true);
    
    try {
      console.log('🔄 Fetching FRESH user profile from API...');
      
      // Tambahkan timestamp untuk mencegah cache
      const timestamp = Date.now();
      const response = await fetch(`/api/auth/profile?_=${timestamp}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        cache: 'no-store',
        credentials: 'include'
      });
      
      if (!response.ok) {
        console.warn('❌ Profile API failed:', response.status, response.statusText);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      console.log('📊 FRESH Profile API response:', {
        success: data.success,
        hasUser: !!data.user,
        user: data.user ? {
          id: data.user.id,
          username: data.user.username,
          full_name: data.user.full_name,
          email: data.user.email
        } : 'No user data'
      });
      
      // Pastikan menggunakan data.user yang digabungkan
      const userData = data.user || {
        ...(data.profile || {}),
        settings: data.settings || {},
        borrowing_stats: data.borrowing_stats || {}
      };
      
      console.log('✅ FINAL USER DATA to be set:', {
        id: userData.id,
        username: userData.username,
        full_name: userData.full_name,
        email: userData.email,
        class: userData.class,
        timestamp: new Date().toISOString()
      });
      
      if (data.success && userData && userData.id) {
        console.log('✅ Setting FRESH user data:', userData.username);
        setUser(userData);
        setIsAuthenticated(true);
        
        // Simpan ke localStorage dengan timestamp dan version
        localStorage.setItem('userData', JSON.stringify({
          ...userData,
          _version: '2.0',
          _timestamp: Date.now(),
          _fetchedAt: new Date().toISOString()
        }));
        
        console.log('💾 Saved to localStorage with timestamp');
      } else {
        console.warn('⚠️ Invalid user data in response');
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('❌ Error fetching profile:', error);
      setIsAuthenticated(false);
      setUser(null);
      clearOldUserData();
    } finally {
      setLoading(false);
    }
  };

  // Check authentication on initial load
  useEffect(() => {
    console.log('🔐 AuthProvider MOUNTING - Initializing...');

    // Fetch profile langsung; backend akan validasi token httpOnly
    fetchUserProfile(true);
    
    // Check localStorage sebagai fallback ringan
    const cachedUser = localStorage.getItem('userData');
    if (cachedUser) {
      try {
        const parsed = JSON.parse(cachedUser);
        const age = Date.now() - (parsed._timestamp || 0);
        if (!user && age < 5 * 60 * 1000) {
          setUser(parsed);
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error('❌ Failed to parse cached user:', e);
      }
    }
    
    // Set up interval untuk refresh data setiap 2 menit
    const intervalId = setInterval(() => {
      if (isAuthenticated) {
        console.log('🔄 Auto-refreshing user data...');
        fetchUserProfile();
      }
    }, 2 * 60 * 1000); // 2 minutes
    
    return () => clearInterval(intervalId);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      console.log('🔑 Attempting login for:', email);
      
      // Clear data lama SEBELUM login
      clearOldUserData();
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify({ email, password }),
        cache: 'no-store'
      });

      const data = await response.json();
      console.log('🔑 Login API response:', {
        success: data.success,
        hasUser: !!data.user,
        message: data.message
      });
      
      if (data.success && data.user) {
        console.log('✅ Login successful for:', data.user.email);
        
        // Tunggu sebentar untuk memastikan cookie ter-set
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Fetch profile yang fresh
        await fetchUserProfile(true);
        
        return { 
          success: true, 
          user: data.user,
          message: data.message 
        };
      }
      
      return { 
        success: false, 
        error: data.message || 'Login failed' 
      };
    } catch (error) {
      console.error('❌ Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Network error' 
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      console.log('🚪 Logging out...');
      await fetch('/api/auth/logout', { 
        method: 'POST',
        headers: { 'Cache-Control': 'no-cache' },
        cache: 'no-store'
      });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear semua data
      clearOldUserData();
      setUser(null);
      setIsAuthenticated(false);
      
      // Redirect ke login
      console.log('➡️ Redirecting to login page...');
      window.location.href = '/login';
    }
  };

  // Manual refresh
  const refreshUser = async () => {
    console.log('🔄 Manual refresh requested by user');
    await fetchUserProfile(true);
  };

  // Force clear and reload
  const forceClearAndReload = () => {
    console.log('💣 FORCE clearing all data and reloading...');
    clearOldUserData();
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthenticated,
      login, 
      logout,
      refreshUser,
      clearOldUserData: forceClearAndReload,
      fetchUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
