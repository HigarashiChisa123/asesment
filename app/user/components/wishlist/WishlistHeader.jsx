'use client';
import { Search } from 'lucide-react';

export const WishlistHeader = ({ searchQuery, setSearchQuery, user }) => {
  return (
    <div className="bg-white shadow-sm sticky top-0 z-40">
      <div className="flex justify-between items-center px-8 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
          <p className="text-gray-500 text-sm">Books you want to read</p>
        </div>
        
        <div className="flex items-center gap-4 flex-1 mx-8">
          <div className="relative w-full max-w-2xl">
            <input 
              type="text" 
              placeholder="Search books by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-400 transition placeholder:text-gray-800 text-black"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          
          <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-full shadow-md ml-auto min-w-[200px]">
            <img 
              src={user?.profile_picture || "/default-avatar.png"} 
              alt="Avatar" 
              className="w-10 h-10 rounded-full bg-white border-2 border-white"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-avatar.png";
              }}
            />
            <div className="min-w-0">
              <p className="font-semibold text-sm text-white truncate">
                {user?.full_name || user?.username || "User"}
              </p>
              <p className="text-xs text-blue-100 truncate">
                {user?.bio || "I Like Reads Books"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistHeader;