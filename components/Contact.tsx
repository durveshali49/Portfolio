import React from 'react';
import { SOCIALS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-4 md:px-10 bg-[#050505] border-t border-white/10 relative overflow-hidden">
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C8B29E]/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C8B29E]/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="flex flex-col items-center justify-center text-center py-20 relative z-10">
         <span className="text-[#C8B29E] text-sm font-mono uppercase tracking-widest mb-6">(004) — Get in Touch</span>
         <h2 className="font-display font-black text-[14vw] md:text-[10vw] leading-none uppercase text-white mb-12 tracking-tighter">
            Let's Talk
         </h2>
         <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 font-sans leading-relaxed">
            Have a project in mind or just want to chat? <br className="hidden md:block" />Drop me a message and let's create something amazing together.
         </p>
         <a 
            href="mailto:durveshali49@gmail.com" 
            className="group inline-flex items-center gap-4 text-2xl md:text-4xl font-serif italic text-[#C8B29E] hover:text-white transition-all duration-300 border-b-2 border-[#C8B29E] hover:border-white pb-3 hover:gap-6"
            style={{ cursor: 'pointer' }}
         >
            durveshali49@gmail.com
            <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" size={32} />
         </a>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center md:items-end mt-28 pt-12 border-t border-white/20 font-mono text-xs text-gray-500 uppercase tracking-widest relative z-10">
         <div className="flex flex-col gap-3 mb-8 md:mb-0">
            <span className="text-[#C8B29E]">Connect</span>
            <div className="flex gap-6">
               <a href={`https://${SOCIALS.linkedin}`} target="_blank" rel="noreferrer" className="text-white hover:text-[#C8B29E] transition-all duration-300 hover:scale-110 inline-block">LinkedIn</a>
               <a href={`https://${SOCIALS.github}`} target="_blank" rel="noreferrer" className="text-white hover:text-[#C8B29E] transition-all duration-300 hover:scale-110 inline-block">Github</a>
            </div>
         </div>

         <div className="text-center md:text-right">
            <p className="text-white font-semibold">Designed & Crafted by Shaik Durveshali</p>
            <p className="mt-2 text-gray-600">© 2025 All rights reserved</p>
         </div>
      </div>

    </section>
  );
};

export default Contact;