'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const PageTransition = ({ children }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');

  useEffect(() => {
    console.log('🔄 Page changed to:', pathname);
    
    // Set loading state based on page
    setIsLoading(true);
    
    // Set different loading text based on page
    if (pathname.includes('/history')) {
      setLoadingText('Loading Reading History...');
    } else if (pathname.includes('/wishlist')) {
      setLoadingText('Loading Wishlist...');
    } else if (pathname.includes('/settings')) {
      setLoadingText('Loading Settings...');
    } else if (pathname.includes('/profile')) {
      setLoadingText('Loading Profile...');
    } else if (pathname.includes('/dashboard')) {
      setLoadingText('Loading Dashboard...');
    } else {
      setLoadingText('Loading Page...');
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 800ms loading time

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4"
            >
              <div className="text-center">
                {/* Animated Book Icon */}
                <motion.div
                  animate={{ 
                    rotateY: [0, 180, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </motion.div>

                {/* Loading Text */}
                <motion.h3
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-bold text-gray-800 mb-3"
                >
                  {loadingText}
                </motion.h3>

                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-600 mb-6"
                >
                  Please wait while we prepare your content
                </motion.p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                  />
                </div>

                {/* Loading Dots Animation */}
                <div className="flex justify-center space-x-2">
                  {[0, 1, 2].map((dot) => (
                    <motion.div
                      key={dot}
                      animate={{ 
                        y: [0, -10, 0],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 0.6,
                        repeat: Infinity,
                        delay: dot * 0.2
                      }}
                      className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  ))}
                </div>

                {/* Current Page Info */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm text-gray-500 mt-6"
                >
                  Navigating to <span className="font-semibold text-purple-600">
                    {pathname.split('/').pop() || 'Dashboard'}
                  </span>
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content with Animation */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: isLoading ? 0.8 : 0 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;