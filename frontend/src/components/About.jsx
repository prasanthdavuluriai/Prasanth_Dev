import React from 'react';
import { Code, Cpu, Shield, Users } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Model-Based Development Expert",
      description: "MATLAB/Simulink specialist with deep expertise in automotive software architecture"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Functional Safety Leader",
      description: "ISO 26262 compliant systems, ASIL-B certified with proven safety-critical experience"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Embedded Systems Architect", 
      description: "AUTOSAR & Non-AUTOSAR development across Chassis Control and BCM systems"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Agile Team Leader",
      description: "Cross-functional collaboration with proven track record in CI/CD and quality assurance"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-purple-900 to-blue-900 relative">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              About Me
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Passionate About <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Automotive Innovation</span>
            </h2>
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              With over 6 years of experience in embedded software development, I bridge the gap between cutting-edge technology and real-world automotive solutions.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Story */}
            <div className="space-y-6 text-white/90">
              <p className="text-lg leading-relaxed">
                My journey began with a fascination for how software controls the vehicles we depend on every day. From my early days working on Chassis and BCM functionalities to leading complex SDV projects, I've consistently delivered solutions that prioritize both innovation and safety.
              </p>
              <p className="text-lg leading-relaxed">
                What drives me is the challenge of creating robust, safety-critical systems that meet the highest industry standards. Whether it's implementing ISO 26262 compliance, optimizing CI/CD pipelines, or mentoring teams through complex validation processes, I thrive on solving problems that matter.
              </p>
              <p className="text-lg leading-relaxed">
                Currently based in Michigan, I'm passionate about the future of automotive technology and excited to contribute to the next generation of intelligent vehicle systems.
              </p>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-400/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white font-bold text-2xl">BK</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Bhavyasri Koduru</h3>
                  <p className="text-orange-400 font-semibold">Senior Embedded Software Engineer</p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/80 text-sm">
                      "Building tomorrow's automotive software today"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500/20 text-orange-400 p-3 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                    {highlight.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">{highlight.title}</h3>
                    <p className="text-white/70 leading-relaxed">{highlight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;