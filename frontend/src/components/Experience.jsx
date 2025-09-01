import React from 'react';
import { Calendar, MapPin, Award, ArrowRight } from 'lucide-react';
import { experience } from '../data/mockData';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-purple-900 to-blue-900 relative">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Professional Journey
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Work <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Experience</span>
            </h2>
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              A progressive career path showcasing growth from engineer to senior specialist in automotive embedded systems.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 to-purple-600"></div>

            {experience.map((job, index) => (
              <div key={job.id} className="relative mb-12 last:mb-0">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full border-4 border-purple-900"></div>
                
                {/* Content card */}
                <div className="ml-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 group">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{job.position}</h3>
                      <div className="flex items-center space-x-4 text-orange-400 font-semibold">
                        <span>{job.company}</span>
                        <span className="text-white/40">•</span>
                        <span className="text-white/60">{job.type}</span>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end space-y-2 mt-4 md:mt-0">
                      <div className="flex items-center space-x-2 text-white/70">
                        <Calendar size={16} />
                        <span className="text-sm">{job.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/70">
                        <MapPin size={16} />
                        <span className="text-sm">{job.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/80 text-lg leading-relaxed mb-6">
                    {job.description}
                  </p>

                  {/* Key Achievements */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold text-lg mb-4 flex items-center">
                      <Award className="w-5 h-5 text-orange-400 mr-2" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-3">
                      {job.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start space-x-3 text-white/80">
                          <ArrowRight className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Career Progression Stats */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold text-orange-400 mb-2">6+</div>
              <div className="text-white font-semibold">Years Experience</div>
              <div className="text-white/60 text-sm mt-1">Automotive Software</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold text-orange-400 mb-2">3</div>
              <div className="text-white font-semibold">Major Companies</div>
              <div className="text-white/60 text-sm mt-1">Leading Tech Firms</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold text-orange-400 mb-2">50+</div>
              <div className="text-white font-semibold">Projects Delivered</div>
              <div className="text-white/60 text-sm mt-1">Production Ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;