import React, { useState, useEffect } from 'react';
import { cachedApiService, handleApiError } from '../services/api';

const Skills = () => {
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const categories = ['Development', 'Architecture', 'Programming', 'Safety', 'Methodology', 'Tools', 'DevOps', 'Testing', 'Communication', 'Management'];
  
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const skillsData = await cachedApiService.getSkills();
        setSkills(skillsData);
        setError(null);
      } catch (err) {
        console.warn('API unavailable, falling back to mock data:', err);
        // Fallback to mock data when API is not available (static deployment)
        const mockSkills = {
          technical: [
            { name: 'MATLAB/Simulink', level: 95, category: 'Development' },
            { name: 'Stateflow', level: 90, category: 'Development' },
            { name: 'AUTOSAR', level: 88, category: 'Architecture' },
            { name: 'Embedded C', level: 92, category: 'Programming' },
            { name: 'ISO 26262', level: 85, category: 'Safety' },
            { name: 'Model-Based Development', level: 95, category: 'Methodology' },
            { name: 'Git/Version Control', level: 90, category: 'Tools' },
            { name: 'Jenkins/CI-CD', level: 82, category: 'DevOps' },
            { name: 'Robot Framework', level: 80, category: 'Testing' },
            { name: 'CAN Protocol', level: 88, category: 'Communication' },
            { name: 'dSPACE HIL', level: 78, category: 'Testing' },
            { name: 'JIRA/Agile', level: 85, category: 'Management' }
          ],
          domains: [
            { name: 'Chassis Control Systems', expertise: 'Expert' },
            { name: 'Body Control Module (BCM)', expertise: 'Expert' },
            { name: 'Tire Pressure Monitoring (TPMS)', expertise: 'Advanced' },
            { name: 'Battery Management Systems', expertise: 'Advanced' },
            { name: 'Software Defined Vehicles (SDV)', expertise: 'Intermediate' },
            { name: 'Functional Safety (ASIL)', expertise: 'Expert' }
          ]
        };
        setSkills(mockSkills);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const getSkillsByCategory = (category) => {
    return skills?.technical?.filter(skill => skill.category === category) || [];
  };

  const SkillBar = ({ skill }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-gray-100 font-medium">{skill.name}</span>
        <span className="text-cyan-400 text-sm font-semibold">{skill.level}%</span>
      </div>
      <div className="w-full bg-slate-800/50 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );

  const DomainCard = ({ domain }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 hover:border-cyan-400/50 transition-all duration-300 group">
      <h3 className="text-gray-100 font-semibold text-lg mb-2">{domain.name}</h3>
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          domain.expertise === 'Expert' ? 'bg-green-400/20 text-green-400' :
          domain.expertise === 'Advanced' ? 'bg-cyan-400/20 text-cyan-400' :
          'bg-slate-500/20 text-slate-400'
        }`}>
          {domain.expertise}
        </span>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={`w-3 h-3 rounded-full ${
                (domain.expertise === 'Expert' && star <= 5) ||
                (domain.expertise === 'Advanced' && star <= 4) ||
                (domain.expertise === 'Intermediate' && star <= 3)
                  ? 'bg-cyan-400'
                  : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-slate-900 relative">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-cyan-400/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Technical Expertise
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-100 mb-6">
              Skills & <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">Competencies</span>
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              A comprehensive toolkit built through years of hands-on experience in automotive embedded systems and software development.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
              <p className="text-slate-300">Loading skills...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 max-w-md mx-auto">
                <p className="text-red-400 font-semibold mb-2">Error Loading Skills</p>
                <p className="text-slate-300 text-sm">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 bg-cyan-400/20 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-400/30 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Technical Skills */}
          {skills && !loading && (
            <>
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-gray-100 mb-8">Technical Skills</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categories.map((category) => {
                    const categorySkills = getSkillsByCategory(category);
                    if (categorySkills.length === 0) return null;
                    
                    return (
                      <div key={category} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                        <h4 className="text-cyan-400 font-semibold text-lg mb-4">{category}</h4>
                        <div className="space-y-4">
                          {categorySkills.map((skill, index) => (
                            <SkillBar key={index} skill={skill} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Domain Expertise */}
              <div>
                <h3 className="text-2xl font-bold text-gray-100 mb-8">Domain Expertise</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skills.domains?.map((domain, index) => (
                    <DomainCard key={index} domain={domain} />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Certifications & Standards */}
          <div className="mt-16 text-center">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-100 mb-6">Standards & Compliance</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {['ISO 26262', 'AUTOSAR', 'MISRA C', 'MAAB Guidelines', 'ASPICE', 'V-Model'].map((standard, index) => (
                  <div key={index} className="bg-slate-700/50 text-gray-100 px-4 py-2 rounded-full font-medium border border-slate-600">
                    {standard}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;