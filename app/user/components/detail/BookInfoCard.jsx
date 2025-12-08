'use client'

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Info, 
  MessageSquare, 
  BookText, 
  Clock, 
  Users, 
  BookOpen, 
  Globe, 
  Star, 
  ThumbsUp, 
  Heart, 
  Download, 
  Share2, 
  Bookmark,
  ChevronRight
} from 'lucide-react';

const BookInfoCard = ({ book, reviews, selectedTab, onTabChange, onBorrow, onToggleFavorite, isWishlisted = false }) => {
  // Tambahkan default value untuk book dan reviews
  const safeBook = book || {};
  const safeReviews = reviews || [];
  
  // State untuk wishlist dan borrowed
  const [isBorrowed, setIsBorrowed] = useState(false);
  useEffect(() => {
    if (safeBook.id) {
      const savedBorrowed = JSON.parse(localStorage.getItem('borrowedBooks') || '[]');
      setIsBorrowed(savedBorrowed.includes(safeBook.id));
    }
  }, [safeBook.id]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'details', label: 'Details', icon: Info },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare }
  ];

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: safeBook.title,
        text: `Check out "${safeBook.title}" by ${safeBook.author}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      {/* Book Header Info */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-xs font-bold">
              GRAPHIC NOVEL
            </span>
            <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full text-xs font-bold">
              AUTOBIOGRAPHY
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
            {safeBook.title || 'Persepolis'}
          </h1>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(safeBook.rating || 4.8) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} 
                />
              ))}
              <span className="ml-2 text-sm font-medium text-gray-700">
                {safeBook.rating || 4.8}
              </span>
            </div>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">
              {safeBook.totalReviews || 0} reviews
            </span>
          </div>
          
          <p className="text-lg text-gray-600 mb-4">
            {safeBook.subtitle || 'The Story of a Childhood'}
          </p>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
              {safeBook.author?.charAt(0) || 'MS'}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {safeBook.author || 'Marjane Satrapi'}
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Globe className="w-3 h-3" /> 
                {safeBook.language || 'English'} • {safeBook.pages || '160'} pages
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {safeBook.categories?.length > 0 ? (
          safeBook.categories.map((cat, idx) => (
            <span 
              key={idx} 
              className="px-4 py-2 bg-gradient-to-r from-gray-50 to-blue-50 text-gray-700 rounded-xl text-sm font-medium border border-gray-200 hover:border-blue-300 transition-colors"
            >
              {cat}
            </span>
          ))
        ) : (
          <span className="px-4 py-2 bg-gradient-to-r from-gray-50 to-blue-50 text-gray-700 rounded-xl text-sm font-medium border border-gray-200">
            No categories
          </span>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={onBorrow}
          disabled={isBorrowed}
          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
            isBorrowed
              ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:scale-[1.02]'
          }`}
        >
          {isBorrowed ? (
            <>
              <Bookmark className="w-4 h-4" />
              Already Borrowed
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Borrow Now
            </>
          )}
        </button>
        
        <button
          onClick={onToggleFavorite}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
            isWishlisted
              ? 'bg-gradient-to-r from-pink-50 to-rose-50 text-pink-600 border border-pink-200'
              : 'bg-gradient-to-r from-gray-50 to-blue-50 text-gray-700 border border-gray-200 hover:border-blue-300'
          } hover:shadow-md`}
        >
          <Heart 
            className={`w-4 h-4 ${isWishlisted ? 'fill-pink-500 text-pink-500' : ''}`} 
          />
          {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
        </button>
        
        <button 
          onClick={handleShare}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-gray-50 to-blue-50 text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-6">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex items-center gap-2 pb-3 font-semibold transition-colors relative ${
                selectedTab === id
                  ? 'text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {selectedTab === id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab Content */}
      {selectedTab === 'overview' && <OverviewTab book={safeBook} />}
      {selectedTab === 'details' && <DetailsTab book={safeBook} />}
      {selectedTab === 'reviews' && <ReviewsTab reviews={safeReviews} totalReviews={safeBook.totalReviews} />}
    </div>
  );
};

const OverviewTab = ({ book = {} }) => (
  <div className="space-y-6">
    <div>
      <h3 className="font-bold text-xl text-gray-900 mb-3">About This Book</h3>
      <p className="text-gray-700 leading-relaxed">
        {book.description || 'Novel grafis otobiografi yang kuat dan mengharukan yang menceritakan masa kecil dan remaja Satrapi di Teheran.'}
      </p>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
      <StatCard 
        icon={BookText} 
        value={book.pages || '160'} 
        label="Pages" 
        color="from-blue-50 to-cyan-50" 
      />
      <StatCard 
        icon={Clock} 
        value={book.readingTime || '4-5 hours'} 
        label="Reading Time" 
        color="from-purple-50 to-pink-50" 
      />
      <StatCard 
        icon={Users} 
        value={book.currentReaders || '24'} 
        label="Reading Now" 
        color="from-green-50 to-emerald-50" 
      />
      <StatCard 
        icon={BookOpen} 
        value={`${book.totalBorrowed || '320'}+`} 
        label="Borrowed" 
        color="from-orange-50 to-amber-50" 
      />
    </div>
    
    {/* Additional Info */}
    <div className="pt-6 border-t border-gray-100">
      <h4 className="font-bold text-lg text-gray-900 mb-4">What You'll Learn</h4>
      <ul className="space-y-2">
        {[
          'Understanding Iranian history through personal narrative',
          'The power of graphic novels as a storytelling medium',
          'Cultural insights into life during the Islamic Revolution',
          'Themes of identity, freedom, and resilience'
        ].map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mt-0.5">
              <ChevronRight className="w-3 h-3 text-blue-600" />
            </div>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className={`text-center p-4 bg-gradient-to-br ${color} rounded-xl`}>
    <Icon className="w-6 h-6 text-current mx-auto mb-2" />
    <p className="text-lg font-bold text-gray-900">{value}</p>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);

const DetailsTab = ({ book = {} }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <DetailItem 
          label="Publisher" 
          value={book.publisher || 'Pantheon'} 
          color="from-gray-50 to-blue-50" 
        />
        <DetailItem 
          label="Published Date" 
          value={book.published || '2003'} 
          color="from-gray-50 to-purple-50" 
        />
        <DetailItem 
          label="Language" 
          value={book.language || 'English'} 
          color="from-gray-50 to-green-50" 
        />
        <DetailItem 
          label="Genre" 
          value="Graphic Novel, Autobiography" 
          color="from-gray-50 to-cyan-50" 
        />
      </div>
      <div className="space-y-4">
        <DetailItem 
          label="ISBN" 
          value={book.isbn || '978-0375714573'} 
          color="from-gray-50 to-pink-50" 
          isMono 
        />
        <DetailItem 
          label="Difficulty Level" 
          value={book.level || 'Easy'} 
          color="from-gray-50 to-amber-50" 
        />
        <DetailItem 
          label="Format" 
          value="Digital & Paperback" 
          color="from-gray-50 to-emerald-50" 
        />
        <DetailItem 
          label="File Size" 
          value="15.2 MB" 
          color="from-gray-50 to-rose-50" 
        />
      </div>
    </div>
    
    {/* Additional Technical Details */}
    <div className="pt-6 border-t border-gray-100">
      <h4 className="font-bold text-lg text-gray-900 mb-4">Technical Details</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">File Format</p>
          <p className="font-semibold text-gray-900">PDF, EPUB</p>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Print Length</p>
          <p className="font-semibold text-gray-900">160 pages</p>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Reading Age</p>
          <p className="font-semibold text-gray-900">14+ years</p>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-red-50 rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Best Sellers Rank</p>
          <p className="font-semibold text-gray-900">#1 in Graphic Novels</p>
        </div>
      </div>
    </div>
  </div>
);

const DetailItem = ({ label, value, color, isMono = false }) => (
  <div className={`p-4 bg-gradient-to-br ${color} rounded-xl`}>
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className={`font-semibold text-gray-900 ${isMono ? 'font-mono' : ''}`}>{value}</p>
  </div>
);

const ReviewsTab = ({ reviews = [], totalReviews = 0 }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h4 className="font-bold text-xl text-gray-900">Reader Reviews ({totalReviews})</h4>
        <p className="text-sm text-gray-500 mt-1">Share your thoughts with other readers</p>
      </div>
      <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:shadow-md transition-shadow flex items-center gap-2">
        <MessageSquare className="w-4 h-4" />
        Write a Review
      </button>
    </div>
    
    {reviews.length === 0 ? (
      <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl">
        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h4 className="font-bold text-gray-800 mb-2">No Reviews Yet</h4>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          Be the first to share your thoughts about this book. Your review will help other readers.
        </p>
        <button className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-md transition-shadow">
          Be the First Reviewer
        </button>
      </div>
    ) : (
      <>
        {/* Average Rating */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <div className="text-4xl font-bold text-gray-900">4.8</div>
              <div className="flex items-center justify-center md:justify-start gap-1 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600">{totalReviews} global ratings</p>
            </div>
            
            <div className="w-full md:w-auto">
              {/* Rating Breakdown */}
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-gray-600 w-6">{stars}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                      style={{ width: `${(stars/5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-10 text-right">
                    {Math.round((stars/5) * totalReviews)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review, idx) => (
            <ReviewItem key={review.id || idx} review={review} />
          ))}
        </div>
        
        {/* Load More Button */}
        {reviews.length < totalReviews && (
          <div className="text-center pt-6">
            <button className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Load More Reviews
            </button>
          </div>
        )}
      </>
    )}
  </div>
);

const ReviewItem = ({ review = {} }) => {
  // Pastikan review memiliki data yang diperlukan
  const safeReview = {
    name: review.name || 'Anonymous',
    avatar: review.avatar || `https://ui-avatars.com/api/?name=${review.name || 'User'}&background=random`,
    verified: review.verified || false,
    date: review.date || 'Recently',
    rating: review.rating || 0,
    comment: review.comment || 'No comment provided.',
    likes: review.likes || 0,
    helpful: review.helpful || 0
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-5 border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img 
            src={safeReview.avatar} 
            alt={safeReview.name} 
            className="w-10 h-10 rounded-full" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${safeReview.name}&background=random`;
            }}
          />
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-900">{safeReview.name}</p>
              {safeReview.verified && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                  ✓ Verified
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">{safeReview.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < safeReview.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} 
            />
          ))}
        </div>
      </div>
      <p className="text-gray-700 text-sm mb-3">{safeReview.comment}</p>
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm">
          <ThumbsUp className="w-4 h-4" />
          Helpful ({safeReview.likes})
        </button>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Reply
        </button>
      </div>
    </div>
  );
};

export default BookInfoCard;
