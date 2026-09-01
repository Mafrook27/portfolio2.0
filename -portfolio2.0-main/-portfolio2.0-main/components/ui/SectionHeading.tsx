import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface SectionHeadingProps {
  pretitle: string;
  title: string;
  dark?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ pretitle, title }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-14 sm:mb-20 flex flex-col items-center text-center relative pt-8"
    >
      {/* Small taped paper badge holding the title */}
      <div className="relative inline-block mb-4">
        {/* Washi tape on top of header chip */}
        <div className={`tape tape-sm ${theme === 'dark' ? 'tape-dark' : ''}`}></div>
        
        <div className="section-head-chip mt-2">
          <h2 className="font-sans text-xl sm:text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
            {title}
          </h2>
        </div>
      </div>
      
    </motion.div>
  );
};

export default SectionHeading;
