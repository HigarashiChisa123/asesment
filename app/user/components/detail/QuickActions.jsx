'use client'

import React from 'react';
import { Bookmark, Share2, Download, MessageSquare } from 'lucide-react';

const QuickActions = ({ isBookmarked, onToggleBookmark }) => {
  const actions = [
    {
      icon: Bookmark,
      label: isBookmarked ? 'Saved' : 'Save',
      color: 'text-purple-500',
      action: onToggleBookmark,
      isActive: isBookmarked
    },
    {
      icon: Share2,
      label: 'Share',
      color: 'text-blue-500',
      action: () => console.log('Share clicked')
    },
    {
      icon: Download,
      label: 'Sample PDF',
      color: 'text-green-500',
      action: () => console.log('Download clicked')
    },
    {
      icon: MessageSquare,
      label: 'Review',
      color: 'text-orange-500',
      action: () => console.log('Review clicked')
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h4 className="font-bold text-gray-900 mb-4">Quick Actions</h4>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <ActionButton key={index} {...action} />
        ))}
      </div>
    </div>
  );
};

const ActionButton = ({ icon: Icon, label, color, action, isActive }) => (
  <button
    onClick={action}
    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all duration-300 ${
      isActive 
        ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200' 
        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
    }`}
  >
    <Icon className={`w-5 h-5 ${color} ${isActive ? 'fill-purple-500' : ''}`} />
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </button>
);

export default QuickActions;