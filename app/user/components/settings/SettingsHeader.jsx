'use client';

export const SettingsHeader = ({ user }) => {
  // Debug log
  console.log('🎯 SettingsHeader received user:', user);
  
  return (
    <div className="bg-white shadow-sm sticky top-0 z-40">
      <div className="flex justify-between items-center px-8 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500 text-sm">Manage your account and preferences</p>
        </div>
        
        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-full shadow-md min-w-[200px]">
          <img 
            src={user?.profile_picture || "/default-avatar.png"} 
            alt="Avatar" 
            className="w-10 h-10 rounded-full bg-white border-2 border-white"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-avatar.png";
            }}
          />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm text-white truncate">
              {user?.full_name || user?.username || "Loading..."}
            </p>
            <p className="text-xs text-blue-100 truncate">
              {user?.bio || user?.email || "User"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;