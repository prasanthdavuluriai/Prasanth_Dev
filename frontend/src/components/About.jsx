import React, { useState, useEffect } from 'react';
import { mockProfile, mockStats } from '../data/mockData';

const About = ({ darkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => {
      if (aboutSection) {
        observer.unobserve(aboutSection);
      }
    };
  }, []);

  const sections = [
    { id: 'overview', label: 'Overview', icon: '👨‍💻' },
    { id: 'expertise', label: 'Expertise', icon: '🚗' },
    { id: 'approach', label: 'Approach', icon: '⚡' },
    { id: 'impact', label: 'Impact', icon: '🎯' }
  ];

  const expertiseAreas = [
    {
      title: "Automotive Embedded Systems",
      description: "Specializing in ECU development, AUTOSAR architecture, and real-time automotive software solutions.",
      icon: "🔧",
      technologies: ["AUTOSAR", "ECU Development", "Real-time Systems", "Embedded C"]
    },
    {
      title: "Model-Based Development",
      description: "Expert in MATLAB/Simulink for automotive system modeling, simulation, and code generation.",
      icon: "📊",
      technologies: ["MATLAB", "Simulink", "Stateflow", "Code Generation"]
    },
    {
      title: "Test Automation & Validation",
      description: "Leading HIL/SIL/MIL testing strategies and automated validation frameworks for automotive systems.",
      icon: "🧪",
      technologies: ["HIL Testing", "LabVIEW", "Test Stand", "Automation Frameworks"]
    },
    {
      title: "Functional Safety",
      description: "Implementing ISO 26262 compliant solutions ensuring safety-critical automotive system reliability.",
      icon: "🛡️",
      technologies: ["ISO 26262", "FUSA", "Safety Analysis", "Risk Assessment"]
    }
  ];

  const achievements = [
    {
      metric: "40%",
      description: "Reduction in testing time through automation",
      icon: "⚡"
    },
    {
      metric: "5000+",
      description: "Test cases automated across platforms",
      icon: "🤖"
    },
    {
      metric: "99%",
      description: "Success rate in project delivery",
      icon: "🎯"
    },
    {
      metric: "13+",
      description: "Years of automotive expertise",
      icon: "📈"
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">Professional Overview</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {mockProfile.summary}
            </p>
            <p className="text-gray-300 leading-relaxed">
              With over {mockStats.yearsExperience} years of experience in the automotive industry, I have developed a deep expertise in 
              embedded systems, AUTOSAR architecture, and advanced testing methodologies. My career spans across leading 
              automotive OEMs including Ford, Stellantis, and Lucid Motors, where I've consistently delivered innovative 
              solutions that enhance vehicle safety, performance, and user experience.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-500/20">
                <h4 className="text-cyan-400 font-semibold mb-2">Education</h4>
                <p className="text-gray-300 text-sm">Master of Science - Software Engineering</p>
                <p className="text-gray-400 text-xs">Birla Institute of Technology and Science</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-500/20">
                <h4 className="text-cyan-400 font-semibold mb-2">Location</h4>
                <p className="text-gray-300 text-sm">{mockProfile.location}</p>
                <p className="text-gray-400 text-xs">Available for remote & on-site work</p>
              </div>
            </div>
          </div>
        );
      
      case 'expertise':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Core Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {expertiseAreas.map((area, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">{area.icon}</span>
                    <h4 className="text-xl font-semibold text-white">{area.title}</h4>
                  </div>
                  <p className="text-gray-300 mb-4">{area.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {area.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full border border-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'approach':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">My Development Approach</h3>
            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20">
                <h4 className="text-xl font-semibold text-cyan-400 mb-3">🔄 Agile & Iterative</h4>
                <p className="text-gray-300">
                  Embracing agile methodologies to deliver incremental value while maintaining flexibility 
                  to adapt to changing automotive requirements and emerging technologies.
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20">
                <h4 className="text-xl font-semibold text-cyan-400 mb-3">🎯 Safety-First Design</h4>
                <p className="text-gray-300">
                  Prioritizing functional safety (ISO 26262) and rigorous testing protocols to ensure 
                  automotive systems meet the highest safety and reliability standards.
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20">
                <h4 className="text-xl font-semibold text-cyan-400 mb-3">🚀 Innovation & Efficiency</h4>
                <p className="text-gray-300">
                  Leveraging cutting-edge tools and methodologies like model-based development and 
                  automated testing to accelerate development cycles and improve quality.
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20">
                <h4 className="text-xl font-semibold text-cyan-400 mb-3">🤝 Collaborative Leadership</h4>
                <p className="text-gray-300">
                  Fostering cross-functional collaboration and mentoring team members to build 
                  collective expertise and deliver exceptional automotive solutions.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'impact':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Measurable Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20 text-center hover:border-cyan-400/40 transition-all duration-300"
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{achievement.metric}</div>
                  <p className="text-gray-300 text-sm">{achievement.description}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20">
              <h4 className="text-xl font-semibold text-cyan-400 mb-4">🏆 Recent Recognition</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Ford Customer Appreciation Award</span>
                  <span className="text-cyan-400 text-sm">2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">TCS Special Initiative Award</span>
                  <span className="text-cyan-400 text-sm">2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">TCS Applause Award</span>
                  <span className="text-cyan-400 text-sm">2023</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Passionate automotive engineer dedicated to pushing the boundaries of embedded systems and automation
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center mb-12">
            <div className="bg-gray-800/50 rounded-lg p-1 border border-cyan-500/20">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-cyan-400'
                  }`}
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-5xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;