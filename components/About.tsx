import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE, ACHIEVEMENTS } from '../constants';
import { Code, Layers, Wrench, Award, Briefcase } from 'lucide-react';

const About = () => {
  const skills = {
    languages: ["Java", "JavaScript", "TypeScript", "Node.js", "SQL", "HTML/CSS"],
    frameworks: ["React.js", "Express.js", "Tailwind CSS", "Framer Motion", "Next.js"],
    tools: ["Git", "VS Code", "IntelliJ IDEA", "Figma", "MySQL", "Postman", "AWS"]
  };

  return (
    <section id="about" className="py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl">
            Full-stack developer specializing in building scalable web applications with modern technologies. 
            Passionate about creating seamless user experiences and writing clean, maintainable code.
          </p>
        </motion.div>

        {/* Experience Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="text-blue-400" size={24} />
            <h3 className="text-2xl md:text-3xl font-bold text-white">Experience</h3>
          </div>

          <div className="space-y-6">
            {EXPERIENCE.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                    <p className="text-blue-400 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-slate-500 mt-2 md:mt-0">{exp.period}</span>
                </div>

                <ul className="space-y-2">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                      <span className="text-blue-400 mt-1.5">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Code className="text-blue-400" size={24} />
            <h3 className="text-2xl md:text-3xl font-bold text-white">Tech Stack</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Code className="text-blue-400" size={20} />
                </div>
                <h4 className="text-lg font-bold text-white">Languages</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-md border border-slate-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Frameworks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Layers className="text-blue-400" size={20} />
                </div>
                <h4 className="text-lg font-bold text-white">Frameworks</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-md border border-slate-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Wrench className="text-blue-400" size={20} />
                </div>
                <h4 className="text-lg font-bold text-white">Tools</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-md border border-slate-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Achievements Section */}
        {ACHIEVEMENTS && ACHIEVEMENTS.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Award className="text-blue-400" size={24} />
              <h3 className="text-2xl md:text-3xl font-bold text-white">Achievements</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACHIEVEMENTS.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-blue-500/50 transition-colors"
                >
                  <h4 className="text-lg font-bold text-white mb-2">{achievement.title}</h4>
                  <p className="text-slate-400 text-sm">{achievement.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;