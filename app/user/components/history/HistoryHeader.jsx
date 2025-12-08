"use client";
import { Search, RefreshCw } from "lucide-react";
import { useAuth } from "@/app/context/auth-context";
import { useEffect, useState } from "react";

export const HistoryHeader = ({ searchQuery, setSearchQuery }) => {
  const { user, loading, refreshUser } = useAuth();
  const [avatarError, setAvatarError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshUser();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getAvatarUrl = () => {
    if (avatarError || !user?.profile_picture) return null;
    if (user.profile_picture.startsWith('http')) return user.profile_picture;
    if (user.profile_picture.startsWith('/uploads/')) return user.profile_picture;
    return `/uploads/profile/${user.profile_picture}`;
  };

  const getDisplayName = () => {
    if (user?.full_name?.trim()) return user.full_name;
    if (user?.username?.trim()) return user.username;
    return "User";
  };

  const getUserBio = () => {
    if (user?.bio && user.bio.trim()) return user.bio.trim();
    return "I Like Reads Books";
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-40">
      <div className="flex justify-between items-center px-8 py-4">
        {/* Title */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Reading History
            </h1>
            <p className="text-gray-500 text-sm">
              Track all your borrowed books
            </p>
          </div>
          
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* Search + User Profile */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books by title or author"
              className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-400 transition placeholder:text-gray-600 text-black"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>

          {/* User Badge */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-full shadow-md">
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse"></div>
                <div className="space-y-1">
                  <div className="h-3 w-20 bg-white/20 animate-pulse rounded"></div>
                  <div className="h-2 w-16 bg-white/20 animate-pulse rounded"></div>
                </div>
              </div>
            ) : user ? (
              <>
                {/* Avatar */}
                <div className="relative w-10 h-10">
                  {getAvatarUrl() ? (
                    <img
                      src={getAvatarUrl()}
                      onError={() => setAvatarError(true)}
                      alt="Profile"
                      className="w-10 h-10 rounded-full bg-white border-2 border-white object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-blue-600 font-bold border-2 border-white">
                      {getDisplayName().substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Name + Stats */}
                <div className="text-white">
                  <p className="font-semibold text-sm">{getDisplayName()}</p>
                  <p className="text-xs text-blue-100 flex items-center gap-1 max-w-[180px] truncate">
                    {getUserBio()}
                  </p>
                </div>
              </>
            ) : (
              <div className="text-white">
                <p className="font-semibold text-sm">Guest</p>
                <p className="text-xs text-blue-100">Please login</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryHeader;
