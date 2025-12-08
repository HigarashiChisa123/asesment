// app/user/components/dashboard/BookCard.jsx
'use client';
import { Star, ImageOff } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const BookCard = ({ title, author, image, rating, bookId }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const router = useRouter();
  
  // Fungsi untuk mendapatkan URL gambar yang benar
  const getImageUrl = () => {
    if (!image || imgError) {
      return getPlaceholderUrl();
    }
    
    if (image.startsWith('http') || image.startsWith('//')) {
      return image;
    }
    
    if (image.startsWith('/')) {
      return image;
    }
    
    return `/uploads/covers/${image}`;
  };
  
  // Generate placeholder URL
  const getPlaceholderUrl = () => {
    const shortTitle = (title || 'Book').substring(0, 15);
    const color = getPlaceholderColor();
    return `https://via.placeholder.com/300x400/${color}/ffffff?text=${encodeURIComponent(shortTitle)}`;
  };
  
  // Warna placeholder berdasarkan rating
  const getPlaceholderColor = () => {
    if (!rating) return '667eea';
    if (rating >= 4.5) return '10b981';
    if (rating >= 4.0) return '3b82f6';
    if (rating >= 3.5) return 'f59e0b';
    return 'ef4444';
  };

  // Fungsi untuk navigasi ke detail buku
  const goToBookDetail = (e) => {
    e.stopPropagation();
    if (bookId) {
      router.push(`/books/${bookId}`);
    }
  };

  // Fungsi untuk klik card secara keseluruhan
  const handleCardClick = () => {
    if (bookId) {
      router.push(`/books/${bookId}`);
    }
  };

  const imgSrc = getImageUrl();

  return (
    <div 
      className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
      onClick={handleCardClick}
    >
      <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-blue-100 relative overflow-hidden">
        {/* Skeleton loading */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        
        {/* Image */}
        <img 
          src={imgSrc} 
          alt={title || 'Book Cover'}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
            !imgLoaded && !imgError ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            setImgError(true);
            setImgLoaded(true);
          }}
          loading="lazy"
        />
        
        {/* Fallback icon jika error */}
        {imgError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
            <ImageOff className="w-12 h-12 text-gray-400 mb-2" />
            <span className="text-xs text-gray-500">No Cover</span>
          </div>
        )}
        
        {/* Overlay dengan tombol Read Now */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-4 right-4">
            <button 
              onClick={goToBookDetail}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Read Now →
            </button>
          </div>
        </div>
        
        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-bold text-gray-700">{rating.toFixed(1)}</span>
          </div>
        )}
        
        {/* Quick View Info */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
            View Details →
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition">
          {title || 'Untitled Book'}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-1">
          {author || 'Unknown Author'}
        </p>
        {/* Status cepat */}
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xs text-gray-400">Click to view details</span>
          <span className="text-xs text-blue-500 font-medium animate-pulse">→</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
