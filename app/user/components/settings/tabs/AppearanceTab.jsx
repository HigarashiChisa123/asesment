'use client';
import { Globe, Sun, Moon, Palette, Eye } from 'lucide-react';
import { useState } from 'react';

export const AppearanceTab = ({ settings, onUpdateSetting, saving }) => {
  const [localLoading, setLocalLoading] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];

  const themes = [
    { id: 'light', name: 'Light', icon: Sun, color: 'from-yellow-100 to-orange-100', desc: 'Bright and clear' },
    { id: 'dark', name: 'Dark', icon: Moon, color: 'from-gray-900 to-blue-900', desc: 'Easy on the eyes' },
    { id: 'auto', name: 'Auto', icon: Globe, color: 'from-blue-100 to-purple-100', desc: 'Follows system' },
  ];

  const handleThemeChange = async (theme) => {
    if (saving || localLoading) return;
    
    setLocalLoading(true);
    try {
      onUpdateSetting('theme', theme);
      
      // Apply theme immediately
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      
      // Show toast
      showToast(`Theme changed to ${theme} mode`, 'success');
    } catch (error) {
      console.error('Error changing theme:', error);
      showToast('Failed to change theme', 'error');
    } finally {
      setTimeout(() => setLocalLoading(false), 300);
    }
  };

  const handleLanguageChange = async (language) => {
    if (saving || localLoading) return;
    
    setLocalLoading(true);
    try {
      onUpdateSetting('language', language);
      localStorage.setItem('language', language);
      
      const languageName = languages.find(l => l.code === language)?.name || language;
      showToast(`Language changed to ${languageName}`, 'success');
      
      // Optional: Show language change notification
      setTimeout(() => {
        alert(`🌍 Language changed to ${languageName}. Some changes may require a page refresh.`);
      }, 100);
    } catch (error) {
      console.error('Error changing language:', error);
      showToast('Failed to change language', 'error');
    } finally {
      setTimeout(() => setLocalLoading(false), 300);
    }
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
          <p class="text-sm opacity-90">Settings updated locally</p>
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
      default: return '🎨';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Palette className="w-6 h-6 text-purple-600" />
          Appearance & Language
        </h3>
        
        <div className="space-y-8">
          {/* Theme Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-semibold text-gray-700">Theme</label>
              <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
                Current: {settings.theme || 'light'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {themes.map((theme) => {
                const Icon = theme.icon;
                const isActive = settings.theme === theme.id;
                
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    disabled={saving || localLoading}
                    className={`relative p-4 rounded-xl border-2 transition-all ${theme.color} ${
                      isActive
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${(saving || localLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isActive && (
                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
                        <Eye className="w-4 h-4" />
                      </div>
                    )}
                    
                    <div className="flex flex-col items-center gap-2">
                      <div className={`p-3 rounded-lg ${isActive ? 'bg-white/30' : 'bg-white/20'}`}>
                        <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-700'}`}>
                        {theme.name}
                      </span>
                      <span className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                        {theme.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            <p className="text-sm text-gray-500 mt-3 flex items-center gap-1">
              <span className="text-blue-500">💡</span>
              {settings.theme === 'auto' 
                ? 'Theme automatically adjusts based on your system preferences' 
                : settings.theme === 'dark' 
                  ? 'Dark mode reduces eye strain in low-light conditions' 
                  : 'Light mode provides optimal readability'}
            </p>
          </div>

          {/* Language Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-semibold text-gray-700">Language</label>
              <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
                Current: {languages.find(l => l.code === settings.language)?.name || 'English'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {languages.map((lang) => {
                const isActive = settings.language === lang.code;
                
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    disabled={saving || localLoading}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } ${(saving || localLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span>{lang.name}</span>
                    {isActive && <span className="ml-auto text-sm">✓</span>}
                  </button>
                );
              })}
            </div>
            
            <p className="text-sm text-gray-500 mt-3 flex items-center gap-1">
              <span className="text-green-500">🌐</span>
              Changing language will affect text display throughout the application
            </p>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Preview</h3>
            <p className="text-purple-100">See how your settings look</p>
          </div>
          <Globe className="w-8 h-8 opacity-80" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <h4 className="font-semibold mb-2">Theme Preview</h4>
            <div className={`p-3 rounded-lg ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`h-2 rounded-full mb-2 ${settings.theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
              <div className={`h-2 rounded-full mb-2 w-3/4 ${settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
              <div className={`h-2 rounded-full w-1/2 ${settings.theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
            </div>
            <p className="text-sm text-purple-100 mt-2">
              {settings.theme === 'dark' ? 'Dark theme active' : 'Light theme active'}
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <h4 className="font-semibold mb-2">Language Preview</h4>
            <div className="flex items-center gap-2 p-3 bg-white/10 rounded-lg">
              <span className="text-2xl">
                {languages.find(l => l.code === settings.language)?.flag || '🇺🇸'}
              </span>
              <div>
                <p className="font-medium">
                  {languages.find(l => l.code === settings.language)?.name || 'English'}
                </p>
                <p className="text-xs text-purple-100">
                  Selected for interface
                </p>
              </div>
            </div>
            <p className="text-sm text-purple-100 mt-2">
              Content will display in {languages.find(l => l.code === settings.language)?.name || 'English'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceTab;