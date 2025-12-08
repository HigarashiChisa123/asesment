// app/user/components/dashboard/HeroCarousel.jsx
'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroCarousel = ({ 
  heroSlides = [],
  onSlideClick
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const defaultSlides = [
    {
      id: 1,
      title: "Welcome to TB Digital Reads. Enjoy comfortable book rental experience.",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Discover thousands of books at your fingertips. Read anytime, anywhere.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Join our community of passionate readers and explore new worlds.",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=400&fit=crop"
    }
  ];
  
  const slides = heroSlides && heroSlides.length > 0 ? heroSlides : defaultSlides;

  useEffect(() => {
    if (slides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSlideClick = () => {
    const slide = slides[currentSlide];
    if (onSlideClick && slide.bookId) {
      onSlideClick(slide);
    }
  };

  if (slides.length === 0) {
    return (
      <div className="relative rounded-3xl overflow-hidden shadow-2xl h-96 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading hero slides...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
      <div className="relative h-96">
        <div 
          className="w-full h-full cursor-pointer"
          onClick={handleSlideClick}
        >
          <img 
            src={slides[currentSlide]?.image}
            alt="Hero"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=400&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl px-12">
              <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                {slides[currentSlide]?.title}
              </h2>
              <button 
                onClick={handleSlideClick}
                className="bg-white text-blue-600 px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                {slides[currentSlide]?.bookId ? "Explore This Book →" : "Browse Now"}
              </button>
            </div>
          </div>
        </div>

        {slides.length > 1 && (
          <>
            <button 
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur p-2.5 rounded-full hover:bg-white/30 transition opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur p-2.5 rounded-full hover:bg-white/30 transition opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </>
        )}

        {slides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id || index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroCarousel;