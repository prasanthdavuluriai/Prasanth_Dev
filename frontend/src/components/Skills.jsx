import React, { useState, useEffect } from 'react';
import { mockSkills } from '../data/mockData';
import { apiService } from '../services/api';

const Skills = ({ darkMode }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [animatedSkills, setAnimatedSkills] = useState(new Set());

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await apiService.getSkills();
        setSkills(response);
        setError(null);
      } catch (err) {
        console.warn('API call failed, using mock data:', err);
        setSkills(mockSkills);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skill bars progressively
          setTimeout(() => {
            skills.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedSkills(prev => new Set([...prev, index]));
              }, index * 100);
            });
          }, 300);
        }
      },
      { threshold: 0.1 }
    );

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => {
      if (skillsSection) {
        observer.unobserve(skillsSection);
      }
    };
  }, [skills]);

  const categories = ['All', ...new Set(skills.map(skill => skill.category))];
  
  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const getSkillColor = (level) => {
    if (level >= 90) return 'from-green-400 to-emerald-500';
    if (level >= 80) return 'from-cyan-400 to-blue-500';
    if (level >= 70) return 'from-blue-400 to-indigo-500';
    return 'from-purple-400 to-pink-500';
  };

  const getSkillIcon = (skillName) => {
    const icons = {
      'MATLAB/Simulink': '📊',
      'AUTOSAR': '🚗',
      'Model-Based Development': '🏗️',
      'LabVIEW': '🔬',
      'Test Stand': '🧪',
      'C Programming': '💻',
      'Python': '🐍',
      'MIL/SIL/HIL Testing': '🔧',
      'CAN/LIN Protocols': '🔌',
      'Diagnostics (UDS)': '🔍',
      'Git/JIRA': '📝',
      'Body Control Modules': '🎛️',
      'Infotainment Systems': '📱',
      'Powertrain Control': '⚙️',
      'ADAS/Autonomous Systems': '🤖',
      'Functional Safety': '🛡️',
      'Test Automation': '⚡'
    };
    return icons[skillName] || '💡';
  };

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2">
              <div className="w-8 h-8 border-4 border-cyan-200 border-t-cyan-400 rounded-full animate-spin"></div>
              <span className="text-white text-lg">Loading skills...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Technical Skills
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive expertise across automotive embedded systems, testing frameworks, and development tools
            </p>
          </div>

          {/* Category Filter */}
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
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className="group bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                {/* Skill Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getSkillIcon(skill.name)}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {skill.yearsExperience} years experience
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-cyan-400">
                      {skill.level}%
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">
                      {skill.category}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getSkillColor(skill.level)} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                      style={{
                        width: animatedSkills.has(index) ? `${skill.level}%` : '0%'
                      }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                    </div>
                  </div>
                  
                  {/* Progress Labels */}
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>

                {/* Skill Level Badge */}
                <div className="mt-4 flex justify-end">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                    skill.level >= 90 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                      : skill.level >= 80 
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                      : skill.level >= 70
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                  }`}>
                    {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : skill.level >= 70 ? 'Proficient' : 'Intermediate'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Skills Summary */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/20">
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {skills.filter(skill => skill.category === 'Technical').length}
              </div>
              <div className="text-gray-400">Technical Skills</div>
            </div>
            
            <div className="text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/20">
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {skills.filter(skill => skill.category === 'Domain').length}
              </div>
              <div className="text-gray-400">Domain Expertise</div>
            </div>
            
            <div className="text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/20">
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%
              </div>
              <div className="text-gray-400">Average Proficiency</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;