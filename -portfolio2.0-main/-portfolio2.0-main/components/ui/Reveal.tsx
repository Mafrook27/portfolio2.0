import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { usePerformance } from '../../context/PerformanceContext';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Scroll-reveal wrapper (replaces AOS). IntersectionObserver-based, so it
// can't get stuck hidden after anchor jumps, route changes or fast scrolls —
// and it renders statically in eco mode / reduced-motion.
export const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0 }) => {
  const { ecoMode } = usePerformance();
  const reducedMotion = useReducedMotion();

  if (ecoMode || reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
