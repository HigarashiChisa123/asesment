'use client';
import { useState, useEffect } from 'react';
import Sidebar from './../components/layout/SideBar';
import LogoutConfirmationModal from './../components/shared/LogoutConfirmationModal';
import ProfileHeader from './../components/profile/ProfileHeader';
import ProfileImageSection from './../components/profile/ProfileImageSection';
import ProfileInfoSection from './../components/profile/ProfileInfoSection';
import ProfileActionButtons from './../components/profile/ProfileActionButtons';
import ProfileFooter from './../components/profile/ProfileFooter';
import { getUserFromCookie, setUserCookie } from '@/lib/auth';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState(null);
  const [tempUser, setTempUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSaving, setIsSaving] = useState(false);

  // Load user data
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const response = await fetch('/api/auth/profile');
      const data = await response.json();
      
      if (data.success && data.user) {
        const formattedUser = {
          id: data.user.id,
          email: data.user.email,
          username: data.user.username,
          full_name: data.user.full_name || '',
          bio: data.user.bio || '',
          profile_picture: data.user.profile_picture,
          background_picture: data.user.background_picture,
          class: data.user.class || 'Grade 11 RPL 5',
          birthday: data.user.birthday || '15/12/2008',
          hobby: data.user.hobby || 'Reading Books',
          role: data.user.role || 'user'
        };
        
        setUser(formattedUser);
        setTempUser(formattedUser);
      } else {
        const cookieUser = getUserFromCookie();
        if (cookieUser) {
          setUser(cookieUser);
          setTempUser(cookieUser);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      const cookieUser = getUserFromCookie();
      if (cookieUser) {
        setUser(cookieUser);
        setTempUser(cookieUser);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCancelLogout = () => setShowLogoutModal(false);
  
  const handleConfirmLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempUser({ 
          ...tempUser, 
          profile_picture: reader.result,
          profile_file: file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempUser({ 
          ...tempUser, 
          background_picture: reader.result,
          background_file: file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    if (!user) return;
    setTempUser({ ...user });
    setIsEditing(true);
  };

  const handleConfirm = async () => {
    if (!tempUser || !user) return;
    
    console.log('🚀 Saving profile changes...');
    console.log('📝 Changes to save:', {
      full_name: tempUser.full_name,
      bio: tempUser.bio,
      birthday: tempUser.birthday,
      hobby: tempUser.hobby
    });
    
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      
      // SEMUA FIELD INI AKAN DIKIRIM DAN DISIMPAN
      formData.append('full_name', tempUser.full_name || '');
      formData.append('bio', tempUser.bio || '');
      formData.append('birthday', tempUser.birthday || '15/12/2008');
      formData.append('hobby', tempUser.hobby || 'Reading Books');
      
      if (tempUser?.profile_file) {
        formData.append('profile_picture', tempUser.profile_file);
      }
      
      if (tempUser?.background_file) {
        formData.append('background_picture', tempUser.background_file);
      }
      
      const response = await fetch('/api/auth/profile/update', {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();
      console.log('✅ API Response:', data);

      if (data.success && data.user) {
        console.log('🎉 Profile saved successfully!');
        
        const updatedUser = {
          id: data.user.id,
          email: data.user.email,
          username: data.user.username,
          full_name: data.user.full_name,
          bio: data.user.bio,
          profile_picture: data.user.profile_picture,
          background_picture: data.user.background_picture,
          class: data.user.class,
          birthday: data.user.birthday,
          hobby: data.user.hobby,
          role: data.user.role
        };
        
        setUser(updatedUser);
        setUserCookie(updatedUser);
        setIsEditing(false);
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        
        setTempUser(prev => ({
          ...prev,
          profile_file: null,
          background_file: null
        }));
        
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update profile' });
      }
    } catch (error) {
      console.error('💥 Error updating profile:', error);
      setMessage({ type: 'error', text: 'Error: ' + error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setTempUser({ ...user });
    }
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  const handleChange = (field, value) => {
    if (!tempUser) return;
    
    console.log(`🔄 Field changed: ${field} = "${value}"`);
    
    setTempUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile not found</h2>
          <p className="text-gray-600 mb-6">Please login again or refresh the page</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/login'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login Now
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  const profileData = {
    full_name: user.full_name,
    email: user.email,
    class: user.class,
    birthday: user.birthday,
    hobby: user.hobby,
    bio: user.bio,
  };

  const tempProfileData = {
    full_name: tempUser.full_name,
    email: tempUser.email,
    class: tempUser.class,
    birthday: tempUser.birthday,
    hobby: tempUser.hobby,
    bio: tempUser.bio,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar activePage="profile" onLogoutClick={handleLogoutClick} user={user} />
      
      <LogoutConfirmationModal 
        isOpen={showLogoutModal}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
      
      <div className="ml-64 p-8">
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
            <div className="flex items-center">
              <span className={`mr-2 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {message.type === 'success' ? '✓' : '✗'}
              </span>
              {message.text}
            </div>
          </div>
        )}

        <ProfileHeader 
          profileImage={user.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
          profile={profileData}
        />

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <ProfileImageSection 
            profileImage={isEditing ? (tempUser.profile_picture || user.profile_picture) : (user.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`)}
            backgroundImage={isEditing ? (tempUser.background_picture || user.background_picture) : user.background_picture}
            onProfileImageChange={handleProfileImageChange}
            onBackgroundImageChange={handleBackgroundImageChange}
            isEditing={isEditing}
            onEditClick={handleEdit}
          />

          <div className="pt-20 px-8 pb-8">
            <ProfileInfoSection 
              profile={profileData}
              tempProfile={tempProfileData}
              isEditing={isEditing}
              onChange={handleChange}
              user={user}
            />

            <ProfileActionButtons 
              isEditing={isEditing}
              onCancel={handleCancel}
              onConfirm={handleConfirm}
              isSaving={isSaving}
            />
          </div>
        </div>

        <ProfileFooter />
      </div>
    </div>
  );
}