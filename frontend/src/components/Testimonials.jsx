import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials, awards } from '../data/mockData';

const Testimonials = () => {
  const StarRating = ({ rating }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-cyan-400 fill-current' : 'text-slate-600'}`}
        />
      ))}
    </div>
  );

  const TestimonialCard = ({ testimonial }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:bg-slate-800/70 hover:border-cyan-400/50 transition-all duration-300 group h-full flex flex-col">
      {/* Quote Icon */}
      <div className="mb-6">
        <Quote className="w-8 h-8 text-cyan-400/60" />
      </div>
      
      {/* Content */}
      <p className="text-slate-300 leading-relaxed mb-6 flex-1 italic">
        "{testimonial.content}"
      </p>
      
      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>
      
      {/* Author */}
      <div className="flex items-center space-x-4 border-t border-slate-700/50 pt-6">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center">
          <span className="text-slate-900 font-bold text-sm">
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <h4 className="text-gray-100 font-semibold">{testimonial.name}</h4>
          <p className="text-cyan-400 text-sm">{testimonial.position}</p>
          <p className="text-slate-400 text-sm">{testimonial.company}</p>
        </div>
      </div>
    </div>
  );

  const AwardCard = ({ award }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 hover:border-cyan-400/50 transition-all duration-300 group text-center">
      {/* Award Icon */}
      <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-slate-900 font-bold text-2xl">🏆</span>
      </div>
      
      <h3 className="text-gray-100 font-bold text-lg mb-2">{award.title}</h3>
      <p className="text-cyan-400 font-semibold mb-2">{award.organization}</p>
      <p className="text-slate-400 text-sm mb-4">{award.year}</p>
      <p className="text-slate-300 text-sm leading-relaxed">{award.description}</p>
    </div>
  );

  return (
    <section id="testimonials" className="py-20 bg-slate-900 relative">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-cyan-400/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              What Others Say
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-100 mb-6">
              Testimonials & <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">Recognition</span>
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Feedback from colleagues, managers, and industry professionals who have witnessed my dedication to excellence.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Awards Section */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-100 mb-4">Awards & Recognition</h3>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Professional achievements and recognition received for outstanding performance and innovation in automotive software development.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {awards.map((award) => (
                <AwardCard key={award.id} award={award} />
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-100 mb-6">Why Colleagues Trust My Work</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">100%</div>
                  <div className="text-gray-100 font-semibold">On-Time Delivery</div>
                  <div className="text-slate-400 text-sm mt-1">Project Completion</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">95%</div>
                  <div className="text-gray-100 font-semibold">Test Success Rate</div>
                  <div className="text-slate-400 text-sm mt-1">MIL/SIL Validation</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">0</div>
                  <div className="text-gray-100 font-semibold">Critical Defects</div>
                  <div className="text-slate-400 text-sm mt-1">Production Releases</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">40%</div>
                  <div className="text-gray-100 font-semibold">Efficiency Gain</div>
                  <div className="text-slate-400 text-sm mt-1">Process Improvement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;