'use client';
import { Book, Download, Calendar, RefreshCw, Star } from 'lucide-react';
import { useState } from 'react';

export const BorrowingTab = ({ settings, onUpdateSetting, saving }) => {
  const [localLoading, setLocalLoading] = useState(false);

  const handleToggle = async (key) => {
    if (saving || localLoading) return;
    
    setLocalLoading(true);
    try {
      const newValue = !settings[key];
      onUpdateSetting(key, newValue);
      
      let message = '';
      if (key === 'auto_renew') {
        message = `Auto-renew ${newValue ? 'enabled' : 'disabled'}`;
      }
      
      showToast(message, 'success');
    } catch (error) {
      console.error('Error toggling borrowing setting:', error);
      showToast('Failed to update setting', 'error');
    } finally {
      setTimeout(() => setLocalLoading(false), 300);
    }
  };

  const handleSelect = async (key, value) => {
    if (saving || localLoading) return;
    
    setLocalLoading(true);
    try {
      onUpdateSetting(key, value);
      
      let message = '';
      if (key === 'default_borrow_duration') {
        message = `Default borrow duration set to ${value} days`;
      } else if (key === 'download_quality') {
        message = `Download quality set to ${value}`;
      }
      
      showToast(message, 'success');
    } catch (error) {
      console.error('Error selecting borrowing setting:', error);
      showToast('Failed to update setting', 'error');
    } finally {
      setTimeout(() => setLocalLoading(false), 300);
    }
  };

  const borrowingStats = {
    total_borrowed: 24,
    currently_reading: 3,
    completed: 21,
    overdue: 0,
    favorite_genre: 'Fiction',
    reading_streak: 15
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
          <p class="text-sm opacity-90">Borrowing preference updated</p>
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
      default: return '📚';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Book className="w-6 h-6 text-blue-600" />
          Borrowing Preferences
        </h3>
        
        <p className="text-gray-600 mb-6">
          Customize your borrowing experience and manage your reading habits.
        </p>
        
        <div className="space-y-6">
          {/* Auto Renew */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-white/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <RefreshCw className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Auto Renew</h4>
                  <p className="text-sm text-gray-600">Automatically renew books before due date</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.auto_renew || false}
                  onChange={() => handleToggle('auto_renew')}
                  disabled={saving || localLoading}
                  className="sr-only peer"
                />
                <div className={`w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500 ${(saving || localLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
              </label>
            </div>
            <div className="mt-3 text-xs text-gray-500 flex items-center gap-1">
              <span className="text-blue-500">💡</span>
              {settings.auto_renew 
                ? 'Books will be renewed automatically 2 days before due date' 
                : 'You will need to manually renew books before they expire'}
            </div>
          </div>

          {/* Borrow Duration */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Default Borrow Duration</label>
                <p className="text-sm text-gray-500">How long you can borrow books by default</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: 7, label: '7 days', desc: 'Quick reads' },
                { value: 14, label: '14 days', desc: 'Standard' },
                { value: 21, label: '21 days', desc: 'Extended' },
                { value: 30, label: '30 days', desc: 'Long term' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect('default_borrow_duration', option.value)}
                  disabled={saving || localLoading}
                  className={`px-4 py-3 rounded-xl font-medium transition text-center ${
                    settings.default_borrow_duration === option.value
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } ${(saving || localLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-xs opacity-80 mt-1">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Download Quality */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Download className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Download Quality</label>
                <p className="text-sm text-gray-500">Quality of downloaded books</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { 
                  value: 'low', 
                  label: 'Low', 
                  desc: 'Small file size',
                  details: 'Fast downloads, lower quality',
                  color: 'from-gray-100 to-gray-200'
                },
                { 
                  value: 'medium', 
                  label: 'Medium', 
                  desc: 'Balanced',
                  details: 'Good quality, moderate size',
                  color: 'from-blue-100 to-purple-100'
                },
                { 
                  value: 'high', 
                  label: 'High', 
                  desc: 'Best quality',
                  details: 'Large files, best experience',
                  color: 'from-purple-100 to-pink-100'
                },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect('download_quality', option.value)}
                  disabled={saving || localLoading}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${option.color} ${
                    settings.download_quality === option.value
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${(saving || localLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="font-semibold text-gray-800">{option.label}</div>
                  <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
                  <div className="text-xs text-gray-500 mt-2">{option.details}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Borrowing Stats */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Reading Statistics</h3>
            <p className="text-blue-100">Your personal reading journey</p>
          </div>
          <Star className="w-8 h-8 opacity-80" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="text-2xl font-bold">{borrowingStats.total_borrowed}</p>
            <p className="text-sm text-blue-100">Total Books</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="text-2xl font-bold">{borrowingStats.currently_reading}</p>
            <p className="text-sm text-blue-100">Reading Now</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="text-2xl font-bold">{borrowingStats.completed}</p>
            <p className="text-sm text-blue-100">Completed</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="text-2xl font-bold">{borrowingStats.overdue}</p>
            <p className="text-sm text-blue-100">Overdue</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="text-2xl font-bold">{borrowingStats.reading_streak} days</p>
            <p className="text-sm text-blue-100">Reading Streak</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="text-2xl font-bold">{borrowingStats.favorite_genre}</p>
            <p className="text-sm text-blue-100">Favorite Genre</p>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
          <h4 className="font-semibold mb-2">📈 Reading Insights</h4>
          <div className="space-y-2 text-sm text-blue-100">
            <p>• You've read {borrowingStats.total_borrowed} books total</p>
            <p>• Currently reading {borrowingStats.currently_reading} books</p>
            <p>• {borrowingStats.overdue === 0 ? 'Great! No overdue books' : `${borrowingStats.overdue} books overdue`}</p>
            <p>• On a {borrowingStats.reading_streak} day reading streak! 🔥</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            className="bg-white/20 backdrop-blur rounded-xl p-4 hover:bg-white/30 transition flex items-center gap-3"
            onClick={() => showToast('Borrowing history loaded', 'info')}
          >
            <span className="text-2xl">📋</span>
            <div>
              <p className="font-semibold">View Borrowing History</p>
              <p className="text-sm text-green-100">See all books you've borrowed</p>
            </div>
          </button>
          
          <button 
            className="bg-white/20 backdrop-blur rounded-xl p-4 hover:bg-white/30 transition flex items-center gap-3"
            onClick={() => showToast('Reading recommendations loaded', 'info')}
          >
            <span className="text-2xl">🎯</span>
            <div>
              <p className="font-semibold">Get Recommendations</p>
              <p className="text-sm text-green-100">Based on your reading history</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BorrowingTab;