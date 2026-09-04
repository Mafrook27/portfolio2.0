import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const FlyingPaperRocket: React.FC = () => {
  const { language, isRtl } = useLanguage();
  const { theme } = useTheme();
  const [isLaunching, setIsLaunching] = useState(false);
  const [bgRocketCount, setBgRocketCount] = useState(0);

  const flight = useMemo(() => ({
    x: typeof window === 'undefined' ? 1440 : window.innerWidth,
    y: typeof window === 'undefined' ? 900 : window.innerHeight,
  }), []);

  // Auto-launch a subtle background rocket every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgRocketCount(prev => prev + 1);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const triggerLaunch = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    setTimeout(() => {
      setIsLaunching(false);
    }, 5600); // Animation duration
  };

  const getButtonText = () => {
    if (language === 'de') return "Papierflieger starten! ✈️";
    if (language === 'ar') return "أطلق صاروخاً ورقياً! 🚀";
    return "Launch paper rocket! 🚀";
  };

  return (
    <>
      {/* 1. Global Floating Tactile Widget to manual trigger paper rocket */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block select-none pointer-events-auto">
        <div className="relative">
          {/* A small tape holding the launch note */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-tape/80 dark:bg-tape/50 rotate-[-4deg] z-10 shadow-sm clip-jagged"
               style={{
                 clipPath: 'polygon(3% 0%, 97% 2%, 100% 20%, 98% 80%, 100% 100%, 93% 96%, 7% 100%, 0% 95%, 4% 80%, 0% 20%)'
               }}
          />
          <motion.button
            onClick={triggerLaunch}
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2.5 bg-card border border-line rounded-sm shadow-md flex items-center gap-2 text-ink-soft hover:text-clay text-xs font-bold cursor-pointer transition-colors duration-200"
            style={{ rotate: '2deg' }}
          >
            {/* Hand-drawn pencil outline of a paper rocket/plane */}
            <svg className="w-4 h-4 text-clay shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 22 L22 2 L13 18 L10 14 L6 13 Z" />
              <path d="M22 2 L10 14" />
            </svg>
            <span className="font-handwriting text-sm font-semibold tracking-wide">
              {getButtonText()}
            </span>
          </motion.button>
        </div>
      </div>

      {/* 2. Interactive Manual Launched Rocket Animation */}
      <AnimatePresence>
        {isLaunching && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {/* The SVG Flight Trail path uses a wider dive loop for a more realistic paper-rocket glide. */}
            <svg className="absolute inset-0 w-full h-full text-clay/15 dark:text-clay/8" fill="none" viewBox={`0 0 ${flight.x} ${flight.y}`} preserveAspectRatio="none">
              <motion.path
                d={`M ${flight.x * 0.05} ${flight.y * 0.88} C ${flight.x * 0.18} ${flight.y * 0.58}, ${flight.x * 0.34} ${flight.y * 0.72}, ${flight.x * 0.43} ${flight.y * 0.38} S ${flight.x * 0.72} ${flight.y * 0.06}, ${flight.x * 0.66} ${flight.y * 0.50} S ${flight.x * 0.90} ${flight.y * 0.47}, ${flight.x * 1.05} ${flight.y * -0.10}`}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="7 9"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 0.65] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 5.3, ease: [0.45, 0, 0.2, 1] }}
              />
            </svg>

            {/* The flying Paper Rocket model */}
            <motion.div
              style={{ x: flight.x * 0.05, y: flight.y * 0.88, position: 'absolute', transformPerspective: 900 }}
              animate={{
                x: [flight.x * 0.05, flight.x * 0.18, flight.x * 0.34, flight.x * 0.43, flight.x * 0.58, flight.x * 0.66, flight.x * 0.72, flight.x * 0.86, flight.x * 1.05],
                y: [flight.y * 0.88, flight.y * 0.58, flight.y * 0.72, flight.y * 0.38, flight.y * 0.18, flight.y * 0.50, flight.y * 0.28, flight.y * 0.46, flight.y * -0.10],
                rotate: [42, -18, 58, -32, -54, 96, 18, -26, -45],
                rotateY: [0, -18, 24, -12, 18, -38, 20, -10, 0],
                rotateX: [0, 8, -14, 10, -8, 18, -10, 4, 0],
                scale: [0.62, 0.92, 1.12, 0.96, 1.18, 0.82, 1.02, 0.9, 0.54],
              }}
              transition={{
                duration: 5.4,
                times: [0, 0.14, 0.28, 0.42, 0.56, 0.68, 0.78, 0.9, 1],
                ease: [0.45, 0, 0.2, 1],
              }}
              className="text-clay drop-shadow-[6px_16px_10px_rgba(0,0,0,0.18)]"
            >
              <svg width="74" height="74" viewBox="0 0 64 64" fill="none" className="transform rotate-[45deg]">
                <path d="M58 7 6 27.5l22 8.7 8.8 21.8L58 7Z" fill={theme === 'dark' ? '#d8c0a8' : '#f4e2cd'} stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                <path d="M58 7 28 36.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M36.8 58 39 39 58 7" stroke="currentColor" strokeWidth="1.7" opacity="0.65" strokeLinecap="round" />
                <path d="M6 27.5 39 39" stroke="currentColor" strokeWidth="1.5" opacity="0.45" strokeLinecap="round" />
                <path d="M15 29.8 31 31.2 23 34.2Z" fill="rgba(255,255,255,0.38)" />
              </svg>
              {/* Swoosh wind sparkles */}
              <motion.span
                className="font-handwriting text-xs absolute -bottom-4 -left-7 text-clay/70 whitespace-nowrap rotate-[-15deg]"
                animate={{ opacity: [0, 1, 0], x: [-8, -20, -34] }}
                transition={{ duration: 1.8, repeat: 2, repeatType: 'loop' }}
              >
                dive loop!
              </motion.span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Automated Background Periodic Paper Rocket */}
      <AnimatePresence>
        {bgRocketCount > 0 && (
          <div key={bgRocketCount} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Subtle path across background */}
            <svg className="absolute inset-0 w-full h-full text-ink/[0.04] dark:text-ink/[0.02]" fill="none">
              <motion.path
                d="M -100 200 Q 300 400 600 150 T 1200 350 Q 1500 500 2000 100"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="8 8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 8, ease: "linear" }}
              />
            </svg>

            {/* Flying background rocket */}
            <motion.div
              style={{ x: -100, y: 200, position: 'absolute' }}
              animate={{
                x: [-100, 300, 600, 900, 1200, 1500, 2050],
                y: [200, 400, 150, 250, 350, 500, 100],
                rotate: [30, 15, -45, 15, 30, -20, -35],
              }}
              transition={{
                duration: 8,
                ease: "linear",
              }}
              className="text-ink/[0.07] dark:text-ink/[0.03]"
            >
              <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-[45deg]">
                <path d="M 22 2 L 2 9 L 11 13 L 13 11 L 11 13 L 15 22 Z" />
                <path d="M 22 2 L 11 13" />
              </svg>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
