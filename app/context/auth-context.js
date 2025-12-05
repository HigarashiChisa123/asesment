'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      console.log('🔄 Fetching user profile from API...');
      const response = await fetch('/api/auth/profile');
      
      if (!response.ok) {
        console.warn('❌ Profile API failed:', response.status);
        setIsAuthenticated(false);
        return;
      }
      
      const data = await response.json();
      console.log('📊 Profile API response:', data);
      
      if (data.success && data.user) {
        console.log('✅ User loaded:', data.user.username);
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem('userData', JSON.stringify(data.user));
      } else {
        console.warn('⚠️ No user data in response');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('❌ Error fetching profile:', error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    console.log('🔐 AuthProvider initializing...');
    
    // Check if we have token
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    
    if (token) {
      console.log('🔑 Token found, fetching profile...');
      fetchUserProfile();
    } else {
      console.log('❌ No token found');
      
      // Check localStorage as fallback
      const cachedUser = localStorage.getItem('userData');
      if (cachedUser) {
        try {
          console.log('📦 Using cached user data');
          setUser(JSON.parse(cachedUser));
          setIsAuthenticated(true);
        } catch (e) {
          console.error('❌ Failed to parse cached user:', e);
        }
      }
      setLoading(false);
    }
  }, []);

  // Auto refresh user data when component mounts
  useEffect(() => {
    if (user && !loading) {
      console.log('🔄 Refreshing user data on mount');
      fetchUserProfile();
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (data.success && data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem('userData', JSON.stringify(data.user));
        return { success: true, user: data.user };
      }
      return { success: false, error: data.message || 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('userData');
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = '/login';
    }
  };

  const refreshUser = async () => {
    console.log('🔄 Manual refresh requested');
    await fetchUserProfile();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthenticated,
      login, 
      logout,
      refreshUser,
      setUser
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