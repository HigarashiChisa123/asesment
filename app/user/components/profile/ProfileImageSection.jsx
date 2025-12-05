// app/user/components/profile/ProfileImageSection.jsx
'use client';
import React from 'react';
import { Edit2 } from 'lucide-react';

export const ProfileImageSection = ({ 
  profileImage, 
  backgroundImage, 
  onProfileImageChange, 
  onBackgroundImageChange,
  isEditing,
  onEditClick 
}) => {
  const profileInputRef = React.useRef(null);
  const backgroundInputRef = React.useRef(null);

  const triggerProfileImageUpload = () => {
    if (profileInputRef.current) {
      profileInputRef.current.click();
    }
  };

  const triggerBackgroundUpload = () => {
    if (backgroundInputRef.current) {
      backgroundInputRef.current.click();
    }
  };

  const handleProfileImageChange = (e) => {
    if (onProfileImageChange && e.target.files && e.target.files[0]) {
      onProfileImageChange(e);
    }
  };

  const handleBackgroundImageChange = (e) => {
    if (onBackgroundImageChange && e.target.files && e.target.files[0]) {
      onBackgroundImageChange(e);
    }
  };

  return (
    <div 
      className="h-40 relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-cover bg-center"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      {/* Background Upload Input */}
      <input
        type="file"
        ref={backgroundInputRef}
        onChange={handleBackgroundImageChange}
        accept="image/*"
        className="hidden"
        id="background_upload"
        key={isEditing ? "background-edit" : "background-view"} // Reset input saat mode edit berubah
      />
      
      {/* Background Upload Button */}
      {isEditing && (
        <button
          onClick={triggerBackgroundUpload}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full font-semibold shadow-lg hover:bg-white transition flex items-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {backgroundImage ? 'Ganti Background' : 'Tambah Background'}
        </button>
      )}

      {/* Profile Image Section */}
      <div className="absolute -bottom-16 left-8">
        <div className="relative group">
          <img 
            src={profileImage}
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-white object-cover"
            onError={(e) => {
              e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=User';
            }}
          />
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          
          {/* Profile Upload Input */}
          <input
            type="file"
            ref={profileInputRef}
            onChange={handleProfileImageChange}
            accept="image/*"
            className="hidden"
            id="profile_upload"
            key={isEditing ? "profile-edit" : "profile-view"} // Reset input saat mode edit berubah
          />
          
          {/* Profile Upload Button */}
          {isEditing && (
            <button
              onClick={triggerProfileImageUpload}
              className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
              title="Ganti foto profil"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Edit Profile Button */}
      {!isEditing && (
        <button 
          onClick={onEditClick}
          className="absolute top-6 right-6 bg-white text-blue-600 px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition flex items-center gap-2 hover:scale-105"
        >
          <Edit2 className="w-4 h-4" />
          Edit Profile
        </button>
      )}
      
      {/* User Info Badge */}
      <div className="absolute bottom-4 left-48 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-700">Your Profile</span>
          <span className="text-xs text-gray-500">
            {isEditing ? 'Edit mode active' : 'Click edit to make changes'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageSection;