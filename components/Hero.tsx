import React from 'react';
import { motion } from 'framer-motion';
import { LampContainer } from './ui/lamp';

const marqueeVariants = {
  animate: {
    x: [0, -1000],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      },
    },
  },
};

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#050505]">
      <LampContainer>
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center justify-center gap-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="px-6 py-2 rounded-full border border-[#C8B29E]/30 bg-[#C8B29E]/5 backdrop-blur-sm"
          >
            <span className="text-[#C8B29E] text-xs md:text-sm font-mono uppercase tracking-widest">UI/UX Engineer</span>
          </motion.div>
          <h1 className="mt-4 bg-gradient-to-br from-white via-slate-200 to-slate-400 py-4 bg-clip-text text-center text-6xl md:text-8xl font-display font-black tracking-tighter text-transparent leading-[0.9]">
            Shaik <br/> Durveshali
          </h1>
          <p className="mt-6 font-sans text-base md:text-xl text-[#E0E0E0]/70 max-w-2xl text-center leading-relaxed px-4">
            Transforming ideas into <span className="text-[#C8B29E] font-semibold">pixel-perfect interfaces</span> and <span className="text-[#C8B29E] font-semibold">scalable solutions</span>.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 flex gap-4"
          >
            <a
              href="#work"
              className="group px-8 py-3 bg-[#C8B29E] text-black font-display font-bold text-sm uppercase tracking-wider rounded-full hover:bg-white transition-all duration-300 flex items-center gap-2"
            >
              View Work
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-white/20 text-white font-display font-bold text-sm uppercase tracking-wider rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </LampContainer>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs font-mono uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
      </motion.div>

      {/* Marquee Stripe - Positioned absolutely at bottom of section */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-y border-white/20 py-4 bg-[#050505]/80 backdrop-blur-md z-50">
        <motion.div
          className="flex whitespace-nowrap gap-10"
          variants={marqueeVariants}
          animate="animate"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="font-display text-5xl md:text-7xl text-transparent stroke-text uppercase font-black opacity-40 tracking-tight">
              Design • Development • Innovation •
            </span>
          ))}
        </motion.div>
      </div>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </section>
  );
};

export default Hero;