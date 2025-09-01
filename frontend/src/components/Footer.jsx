import React from 'react';
import { Mail, Phone, Linkedin, Github, Heart } from 'lucide-react';
import { contactInfo } from '../data/mockData';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      icon: <Mail className="w-5 h-5" />,
      href: `mailto:${contactInfo.email}`,
      label: 'Email'
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: `https://linkedin.com/in/${contactInfo.linkedin}`,
      label: 'LinkedIn'
    },
    {
      icon: <Github className="w-5 h-5" />,
      href: '#',
      label: 'GitHub'
    }
  ];

  const quickLinks = [
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
  };

  return (
    <footer className="bg-black/40 border-t border-white/10 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BK</span>
              </div>
              <span className="text-white font-semibold text-xl">Bhavyasri Koduru</span>
            </div>
            <p className="text-white/70 leading-relaxed">
              Senior Embedded Software Engineer specializing in automotive systems, 
              Model-Based Development, and ISO 26262 compliance. Passionate about 
              creating safe and innovative software solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target={link.label !== 'Email' ? '_blank' : undefined}
                  rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="bg-white/10 text-white p-3 rounded-lg hover:bg-orange-500/20 hover:text-orange-400 transition-all duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/70 hover:text-orange-400 transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/70">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="text-sm">{contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Phone className="w-4 h-4 text-orange-400" />
                <span className="text-sm">{contactInfo.phone}</span>
              </div>
              <div className="flex items-start space-x-3 text-white/70">
                <div className="w-4 h-4 text-orange-400 mt-0.5">🌍</div>
                <span className="text-sm">{contactInfo.location}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Available for opportunities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © {currentYear} Bhavyasri Koduru. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-white/60 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>using React & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;