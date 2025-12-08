'use client';
import { useState, useEffect } from 'react';
import Sidebar from './../components/layout/SideBar';
import SettingsHeader from './../components/settings/SettingsHeader';
import SettingsSidebar from './../components/settings/SettingsSidebar';
import AccountTab from './../components/settings/tabs/AccountTab';
import NotificationsTab from './../components/settings/tabs/NotificationsTab';
import PrivacyTab from './../components/settings/tabs/PrivacyTab';
import AppearanceTab from './../components/settings/tabs/AppearanceTab';
import BorrowingTab from './../components/settings/tabs/BorrowingTab';
import Footer from './../components/shared/Footer';
import LogoutConfirmationModal from './../components/shared/LogoutConfirmationModal';
import PasswordSuccessModal from './../components/shared/PasswordSuccessModal';
import { useAuth } from '@/app/context/auth-context';

export default function SettingsPage() {
  const { user: authUser, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
  
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({
    // Account Settings
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Notification Settings
    email_notifications: true,
    push_notifications: true,
    borrow_reminders: true,
    return_reminders: true,
    new_book_alerts: true,
    wishlist_updates: true,
    
    // Privacy Settings
    profile_visibility: 'public',
    show_reading_history: true,
    show_wishlist: true,
    allow_recommendations: true,
    
    // Appearance
    theme: 'light',
    language: 'en',
    
    // Reading Preferences
    auto_renew: true,
    default_borrow_duration: 14,
    download_quality: 'medium',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [borrowingStats, setBorrowingStats] = useState({
    total_borrowed: 0,
    currently_reading: 0,
    completed: 0,
    overdue: 0
  });

  // Debug log untuk melihat perubahan state
  useEffect(() => {
    console.log('🔍 User state changed:', user);
    console.log('🔍 Settings state changed:', settings);
  }, [user, settings]);

  // Fetch user data and settings when auth is ready
  useEffect(() => {
    if (authLoading) return;
    if (!authUser) {
      window.location.href = '/login';
      return;
    }
    fetchUserData();
    setUser(authUser);
  }, [authLoading, authUser]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      console.log('📡 Fetching user data from API...');
      
      const response = await fetch('/api/auth/profile', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      console.log('📦 API Response:', data);
      
      if (data.success) {
        console.log('✅ User data received:', data.profile);
        console.log('✅ Settings data received:', data.settings);
        
        // Set user state dengan data dari API
        setUser(data.user || data.profile);
        
        // Merge settings dari API dengan defaults
        const mergedSettings = {
          ...settings,
          ...data.settings
        };
        setSettings(mergedSettings);
        
        if (data.borrowing_stats) {
          setBorrowingStats(data.borrowing_stats);
        }
        
        // Update user cookie dengan data lengkap
        const userCookieData = {
          ...data.profile,
          ...data.settings
        };
        console.log('💾 Saving to cookie:', userCookieData);
        
        document.cookie = `user=${encodeURIComponent(JSON.stringify(userCookieData))}; path=/; max-age=${60 * 60 * 24 * 7}`;
        
        // Update theme jika ada
        if (data.settings?.theme) {
          document.documentElement.setAttribute('data-theme', data.settings.theme);
        }
      } else {
        console.error('❌ Failed to fetch user data:', data.message);
        
        // Fallback: coba ambil dari localStorage atau cookie
        const fallbackUser = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (fallbackUser) {
          try {
            const parsedUser = JSON.parse(fallbackUser);
            console.log('🔄 Using fallback user data:', parsedUser);
            setUser(parsedUser);
          } catch (e) {
            console.error('Error parsing fallback user:', e);
          }
        }
      }
    } catch (error) {
      console.error('💥 Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    try {
      // Clear cookies/tokens
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      sessionStorage.clear();
      
      // Optional: Panggil API logout
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include'
        });
      } catch (e) {
        // Ignore API logout error
      }
      
      // Redirect to login
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/login';
    } finally {
      setShowLogoutModal(false);
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  // Format settings untuk dikirim ke API
  const formatSettingsForAPI = (settings) => {
    return {
      settings_language: settings.language,
      settings_theme: settings.theme,
      settings_profile_visibility: settings.profile_visibility,
      settings_email_notifications: settings.email_notifications,
      settings_push_notifications: settings.push_notifications,
      settings_borrow_reminders: settings.borrow_reminders,
      settings_return_reminders: settings.return_reminders,
      settings_new_book_alerts: settings.new_book_alerts,
      settings_wishlist_updates: settings.wishlist_updates,
      settings_show_reading_history: settings.show_reading_history,
      settings_show_wishlist: settings.show_wishlist,
      settings_allow_recommendations: settings.allow_recommendations,
      settings_auto_renew: settings.auto_renew,
      settings_default_borrow_duration: settings.default_borrow_duration,
      settings_download_quality: settings.download_quality
    };
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Format settings untuk API
      const apiData = formatSettingsForAPI(settings);
      console.log('💾 Saving settings:', apiData);
      
      // Kirim ke API
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(apiData),
      });

      const data = await response.json();
      console.log('💾 Save response:', data);

      if (data.success) {
        // Update local state dengan data dari server
        if (data.settings) {
          setSettings(prev => ({ ...prev, ...data.settings }));
        }
        if (data.profile) {
          setUser(prev => ({ ...prev, ...data.profile }));
        }
        
        // Update user cookie
        const updatedUser = {
          ...user,
          ...data.settings,
          ...data.profile
        };
        
        document.cookie = `user=${encodeURIComponent(JSON.stringify(updatedUser))}; path=/; max-age=${60 * 60 * 24 * 7}`;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        alert('✅ Settings saved successfully!');
      } else {
        alert(`❌ ${data.message || 'Failed to save settings'}`);
      }
    } catch (error) {
      console.error('💥 Error saving settings:', error);
      alert('❌ Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  // Handle update single setting from child components
  const handleUpdateSingleSetting = async (key, value) => {
    console.log(`🔄 Updating setting: ${key} = ${value}`);
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle update multiple settings from child components
  const handleUpdateSettings = async (newSettings) => {
    console.log('🔄 Updating multiple settings:', newSettings);
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  // Handle change password
  const handleUpdatePassword = async (passwordData) => {
    try {
      setSaving(true);
      console.log('🔐 Changing password:', passwordData);
      
      const response = await fetch('/api/settings/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(passwordData),
      });

      const data = await response.json();
      console.log('🔐 Password change response:', data);

      if (data.success) {
        // Tampilkan modal sukses
        setShowPasswordSuccess(true);
        
        // Clear password fields
        setSettings(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
        
        // Refresh user data
        await fetchUserData();
      } else {
        alert(`❌ ${data.message || 'Failed to update password'}`);
      }
    } catch (error) {
      console.error('💥 Error updating password:', error);
      alert('❌ Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Sidebar activePage="settings" onLogoutClick={handleLogoutClick} />
        <div className="ml-64 p-8 flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading settings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar activePage="settings" onLogoutClick={handleLogoutClick} />
      
      <LogoutConfirmationModal 
        isOpen={showLogoutModal}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
      
      <PasswordSuccessModal 
        isOpen={showPasswordSuccess}
        onClose={() => setShowPasswordSuccess(false)}
      />
      
      <div className="ml-64">
        {/* PASS USER PROP KE SettingsHeader */}
        <SettingsHeader user={user} />

        <div className="px-8 py-8">
          <div className="grid grid-cols-4 gap-6">
            {/* Sidebar Tabs */}
            <div className="col-span-1">
              <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* Main Content */}
            <div className="col-span-3">
              {saving && (
                <div className="mb-4 p-3 bg-blue-50 text-blue-600 rounded-lg flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  Saving changes...
                </div>
              )}
              
              {/* Debug info */}
              {user && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                  <strong>Debug Info:</strong> User loaded: {user.username} ({user.email})
                </div>
              )}
              
              {/* Account Settings */}
              {activeTab === 'account' && (
                <AccountTab 
                  settings={settings}
                  user={user}
                  onUpdatePassword={handleUpdatePassword}
                  onUpdateSettings={handleUpdateSettings}
                  saving={saving}
                />
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <NotificationsTab 
                  settings={settings} 
                  onUpdateSetting={handleUpdateSingleSetting}
                  saving={saving}
                />
              )}

              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <PrivacyTab 
                  settings={settings} 
                  onUpdateSetting={handleUpdateSingleSetting}
                  saving={saving}
                />
              )}

              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <AppearanceTab 
                  settings={settings} 
                  onUpdateSetting={handleUpdateSingleSetting}
                  saving={saving}
                />
              )}

              {/* Borrowing Settings */}
              {activeTab === 'borrowing' && (
                <BorrowingTab 
                  settings={settings} 
                  onUpdateSetting={handleUpdateSingleSetting}
                  borrowingStats={borrowingStats}
                  saving={saving}
                />
              )}

              {/* Save Button */}
              <div className="mt-6">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : 'Save All Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
