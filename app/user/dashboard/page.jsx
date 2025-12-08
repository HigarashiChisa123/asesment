// app/user/dashboard/page.jsx
'use client';
import { useState, useEffect } from 'react';
import Sidebar from './../components/layout/SideBar';
import Header from './../components/layout/Header';
import HeroCarousel from './../components/dashboard/HeroCarousel';
import BookCarousel from './../components/dashboard/BookCarousel';
import GenreFilter from './../components/dashboard/GenreFilter';
import Footer from './../components/shared/Footer';
import LogoutConfirmationModal from './../components/shared/LogoutConfirmationModal';
import { getUserFromCookie } from '@/lib/auth';
import { initializeBooksData } from './../components/dashboard/data/booksData';

export default function DashboardPage() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Data from API Database - 30 BUKU
  const [heroSlides, setHeroSlides] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [subjectBooks, setSubjectBooks] = useState([]);
  const [computerBooks, setComputerBooks] = useState([]);
  const [comicBooks, setComicBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  // Load all data on component mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🚀 Starting to load dashboard data (30 books)...');
      
      // Load data secara paralel
      await Promise.all([
        loadUserData(),
        loadHeroSlides(),
        loadBooksData()
      ]);
      
      console.log('✅ All dashboard data loaded successfully');
    } catch (error) {
      console.error('❌ Error loading dashboard data:', error);
      setError('Failed to load dashboard data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = async () => {
    try {
      console.log('👤 Loading user data...');
      const cookieUser = getUserFromCookie();
      
      if (cookieUser) {
        setUser(cookieUser);
        console.log('✅ User loaded from cookie:', cookieUser.name);
        return;
      }

      try {
        const response = await fetch('/api/auth/profile');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            setUser(data.user);
            console.log('✅ User loaded from API:', data.user.name);
          }
        }
      } catch (apiError) {
        console.log('⚠️ Could not load user from API, using fallback');
      }
      
    } catch (error) {
      console.error('❌ Error loading user data:', error);
      setUser({
        name: 'Amane',
        email: 'amane@example.com',
        avatar: 'https://via.placeholder.com/150/667eea/ffffff?text=A'
      });
    }
  };

  const loadHeroSlides = async () => {
    try {
      console.log('🎬 Loading hero slides...');
      
      const defaultSlides = [
        {
          id: 1,
          title: "Welcome to TB Digital Reads. Explore 30+ amazing books!",
          image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=400&fit=crop"
        },
        {
          id: 2,
          title: "Discover 30+ books at your fingertips. Read anytime, anywhere.",
          image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&h=400&fit=crop"
        },
        {
          id: 3,
          title: "Join our community of passionate readers and explore new worlds.",
          image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=400&fit=crop"
        }
      ];
      
      setHeroSlides(defaultSlides);
      console.log('✅ Hero slides loaded');
      
    } catch (error) {
      console.error('❌ Error loading hero slides:', error);
      setHeroSlides([]);
    }
  };

  const loadBooksData = async () => {
    try {
      console.log('📚 Loading 30 books data...');
      
      // Gunakan booksData.js yang sudah diperbaiki
      const booksData = await initializeBooksData();
      
      console.log('📦 Books data loaded:', {
        recommended: booksData.recommendedBooks.length,
        subject: booksData.schoolBooks.length,
        computer: booksData.computerBooks.length,
        comics: booksData.comicBooks.length,
        total: booksData.allBooks.length
      });
      
      // Set semua data - PASTIKAN 30 BUKU
      const allBooksData = booksData.allBooks.slice(0, 30); // Maksimal 30 buku
      setAllBooks(allBooksData);
      setRecommendedBooks(booksData.recommendedBooks.slice(0, 10));
      setSubjectBooks(booksData.schoolBooks.slice(0, 10));
      setComputerBooks(booksData.computerBooks.slice(0, 10));
      setComicBooks(booksData.comicBooks.slice(0, 10));
      
      console.log('✅ 30 Books data set successfully:', {
        totalBooks: allBooksData.length,
        byCategory: {
          subject: booksData.schoolBooks.length,
          computer: booksData.computerBooks.length,
          comics: booksData.comicBooks.length
        }
      });
      
    } catch (error) {
      console.error('❌ Error loading books data:', error);
      setError('Failed to load books data. Using fallback data.');
      
      // Fallback ke static data 30 buku
      loadFallbackBooks();
    }
  };

  // Fallback function untuk 30 buku
  const loadFallbackBooks = () => {
    const fallbackBooks = Array.from({ length: 30 }, (_, i) => {
      const categories = ['Subject Books', 'Computer Books', 'Comics'];
      const category = categories[i % 3];
      
      const titles = [
        "English Grammar in Use", "Clean Code", "Berserk",
        "Practical English Usage", "The Pragmatic Programmer", "One Piece",
        "Word Power Made Easy", "Python Crash Course", "Death Note",
        "1984", "Introduction to Algorithms", "Watchmen",
        "The Elements of Style", "Grokking Algorithms", "Persepolis",
        "How to Win Friends...", "Design Patterns", "Maus",
        "English for Everyone", "The Mythical Man-Month", "Saga",
        "English Collocations", "Don't Make Me Think", "Batman",
        "TOEFL Guide", "Structure and Interpretation", "Fullmetal Alchemist",
        "Blue Book of Grammar", "Code: The Hidden Language", "Sandman"
      ];
      
      const authors = [
        "Raymond Murphy", "Robert C. Martin", "Kentaro Miura",
        "Michael Swan", "David Thomas", "Eiichiro Oda",
        "Norman Lewis", "Eric Matthes", "Tsugumi Ohba",
        "George Orwell", "Thomas H. Cormen", "Alan Moore",
        "William Strunk", "Aditya Bhargava", "Marjane Satrapi",
        "Dale Carnegie", "Erich Gamma", "Art Spiegelman",
        "DK Publishing", "Frederick Brooks", "Brian K. Vaughan",
        "Michael McCarthy", "Steve Krug", "Frank Miller",
        "Educational Testing", "Harold Abelson", "Hiromu Arakawa",
        "Jane Straus", "Charles Petzold", "Neil Gaiman"
      ];
      
      const colors = {
        'Subject Books': '667eea',
        'Computer Books': '10b981',
        'Comics': 'ef4444'
      };
      
      const color = colors[category];
      const text = titles[i] ? titles[i].substring(0, 2).toUpperCase() : 'BK';
      const placeholder = `https://via.placeholder.com/300x400/${color}/ffffff?text=${encodeURIComponent(text)}`;
      
      return {
        id: i + 1,
        title: titles[i] || `Book ${i + 1}`,
        author: authors[i] || 'Unknown Author',
        rating: 4.0 + (Math.random() * 0.9), // Rating 4.0-4.9
        description: `Description for ${titles[i] || `Book ${i + 1}`}`,
        category: category,
        image: placeholder,
        coverUrl: placeholder,
        available: true,
        featured: i < 10, // 10 pertama featured
        popular: i < 15, // 15 pertama popular
        newArrival: i > 25 // 5 terakhir new arrival
      };
    });
    
    setAllBooks(fallbackBooks);
    setRecommendedBooks(fallbackBooks.filter(b => b.featured).slice(0, 10));
    setSubjectBooks(fallbackBooks.filter(b => b.category === 'Subject Books').slice(0, 10));
    setComputerBooks(fallbackBooks.filter(b => b.category === 'Computer Books').slice(0, 10));
    setComicBooks(fallbackBooks.filter(b => b.category === 'Comics').slice(0, 10));
    
    console.log('✅ Fallback books loaded: 30 books');
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsLoggedIn(false);
      setShowLogoutModal(false);
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  // Refresh data
  const handleRefresh = () => {
    loadAllData();
  };

  // If user is logged out, show login page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You have been logged out. Please login again.</p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Login Again
          </button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard with 30 books...</p>
          <p className="text-sm text-gray-500">Fetching books from database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar 
        activePage="dashboard" 
        onLogoutClick={handleLogoutClick} 
        user={user}
      />
      
      <LogoutConfirmationModal 
        isOpen={showLogoutModal}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
      
      <div className="ml-64">
        <Header user={user} />
        
        {/* Stats Bar */}
        <div className="mx-8 mt-4 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing <span className="font-bold text-blue-600">{allBooks.length} books</span> across <span className="font-bold text-purple-600">3 categories</span>
            </div>
            <button 
              onClick={handleRefresh}
              className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
            >
              Refresh Data
            </button>
          </div>
        </div>
        
        {/* Error Banner */}
        {error && (
          <div className="mx-8 mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex justify-between items-center">
            <div>
              <p className="text-yellow-700">{error}</p>
              <p className="text-sm text-yellow-600">Showing {allBooks.length} books from fallback data.</p>
            </div>
            <button 
              onClick={handleRefresh}
              className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition"
            >
              Retry
            </button>
          </div>
        )}
        
        <div className="px-8 py-8">
          <HeroCarousel heroSlides={heroSlides} />
        </div>

        <div className="px-8 pb-8">
          {/* Recommended Books - 10 buku */}
          {recommendedBooks.length > 0 && (
            <BookCarousel 
              title="🔥 Recommended Books" 
              books={recommendedBooks}
              showSeeAll={recommendedBooks.length > 5}
            />
          )}
          
          {/* Subject Books - 10 buku */}
          {subjectBooks.length > 0 && (
            <BookCarousel 
              title="📚 Subject Books" 
              books={subjectBooks}
              showSeeAll={subjectBooks.length > 5}
            />
          )}
          
          {/* Computer Books - 10 buku */}
          {computerBooks.length > 0 && (
            <BookCarousel 
              title="💻 Computer Books" 
              books={computerBooks}
              showSeeAll={computerBooks.length > 5}
            />
          )}
          
          {/* Comics - 10 buku */}
          {comicBooks.length > 0 && (
            <BookCarousel 
              title="🎭 Comics" 
              books={comicBooks}
              showSeeAll={comicBooks.length > 5}
            />
          )}

          {/* Genre Filter dengan 30 buku */}
          {allBooks.length > 0 && (
            <GenreFilter 
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
              books={allBooks}
            />
          )}
          
          {/* Empty State */}
          {allBooks.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-4xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No Books Found</h3>
              <p className="text-gray-500 mb-6">Unable to load books from database.</p>
              <button 
                onClick={handleRefresh}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                Try Again
              </button>
            </div>
          )}
          
          {/* Summary */}
          {allBooks.length > 0 && (
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-3">📊 Dashboard Summary</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">{allBooks.length}</div>
                  <div className="text-sm text-gray-600">Total Books</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600">{subjectBooks.length}</div>
                  <div className="text-sm text-gray-600">Subject Books</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">{computerBooks.length}</div>
                  <div className="text-sm text-gray-600">Computer Books</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-red-600">{comicBooks.length}</div>
                  <div className="text-sm text-gray-600">Comics</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}