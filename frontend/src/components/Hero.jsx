import React from 'react';
import { ArrowDown, MapPin, Mail, Phone } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { icon: '🚗', number: '6+', label: 'Years Experience', subtitle: 'Automotive Software' },
    { icon: '⚡', number: '95%', label: 'Success Rate', subtitle: 'Test Validation' },
    { icon: '🔧', number: '50+', label: 'Projects Delivered', subtitle: 'MBD & Validation' },
    { icon: '🏆', number: '3', label: 'Awards Won', subtitle: 'Client Champion' }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/3 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <div className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-medium">
                Senior Embedded Software Engineer
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Hi, I'm <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Bhavyasri</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Transforming automotive innovation through <span className="text-orange-400 font-semibold">Model-Based Development</span> and cutting-edge embedded solutions. Specialist in Chassis Control, AUTOSAR, and ISO 26262 compliance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToAbout()}
                className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-8 py-4 rounded-lg hover:from-orange-500 hover:to-orange-700 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
              >
                <span>Explore My Work</span>
              </button>
              <button className="border-2 border-white/20 text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300 font-semibold">
                Get In Touch
              </button>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 text-sm text-white/60">
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Westland, Michigan</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>Available for opportunities</span>
              </div>
            </div>
          </div>

          {/* Right Stats */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-orange-400 font-semibold text-sm">{stat.label}</div>
                  <div className="text-white/60 text-xs mt-1">{stat.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={scrollToAbout} className="text-white/60 hover:text-white transition-colors">
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;