import React from 'react';
import { skills } from '../data/mockData';

const Skills = () => {
  const categories = ['Development', 'Architecture', 'Programming', 'Safety', 'Methodology', 'Tools', 'DevOps', 'Testing', 'Communication', 'Management'];
  
  const getSkillsByCategory = (category) => {
    return skills.technical.filter(skill => skill.category === category);
  };

  const SkillBar = ({ skill }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white font-medium">{skill.name}</span>
        <span className="text-orange-400 text-sm font-semibold">{skill.level}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );

  const DomainCard = ({ domain }) => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group">
      <h3 className="text-white font-semibold text-lg mb-2">{domain.name}</h3>
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          domain.expertise === 'Expert' ? 'bg-green-500/20 text-green-400' :
          domain.expertise === 'Advanced' ? 'bg-blue-500/20 text-blue-400' :
          'bg-orange-500/20 text-orange-400'
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
                  ? 'bg-orange-400'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-blue-900 to-purple-900 relative">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Technical Expertise
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Skills & <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Competencies</span>
            </h2>
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              A comprehensive toolkit built through years of hands-on experience in automotive embedded systems and software development.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8">Technical Skills</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => {
                const categorySkills = getSkillsByCategory(category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                    <h4 className="text-orange-400 font-semibold text-lg mb-4">{category}</h4>
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
            <h3 className="text-2xl font-bold text-white mb-8">Domain Expertise</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.domains.map((domain, index) => (
                <DomainCard key={index} domain={domain} />
              ))}
            </div>
          </div>

          {/* Certifications & Standards */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-orange-400/10 to-purple-600/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Standards & Compliance</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {['ISO 26262', 'AUTOSAR', 'MISRA C', 'MAAB Guidelines', 'ASPICE', 'V-Model'].map((standard, index) => (
                  <div key={index} className="bg-white/10 text-white px-4 py-2 rounded-full font-medium">
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