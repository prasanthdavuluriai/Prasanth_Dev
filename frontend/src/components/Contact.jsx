import React, { useState, useRef, useEffect } from 'react';
import { mockProfile } from '../data/mockData';

const Contact = ({ darkMode }) => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      observer.observe(contactSection);
    }

    return () => {
      if (contactSection) {
        observer.unobserve(contactSection);
      }
    };
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // For now, we'll simulate email sending without EmailJS
      // You can uncomment and configure EmailJS later
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll always show success
      // In production, replace this with actual EmailJS integration:
      /*
      const emailjs = await import('@emailjs/browser');
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      */
      
      setMessage('Message sent successfully! I\'ll get back to you soon.');
      setMessageType('success');
      form.current.reset();
    } catch (error) {
      setMessage('Failed to send message. Please try again or contact me directly.');
      setMessageType('error');
      console.error('Email Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: mockProfile.email,
      href: `mailto:${mockProfile.email}`,
      description: 'Send me an email'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Phone',
      value: mockProfile.phone,
      href: `tel:${mockProfile.phone}`,
      description: 'Call me directly'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Location',
      value: mockProfile.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(mockProfile.location)}`,
      description: 'View on map'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      label: 'LinkedIn',
      value: 'Connect with me',
      href: `https://www.linkedin.com/in/${mockProfile.linkedin}`,
      description: 'Professional network'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Ready to collaborate on your next automotive project? Let's discuss how I can help bring your embedded systems vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  I'm always interested in discussing new opportunities, innovative projects, and challenging problems in the automotive embedded systems space. Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from you.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    target={contact.label === 'LinkedIn' ? '_blank' : '_self'}
                    rel={contact.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                    className="group bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300">
                        {contact.icon}
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                          {contact.label}
                        </h4>
                        <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                          {contact.description}
                        </p>
                        <p className="text-cyan-400 text-sm font-medium mt-1">
                          {contact.value}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Availability Status */}
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <h4 className="text-lg font-semibold text-white">Availability Status</h4>
                </div>
                <p className="text-gray-300">
                  {mockProfile.availability}
                </p>
                <p className="text-green-400 text-sm mt-2">
                  Typically responds within 24 hours
                </p>
              </div>

              {/* Resume Download */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20">
                <h4 className="text-lg font-semibold text-white mb-3">Resume & Portfolio</h4>
                <p className="text-gray-300 mb-4">
                  Download my complete resume for detailed information about my experience and qualifications.
                </p>
                <a
                  href="/resume.pdf"
                  download="Prasanth_Davuluri_Resume.pdf"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="user_name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      required
                      disabled={loading}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="user_email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      required
                      disabled={loading}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Project inquiry, collaboration, etc."
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                    placeholder="Tell me about your project, requirements, or any questions you have..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span>Send Message</span>
                    </>
                  )}
                </button>
                
                {message && (
                  <div className={`p-4 rounded-lg border ${
                    messageType === 'success' 
                      ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}>
                    <div className="flex items-center space-x-2">
                      {messageType === 'success' ? (
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <span>{message}</span>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;