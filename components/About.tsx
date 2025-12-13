import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE, ACHIEVEMENTS } from '../constants';
import { Braces, Box, Settings } from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  };

  return (
    <section id="about" className="py-32 px-4 md:px-10 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505] text-white relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#C8B29E]/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-[#C8B29E]/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"></div>
      </div>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mb-24 relative z-10"
      >
        <span className="font-mono text-sm text-[#C8B29E] uppercase tracking-[0.3em] mb-6 block">(003) — About Me</span>
        <h2 className="font-display text-5xl md:text-7xl font-black uppercase leading-none mb-8">
          Crafting Digital<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8B29E] to-white">Experiences</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl font-sans leading-relaxed">
          Full-stack developer specializing in building scalable web applications with elegant user interfaces and robust backend architectures.
        </p>
      </motion.div>

      {/* Experience Timeline */}
      <div className="max-w-7xl mx-auto mb-32 relative z-10">
        <h3 className="font-display text-3xl md:text-4xl font-bold uppercase mb-16 text-[#C8B29E]">Experience</h3>
        <div className="space-y-0">
          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C8B29E] to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] top-8 w-[11px] h-[11px] rounded-full bg-[#050505] border-2 border-[#C8B29E] group-hover:scale-150 transition-transform duration-300"></div>
              
              {/* Content Card */}
              <div className="ml-12 mb-16 p-8 md:p-10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-[#C8B29E]/50 transition-all duration-500 group-hover:translate-x-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h4 className="font-display text-2xl md:text-3xl font-black uppercase text-white group-hover:text-[#C8B29E] transition-colors duration-300">
                      {exp.role}
                    </h4>
                    <p className="text-[#C8B29E] font-mono text-sm mt-1">{exp.company}</p>
                  </div>
                  <span className="font-mono text-sm text-gray-500 mt-2 md:mt-0">{exp.period}</span>
                </div>
                
                <div className="space-y-3">
                  {exp.description.map((desc, i) => (
                    <div key={i} className="flex items-start gap-3 group/item">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C8B29E] flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
                      <p className="text-gray-300 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Skills Section - Creative Card Design */}
      <div className="max-w-7xl mx-auto relative z-10">
        <h3 className="font-display text-3xl md:text-4xl font-bold uppercase mb-16 text-[#C8B29E]">Tech Stack</h3>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Languages */}
          <motion.div
            variants={itemVariants}
            className="group relative p-8 bg-gradient-to-br from-[#C8B29E]/10 via-transparent to-transparent backdrop-blur-sm rounded-3xl border border-[#C8B29E]/20 hover:border-[#C8B29E] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#C8B29E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#C8B29E]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Braces className="w-7 h-7 text-[#C8B29E]" />
              </div>
              <h4 className="font-display text-xl font-black uppercase mb-6 text-white">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {["Java", "JavaScript", "Node.js", "SQL", "HTML/CSS"].map(tech => (
                  <span key={tech} className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-mono text-gray-300 border border-white/10 hover:bg-[#C8B29E] hover:text-black hover:border-[#C8B29E] transition-all duration-300 cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Frameworks */}
          <motion.div
            variants={itemVariants}
            className="group relative p-8 bg-gradient-to-br from-[#C8B29E]/10 via-transparent to-transparent backdrop-blur-sm rounded-3xl border border-[#C8B29E]/20 hover:border-[#C8B29E] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#C8B29E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#C8B29E]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Box className="w-7 h-7 text-[#C8B29E]" />
              </div>
              <h4 className="font-display text-xl font-black uppercase mb-6 text-white">Frameworks</h4>
              <div className="flex flex-wrap gap-2">
                {["React.js", "Express.js", "Tailwind", "Framer Motion"].map(tech => (
                  <span key={tech} className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-mono text-gray-300 border border-white/10 hover:bg-[#C8B29E] hover:text-black hover:border-[#C8B29E] transition-all duration-300 cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div
            variants={itemVariants}
            className="group relative p-8 bg-gradient-to-br from-[#C8B29E]/10 via-transparent to-transparent backdrop-blur-sm rounded-3xl border border-[#C8B29E]/20 hover:border-[#C8B29E] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#C8B29E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#C8B29E]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Settings className="w-7 h-7 text-[#C8B29E]" />
              </div>
              <h4 className="font-display text-xl font-black uppercase mb-6 text-white">Tools</h4>
              <div className="flex flex-wrap gap-2">
                {["IntelliJ IDEA", "Eclipse", "VS Code", "Git", "Figma", "MySQL", "Postman"].map(tech => (
                  <span key={tech} className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-mono text-gray-300 border border-white/10 hover:bg-[#C8B29E] hover:text-black hover:border-[#C8B29E] transition-all duration-300 cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

export default About;