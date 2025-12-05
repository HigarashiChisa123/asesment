'use client';
import { User, Bell, Shield, Globe, Book } from 'lucide-react';

export const SettingsSidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'account', name: 'Account', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Globe },
    { id: 'borrowing', name: 'Borrowing', icon: Book },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-24">
      <h3 className="font-semibold text-gray-700 mb-4 px-2">Categories</h3>
      <div className="space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className={activeTab === tab.id ? 'font-semibold' : ''}>{tab.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsSidebar;