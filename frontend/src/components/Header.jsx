import React, { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
              <span className="text-slate-900 font-bold text-lg">BK</span>
            </div>
            <span className="text-gray-100 font-semibold text-xl">Bhavyasri Koduru</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 font-medium"
              >
                {item.label}
              </button>
            ))}
            <a 
              href="/resume.pdf" 
              download="Bhavyasri_Koduru_Resume.pdf"
              className="bg-gradient-to-r from-cyan-400 to-cyan-600 text-slate-900 px-6 py-2 rounded-lg hover:from-cyan-300 hover:to-cyan-500 transition-all duration-300 flex items-center space-x-2 font-medium"
            >
              <Download size={18} />
              <span>Resume</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-100 p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-700/50">
            <nav className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 font-medium text-left"
                >
                  {item.label}
                </button>
              ))}
              <a 
                href="/resume.pdf" 
                download="Bhavyasri_Koduru_Resume.pdf"
                className="bg-gradient-to-r from-cyan-400 to-cyan-600 text-slate-900 px-6 py-2 rounded-lg hover:from-cyan-300 hover:to-cyan-500 transition-all duration-300 flex items-center space-x-2 font-medium w-fit"
              >
                <Download size={18} />
                <span>Resume</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;