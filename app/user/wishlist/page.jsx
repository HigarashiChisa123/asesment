'use client';
import { useState, useEffect } from 'react';
import Sidebar from './../components/layout/SideBar';
import WishlistHeader from './../components/wishlist/WishlistHeader';
import WishlistStats from './../components/wishlist/WishlistStats';
import WishlistFilter from './../components/wishlist/WishlistFilter';
import WishlistBooksGrid from './../components/wishlist/WishlistBooksGrid';
import Footer from './../components/shared/Footer';
import LogoutConfirmationModal from './../components/shared/LogoutConfirmationModal';
import { fetchWishlistBooks, fetchAllBooks } from './../components/wishlist/data/wishlistData';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/auth-context';

export default function WishlistPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      loadWishlistData();
    }
  }, [authLoading, user]);

  const loadWishlistData = async () => {
    try {
      setLoading(true);
      if (!user) {
        router.push('/login');
        return;
      }
      
      // Fetch wishlist books
      const wishlistBooks = await fetchWishlistBooks();
      setBooks(wishlistBooks);
      
      // Fetch all books untuk fitur "Browse Books"
      const allBooksData = await fetchAllBooks();
      setAllBooks(allBooksData);
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    try {
      // Clear cookies/tokens
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      localStorage.removeItem('authToken');
      sessionStorage.clear();
      
      // Redirect to login
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setShowLogoutModal(false);
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const toggleLike = async (bookId) => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify({ bookId }),
      });

      if (response.ok) {
        // Refresh data setelah update
        await loadWishlistData();
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const removeFromWishlist = async (bookId) => {
    if (!confirm('Remove this book from wishlist?')) return;

    try {
      const response = await fetch(`/api/wishlist?bookId=${bookId}`, {
        method: 'DELETE',
        credentials: 'include',
        cache: 'no-store'
      });

      if (response.ok) {
        // Refresh data setelah delete
        await loadWishlistData();
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const borrowAllAvailable = () => {
    const availableBooks = filteredBooks.filter(book => book.available);
    if (availableBooks.length > 0) {
      alert(`Borrowing ${availableBooks.length} available book(s)`);
      // Here you would call your borrow API
    }
  };

  const addToWishlistFromBrowse = async (bookId) => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify({ bookId }),
      });

      if (response.ok) {
        alert('Book added to wishlist!');
        await loadWishlistData();
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || book.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: books.length,
    available: books.filter(b => b.available).length,
    unavailable: books.filter(b => !b.available).length,
    avgRating: books.length > 0 
      ? (books.reduce((sum, b) => sum + b.rating, 0) / books.length).toFixed(1)
      : '0.0'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar activePage="wishlist" onLogoutClick={handleLogoutClick} />
      
      <LogoutConfirmationModal 
        isOpen={showLogoutModal}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
      
      <div className="ml-64">
        <WishlistHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          user={user}
        />

        <div className="px-8 py-8">
          <WishlistStats stats={stats} />
          
          <WishlistFilter 
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            stats={stats}
            borrowAllAvailable={borrowAllAvailable}
          />

          <WishlistBooksGrid 
            filteredBooks={filteredBooks}
            toggleLike={toggleLike}
            removeFromWishlist={removeFromWishlist}
            onBorrow={(bookId) => router.push(`/books/${bookId}`)}
            onBrowseBooks={() => {
              // Show all books modal or redirect
              alert('Browse Books feature would show all available books');
            }}
          />
          
          {/* Browse Books Section */}
          {books.length === 0 && allBooks.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Browse Available Books</h2>
              <div className="grid grid-cols-4 gap-6">
                {allBooks.slice(0, 4).map((book) => (
                  <div key={book.id} className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition">
                    <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg overflow-hidden mb-3">
                      <img 
                        src={book.cover_url} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{book.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                    <button
                      onClick={() => addToWishlistFromBrowse(book.id)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition"
                    >
                      Add to Wishlist
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
