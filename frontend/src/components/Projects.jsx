import React, { useState } from 'react';
import { ExternalLink, Calendar, TrendingUp, CheckCircle } from 'lucide-react';
import { projects } from '../data/mockData';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Model-Based Development', 'Embedded Systems', 'DevOps & Testing', 'Safety & Compliance'];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Production':
        return 'bg-green-400/20 text-green-400';
      case 'Completed':
        return 'bg-cyan-400/20 text-cyan-400';
      case 'Ongoing':
        return 'bg-yellow-400/20 text-yellow-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const ProjectCard = ({ project }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:bg-slate-800/70 hover:border-cyan-400/50 transition-all duration-300 group h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <h3 className="text-xl font-bold text-gray-100">{project.title}</h3>
            <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors cursor-pointer" />
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-slate-600/50 text-slate-300 px-3 py-1 rounded-full text-sm font-medium">
              {project.category}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-300 leading-relaxed mb-6 flex-1">
        {project.description}
      </p>

      {/* Key Features */}
      <div className="mb-6">
        <h4 className="text-gray-100 font-semibold mb-3 flex items-center">
          <CheckCircle className="w-4 h-4 text-cyan-400 mr-2" />
          Key Features
        </h4>
        <ul className="space-y-2">
          {project.features.map((feature, idx) => (
            <li key={idx} className="text-slate-400 text-sm flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Technologies */}
      <div className="mb-6">
        <h4 className="text-gray-100 font-semibold text-sm mb-3 uppercase tracking-wide">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, idx) => (
            <span 
              key={idx} 
              className="bg-slate-700/50 text-slate-300 px-2 py-1 rounded text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-700/50">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-slate-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Duration</span>
          </div>
          <div className="text-gray-100 font-semibold mt-1">{project.timeline}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-slate-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Impact</span>
          </div>
          <div className="text-cyan-400 font-semibold mt-1 text-sm">High</div>
        </div>
      </div>

      {/* Impact Statement */}
      <div className="mt-4 p-4 bg-cyan-400/5 border border-cyan-400/20 rounded-lg">
        <p className="text-cyan-200 text-sm italic">
          "{project.impact}"
        </p>
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-20 bg-slate-900 relative">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-cyan-400/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Featured Work
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-100 mb-6">
              Recent <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              A showcase of significant projects demonstrating expertise in automotive embedded systems, safety-critical software, and innovative development methodologies.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-600 text-slate-900'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-100 mb-4">Interested in My Work?</h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                I'm always excited to discuss new opportunities and collaborate on challenging automotive software projects. Let's connect and explore how we can work together.
              </p>
              <button className="bg-gradient-to-r from-cyan-400 to-cyan-600 text-slate-900 px-8 py-3 rounded-lg hover:from-cyan-300 hover:to-cyan-500 transition-all duration-300 font-semibold">
                Let's Discuss Your Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;