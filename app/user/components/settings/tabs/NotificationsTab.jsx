'use client';
import { Bell } from 'lucide-react';

export const NotificationsTab = ({ settings, handleToggle }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Bell className="w-6 h-6 text-blue-600" />
        Notification Preferences
      </h3>
      
      <div className="space-y-6">
        {[
          { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email', color: 'from-blue-50 to-purple-50' },
          { key: 'pushNotifications', label: 'Push Notifications', desc: 'Get instant updates on your device', color: 'from-green-50 to-emerald-50' },
          { key: 'borrowReminders', label: 'Borrow Reminders', desc: 'Reminder when you borrow a book', color: 'from-orange-50 to-amber-50' },
          { key: 'returnReminders', label: 'Return Reminders', desc: 'Reminder before due date', color: 'from-red-50 to-pink-50' },
          { key: 'newBookAlerts', label: 'New Book Alerts', desc: 'Notify when new books are added', color: 'from-purple-50 to-indigo-50' },
          { key: 'wishlistUpdates', label: 'Wishlist Updates', desc: 'Notify when wishlist books become available', color: 'from-pink-50 to-rose-50' },
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
  );
};

export default NotificationsTab;