import React, { useState, useEffect } from 'react';
import { mockProjects } from '../data/mockData';
import { apiService } from '../services/api';

const Projects = ({ darkMode }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiService.getProjects();
        setProjects(response);
        setError(null);
      } catch (err) {
        console.warn('API call failed, using mock data:', err);
        setProjects(mockProjects);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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

    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      observer.observe(projectsSection);
    }

    return () => {
      if (projectsSection) {
        observer.unobserve(projectsSection);
      }
    };
  }, []);

  const categories = ['All', ...new Set(projects.map(project => project.category))];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'ongoing': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'in progress': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getProjectIcon = (category) => {
    const icons = {
      'Model-Based Development': '🏗️',
      'Test Automation': '🔬',
      'Automation Framework': '⚙️',
      'Diagnostics': '🔍',
      'Research': '📚',
      'Default': '💼'
    };
    return icons[category] || icons['Default'];
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2">
              <div className="w-8 h-8 border-4 border-cyan-200 border-t-cyan-400 rounded-full animate-spin"></div>
              <span className="text-white text-lg">Loading projects...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Innovative automotive solutions spanning embedded systems, test automation, and advanced validation frameworks
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center mb-12">
            <div className="bg-gray-800/50 rounded-lg p-1 border border-cyan-500/20">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-cyan-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 overflow-hidden hover:border-cyan-400/40 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                      <span className="text-6xl opacity-50">{getProjectIcon(project.category)}</span>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-gray-900/80 backdrop-blur-sm text-cyan-400 rounded-full text-xs font-medium border border-cyan-500/30">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  {/* Project Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">{project.client} • {project.timeline}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded border border-cyan-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-600/50 text-gray-400 text-xs rounded">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="mb-4">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Impact</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {project.impact.length > 100 ? project.impact.substring(0, 100) + '...' : project.impact}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full mt-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 py-2 px-4 rounded-lg hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400/50 transition-all duration-300 text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Project Modal */}
          {selectedProject && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-gray-800 rounded-xl border border-cyan-500/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="sticky top-0 bg-gray-800 border-b border-cyan-500/20 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                      <p className="text-cyan-400">{selectedProject.client} • {selectedProject.timeline}</p>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {selectedProject.image && (
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title}
                      className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Project Overview</h4>
                        <p className="text-gray-300 leading-relaxed">{selectedProject.longDescription}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {selectedProject.features.map((feature, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Impact & Results</h4>
                        <p className="text-gray-300 leading-relaxed">{selectedProject.impact}</p>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Project Details</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Status:</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(selectedProject.status)}`}>
                              {selectedProject.status}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Category:</span>
                            <span className="text-cyan-400">{selectedProject.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Timeline:</span>
                            <span className="text-gray-300">{selectedProject.timeline}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Client:</span>
                            <span className="text-gray-300">{selectedProject.client}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded border border-cyan-500/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Projects Summary */}
          <div className="mt-16 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {projects.length}
                </div>
                <div className="text-gray-400">Major Projects</div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {categories.length - 1}
                </div>
                <div className="text-gray-400">Technology Areas</div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {projects.filter(p => p.status === 'Completed').length}
                </div>
                <div className="text-gray-400">Completed Successfully</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;