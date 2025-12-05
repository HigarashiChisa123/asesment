// app/user/components/layout/Header.jsx
'use client';

export const Header = ({ user }) => {
  // Ambil display name dari user
  const displayName = user?.full_name || user?.username || 'User';
  const userBio = user?.bio || 'I Like Reading Books';

  return (
    <div className="bg-white shadow-sm sticky top-0 z-40">
      <div className="flex justify-between items-center px-8 py-4">
        <div>
          <h1 className="text-xl font-bold text-black">Hi, <span className="text-blue-600">{displayName}</span> 👋</h1>
          <p className="text-gray-600 text-sm">Ready to explore some books today?</p>
        </div>
        
        <div className="flex items-center gap-4 flex-1 mx-8">
          <div className="relative w-full max-w-2xl">
            <input 
              type="text" 
              placeholder="Discover Book"
              className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-400 transition placeholder:text-gray-500 text-black"
            />
            <svg className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
          <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-full shadow-md">
            <img 
              src={user?.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName}`} 
              alt="Avatar" 
              className="w-10 h-10 rounded-full bg-white"
            />
            <div>
              <p className="font-semibold text-sm text-white">{displayName}</p>
              <p className="text-xs text-blue-100">{userBio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;