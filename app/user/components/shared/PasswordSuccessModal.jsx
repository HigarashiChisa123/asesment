// components/shared/PasswordSuccessModal.jsx
'use client';
import { useState, useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

export const PasswordSuccessModal = ({ 
  isOpen, 
  onClose,
  title = 'Password Changed Successfully!',
  message = 'Your password has been updated successfully. You can now use your new password to login.'
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      // Reset animasi setiap kali modal dibuka
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all scale-100 animate-in fade-in slide-in-from-bottom-10 duration-300">
        {/* Header */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <CheckCircle className={`w-10 h-10 text-green-500 transition-all duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`} />
                {isAnimating && (
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping"></div>
                    <div className="absolute inset-2 rounded-full border-2 border-green-300 animate-pulse"></div>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Message */}
          <p className="text-gray-600 mb-6">{message}</p>
          
          {/* Animated Button */}
          <div className="space-y-4">
            <button
              onClick={onClose}
              className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-300 transform ${isAnimating ? 'scale-105' : 'scale-100'} 
                bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-lg active:scale-95`}
            >
              {isAnimating ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Success!
                </span>
              ) : (
                'Got It!'
              )}
            </button>
            
            {/* Confetti Effect */}
            {isAnimating && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `confetti-fall ${0.5 + Math.random() * 1}s ease-in forwards`,
                      opacity: 0.8
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Styles for animation */}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(500px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes success-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-pulse {
          animation: success-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PasswordSuccessModal;