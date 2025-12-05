'use client';
import { Search } from 'lucide-react';
import { useAuth } from '@/app/context/auth-context';
import { useEffect, useState } from 'react';

export const HistoryHeader = ({ searchQuery, setSearchQuery }) => {
  const { user, loading } = useAuth();
  const [displayUser, setDisplayUser] = useState(null);

  useEffect(() => {
    console.log('📱 HistoryHeader - User:', user);
    
    if (user) {
      setDisplayUser(user);
    } else {
      // Fallback to localStorage
      const cachedUser = localStorage.getItem('userData');
      if (cachedUser) {
        try {
          setDisplayUser(JSON.parse(cachedUser));
        } catch (e) {
          console.error('Failed to parse cached user:', e);
        }
      }
    }
  }, [user]);

  const getAvatarUrl = () => {
    if (displayUser?.profile_picture) {
      return displayUser.profile_picture;
    }
    
    const seed = displayUser?.email || displayUser?.username || 'User';
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=65c7f7,ffd5dc`;
  };

  const getDisplayName = () => {
    if (displayUser?.full_name && displayUser.full_name.trim() !== '') {
      return displayUser.full_name;
    }
    if (displayUser?.username) {
      return displayUser.username;
    }
    return 'User';
  };

  const getBio = () => {
    if (displayUser?.bio && displayUser.bio.trim() !== '') {
      return displayUser.bio.length > 25 
        ? displayUser.bio.substring(0, 25) + '...' 
        : displayUser.bio;
    }
    return 'Book Lover';
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-40">
      <div className="flex justify-between items-center px-8 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reading History</h1>
          <p className="text-gray-500 text-sm">Track all your borrowed books</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 flex-1 mx-8">
            <div className="relative w-full max-w-2xl">
              <input 
                type="text" 
                placeholder="Search books by title or author"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-400 transition placeholder:text-gray-800 text-black"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-full shadow-md">
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse"></div>
                <div className="space-y-1">
                  <div className="h-3 w-20 bg-white/20 animate-pulse rounded"></div>
                  <div className="h-2 w-16 bg-white/20 animate-pulse rounded"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="relative">
                  <img 
                    src={getAvatarUrl()}
                    alt="Profile" 
                    className="w-10 h-10 rounded-full bg-white border-2 border-white"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.nextElementSibling;
                      if (fallback) {
                        fallback.classList.remove('hidden');
                      }
                    }}
                  />
                  <div 
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm border-2 border-white hidden"
                  >
                    {getDisplayName().substring(0, 2).toUpperCase()}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">
                    {getDisplayName()}
                  </p>
                  <p className="text-xs text-blue-100 truncate max-w-[120px]">
                    {getBio()}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryHeader;