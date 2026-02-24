import React from 'react';
import { motion } from 'framer-motion';
import { SOCIALS } from '../constants';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 md:px-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-slate-800/50 border border-slate-700 rounded-2xl p-8 md:p-12 mb-12"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
              <Mail className="text-blue-400" size={32} />
            </div>
            <a
              href="mailto:durveshali49@gmail.com"
              className="text-2xl md:text-3xl font-bold text-blue-400 hover:text-blue-300 transition-colors mb-8"
            >
              durveshali49@gmail.com
            </a>
            <a
              href="mailto:durveshali49@gmail.com"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              Send a Message
              <Send size={18} />
            </a>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mb-16"
        >
          <a
            href={`https://${SOCIALS.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 flex items-center justify-center rounded-full border border-slate-700 hover:border-blue-500 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 transition-all duration-200"
          >
            <Github size={24} />
          </a>
          <a
            href={`https://${SOCIALS.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 flex items-center justify-center rounded-full border border-slate-700 hover:border-blue-500 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 transition-all duration-200"
          >
            <Linkedin size={24} />
          </a>
        </motion.div>

        {/* Footer */}
        <div className="text-center pt-12 border-t border-slate-800">
          <p className="text-slate-500 text-sm">
            Designed & Built by <span className="text-white font-semibold">Shaik Durveshali</span>
          </p>
          <p className="text-slate-600 text-xs mt-2">© 2025 All rights reserved</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;