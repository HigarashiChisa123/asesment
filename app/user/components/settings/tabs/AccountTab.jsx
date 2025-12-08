'use client';
import { useState } from 'react';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

export const AccountTab = ({ user, onUpdatePassword, saving }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [localMessage, setLocalMessage] = useState({ type: '', text: '' });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!passwordData.currentPassword) {
      setLocalMessage({ type: 'error', text: 'Please enter current password' });
      return;
    }
    
    if (!passwordData.newPassword) {
      setLocalMessage({ type: 'error', text: 'Please enter new password' });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setLocalMessage({ type: 'error', text: 'New password must be at least 6 characters' });
      return;
    }
    
    if (!passwordData.confirmPassword) {
      setLocalMessage({ type: 'error', text: 'Please confirm new password' });
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setLocalMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    
    setLoading(true);
    setLocalMessage({ type: '', text: '' });
    
    const result = await onUpdatePassword(passwordData);
    
    if (result?.success) {
      // Clear form on success
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
    
    setLoading(false);
  };


  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Lock className="w-6 h-6 text-blue-600" />
          Change Password
        </h3>
        
        {localMessage.text && (
          <div className={`mb-4 p-3 rounded-lg ${
            localMessage.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
            {localMessage.text}
          </div>
        )}
        
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 transition"
                placeholder="Enter current password"
                required
                disabled={loading || saving}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                disabled={loading || saving}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 transition"
              placeholder="Enter new password (min 6 characters)"
              minLength="6"
              required
              disabled={loading || saving}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 transition"
              placeholder="Confirm new password"
              required
              disabled={loading || saving}
            />
          </div>

          <button 
            type="submit"
            disabled={loading || saving}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Mail className="w-6 h-6 text-purple-600" />
          Account Information
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={user?.username || ''}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50"
              disabled
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={user?.email || ''}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50"
              disabled
            />
            <p className="text-xs text-gray-500 mt-2">Contact support to change your email address</p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Account Created</label>
            <input
              type="text"
              value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : ''}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTab;