'use client';
import { Globe, Sun, Moon } from 'lucide-react';

export const AppearanceTab = ({ settings, setSettings }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Globe className="w-6 h-6 text-purple-600" />
        Appearance & Language
      </h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Theme</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setSettings({ ...settings, theme: 'light' })}
              className={`px-4 py-4 rounded-xl font-semibold transition flex flex-col items-center gap-2 ${
                settings.theme === 'light'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Sun className="w-6 h-6" />
              Light
            </button>
            <button
              onClick={() => setSettings({ ...settings, theme: 'dark' })}
              className={`px-4 py-4 rounded-xl font-semibold transition flex flex-col items-center gap-2 ${
                settings.theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Moon className="w-6 h-6" />
              Dark
            </button>
            <button
              onClick={() => setSettings({ ...settings, theme: 'auto' })}
              className={`px-4 py-4 rounded-xl font-semibold transition flex flex-col items-center gap-2 ${
                settings.theme === 'auto'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Auto
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Language</label>
          <select
            value={settings.language}
            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 transition text-black"
          >
            <option value="en">English</option>
            <option value="id">Bahasa Indonesia</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="ja">日本語</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AppearanceTab;