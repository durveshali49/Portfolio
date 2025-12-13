import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

// Individual Card Component
import type { MotionValue } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  stack: string[];
  image: string;
}

const Card = ({ project, i, progress, range, targetScale }: {
  project: Project;
  i: number;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }} 
        className="flex flex-col relative h-[520px] w-[90vw] md:w-[1100px] md:h-[650px] rounded-[32px] bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/10 origin-top overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:border-[#C8B29E]/30 transition-colors duration-500 group"
      >
        <div className="flex h-full flex-col md:flex-row">
          
          {/* Text Content */}
          <div className="w-full md:w-[40%] p-10 md:p-14 flex flex-col justify-between relative z-10 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
             <div>
                <span className="font-mono text-xs text-[#C8B29E]/60 uppercase tracking-widest mb-3 block">{project.category}</span>
                <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4 leading-tight group-hover:text-[#C8B29E] transition-colors duration-300">{project.title}</h2>
                <p className="font-sans text-gray-400 text-sm md:text-base leading-relaxed mb-8">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                   {project.stack.map(s => (
                     <span key={s} className="px-4 py-1.5 bg-white/5 rounded-lg text-xs text-gray-300 font-mono border border-white/10 hover:border-[#C8B29E]/50 hover:bg-[#C8B29E]/10 transition-all">
                       {s}
                     </span>
                   ))}
                </div>
             </div>
             
             <div className="mt-8 md:mt-0">
                <button className="flex items-center gap-3 text-white hover:gap-4 transition-all group/btn">
                   <span className="uppercase text-sm tracking-widest font-display font-bold group-hover/btn:text-[#C8B29E] transition-colors">View Project</span>
                   <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center group-hover/btn:bg-[#C8B29E] group-hover/btn:border-[#C8B29E] group-hover/btn:text-black group-hover/btn:scale-110 transition-all duration-300">
                      <ArrowUpRight size={16} strokeWidth={2.5} />
                   </div>
                </button>
             </div>
          </div>

          {/* Image Content */}
          <div className="w-full md:w-[60%] h-full relative overflow-hidden">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
               <img 
                 src={project.image} 
                 alt={project.title}
                 className="w-full h-full object-cover filter grayscale-[0.3] group-hover:grayscale-0 group-hover:brightness-110 transition-all duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 group-hover:opacity-50 transition-opacity duration-700"></div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  )
}

const Projects = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={container} id="work" className="bg-[#050505] relative pt-32 pb-20">
      
      <div className="px-4 md:px-10 mb-32">
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
         >
           <span className="text-[#C8B29E] text-sm font-mono uppercase tracking-widest mb-4 block">(002) — Portfolio</span>
           <h2 className="font-display font-black text-[12vw] md:text-[8vw] text-white leading-[0.85] uppercase">
             Selected <br/> <span className="text-[#1a1a1a] [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] ml-0 md:ml-20">Works</span>
           </h2>
         </motion.div>
      </div>

      <div className="pb-24">
        {PROJECTS.map((project, i) => {
          const targetScale = 1 - ( (PROJECTS.length - i) * 0.05);
          return (
            <Card 
              key={i} 
              i={i} 
              project={project} 
              progress={scrollYProgress} 
              range={[i * 0.25, 1]} 
              targetScale={targetScale} 
            />
          );
        })}
      </div>
    </section>
  );
};

export default Projects;