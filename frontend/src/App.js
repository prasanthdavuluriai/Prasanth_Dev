import React, { useState, useEffect } from 'react';
import './App.css';

// Import Components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Import Toast Hook
import { useToast } from './hooks/use-toast';

function App() {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode for tech theme
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setDarkMode(savedTheme === 'dark');
    
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    toast({
      title: `${newTheme ? 'Dark' : 'Light'} mode activated`,
      description: `Switched to ${newTheme ? 'dark' : 'light'} theme`,
      duration: 2000,
    });
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <div className="text-center">
          <div className="relative">
            {/* Loading Animation */}
            <div className="w-20 h-20 border-4 border-cyan-200 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
            
            {/* Tech Circuit Pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 100 100" className="w-20 h-20 text-cyan-400">
                <path
                  d="M20,20 L80,20 L80,40 L60,40 L60,60 L80,60 L80,80 L20,80 L20,60 L40,60 L40,40 L20,40 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>
          
          <h2 className={`text-xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Loading Portfolio...
          </h2>
          <p className={`mt-2 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Initializing automotive systems
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 text-white dark:text-white transition-all duration-500">
        {/* Header */}
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />
        
        {/* Main Content */}
        <main className="relative">
          {/* Hero Section */}
          <Hero darkMode={darkMode} />
          
          {/* About Section */}
          <About darkMode={darkMode} />
          
          {/* Skills Section */}
          <Skills darkMode={darkMode} />
          
          {/* Experience Section */}
          <Experience darkMode={darkMode} />
          
          {/* Projects Section */}
          <Projects darkMode={darkMode} />
          
          {/* Certifications Section */}
          <Certifications darkMode={darkMode} />
          
          {/* Testimonials Section */}
          <Testimonials darkMode={darkMode} />
          
          {/* Contact Section */}
          <Contact darkMode={darkMode} />
        </main>
        
        {/* Footer */}
        <Footer darkMode={darkMode} />
        
        {/* Background Tech Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-cyan-400 rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border border-cyan-400 rounded-full animate-pulse delay-1000"></div>
        </div>
      </div>
    </div>
  );
}

export default App;