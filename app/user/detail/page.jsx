'use client'

import React, { useState } from 'react';
import { Heart, Share2, BookOpen, Clock, Star, ChevronLeft, Download, Bookmark, Users, Calendar, Eye, TrendingUp, Award } from 'lucide-react';

export default function BookDetailPage() {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  const book = {
    title: "A Mind for Numbers",
    subtitle: "How to Excel at Math and Science (Even If You Flunked Algebra)",
    author: "Barbara Oakley, PhD",
    cover: "/api/placeholder/280/400",
    rating: 4.5,
    totalReviews: 2847,
    pages: 336,
    language: "English",
    publisher: "Tarcher Perigee",
    published: "2014",
    isbn: "978-0399165245",
    categories: ["Education", "Mathematics", "Self-Help", "Science"],
    description: "The companion book to COURSERA®'s wildly popular massive open online course 'Learning How to Learn' Whether you are a student struggling to fulfill a math or science requirement, or you are embarking on a career change that requires a new skill set, A Mind for Numbers offers the tools you need to get a better grasp of that intimidating material.",
    currentReaders: 156,
    totalBorrowed: 3421
  };

  const loanInfo = {
    totalBooks: 1,
    duration: "2 Weeks",
    lateFee: "Rp20,000",
    available: true,
    copiesAvailable: 3,
    copiesTotal: 5
  };

  const reviews = [
    { name: "Sarah Johnson", rating: 5, date: "2 days ago", comment: "Absolutely life-changing! This book transformed how I approach learning." },
    { name: "Michael Chen", rating: 4, date: "1 week ago", comment: "Great practical advice, especially the Pomodoro technique section." },
    { name: "Emma Davis", rating: 5, date: "2 weeks ago", comment: "Wish I had this book during my college years!" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-110">
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Detail Books</h1>
                <p className="text-xs text-gray-500">TB Digital Reads</p>
              </div>
            </div>
        <div className="flex items-center gap-4">
  <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  </button>
  
  {/* Tambahkan ml-auto di sini */}
  <div className="ml-auto flex items-center gap-4 bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-full shadow-md">
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
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Banner Section */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-white text-center p-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl transform hover:scale-105 transition-transform">
              <Eye className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold mb-1">3.4K</p>
              <p className="text-sm text-blue-100">Total Views</p>
            </div>
            <div className="text-white text-center p-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl transform hover:scale-105 transition-transform">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold mb-1">#12</p>
              <p className="text-sm text-blue-100">Trending This Week</p>
            </div>
            <div className="text-white text-center p-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl transform hover:scale-105 transition-transform">
              <Award className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold mb-1">Best Seller</p>
              <p className="text-sm text-blue-100">Education Category</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Book Cover & Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border border-purple-100">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <img 
                  src="/api/placeholder/280/400" 
                  alt={book.title}
                  className="relative w-full rounded-xl shadow-2xl mb-6 transform group-hover:scale-[1.02] transition-transform duration-300"
                />
                <button 
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="absolute top-3 right-3 p-3 bg-white rounded-full shadow-xl hover:scale-110 transition-transform"
                >
                  <Heart className={`w-6 h-6 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </button>
                <div className="absolute bottom-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" />
                  {book.rating} Rating
                </div>
              </div>

              {/* Loan Information Card */}
              <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white mb-4 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Loan Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3">
                      <span className="text-blue-50">Available Copies</span>
                      <span className="font-bold text-xl">{loanInfo.copiesAvailable}/{loanInfo.copiesTotal}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3">
                      <span className="text-blue-50 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Loan Duration
                      </span>
                      <span className="font-semibold">{loanInfo.duration}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3">
                      <span className="text-blue-50">Late Fee</span>
                      <span className="font-semibold">{loanInfo.lateFee}</span>
                    </div>
                  </div>
                  <button className="w-full mt-5 bg-white text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold py-3.5 rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all border-2 border-white hover:border-purple-300">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Borrow Now
                    </span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="flex flex-col items-center gap-2 p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-md transition-all"
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-purple-500 text-purple-500' : 'text-purple-500'}`} />
                  <span className="text-xs font-medium text-gray-700">Save</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all">
                  <Share2 className="w-5 h-5 text-blue-500" />
                  <span className="text-xs font-medium text-gray-700">Share</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-md transition-all">
                  <Download className="w-5 h-5 text-green-500" />
                  <span className="text-xs font-medium text-gray-700">Sample</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 text-center">
                  <Users className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{book.currentReaders}</p>
                  <p className="text-xs text-gray-600">Reading Now</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 text-center">
                  <BookOpen className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{book.totalBorrowed}</p>
                  <p className="text-xs text-gray-600">Total Borrowed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Book Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Author Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                  <p className="text-lg text-gray-600 mb-3">{book.subtitle}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <img src="/api/placeholder/40/40" alt={book.author} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-semibold text-gray-900">{book.author}</p>
                      <p className="text-sm text-gray-500">Author</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold text-gray-900">{book.rating}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-semibold">{book.totalReviews.toLocaleString()} reviews</p>
                  <p className="text-xs">Overall rating</p>
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {book.categories.map((cat, idx) => (
                  <span key={idx} className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium">
                    {cat}
                  </span>
                ))}
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-6">
                  {['overview', 'details', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`pb-3 font-semibold capitalize transition-colors ${
                        selectedTab === tab
                          ? 'text-purple-600 border-b-2 border-purple-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              {selectedTab === 'overview' && (
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3">About This Book</h3>
                  <p className="text-gray-700 leading-relaxed">{book.description}</p>
                </div>
              )}

              {selectedTab === 'details' && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Pages</p>
                    <p className="font-semibold text-gray-900">{book.pages} pages</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Language</p>
                    <p className="font-semibold text-gray-900">{book.language}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Publisher</p>
                    <p className="font-semibold text-gray-900">{book.publisher}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Published</p>
                    <p className="font-semibold text-gray-900">{book.published}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 mb-1">ISBN</p>
                    <p className="font-semibold text-gray-900">{book.isbn}</p>
                  </div>
                </div>
              )}

              {selectedTab === 'reviews' && (
                <div className="space-y-4">
                  {reviews.map((review, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <img src="/api/placeholder/40/40" alt={review.name} className="w-10 h-10 rounded-full" />
                          <div>
                            <p className="font-semibold text-gray-900">{review.name}</p>
                            <p className="text-xs text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Similar Books Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-bold text-xl text-gray-900 mb-6">You Might Also Like</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl mb-3 shadow-md group-hover:shadow-xl transition-shadow">
                      <img 
                        src="/api/placeholder/150/220" 
                        alt="Book" 
                        className="w-full transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="font-semibold text-sm text-gray-900 line-clamp-2">Book Title {item}</p>
                    <p className="text-xs text-gray-500">Author Name</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}