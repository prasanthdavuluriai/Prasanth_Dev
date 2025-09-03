import React, { useState, useEffect } from 'react';
import { mockCertifications } from '../data/mockData';
import { apiService } from '../services/api';

const Certifications = ({ darkMode }) => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await apiService.getCertifications();
        setCertifications(response);
        setError(null);
      } catch (err) {
        console.warn('API call failed, using mock data:', err);
        setCertifications(mockCertifications);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const certificationsSection = document.getElementById('certifications');
    if (certificationsSection) {
      observer.observe(certificationsSection);
    }

    return () => {
      if (certificationsSection) {
        observer.unobserve(certificationsSection);
      }
    };
  }, []);

  const categories = ['All', ...new Set(certifications.map(cert => cert.category))];
  
  const filteredCertifications = activeCategory === 'All' 
    ? certifications 
    : certifications.filter(cert => cert.category === activeCategory);

  const getCategoryIcon = (category) => {
    const icons = {
      'Technical': '⚙️',
      'Safety': '🛡️',
      'Management': '👥',
      'AI/ML': '🤖',
      'Default': '🏆'
    };
    return icons[category] || icons['Default'];
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Technical': 'from-blue-400 to-blue-600',
      'Safety': 'from-green-400 to-green-600',
      'Management': 'from-purple-400 to-purple-600',
      'AI/ML': 'from-pink-400 to-pink-600',
      'Default': 'from-cyan-400 to-cyan-600'
    };
    return colors[category] || colors['Default'];
  };

  const getIssuerIcon = (issuer) => {
    const icons = {
      'MathWorks': '📊',
      'Udemy': '🎓',
      'TCS': '🏢',
      'OutSkill': '🚀',
      'Default': '🏛️'
    };
    return icons[issuer] || icons['Default'];
  };

  if (loading) {
    return (
      <section id="certifications" className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2">
              <div className="w-8 h-8 border-4 border-cyan-200 border-t-cyan-400 rounded-full animate-spin"></div>
              <span className="text-white text-lg">Loading certifications...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="py-20 bg-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Certifications & Training
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Continuous learning and professional development in cutting-edge automotive technologies
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center mb-12">
            <div className="bg-gray-800/50 rounded-lg p-1 border border-cyan-500/20">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-cyan-400'
                  }`}
                >
                  <span className="mr-2">{getCategoryIcon(category)}</span>
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCertifications.map((cert, index) => (
              <div
                key={cert.id}
                className="group bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 overflow-hidden hover:border-cyan-400/40 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                {/* Certificate Header */}
                <div className={`bg-gradient-to-r ${getCategoryColor(cert.category)} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 opacity-20">
                    <span className="text-6xl">{getCategoryIcon(cert.category)}</span>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                        {cert.category}
                      </span>
                      <span className="text-white/80 text-sm font-medium">
                        {cert.date}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                      {cert.title}
                    </h3>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getIssuerIcon(cert.issuer)}</span>
                      <span className="text-white/90 font-medium">{cert.issuer}</span>
                    </div>
                  </div>
                </div>

                {/* Certificate Content */}
                <div className="p-6">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {cert.description}
                  </p>
                  
                  {/* Skills/Topics Covered */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                      Key Topics
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.title.includes('MATLAB') && (
                        <>
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded border border-cyan-500/30">MATLAB</span>
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded border border-cyan-500/30">Programming</span>
                        </>
                      )}
                      {cert.title.includes('Simulink') && (
                        <>
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded border border-cyan-500/30">Simulink</span>
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded border border-cyan-500/30">Modeling</span>
                        </>
                      )}
                      {cert.title.includes('Stateflow') && (
                        <>
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded border border-cyan-500/30">Stateflow</span>
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded border border-cyan-500/30">State Machines</span>
                        </>
                      )}
                      {cert.title.includes('Functional Safety') && (
                        <>
                          <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded border border-green-500/30">ISO 26262</span>
                          <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded border border-green-500/30">FUSA</span>
                        </>
                      )}
                      {cert.title.includes('Model Based') && (
                        <>
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30">MBD</span>
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30">Automotive</span>
                        </>
                      )}
                      {cert.title.includes('Scrum') && (
                        <>
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded border border-purple-500/30">Agile</span>
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded border border-purple-500/30">Leadership</span>
                        </>
                      )}
                      {cert.title.includes('AI') && (
                        <>
                          <span className="px-2 py-1 bg-pink-500/20 text-pink-300 text-xs rounded border border-pink-500/30">AI/ML</span>
                          <span className="px-2 py-1 bg-pink-500/20 text-pink-300 text-xs rounded border border-pink-500/30">Innovation</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Verification Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-400 text-sm font-medium">Verified</span>
                    </div>
                    
                    <div className="text-gray-400 text-sm">
                      {cert.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications Summary */}
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {certifications.length}
                </div>
                <div className="text-gray-400 text-sm">Total Certifications</div>
              </div>
              
              <div className="text-center bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {certifications.filter(cert => cert.category === 'Technical').length}
                </div>
                <div className="text-gray-400 text-sm">Technical Certs</div>
              </div>
              
              <div className="text-center bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {new Set(certifications.map(cert => cert.issuer)).size}
                </div>
                <div className="text-gray-400 text-sm">Issuing Organizations</div>
              </div>
              
              <div className="text-center bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {new Date().getFullYear() - 2021 + 1}
                </div>
                <div className="text-gray-400 text-sm">Years of Learning</div>
              </div>
            </div>
          </div>

          {/* Learning Philosophy */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-8 border border-cyan-500/20 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Continuous Learning Philosophy</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                In the rapidly evolving automotive industry, staying current with emerging technologies is crucial. 
                My commitment to continuous learning ensures I bring the latest methodologies and best practices to every project, 
                from traditional embedded systems to cutting-edge AI applications in automotive development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;