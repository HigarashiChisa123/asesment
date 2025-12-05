'use client';
import { Book, Download } from 'lucide-react';

export const BorrowingTab = ({ settings, setSettings, handleToggle }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Book className="w-6 h-6 text-blue-600" />
          Borrowing Preferences
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <div>
              <h4 className="font-semibold text-gray-800">Auto Renew</h4>
              <p className="text-sm text-gray-500">Automatically renew books before due date</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoRenew}
                onChange={() => handleToggle('autoRenew')}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Default Borrow Duration</label>
            <select
              value={settings.defaultBorrowDuration}
              onChange={(e) => setSettings({ ...settings, defaultBorrowDuration: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 transition text-black"
            >
              <option value={7}>7 days</option>
              <option value={14}>14 days</option>
              <option value={21}>21 days</option>
              <option value={30}>30 days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Download Quality</label>
            <div className="grid grid-cols-3 gap-3">
              {['low', 'medium', 'high'].map((quality) => (
                <button
                  key={quality}
                  onClick={() => setSettings({ ...settings, downloadQuality: quality })}
                  className={`px-4 py-3 rounded-xl font-semibold transition capitalize ${
                    settings.downloadQuality === quality
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {quality}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {settings.downloadQuality === 'low' && 'Smaller file size, faster downloads'}
              {settings.downloadQuality === 'medium' && 'Balanced quality and file size'}
              {settings.downloadQuality === 'high' && 'Best quality, larger file size'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold mb-2">Borrowing Stats</h3>
            <p className="text-blue-100">Your reading activity summary</p>
          </div>
          <Download className="w-8 h-8" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="text-2xl font-bold">24</p>
            <p className="text-sm text-blue-100">Books Borrowed</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-blue-100">Currently Reading</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="text-2xl font-bold">21</p>
            <p className="text-sm text-blue-100">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowingTab;