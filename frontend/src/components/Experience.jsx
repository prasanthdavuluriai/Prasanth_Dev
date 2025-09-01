import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Award, ArrowRight } from 'lucide-react';
import { cachedApiService, handleApiError } from '../services/api';

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const experienceData = await cachedApiService.getExperience();
        setExperience(experienceData);
        setError(null);
      } catch (err) {
        const errorMessage = handleApiError(err, 'Failed to load experience data');
        setError(errorMessage);
        console.error('Error fetching experience:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  return (
    <section id="experience" className="py-20 bg-slate-900 relative">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-cyan-400/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Professional Journey
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-100 mb-6">
              Work <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">Experience</span>
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              A progressive career path showcasing growth from engineer to senior specialist in automotive embedded systems.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
              <p className="text-slate-300">Loading experience...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 max-w-md mx-auto">
                <p className="text-red-400 font-semibold mb-2">Error Loading Experience</p>
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

          {/* Timeline */}
          {!loading && !error && experience.length > 0 && (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-slate-600"></div>

              {experience.map((job, index) => (
              <div key={job.id} className="relative mb-12 last:mb-0">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full border-4 border-slate-900"></div>
                  
                  {/* Content card */}
                  <div className="ml-20 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:bg-slate-800/70 hover:border-cyan-400/50 transition-all duration-300 group">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-100 mb-2">{job.position}</h3>
                        <div className="flex items-center space-x-4 text-cyan-400 font-semibold">
                          <span>{job.company}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-400">{job.type}</span>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end space-y-2 mt-4 md:mt-0">
                        <div className="flex items-center space-x-2 text-slate-400">
                          <Calendar size={16} />
                          <span className="text-sm">{job.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-400">
                          <MapPin size={16} />
                          <span className="text-sm">{job.location}</span>
                        </div>  
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-lg leading-relaxed mb-6">
                      {job.description}
                    </p>

                    {/* Key Achievements */}
                    <div className="mb-6">
                      <h4 className="text-gray-100 font-semibold text-lg mb-4 flex items-center">
                        <Award className="w-5 h-5 text-cyan-400 mr-2" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-3">
                        {job.achievements?.map((achievement, idx) => (
                          <li key={idx} className="flex items-start space-x-3 text-slate-300">
                            <ArrowRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-gray-100 font-semibold text-sm mb-3 uppercase tracking-wide">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies?.map((tech, idx) => (
                          <span 
                            key={idx} 
                            className="bg-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium"
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
          )}

          {/* Career Progression Stats */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="text-center bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
              <div className="text-3xl font-bold text-cyan-400 mb-2">6+</div>
              <div className="text-gray-100 font-semibold">Years Experience</div>
              <div className="text-slate-400 text-sm mt-1">Automotive Software</div>
            </div>
            <div className="text-center bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
              <div className="text-3xl font-bold text-cyan-400 mb-2">3</div>
              <div className="text-gray-100 font-semibold">Major Companies</div>
              <div className="text-slate-400 text-sm mt-1">Leading Tech Firms</div>
            </div>
            <div className="text-center bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
              <div className="text-3xl font-bold text-cyan-400 mb-2">50+</div>
              <div className="text-gray-100 font-semibold">Projects Delivered</div>
              <div className="text-slate-400 text-sm mt-1">Production Ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;