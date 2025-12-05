// app/user/components/dashboard/HeroCarousel.jsx
'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Welcome to the TB Digital Reads website. Enjoy the experience of renting books comfortably.",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=400&fit=crop"
    },
    {
      title: "Discover thousands of books at your fingertips. Read anytime, anywhere.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&h=400&fit=crop"
    },
    {
      title: "Join our community of passionate readers and explore new worlds.",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=400&fit=crop"
    }
  ];

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600">
        <img 
          src={heroSlides[currentSlide].image}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-2xl px-12">
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h2>
            <button className="bg-white text-blue-600 px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              Browse Now
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={() => setCurrentSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur p-2.5 rounded-full hover:bg-white/30 transition opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button 
          onClick={() => setCurrentSlide((currentSlide + 1) % heroSlides.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur p-2.5 rounded-full hover:bg-white/30 transition opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;