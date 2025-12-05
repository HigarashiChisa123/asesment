'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const LoadingScreen = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    // Set loading when route changes
    setIsLoading(true);
    
    // Determine page name from pathname
    let pageName = 'Dashboard';
    if (pathname.includes('/history')) pageName = 'Reading History';
    else if (pathname.includes('/wishlist')) pageName = 'Wishlist';
    else if (pathname.includes('/settings')) pageName = 'Settings';
    else if (pathname.includes('/profile')) pageName = 'Profile';
    else if (pathname.includes('/dashboard')) pageName = 'Dashboard';
    
    setCurrentPage(pageName);

    // Set timeout to hide loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second loading

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Book Animation */}
      <div className="relative mb-8">
        <div className="w-32 h-40 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-2xl flex items-center justify-center transform -rotate-6">
          <div className="w-24 h-32 bg-white/20 rounded-lg border-4 border-white/30" />
        </div>
        
        {/* Pages flipping animation */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-36 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg shadow-lg animate-flip">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce" />
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-green-400 to-teal-500 rounded-full animate-pulse" />
      </div>

      {/* Loading Text */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Loading {currentPage}
        </h2>
        <p className="text-gray-600">
          Preparing your personalized reading experience
        </p>
      </div>

      {/* Animated Progress */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-progress" />
      </div>

      {/* Status Messages */}
      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm">Authenticating user session</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-sm">Fetching your data</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          <span className="text-sm">Rendering interface</span>
        </div>
      </div>

      {/* Loading Percentage */}
      <div className="mt-8">
        <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          <span className="animate-count">0</span>%
        </div>
        <p className="text-gray-500 text-sm mt-2">Almost there...</p>
      </div>
    </div>
  );
};

// Add custom animations to globals.css
const addStyles = `
  @keyframes flip {
    0%, 100% { transform: translateX(-50%) rotateY(0deg); }
    50% { transform: translateX(-50%) rotateY(180deg); }
  }
  
  @keyframes progress {
    0% { width: 0%; }
    100% { width: 100%; }
  }
  
  @keyframes count {
    0% { content: "0"; }
    25% { content: "25"; }
    50% { content: "50"; }
    75% { content: "75"; }
    100% { content: "100"; }
  }
  
  .animate-flip {
    animation: flip 2s ease-in-out infinite;
  }
  
  .animate-progress {
    animation: progress 1s ease-in-out;
  }
  
  .animate-count::before {
    animation: count 1s steps(5) forwards;
    content: "0";
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = addStyles;
  document.head.appendChild(style);
}

export default LoadingScreen;