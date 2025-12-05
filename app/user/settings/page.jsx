'use client';
import { useState } from 'react';
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

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const [settings, setSettings] = useState({
    // Account Settings
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    borrowReminders: true,
    returnReminders: true,
    newBookAlerts: true,
    wishlistUpdates: true,
    
    // Privacy Settings
    profileVisibility: 'public',
    showReadingHistory: true,
    showWishlist: false,
    allowRecommendations: true,
    
    // Appearance
    theme: 'light',
    language: 'en',
    
    // Reading Preferences
    autoRenew: true,
    defaultBorrowDuration: 14,
    downloadQuality: 'high',
  });

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

  const handleToggle = (setting) => {
    setSettings({ ...settings, [setting]: !settings[setting] });
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar activePage="settings" onLogoutClick={handleLogoutClick} />
      
      <LogoutConfirmationModal 
        isOpen={showLogoutModal}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
      
      <div className="ml-64">
        <SettingsHeader />

        <div className="px-8 py-8">
          <div className="grid grid-cols-4 gap-6">
            {/* Sidebar Tabs */}
            <div className="col-span-1">
              <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* Main Content */}
            <div className="col-span-3">
              {/* Account Settings */}
              {activeTab === 'account' && (
                <AccountTab settings={settings} setSettings={setSettings} />
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <NotificationsTab settings={settings} handleToggle={handleToggle} />
              )}

              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <PrivacyTab settings={settings} setSettings={setSettings} handleToggle={handleToggle} />
              )}

              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <AppearanceTab settings={settings} setSettings={setSettings} />
              )}

              {/* Borrowing Settings */}
              {activeTab === 'borrowing' && (
                <BorrowingTab settings={settings} setSettings={setSettings} handleToggle={handleToggle} />
              )}

              {/* Save Button */}
              <div className="mt-6">
                <button
                  onClick={handleSave}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-[1.02]"
                >
                  Save All Changes
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