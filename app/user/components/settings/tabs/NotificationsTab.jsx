// components/settings/tabs/NotificationsTab.jsx
'use client';
import { Bell } from 'lucide-react';
import { useState } from 'react';

export const NotificationsTab = ({ settings, onUpdateSetting, saving }) => {
  const [localLoading, setLocalLoading] = useState(false);

  // Fungsi untuk update setting yang bisa dipanggil oleh parent
  const handleToggle = async (key) => {
    if (saving || localLoading) return;
    
    setLocalLoading(true);
    try {
      const newValue = !settings[key];
      console.log(`🔔 Toggling ${key} from ${settings[key]} to ${newValue}`);
      
      // Update setting di parent component
      await onUpdateSetting(key, newValue);
      
      // Tampilkan toast notification
      showToast(`Notifications ${newValue ? 'enabled' : 'disabled'}`, 'success');
    } catch (error) {
      console.error('Error toggling notification:', error);
      showToast('Failed to update notification', 'error');
    } finally {
      setTimeout(() => setLocalLoading(false), 300);
    }
  };

  const notificationOptions = [
    { 
      key: 'email_notifications', 
      label: 'Email Notifications', 
      desc: 'Receive updates via email', 
      icon: '📧',
      color: 'from-blue-50 to-purple-50' 
    },
    { 
      key: 'push_notifications', 
      label: 'Push Notifications', 
      desc: 'Get instant updates on your device', 
      icon: '📱',
      color: 'from-green-50 to-emerald-50' 
    },
    { 
      key: 'borrow_reminders', 
      label: 'Borrow Reminders', 
      desc: 'Reminder when you borrow a book', 
      icon: '📖',
      color: 'from-orange-50 to-amber-50' 
    },
    { 
      key: 'return_reminders', 
      label: 'Return Reminders', 
      desc: 'Reminder before due date', 
      icon: '⏰',
      color: 'from-red-50 to-pink-50' 
    },
    { 
      key: 'new_book_alerts', 
      label: 'New Book Alerts', 
      desc: 'Notify when new books are added', 
      icon: '🆕',
      color: 'from-purple-50 to-indigo-50' 
    },
    { 
      key: 'wishlist_updates', 
      label: 'Wishlist Updates', 
      desc: 'Notify when wishlist books become available', 
      icon: '❤️',
      color: 'from-pink-50 to-rose-50' 
    },
  ];

  const showToast = (message, type = 'info') => {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg transform transition-all duration-300 translate-x-full ${getToastClass(type)}`;
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-xl">${getToastIcon(type)}</span>
        <div>
          <p class="font-semibold">${message}</p>
          <p class="text-sm opacity-90">Notification setting updated</p>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-lg hover:opacity-70">×</button>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.classList.remove('translate-x-full');
      toast.classList.add('translate-x-0');
    }, 10);
    
    // Auto remove
    setTimeout(() => {
      toast.classList.add('translate-x-full');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  const getToastClass = (type) => {
    switch(type) {
      case 'success': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'error': return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      case 'info': return 'bg-gradient-to-r from-blue-500 to-purple-500 text-white';
      default: return 'bg-gradient-to-r from-blue-500 to-purple-500 text-white';
    }
  };

  const getToastIcon = (type) => {
    switch(type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'info': return '📢';
      default: return '📢';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Bell className="w-6 h-6 text-blue-600" />
          Notification Preferences
        </h3>
        
        <p className="text-gray-600 mb-6">
          Customize how you receive notifications from TB Digital Reads. Changes will be saved when you click "Save All Changes" below.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notificationOptions.map((item) => (
            <div key={item.key} className={`p-4 bg-gradient-to-r ${item.color} rounded-xl border border-white/50 hover:shadow-md transition-all ${(saving || localLoading) ? 'opacity-70' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.label}</h4>
                    <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[item.key] || false}
                    onChange={() => handleToggle(item.key)}
                    disabled={saving || localLoading}
                    className="sr-only peer"
                  />
                  <div className={`w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all ${settings[item.key] ? 'bg-gradient-to-r from-blue-500 to-purple-500' : ''} ${(saving || localLoading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}></div>
                </label>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-xl">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Notification Tips</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Enable email notifications for important updates</li>
            <li>• Turn on borrow reminders to avoid late returns</li>
            <li>• Wishlist updates notify when books become available</li>
            <li>• Push notifications require browser permission</li>
          </ul>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold mb-2">Notification Status</h3>
            <p className="text-blue-100">Your current notification settings</p>
          </div>
          <div className="text-3xl">🔔</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="text-2xl font-bold">
              {notificationOptions.filter(item => settings[item.key]).length}
            </p>
            <p className="text-sm text-blue-100">Active Notifications</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="text-2xl font-bold">
              {notificationOptions.filter(item => !settings[item.key]).length}
            </p>
            <p className="text-sm text-blue-100">Disabled</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="text-2xl font-bold">{notificationOptions.length}</p>
            <p className="text-sm text-blue-100">Total Options</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;