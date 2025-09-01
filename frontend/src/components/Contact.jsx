import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, Download } from 'lucide-react';
import { apiService, handleApiError } from '../services/api';
import { useToast } from "../hooks/use-toast";

// Contact info (keeping static for now)
const contactInfo = {
  email: 'bhavyasreekoduri@gmail.com',
  phone: '+1-734-447-6301',
  location: 'Westland, Michigan, 48185',
  linkedin: 'bhavyasrikoduru',
  availability: 'Available for new opportunities'
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit form to backend API
      await apiService.submitContactMessage(formData);
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      const errorMessage = handleApiError(error, 'Failed to send message. Please try again.');
      toast({
        title: "Message Failed to Send",
        description: errorMessage,
        variant: "destructive",
      });
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      description: 'Send me an email anytime'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Phone',
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
      description: 'Call for immediate response'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: contactInfo.location,
      href: '#',
      description: 'Based in Michigan, USA'
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      value: contactInfo.linkedin,
      href: `https://linkedin.com/in/${contactInfo.linkedin}`,
      description: 'Connect professionally'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-slate-900 relative">
      {/* Background ECU Pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute bottom-0 right-0 w-full h-full opacity-5"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/459411/pexels-photo-459411.jpeg')`,
            backgroundSize: '800px 800px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom right',
            filter: 'grayscale(100%) sepia(100%) hue-rotate(180deg) saturate(30%)'
          }}
        />
        <div className="absolute inset-0 bg-slate-900/80"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-cyan-400/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Get In Touch
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-100 mb-6">
              Let's <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">Connect</span>
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              I'm always interested in discussing new opportunities, collaborating on exciting projects, or sharing insights about automotive embedded systems.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-100 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 hover:border-cyan-400/50 transition-all duration-300 group">
                      <div className="flex items-start space-x-4">
                        <div className="bg-cyan-400/20 text-cyan-400 p-3 rounded-lg group-hover:bg-cyan-400/30 transition-colors">
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-gray-100 font-semibold text-lg mb-1">{method.label}</h4>
                          <p className="text-slate-400 text-sm mb-2">{method.description}</p>
                          <a 
                            href={method.href} 
                            className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                            target={method.label === 'LinkedIn' ? '_blank' : undefined}
                            rel={method.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                          >
                            {method.value}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div className="bg-green-400/10 border border-green-400/20 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-semibold">Currently Available</span>
                </div>
                <p className="text-slate-300">{contactInfo.availability}</p>
              </div>

              {/* Download Resume */}
              <button className="w-full bg-gradient-to-r from-cyan-400 to-cyan-600 text-slate-900 px-6 py-4 rounded-lg hover:from-cyan-300 hover:to-cyan-500 transition-all duration-300 font-semibold flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Contact Form */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-100 mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-100 font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-gray-100 placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-100 font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-gray-100 placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-100 font-medium mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-gray-100 placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-100 font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-gray-100 placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-400 to-cyan-600 text-slate-900 px-6 py-4 rounded-lg hover:from-cyan-300 hover:to-cyan-500 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;