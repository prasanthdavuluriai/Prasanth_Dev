import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Download } from 'lucide-react';

// Contact info
const contactInfo = {
  email: 'bhavyasreekoduri@gmail.com',
  phone: '+1-734-447-6301',
  location: 'Westland, Michigan, 48185',
  linkedin: 'bhavyasrikoduru',
  availability: 'Available for new opportunities'
};

const Contact = () => {

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

          {/* Centered Contact Information */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 hover:border-cyan-400/50 transition-all duration-300 group text-center">
                  <div className="bg-cyan-400/20 text-cyan-400 p-4 rounded-lg group-hover:bg-cyan-400/30 transition-colors w-fit mx-auto mb-4">
                    {method.icon}
                  </div>
                  <h4 className="text-gray-100 font-semibold text-lg mb-2">{method.label}</h4>
                  <p className="text-slate-400 text-sm mb-3">{method.description}</p>
                  <a 
                    href={method.href} 
                    className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium block break-all"
                    target={method.label === 'LinkedIn' ? '_blank' : undefined}
                    rel={method.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                  >
                    {method.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Availability Status */}
            <div className="bg-green-400/10 border border-green-400/20 rounded-xl p-6 text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">Currently Available</span>
              </div>
              <p className="text-slate-300">{contactInfo.availability}</p>
            </div>

            {/* Download Resume */}
            <div className="text-center">
              <a 
                href="/resume.pdf" 
                download="Bhavyasri_Koduru_Resume.pdf"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-400 to-cyan-600 text-slate-900 px-8 py-4 rounded-lg hover:from-cyan-300 hover:to-cyan-500 transition-all duration-300 font-semibold"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;