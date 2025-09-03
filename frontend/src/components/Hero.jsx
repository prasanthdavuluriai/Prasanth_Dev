import React, { useState, useEffect } from 'react';
import { mockProfile, mockStats } from '../data/mockData';

const Hero = ({ darkMode }) => {
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const roles = [
    "Automotive Systems Engineer",
    "AUTOSAR Specialist", 
    "HIL Validation Expert",
    "Model-Based Developer",
    "Test Automation Leader"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(roleInterval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-blue-500/20"></div>
        
        {/* Animated Circuit Pattern */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path 
                d="M 0 10 L 5 10 L 5 5 L 15 5 L 15 15 L 10 15 L 10 20" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.5"
                className="text-cyan-400 animate-pulse"
              />
              <circle cx="5" cy="10" r="1" fill="currentColor" className="text-cyan-400"/>
              <circle cx="15" cy="5" r="1" fill="currentColor" className="text-cyan-400"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
        
        {/* Floating Tech Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-cyan-300 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-4 h-4 border border-cyan-400 rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className={`text-center transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Profile Image */}
          <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40 mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse opacity-75"></div>
            <div className="relative w-full h-full bg-gray-800 rounded-full border-4 border-white/20 overflow-hidden">
              {/* Professional Photo */}
              <img 
                src="https://customer-assets.emergentagent.com/job_auto-portfolio/artifacts/lwdgaa76_Prasanth_Photo.jpg"
                alt="Prasanth Davuluri - Senior Automotive Embedded Systems Engineer"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              
              {/* Fallback Avatar (hidden by default) */}
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center" style={{display: 'none'}}>
                <svg className="w-16 h-16 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              
              {/* Status Indicator */}
              <div className="absolute bottom-2 right-2">
                <div className="w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Name and Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {mockProfile.name}
            </span>
          </h1>
          
          {/* Dynamic Role */}
          <div className="h-16 md:h-20 flex items-center justify-center mb-6">
            <h2 className="text-xl md:text-3xl font-semibold text-gray-300">
              <span className="inline-flex items-center">
                <span className="mr-2 text-cyan-400">▶</span>
                <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent min-w-0">
                  {roles[currentRole]}
                </span>
              </span>
            </h2>
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            {mockProfile.tagline}
          </p>

          {/* Bio */}
          <p className="text-base md:text-lg text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            {mockProfile.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => scrollToSection('projects')}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                View My Work
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get In Touch
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/20">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">
                {mockStats.yearsExperience}+
              </div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            
            <div className="text-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/20">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">
                {mockStats.projectsCompleted}+
              </div>
              <div className="text-sm text-gray-400">Projects Completed</div>
            </div>
            
            <div className="text-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/20">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">
                {mockStats.successRate}%
              </div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
            
            <div className="text-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/20">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">
                {mockStats.testCasesAutomated}+
              </div>
              <div className="text-sm text-gray-400">Tests Automated</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection('about')}
          className="flex flex-col items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
        >
          <span className="text-sm mb-2">Explore</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;