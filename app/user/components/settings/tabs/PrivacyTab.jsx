// components/settings/tabs/PrivacyTab.jsx
'use client';
import { Shield, Lock, Eye, Users, UserCheck } from 'lucide-react';
import { useState } from 'react';

export const PrivacyTab = ({ settings, onUpdateSetting, saving }) => {
  const [localLoading, setLocalLoading] = useState(false);

  const handleToggle = async (key) => {
    if (saving || localLoading) return;
    
    setLocalLoading(true);
    try {
      const newValue = !settings[key];
      console.log(`🔒 Toggling ${key} from ${settings[key]} to ${newValue}`);
      
      // Update setting di parent component
      await onUpdateSetting(key, newValue);
      
      showToast(
        `${getSettingLabel(key)} ${newValue ? 'enabled' : 'disabled'}`,
        'success'
      );
    } catch (error) {
      console.error('Error toggling privacy setting:', error);
      showToast('Failed to update privacy setting', 'error');
    } finally {
      setTimeout(() => setLocalLoading(false), 300);
    }
  };

  const handleSelect = async (key, value) => {
    if (saving || localLoading) return;
    
    setLocalLoading(true);
    try {
      console.log(`🔒 Selecting ${key}: ${value}`);
      
      // Update setting di parent component
      await onUpdateSetting(key, value);
      
      let message = '';
      if (key === 'profile_visibility') {
        switch(value) {
          case 'public': message = 'Profile is now public'; break;
          case 'friends': message = 'Profile visible to friends only'; break;
          case 'private': message = 'Profile is now private'; break;
        }
      }
      
      showToast(message, 'success');
    } catch (error) {
      console.error('Error selecting privacy setting:', error);
      showToast('Failed to update privacy setting', 'error');
    } finally {
      setTimeout(() => setLocalLoading(false), 300);
    }
  };

  const privacyOptions = [
    { 
      key: 'show_reading_history', 
      label: 'Show Reading History', 
      desc: 'Let others see what you\'re reading', 
      icon: '📚',
      color: 'from-blue-50 to-purple-50' 
    },
    { 
      key: 'show_wishlist', 
      label: 'Show Wishlist', 
      desc: 'Make your wishlist visible to others', 
      icon: '❤️',
      color: 'from-pink-50 to-rose-50' 
    },
    { 
      key: 'allow_recommendations', 
      label: 'Allow Recommendations', 
      desc: 'Get personalized book recommendations', 
      icon: '🎯',
      color: 'from-green-50 to-emerald-50' 
    },
  ];

  const visibilityOptions = [
    { 
      value: 'public', 
      label: 'Public', 
      desc: 'Everyone can see your profile',
      icon: Eye,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      value: 'friends', 
      label: 'Friends Only', 
      desc: 'Only your friends can see',
      icon: Users,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      value: 'private', 
      label: 'Private', 
      desc: 'Only you can see your profile',
      icon: Lock,
      color: 'from-gray-600 to-gray-800'
    },
  ];

  const getSettingLabel = (key) => {
    const option = privacyOptions.find(opt => opt.key === key);
    return option ? option.label : key;
  };

  const showToast = (message, type = 'info') => {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg transform transition-all duration-300 translate-x-full ${getToastClass(type)}`;
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-xl">${getToastIcon(type)}</span>
        <div>
          <p class="font-semibold">${message}</p>
          <p class="text-sm opacity-90">Privacy settings updated</p>
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
      default: return 'bg-gradient-to-r from-blue-500 to-purple-500 text-white';
    }
  };

  const getToastIcon = (type) => {
    switch(type) {
      case 'success': return '✅';
      case 'error': return '❌';
      default: return '🔒';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Shield className="w-6 h-6 text-green-600" />
          Privacy Settings
        </h3>
        
        <p className="text-gray-600 mb-6">
          Control who can see your profile and activity. Your privacy is important to us.
        </p>
        
        <div className="space-y-8">
          {/* Profile Visibility */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Profile Visibility</label>
                <p className="text-sm text-gray-500">Choose who can see your profile</p>
              </div>
              <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded capitalize">
                {settings.profile_visibility || 'public'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {visibilityOptions.map((option) => {
                const Icon = option.icon;
                const isActive = settings.profile_visibility === option.value;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelect('profile_visibility', option.value)}
                    disabled={saving || localLoading}
                    className={`relative p-4 rounded-xl border-2 transition-all text-left ${option.color} ${
                      isActive
                        ? 'border-blue-500 ring-2 ring-blue-200 text-white'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    } ${(saving || localLoading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-white/30' : 'bg-white/20'}`}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <span className={`font-semibold block ${isActive ? 'text-white' : ''}`}>
                          {option.label}
                        </span>
                        <span className={`text-xs mt-1 block ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                          {option.desc}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Privacy Options */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-4">Privacy Options</h4>
            <div className="space-y-4">
              {privacyOptions.map((item) => (
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
          </div>
        </div>
      </div>

      {/* Privacy Status */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Privacy Status</h3>
            <p className="text-green-100">Your current privacy level</p>
          </div>
          <Shield className="w-8 h-8 opacity-80" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="text-2xl font-bold capitalize">
              {settings.profile_visibility || 'public'}
            </p>
            <p className="text-sm text-green-100">Profile Visibility</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="text-2xl font-bold">
              {privacyOptions.filter(item => settings[item.key]).length}
            </p>
            <p className="text-sm text-green-100">Active Options</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="text-2xl font-bold">
              {settings.show_reading_history ? 'Visible' : 'Hidden'}
            </p>
            <p className="text-sm text-green-100">Reading History</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="text-2xl font-bold">
              {settings.show_wishlist ? 'Visible' : 'Hidden'}
            </p>
            <p className="text-sm text-green-100">Wishlist</p>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold mb-2">Danger Zone</h3>
            <p className="text-red-100">Irreversible actions - proceed with caution</p>
          </div>
          <div className="text-3xl">⚠️</div>
        </div>
        
        <div className="space-y-4">
          <p className="text-red-100">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          
          <div className="flex gap-4">
            <button 
              className="bg-white text-red-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              onClick={() => {
                if (confirm('⚠️ Are you sure you want to delete your account? This will permanently remove:\n\n• Your profile\n• Reading history\n• Wishlist\n• Borrowing records\n\nThis action CANNOT be undone!')) {
                  alert('🔧 Account deletion feature coming soon');
                }
              }}
              disabled={saving}
            >
              <span>🗑️</span>
              Delete Account
            </button>
            
            <button 
              className="bg-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              onClick={() => {
                if (confirm('Clear all your browsing data from this device?')) {
                  localStorage.clear();
                  sessionStorage.clear();
                  showToast('Browsing data cleared', 'success');
                }
              }}
              disabled={saving}
            >
              <span>🧹</span>
              Clear Local Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyTab;