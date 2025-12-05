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
import { historyBooks } from '../components/history/data/historyData';

export default function HistoryPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();
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

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      console.log('🔐 Checking authentication for history page...');
      
      if (!loading) {
        try {
          const response = await fetch('/api/auth/profile');
          const data = await response.json();
          
          console.log('🔍 Auth check response:', { 
            success: data.success, 
            userId: data.user?.id,
            username: data.user?.username 
          });
          
          if (!data.success) {
            console.log('❌ Not authenticated, redirecting to login');
            router.push('/login');
          }
        } catch (error) {
          console.error('❌ Auth check failed:', error);
          router.push('/login');
        }
      }
    };

    checkAuth();
  }, [loading, router]);

  // Fetch user's books from MySQL database
  useEffect(() => {
    const fetchUserBooks = async () => {
      if (!user?.id) {
        console.log('⏳ Waiting for user data to fetch books...');
        setIsLoadingBooks(false);
        return;
      }

      console.log(`📚 Fetching books for user ${user.id} (${user.username})`);
      
      try {
        setIsLoadingBooks(true);
        const response = await fetch(`/api/books/history?userId=${user.id}`);
        
        const data = await response.json();
        console.log('📦 Books API response:', data);
        
        if (data.success && data.books && data.books.length > 0) {
          console.log(`✅ Loaded ${data.books.length} books from database`);
          setUserBooks(data.books);
        } else {
          console.log(`⚠️ No books in database, using mock data. Message: ${data.message}`);
          // Use mock data as fallback
          setUserBooks(historyBooks);
        }
      } catch (error) {
        console.error('❌ Error fetching user books:', error);
        // Use mock data as fallback
        setUserBooks(historyBooks);
      } finally {
        setIsLoadingBooks(false);
      }
    };

    if (user && !loading) {
      fetchUserBooks();
    }
  }, [user, loading]);

  // Calculate stats when books change
  useEffect(() => {
    if (userBooks.length > 0) {
      console.log('📊 Calculating stats for', userBooks.length, 'books');
      
      const newStats = {
        total: userBooks.length,
        thisMonth: userBooks.filter(book => {
          try {
            const today = new Date();
            const bookDate = new Date(book.borrowedDate || book.lastBorrowed || today);
            return bookDate.getMonth() === today.getMonth() && 
                   bookDate.getFullYear() === today.getFullYear();
          } catch {
            return false;
          }
        }).length,
        returned: userBooks.filter(book => book.status === 'returned').length,
        overdue: userBooks.filter(book => book.status === 'overdue').length
      };
      
      console.log('📈 New stats:', newStats);
      setStats(newStats);
    }
  }, [userBooks]);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('userData');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/login';
    setShowLogoutModal(false);
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
      const response = await fetch('/api/books/history', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookIds: selectedBooks })
      });

      const data = await response.json();
      
      if (data.success) {
        // Update local state
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
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || book.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  console.log('🔍 Filtered books:', {
    totalBooks: userBooks.length,
    filtered: filteredBooks.length,
    searchQuery,
    selectedFilter
  });

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
          <p className="text-gray-400 text-sm mt-2">Please wait</p>
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
          {user && (
            <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                👋 Welcome back, <span className="text-blue-600">{user.full_name || user.username}</span>!
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                {user.class && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {user.class}
                  </span>
                )}
                {user.hobby && user.hobby !== 'Reading Books' && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                    {user.hobby}
                  </span>
                )}
                <span className="ml-auto text-gray-500">
                  Member since {new Date(user.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}

          <HistoryStats stats={stats} />
          
          <HistoryFilter 
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            selectedBooks={selectedBooks}
            filteredBooks={filteredBooks}
            selectAll={selectAll}
            deleteSelected={deleteSelected}
          />

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
                No books match your search "{searchQuery}" in "{selectedFilter}" category.
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