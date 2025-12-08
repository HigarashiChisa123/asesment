'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/auth-context';
import Sidebar from '../components/layout/Sidebar';
import HistoryHeader from '../components/history/HistoryHeader';
import HistoryStats from '../components/history/HistoryStats';
import HistoryFilter from '../components/history/HistoryFilter';
import HistoryBooksGrid from '../components/history/HistoryBooksGrid';
import Footer from '../components/shared/Footer';
import LogoutConfirmationModal from '../components/shared/LogoutConfirmationModal';

export default function HistoryPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated, clearOldUserData, refreshUser, logout } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userBooks, setUserBooks] = useState([]);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    returned: 0,
    overdue: 0
  });
  const [debugInfo, setDebugInfo] = useState('');

  // Debug user data secara detail
  useEffect(() => {
    console.log('🔍 === HISTORY PAGE DEBUG ===');
    console.log('👤 User state:', {
      exists: !!user,
      id: user?.id,
      username: user?.username,
      full_name: user?.full_name,
      email: user?.email,
      class: user?.class,
      birthday: user?.birthday,
      hobby: user?.hobby,
      profile_picture: user?.profile_picture,
      borrowing_stats: user?.borrowing_stats
    });
    
    // Cek localStorage
    const localUser = localStorage.getItem('userData');
    console.log('💾 LocalStorage userData:', localUser ? 'Exists' : 'Empty');
    if (localUser) {
      try {
        const parsed = JSON.parse(localUser);
        console.log('📦 Parsed localStorage:', {
          id: parsed.id,
          username: parsed.username,
          full_name: parsed.full_name,
          timestamp: parsed._timestamp ? new Date(parsed._timestamp).toLocaleString() : 'No timestamp'
        });
      } catch (e) {
        console.error('❌ Error parsing localStorage:', e);
      }
    }
    
    // Cek cookies
    console.log('🍪 Cookies:', document.cookie);
    
    // Update debug info untuk UI
    setDebugInfo(`
      User: ${user?.username || 'None'}
      ID: ${user?.id || 'None'}
      Email: ${user?.email || 'None'}
      localStorage: ${localUser ? 'Has data' : 'Empty'}
      Cookies: ${document.cookie.length > 0 ? 'Present' : 'Empty'}
    `);
  }, [user]);

  // Enhanced authentication check
  useEffect(() => {
    const checkAuth = async () => {
      console.log('🔐 === AUTH CHECK START ===');
      
      if (!loading) {
        try {
          // Clear old cache headers
          const timestamp = Date.now();
          const response = await fetch(`/api/auth/profile?_=${timestamp}`, {
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache'
            },
            cache: 'no-store',
            credentials: 'include'
          });
          
          const data = await response.json();
          console.log('🔍 Auth check response:', { 
            success: data.success, 
            status: response.status,
            userId: data.user?.id,
            username: data.user?.username,
            full_name: data.user?.full_name,
            email: data.user?.email
          });
          
          if (!data.success || !data.user) {
            console.log('❌ Not authenticated or no user data, redirecting to login');
            // Clear semua data
            clearOldUserData();
            router.push('/login');
          } else {
            console.log('✅ User authenticated in HistoryPage:', data.user.username);
            // Data sudah di-set oleh auth context
          }
        } catch (error) {
          console.error('❌ Auth check failed:', error);
          clearOldUserData();
          router.push('/login');
        }
      }
    };

    // Delay sedikit untuk memastikan auth context siap
    const timer = setTimeout(() => {
      checkAuth();
    }, 300);

    return () => clearTimeout(timer);
  }, [loading, router, clearOldUserData]);

  // Fetch user's borrowed books
  useEffect(() => {
    const fetchUserBooks = async () => {
      if (!user?.id) {
        console.log('⏳ Waiting for user data to fetch books...');
        setIsLoadingBooks(false);
        return;
      }

      console.log(`📚 Fetching borrowed books for user ${user.id} (${user.username})`);
      
      try {
        setIsLoadingBooks(true);
        const timestamp = Date.now();
        const response = await fetch(`/api/borrowed-books?userId=${user.id}&status=all&_=${timestamp}`, {
          cache: 'no-store',
          credentials: 'include'
        });
        
        const data = await response.json();
        console.log('📦 Borrowed books API response:', {
          success: data.success,
          count: data.books?.length || 0,
          message: data.message
        });
        
        if (data.success && data.books) {
          console.log(`✅ Loaded ${data.books.length} borrowed books from database`);
          
          const formattedBooks = data.books.map(book => ({
            id: book.id,
            bookId: book.book_id || book.bookId,
            title: book.book_name || book.title,
            author: book.creator || book.author,
            category: book.category || 'General',
            status: book.status || 'borrowed',
            borrowedDate: book.borrowed_date 
              ? new Date(book.borrowed_date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })
              : 'Unknown',
            returnDate: book.due_date 
              ? new Date(book.due_date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })
              : 'Unknown',
            dueDate: book.due_date ? new Date(book.due_date) : null,
            returnedDate: book.return_date || null,
            daysAgo: book.borrowed_date 
              ? calculateDaysAgo(new Date(book.borrowed_date)) 
              : 'Recently',
            coverUrl: book.cover_url || `https://via.placeholder.com/300x400/667eea/ffffff?text=${book.book_name?.substring(0, 2) || 'BK'}`,
            fineAmount: book.fine_amount || 0,
            finePaid: book.fine_paid || false
          }));
          
          setUserBooks(formattedBooks);
        } else {
          console.log(`⚠️ No borrowed books found. Message: ${data.message}`);
          setUserBooks([]);
        }
      } catch (error) {
        console.error('❌ Error fetching user books:', error);
        setUserBooks([]);
      } finally {
        setIsLoadingBooks(false);
      }
    };

    const calculateDaysAgo = (date) => {
      const today = new Date();
      const diffTime = Math.abs(today - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
      return `${Math.floor(diffDays / 365)} years ago`;
    };

    if (user && !loading) {
      fetchUserBooks();
    }
  }, [user, loading]);

  // Calculate stats
  useEffect(() => {
    if (userBooks.length > 0) {
      const today = new Date();
      const thisMonth = today.getMonth();
      const thisYear = today.getFullYear();
      
      const newStats = {
        total: userBooks.length,
        thisMonth: userBooks.filter(book => {
          try {
            const borrowedDate = book.borrowedDate ? new Date(book.borrowedDate) : null;
            if (!borrowedDate) return false;
            return borrowedDate.getMonth() === thisMonth && 
                   borrowedDate.getFullYear() === thisYear;
          } catch {
            return false;
          }
        }).length,
        returned: userBooks.filter(book => book.status === 'returned').length,
        overdue: userBooks.filter(book => {
          if (book.status === 'borrowed' && book.dueDate) {
            const dueDate = new Date(book.dueDate);
            return dueDate < new Date();
          }
          return book.status === 'overdue';
        }).length
      };
      
      setStats(newStats);
    } else {
      setStats({
        total: 0,
        thisMonth: 0,
        returned: 0,
        overdue: 0
      });
    }
  }, [userBooks]);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    logout();
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const toggleBookSelection = (bookId) => {
    setSelectedBooks(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const selectAll = () => {
    setSelectedBooks(prev =>
      prev.length === filteredBooks.length 
        ? [] 
        : filteredBooks.map(book => book.id)
    );
  };

  const deleteSelected = async () => {
    if (selectedBooks.length === 0) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedBooks.length} book(s) from history?`
    );
    
    if (!confirmed) return;

    try {
      const response = await fetch('/api/borrowed-books', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ bookIds: selectedBooks })
      });

      const data = await response.json();
      
      if (data.success) {
        setUserBooks(prev => prev.filter(book => !selectedBooks.includes(book.id)));
        setSelectedBooks([]);
        alert('✅ Books deleted successfully!');
      } else {
        alert('❌ Failed to delete books: ' + data.message);
      }
    } catch (error) {
      console.error('❌ Error deleting books:', error);
      alert('❌ Failed to delete books. Please try again.');
    }
  };

  // Filter books
  const filteredBooks = userBooks.filter(book => {
    const matchesSearch = book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         book.category === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Force refresh button handler
  const handleForceRefresh = async () => {
    console.log('🔄 Force refresh clicked');
    await refreshUser();
    window.location.reload();
  };

  // Clear cache button handler
  const handleClearCache = () => {
    console.log('🧹 Clearing cache...');
    clearOldUserData();
    localStorage.clear();
    sessionStorage.clear();
    alert('Cache cleared! Please refresh the page.');
    window.location.reload();
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
          <p className="text-gray-400 text-sm mt-2">Please wait</p>
          <button 
            onClick={handleForceRefresh}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
          >
            Force Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar activePage="history" onLogoutClick={handleLogoutClick} />
      
      <LogoutConfirmationModal 
        isOpen={showLogoutModal}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
      
      <div className="ml-64">
        <HistoryHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="px-8 py-8">
          {/* Welcome message */}
          {user ? (
            <div className="mb-6 p-6 bg-gradient-to-r from-white to-blue-50 rounded-2xl shadow-md border border-gray-200">
              <div className="flex justify-between items-start">
                {/* Left: User Info */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">
                    👋 Welcome back, <span className="text-blue-600">
                      {user.full_name || user.username || 'Book Lover'}!
                    </span>
                  </h2>
                  
                  {/* Email and Member Status */}
                  <div className="flex items-center gap-3 mb-4">
                    {user.email && (
                      <span className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-gray-700 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {user.email}
                      </span>
                    )}
                    
                    <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                      {user.role === 'admin' ? '👑 Administrator' : '👤 Member'}
                    </span>
                  </div>
                  
                  {/* Bio Quote */}
                  {user.bio && user.bio.trim() !== '' && (
                    <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r">
                      <p className="text-gray-700 italic text-sm">
                        "{user.bio}"
                      </p>
                    </div>
                  )}
                  
                  {/* Profile Info Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {/* Class */}
                    <div className="bg-white p-3 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 text-lg">🏫</span>
                        </div>
                        <span className="text-gray-500 text-xs">Class</span>
                      </div>
                      <p className="font-semibold text-gray-800">
                        {user.class || 'Grade 11 RPL 5'}
                      </p>
                    </div>
                    
                    {/* Birthday */}
                    {user.birthday && (
                      <div className="bg-white p-3 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-purple-600 text-lg">🎂</span>
                          </div>
                          <span className="text-gray-500 text-xs">Birthday</span>
                        </div>
                        <p className="font-semibold text-gray-800">
                          {user.birthday}
                        </p>
                      </div>
                    )}
                    
                    {/* Hobby */}
                    <div className="bg-white p-3 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                          <span className="text-pink-600 text-lg">⚽</span>
                        </div>
                        <span className="text-gray-500 text-xs">Hobby</span>
                      </div>
                      <p className="font-semibold text-gray-800">
                        {user.hobby || 'Reading Books'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Username and Join Date */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      {user.username && (
                        <span className="flex items-center gap-2">
                          <span className="text-gray-500">Username:</span>
                          <span className="font-semibold text-gray-800">@{user.username}</span>
                        </span>
                      )}
                      
                      {user.created_at && (
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Member since {new Date(user.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                        </span>
                      )}
                    </div>
                    
                    {/* Settings button */}
                    <button 
                      onClick={() => router.push('/user/settings')}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Edit Profile
                    </button>
                  </div>
                </div>
                
                {/* Right: Profile Picture */}
                <div className="ml-8">
                  <div className="relative">
                    <img 
                      src={
                        user.profile_picture
                          ? user.profile_picture.startsWith('http')
                            ? user.profile_picture
                            : user.profile_picture.startsWith('/uploads/')
                              ? user.profile_picture
                              : `/uploads/profile/${user.profile_picture}`
                          : `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.email || user.username || 'user')}&backgroundColor=65c7f7,ffd5dc&radius=50`
                      }
                      alt={user.full_name || user.username}
                      className="w-24 h-24 rounded-2xl border-4 border-white shadow-xl object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.email || user.username || 'user')}&backgroundColor=65c7f7,ffd5dc&radius=50`;
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Reading Stats */}
              {user.borrowing_stats && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="text-lg">📚</span> Reading Statistics
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{user.borrowing_stats.total_borrowed || 0}</div>
                      <div className="text-xs text-gray-500">Total Books</div>
                    </div>
                    <div className="h-8 w-px bg-gray-300"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{user.borrowing_stats.completed || 0}</div>
                      <div className="text-xs text-gray-500">Returned</div>
                    </div>
                    <div className="h-8 w-px bg-gray-300"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{user.borrowing_stats.currently_reading || 0}</div>
                      <div className="text-xs text-gray-500">Reading Now</div>
                    </div>
                    <div className="h-8 w-px bg-gray-300"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{user.borrowing_stats.overdue || 0}</div>
                      <div className="text-xs text-gray-500">Overdue</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mb-6 p-6 bg-red-50 border border-red-200 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-xl">⚠️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-red-800">No User Data Found</h3>
                  <p className="text-red-600 text-sm">Please login again or refresh the page.</p>
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={() => router.push('/login')}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                    >
                      Go to Login
                    </button>
                    <button 
                      onClick={handleForceRefresh}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                    >
                      Refresh
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Statistics */}
          <HistoryStats 
            stats={stats} 
            userStats={user?.borrowing_stats} 
          />
          
          {/* Filter */}
          <HistoryFilter 
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            selectedBooks={selectedBooks}
            filteredBooks={filteredBooks}
            selectAll={selectAll}
            deleteSelected={deleteSelected}
          />

          {/* Content */}
          {isLoadingBooks ? (
            <div className="text-center py-16 bg-white/50 rounded-2xl shadow-sm">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Your Reading History</h3>
              <p className="text-gray-500">Fetching your borrowed books from the library...</p>
              <div className="mt-6 max-w-md mx-auto space-y-2">
                <div className="h-2 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full animate-pulse w-3/4 mx-auto"></div>
              </div>
            </div>
          ) : userBooks.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-4xl">📚</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Reading History Yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                You haven't borrowed any books yet. Start exploring our library collection!
              </p>
              <div className="space-x-4">
                <a 
                  href="/user/dashboard" 
                  className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition"
                >
                  Browse Books
                </a>
                <a 
                  href="/user/wishlist" 
                  className="inline-block px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition"
                >
                  View Wishlist
                </a>
              </div>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-4xl">🔍</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Books Found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? `No books match your search "${searchQuery}"` : 'No books found with selected filter'}
                {selectedFilter !== 'all' && ` in "${selectedFilter}" category`}.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('all');
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{filteredBooks.length}</span> of <span className="font-semibold">{userBooks.length}</span> books
                </p>
                <p className="text-sm text-gray-500">
                  {selectedBooks.length > 0 && (
                    <span className="text-blue-600 font-semibold">
                      {selectedBooks.length} selected
                    </span>
                  )}
                </p>
              </div>
              <HistoryBooksGrid 
                filteredBooks={filteredBooks}
                selectedBooks={selectedBooks}
                toggleBookSelection={toggleBookSelection}
              />
            </>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
