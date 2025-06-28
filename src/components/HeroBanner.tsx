import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: 'Big Billion Days',
    subtitle: 'Biggest Sale of the Year',
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg',
    cta: 'Shop Now',
  },
  {
    id: 2,
    title: 'Electronics Sale',
    subtitle: 'Up to 80% Off on Smartphones & Laptops',
    image: 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg',
    cta: 'Explore Deals',
  },
  {
    id: 3,
    title: 'Fashion Week',
    subtitle: 'Trending Styles at Best Prices',
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
    cta: 'Shop Fashion',
  },
];

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="absolute inset-0">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
                <div className="max-w-4xl">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                    {banner.title}
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8">
                    {banner.subtitle}
                  </p>
                  <button className="bg-[#ff6161] hover:bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 transform hover:scale-105">
                    {banner.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;