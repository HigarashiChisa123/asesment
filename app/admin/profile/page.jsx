'use client'
import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, Phone, Shield, Edit2, Check, X } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });
  const [saving, setSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    bio: ''
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });
  const [profileImage, setProfileImage] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const profileInputRef = useRef(null);
  const backgroundInputRef = useRef(null);

  const broadcastProfileUpdate = (payload) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('adminProfileUpdated', { detail: payload }));
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/auth/profile', { credentials: 'include' });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || 'Failed to load profile');

        const user = data.profile || data.user || {};
        const updatedProfile = {
          name: user.full_name || user.username || '',
          email: user.email || '',
          phone: user.phone || '',
          role: user.role || 'Administrator',
          bio: user.bio || 'I like reading books and managing TB Digital platform'
        };

        setProfile(updatedProfile);
        setTempProfile(updatedProfile);
        setProfileImage(user.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username || 'Admin'}`);
        setBackgroundImage(user.background_picture || '');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setTempProfile({ ...profile });
    setIsEditing(true);
  };

  const handleConfirm = async () => {
    setSaveStatus({ type: '', message: '' });
    try {
      setSaving(true);
      const payload = {
        profile_full_name: tempProfile.name,
        profile_bio: tempProfile.bio,
        profile_phone: tempProfile.phone,
        profile_profile_picture: profileImage,
        profile_background_picture: backgroundImage,
      };

      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update profile');
      }

      const updated = data.profile || {};
      const newProfile = {
        name: updated.full_name || tempProfile.name,
        email: updated.email || tempProfile.email,
        phone: updated.phone || tempProfile.phone,
        role: updated.role || tempProfile.role,
        bio: updated.bio || tempProfile.bio,
      };

      setProfile(newProfile);
      setTempProfile(newProfile);
      setProfileImage(updated.profile_picture || profileImage);
      setBackgroundImage(updated.background_picture || backgroundImage);
      broadcastProfileUpdate({
        name: newProfile.name,
        bio: newProfile.bio,
        image: updated.profile_picture || profileImage,
      });
      setIsEditing(false);
      setSaveStatus({ type: 'success', message: data.message || 'Profile updated successfully' });
    } catch (err) {
      setSaveStatus({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setTempProfile({ ...tempProfile, [field]: value });
  };

  return (
    <div className="p-8">
      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}
      {saveStatus.message && (
        <div
          className={`mb-4 px-4 py-3 rounded-lg text-sm ${
            saveStatus.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}
        >
          {saveStatus.message}
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div 
          className="h-40 relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-cover bg-center"
          style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
        >
          {/* Upload Background Button */}
          <input
            type="file"
            ref={backgroundInputRef}
            onChange={handleBackgroundImageChange}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => backgroundInputRef.current?.click()}
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full font-semibold shadow-lg hover:bg-white transition flex items-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Change Cover
          </button>

          <div className="absolute -bottom-16 left-8">
            <div className="relative group">
              <img 
                src={profileImage || '/image/LogoTb.jpg'}
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-white object-cover"
              />
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              
              {/* Upload Profile Picture Button */}
              <input
                type="file"
                ref={profileInputRef}
                onChange={handleProfileImageChange}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => profileInputRef.current?.click()}
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
          {!isEditing && (
            <button 
              onClick={handleEdit}
              className="absolute top-6 right-6 bg-white text-blue-600 px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition flex items-center gap-2 hover:scale-105"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>

        <div className="pt-20 px-8 pb-8">
          <div className="grid grid-cols-2 gap-6">
            {/* Name */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-2xl">
              <label className="flex items-center gap-2 text-sm font-semibold text-blue-900 mb-3">
                <User className="w-4 h-4" />
                Username
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-500 bg-white"
                />
              ) : (
                <p className="text-gray-800 font-semibold text-lg">{profile.name || '-'}</p>
              )}
            </div>

            {/* Email */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-2xl">
              <label className="flex items-center gap-2 text-sm font-semibold text-purple-900 mb-3">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <p className="text-gray-800 font-semibold text-lg">{profile.email || '-'}</p>
            </div>

            {/* Phone */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-5 rounded-2xl">
              <label className="flex items-center gap-2 text-sm font-semibold text-pink-900 mb-3">
                <Phone className="w-4 h-4" />
                Phone
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempProfile.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-pink-500 bg-white"
                />
              ) : (
                <p className="text-gray-800 font-semibold text-lg">{profile.phone || '-'}</p>
              )}
            </div>

            {/* Role */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-2xl">
              <label className="flex items-center gap-2 text-sm font-semibold text-green-900 mb-3">
                <Shield className="w-4 h-4" />
                Role
              </label>
              <p className="text-gray-800 font-semibold text-lg">{profile.role}</p>
            </div>

            {/* Bio */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-2xl col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-indigo-900 mb-3">
                <Edit2 className="w-4 h-4" />
                Bio
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempProfile.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-indigo-300 rounded-xl focus:outline-none focus:border-indigo-500 bg-white"
                />
              ) : (
                <p className="text-gray-800 font-semibold text-lg">{profile.bio || '-'}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-4 mt-8 justify-end">
              <button
                onClick={handleCancel}
                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition flex items-center gap-2 hover:scale-105"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={saving}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition flex items-center gap-2 hover:scale-105 disabled:opacity-70"
              >
                <Check className="w-5 h-5" />
                {saving ? 'Saving...' : 'Confirm Changes'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">TB Digital Reads</h3>
        <p className="text-blue-100 leading-relaxed max-w-3xl">
          TB Digital Reads has become an integral part of digital literacy activities at Taruna Bakti Vocational School. 
          Students and teachers have received a variety of positive responses, benefiting from the ease of access, 
          comfortable reading, and increased motivation to learn through this platform.
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
