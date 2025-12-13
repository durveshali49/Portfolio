import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.3 + (i * 0.1), ease: [0.76, 0, 0.24, 1] }
    })
  };

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full px-6 py-6 md:px-10 md:py-8 flex justify-between items-center z-50 mix-blend-difference text-white"
      >
        <a href="#" className="font-display font-black text-2xl tracking-tighter cursor-hover-trigger z-50">
          SD<span className="text-[#C8B29E]">.</span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12">
          {['Work', 'About', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="font-mono text-xs uppercase tracking-widest hover:text-[#C8B29E] transition-colors cursor-hover-trigger relative group"
            >
              <span className="relative z-10">{item}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#C8B29E] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
        
        {/* Mobile Menu Toggle */}
        <div 
          onClick={toggleMenu}
          className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 cursor-pointer z-50"
        >
          {isOpen ? <X className="w-8 h-8 text-white" /> : (
            <>
              <div className="w-full h-[1px] bg-white"></div>
              <div className="w-2/3 h-[1px] bg-white self-end"></div>
            </>
          )}
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-[#050505] z-40 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-8 text-center">
              {['Work', 'About', 'Contact'].map((item, i) => (
                <motion.a
                  custom={i}
                  variants={linkVariants}
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={toggleMenu}
                  className="font-serif text-5xl md:text-6xl text-white hover:text-[#C8B29E] transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
               variants={linkVariants}
               custom={4}
               className="absolute bottom-10 text-xs font-mono text-gray-500 uppercase tracking-widest"
            >
              Shaik Durveshali © 2025
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;