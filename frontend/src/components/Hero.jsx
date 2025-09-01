import React from 'react';
import { ArrowDown, MapPin, Mail } from 'lucide-react';

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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      {/* Background ECU/Circuit Pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1535136072409-ff0c7a947733')`,
            backgroundSize: '400px 400px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
            filter: 'grayscale(100%) sepia(100%) hue-rotate(180deg) saturate(50%)'
          }}
        />
        <div 
          className="absolute top-0 right-0 w-96 h-96 opacity-5"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1535136104956-115a2cd67fc4')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top right',
            filter: 'grayscale(100%) sepia(100%) hue-rotate(180deg) saturate(50%)'
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-80 h-80 opacity-5"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1606945553457-2af01bfb4681')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom left',
            filter: 'grayscale(100%) sepia(100%) hue-rotate(180deg) saturate(50%)'
          }}
        />
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-slate-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-700/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-800/10 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-gray-100 space-y-8">
            <div className="space-y-4">
              <div className="inline-block bg-cyan-400/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium">
                Senior Embedded Software Engineer
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Hi, I'm <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">Bhavyasri</span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                Transforming automotive innovation through <span className="text-cyan-400 font-semibold">Model-Based Development</span> and cutting-edge embedded solutions. Specialist in Chassis Control, AUTOSAR, and ISO 26262 compliance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToAbout()}
                className="bg-gradient-to-r from-cyan-400 to-cyan-600 text-slate-900 px-8 py-4 rounded-lg hover:from-cyan-300 hover:to-cyan-500 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
              >
                <span>Explore My Work</span>
              </button>
              <button className="border-2 border-slate-600 text-gray-100 px-8 py-4 rounded-lg hover:bg-slate-800/50 hover:border-cyan-400 transition-all duration-300 font-semibold">
                Get In Touch
              </button>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
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
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 hover:border-cyan-400/50 transition-all duration-300 group"
                >
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-100 mb-1">{stat.number}</div>
                  <div className="text-cyan-400 font-semibold text-sm">{stat.label}</div>
                  <div className="text-slate-400 text-xs mt-1">{stat.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={scrollToAbout} className="text-slate-400 hover:text-cyan-400 transition-colors">
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;