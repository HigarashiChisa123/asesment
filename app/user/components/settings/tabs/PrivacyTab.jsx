'use client';
import { Shield } from 'lucide-react';

export const PrivacyTab = ({ settings, setSettings, handleToggle }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Shield className="w-6 h-6 text-green-600" />
          Privacy Settings
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Profile Visibility</label>
            <div className="grid grid-cols-3 gap-3">
              {['public', 'friends', 'private'].map((option) => (
                <button
                  key={option}
                  onClick={() => setSettings({ ...settings, profileVisibility: option })}
                  className={`px-4 py-3 rounded-xl font-semibold transition capitalize ${
                    settings.profileVisibility === option
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {[
            { key: 'showReadingHistory', label: 'Show Reading History', desc: 'Let others see what you\'re reading', color: 'from-blue-50 to-purple-50' },
            { key: 'showWishlist', label: 'Show Wishlist', desc: 'Make your wishlist visible to others', color: 'from-pink-50 to-rose-50' },
            { key: 'allowRecommendations', label: 'Allow Recommendations', desc: 'Get personalized book recommendations', color: 'from-green-50 to-emerald-50' },
          ].map((item) => (
            <div key={item.key} className={`flex items-center justify-between p-4 bg-gradient-to-r ${item.color} rounded-xl`}>
              <div>
                <h4 className="font-semibold text-gray-800">{item.label}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[item.key]}
                  onChange={() => handleToggle(item.key)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Danger Zone</h3>
        <p className="text-red-100 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
        <button className="bg-white text-red-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default PrivacyTab;