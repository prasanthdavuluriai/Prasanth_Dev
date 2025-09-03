import React, { useState, useEffect } from 'react';
import { mockTestimonials } from '../data/mockData';
import { apiService } from '../services/api';

const Testimonials = ({ darkMode }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await apiService.getTestimonials();
        setTestimonials(response);
        setError(null);
      } catch (err) {
        console.warn('API call failed, using mock data:', err);
        setTestimonials(mockTestimonials);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
      observer.observe(testimonialsSection);
    }

    return () => {
      if (testimonialsSection) {
        observer.unobserve(testimonialsSection);
      }
    };
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        />
      </svg>
    ));
  };

  const getCompanyIcon = (company) => {
    const icons = {
      'Ford Motor Company': '🚗',
      'Tata Consultancy Services': '🏢',
      'Stellantis': '⚡',
      'Lucid Motors': '🔋',
      'Default': '💼'
    };
    return icons[company] || icons['Default'];
  };

  if (loading) {
    return (
      <section id="testimonials" className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2">
              <div className="w-8 h-8 border-4 border-cyan-200 border-t-cyan-400 rounded-full animate-spin"></div>
              <span className="text-white text-lg">Loading testimonials...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Client Testimonials
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              What colleagues and clients say about working with me on automotive embedded systems projects
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-cyan-500/20 mx-4 relative overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute top-0 right-0 opacity-5">
                        <svg className="w-32 h-32 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Quote */}
                        <div className="mb-8">
                          <p className="text-gray-300 text-lg md:text-xl leading-relaxed italic">
                            "{testimonial.content}"
                          </p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center justify-center mb-6">
                          <div className="flex space-x-1">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>

                        {/* Author Info */}
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-3 mb-2">
                            <span className="text-2xl">{getCompanyIcon(testimonial.company)}</span>
                            <div>
                              <h4 className="text-xl font-bold text-white">
                                {testimonial.name}
                              </h4>
                              <p className="text-cyan-400 font-medium">
                                {testimonial.position}
                              </p>
                              <p className="text-gray-400 text-sm">
                                {testimonial.company}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-gray-500 text-sm">
                            {testimonial.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-gray-800/80 backdrop-blur-sm border border-cyan-500/20 text-cyan-400 p-3 rounded-full hover:bg-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-gray-800/80 backdrop-blur-sm border border-cyan-500/20 text-cyan-400 p-3 rounded-full hover:bg-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {testimonials.length > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-cyan-400 scale-125'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Testimonials Grid (Alternative View) */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={`grid-${testimonial.id}`}
                className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/10 hover:border-cyan-500/20 transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-xl">{getCompanyIcon(testimonial.company)}</span>
                  <div>
                    <h4 className="font-semibold text-white text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-cyan-400 text-xs">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  "{testimonial.content.length > 150 
                    ? testimonial.content.substring(0, 150) + '...' 
                    : testimonial.content}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span className="text-gray-500 text-xs">
                    {testimonial.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-8 border border-cyan-500/20 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Work Together?</h3>
              <p className="text-gray-300 text-lg mb-6">
                Join the growing list of satisfied clients who have benefited from my automotive embedded systems expertise.
              </p>
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Start a Conversation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;