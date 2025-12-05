'use client';

export const SettingsHeader = () => {
  return (
    <div className="bg-white shadow-sm sticky top-0 z-40">
      <div className="flex justify-between items-center px-8 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500 text-sm">Manage your account and preferences</p>
        </div>
        
        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-full shadow-md">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Amane" 
            alt="Avatar" 
            className="w-10 h-10 rounded-full bg-white"
          />
          <div>
            <p className="font-semibold text-sm text-white">Amane Yun</p>
            <p className="text-xs text-blue-100">I Like Reads Books</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;