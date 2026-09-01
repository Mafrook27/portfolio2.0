import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { skills } from '../../lib/data';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { PhysicalCard } from '../../components/ui/PhysicalCard';
import { Code2, Layers, Cpu, Wrench } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  // Config for each category board with premium corner-wrap tapes on all 4 boards
  const categories = [
    {
      id: 0,
      labelEn: "Languages",
      labelAr: "اللغات",
      color: "var(--clay)",
      icon: Code2,
      skillsData: skills.languages,
      description: t.skillsDescLanguages,
      restingRotation: -1.2,
      // Taped symmetrically at the Top-Left and Top-Right corners wrapping the edges
      tapes: [
        { 
          className: "absolute top-[-16px] left-[-24px] rotate-[-30deg] w-24 h-7"
        },
        { 
          className: "absolute top-[-16px] right-[-24px] rotate-[32deg] w-24 h-7"
        }
      ]
    },
    {
      id: 1,
      labelEn: "Frameworks",
      labelAr: "بيئات العمل",
      color: "var(--olive)",
      icon: Layers,
      skillsData: skills.frameworks,
      description: t.skillsDescFrameworks,
      restingRotation: 1.0,
      // Taped diagonally at Top-Left and Bottom-Right corners wrapping the edges
      tapes: [
        { 
          className: "absolute top-[-16px] left-[-24px] rotate-[-28deg] w-24 h-7"
        },
        { 
          className: "absolute bottom-[-16px] right-[-24px] rotate-[-32deg] w-24 h-7"
        }
      ]
    },
    {
      id: 2,
      labelEn: "Tools & Ops",
      labelAr: "الأدوات",
      color: "var(--denim)",
      icon: Wrench,
      skillsData: skills.tools,
      description: t.skillsDescTools,
      restingRotation: -0.8,
      // Taped diagonally at Top-Right and Bottom-Left corners wrapping the edges
      tapes: [
        { 
          className: "absolute top-[-16px] right-[-24px] rotate-[32deg] w-24 h-7"
        },
        { 
          className: "absolute bottom-[-16px] left-[-24px] rotate-[28deg] w-24 h-7"
        }
      ]
    },
    {
      id: 3,
      labelEn: "AI Prompting",
      labelAr: "الذكاء الاصطناعي",
      color: "var(--tape)",
      icon: Cpu,
      skillsData: skills.ai,
      description: t.skillsDescAI,
      restingRotation: 1.2,
      // Taped symmetrically at Bottom-Left and Bottom-Right corners wrapping the edges
      tapes: [
        { 
          className: "absolute bottom-[-16px] left-[-24px] rotate-[30deg] w-24 h-7"
        },
        { 
          className: "absolute bottom-[-16px] right-[-24px] rotate-[-32deg] w-24 h-7"
        }
      ]
    },
  ];

  const getTapeStyle = () => {
    // Linear gradients and repeating stripes pattern matching index.css washi tape exactly
    const baseGradient = isDark
      ? 'linear-gradient(180deg, rgba(122, 113, 80, 0.88), rgba(100, 92, 65, 0.82))'
      : 'linear-gradient(180deg, rgba(217, 203, 143, 0.88), rgba(201, 184, 116, 0.82))';
    
    const stripeColor = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.28)';
    const stripePattern = `repeating-linear-gradient(115deg, ${stripeColor} 0px, ${stripeColor} 2px, transparent 2px, transparent 8px)`;

    return {
      backgroundImage: `${stripePattern}, ${baseGradient}`,
    };
  };

  return (
    <section id="skills" className="py-20 sm:py-28 bg-paper text-ink relative overflow-hidden border-b border-line">
      
      {/* Subtle Coffee Stain Ring Watermark */}
      <div className="absolute top-[12%] left-[6%] pointer-events-none opacity-[0.06] dark:opacity-[0.02] text-ink rotate-[15deg]">
        <svg width="190" height="190" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M 100 20 A 80 80 0 1 1 99.9 20 C 102 30, 95 60, 110 80 C 120 100, 140 90, 150 120" strokeDasharray="160 8 40 12" />
          <path d="M 100 12 A 88 88 0 1 1 99.8 12" strokeWidth="1" opacity="0.5" strokeDasharray="180 15" />
          <circle cx="55" cy="160" r="2" fill="currentColor" />
          <circle cx="160" cy="40" r="1.2" fill="currentColor" />
        </svg>
      </div>

      {/* Looping Flying Paper Rocket in Skills Section */}
      <div className="absolute top-[15%] right-[5%] pointer-events-none opacity-[0.08] dark:opacity-[0.03] text-clay rotate-[-20deg] hidden md:block">
        <svg width="130" height="130" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 80 20 L 20 48 L 46 54 L 52 76 Z" />
          <path d="M 80 20 L 46 54" />
          {/* Loop-de-loop trail */}
          <path d="M 10 80 C 15 65, 30 55, 30 40 C 30 25, 45 35, 55 45" strokeDasharray="3 3" />
          {/* Small star asterisks */}
          <path d="M 75 75 L 81 81 M 81 75 L 75 81" strokeWidth="1" />
        </svg>
        <span className="font-handwriting text-[10px] text-clay block -mt-2 ml-4">stacking skills...</span>
      </div>

      {/* Heavy Pencil Scratches Watermark in bottom-left */}
      <div className="absolute bottom-[8%] left-[8%] pointer-events-none opacity-[0.06] dark:opacity-[0.02] text-ink hidden lg:block select-none">
        <svg width="150" height="80" viewBox="0 0 150 80" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
          <path d="M 15 15 L 135 12 M 20 22 L 140 18 M 10 30 L 130 27 M 25 38 L 125 34 M 15 46 L 115 42 M 30 54 L 135 50" opacity="0.75" />
          {/* Sketchy question mark / code doodle */}
          <path d="M 110 35 Q 115 25, 125 30 T 120 45" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* Interlocking Tape Loop Markings */}
      <div className="absolute bottom-[6%] right-[8%] pointer-events-none opacity-[0.05] dark:opacity-[0.02] text-ink rotate-[-12deg] hidden lg:block">
        <svg width="150" height="100" viewBox="0 0 150 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M 25 50 C 25 22, 85 22, 85 50 C 85 78, 25 78, 25 50 Z" strokeDasharray="8 4" />
          <path d="M 65 50 C 65 22, 125 22, 125 50 C 125 78, 65 78, 65 50 Z" />
        </svg>
      </div>

      {/* Atmospheric lighting orbs */}
      <div className="absolute top-1/4 right-0 w-[350px] h-[350px] bg-paper-2 blur-[90px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3 opacity-30" />
      <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] bg-paper-2 blur-[90px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/3 opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 max-w-5xl">
        <SectionHeading pretitle={t.skillsPretitle} title={t.skillsTitle} />

        {/* TAPED DESK BOARD GRID */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 max-w-4xl mx-auto">
          {categories.map((category) => {
            const headingText = isRtl ? category.labelAr : category.labelEn;

            return (
              <PhysicalCard
                key={category.id}
                className="p-6 bg-card border border-line rounded-[4px] relative flex flex-col justify-between min-h-[220px] select-none"
                style={{
                  rotate: `${category.restingRotation}deg`,
                  boxShadow: isDark
                    ? "0 8px 24px rgba(0,0,0,0.35)"
                    : "0 8px 24px rgba(46,42,36,0.05)",
                }}
                // Since the card is taped down to the desk, it should NOT tilt or lift up when hovered
                tiltRange={0}
              >
                {/* Thick, high-fidelity textured masking tape pieces anchoring/wrapping edges realistically on all cards */}
                {category.tapes.map((tape, tIdx) => {
                  const isRight = tape.className.includes('right');
                  const isBot = tape.className.includes('bottom');
                  const isReverseCrease = (isRight && !isBot) || (!isRight && isBot);

                  return (
                    <div
                      key={tIdx}
                      className={`${tape.className} pointer-events-none z-30 bg-[#ecdcb9] dark:bg-[#594d33] border border-[#dec795] dark:border-[#4d3f22] shadow-[0_3px_6px_rgba(0,0,0,0.22)] overflow-hidden`}
                      style={{
                        // Premium jagged edge effect on both ends of the tape strip
                        clipPath: 'polygon(2% 0%, 98% 3%, 100% 15%, 98% 85%, 100% 100%, 95% 97%, 5% 100%, 0% 97%, 2% 85%, 0% 15%)',
                        ...getTapeStyle()
                      }}
                    >
                      {/* Realistic 3D crease line representing the fold over the card edge */}
                      <div 
                        className="absolute inset-y-0 w-[2px] bg-black/25 dark:bg-black/45"
                        style={{
                          left: '50%',
                          transform: isReverseCrease ? 'rotate(-25deg) scaleY(1.4)' : 'rotate(25deg) scaleY(1.4)',
                          opacity: 0.75,
                          mixBlendMode: 'multiply'
                        }}
                      />
                      {/* Highlight next to crease line for paper height illusion */}
                      <div 
                        className="absolute inset-y-0 w-[1.5px] bg-white/20 dark:bg-white/10"
                        style={{
                          left: 'calc(50% + 1px)',
                          transform: isReverseCrease ? 'rotate(-25deg) scaleY(1.4)' : 'rotate(25deg) scaleY(1.4)',
                          opacity: 0.5,
                        }}
                      />
                      {/* Deepened shadow overlay on the "folded over / outer" half of tape to give a 3D drop effect */}
                      <div 
                        className="absolute inset-0 bg-black/[0.04] pointer-events-none"
                        style={{
                          clipPath: isRight
                            ? 'polygon(45% 0%, 100% 0%, 100% 100%, 45% 100%)'
                            : 'polygon(0% 0%, 55% 0%, 55% 100%, 0% 100%)'
                        }}
                      />
                    </div>
                  );
                })}

                {/* Grid blueprint pattern watermark */}
                <div 
                  className="absolute inset-0 rounded-[4px] opacity-[0.03] dark:opacity-[0.02] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(currentColor 1.2px, transparent 1.2px)',
                    backgroundSize: '14px 14px',
                  }}
                />

                {/* Category Header Info */}
                <div className="relative z-10 mb-5 w-full flex flex-col items-center text-center">
                  <div className="flex items-center gap-2 mb-2">
                    <category.icon 
                      className="w-4.5 h-4.5 shrink-0" 
                      style={{ color: category.color }}
                    />
                    <h3 className="font-sans font-extrabold text-xs sm:text-sm tracking-wider uppercase text-ink">
                      {headingText}
                    </h3>
                  </div>
                  
                  <p className="text-ink-soft text-[11px] sm:text-[12px] leading-relaxed font-light italic opacity-90 px-3 w-full max-w-[280px]">
                    "{category.description}"
                  </p>
                </div>

                {/* Scattered Paper Chip Tags - Premium, clean sans-serif typography */}
                <div className="relative z-10 flex flex-wrap gap-2.5 sm:gap-3 justify-center items-center mt-auto w-full">
                  {category.skillsData.map((skill, sIdx) => {
                    const chipRotation = ((sIdx * 11) % 6) - 3;
                    
                    // Semi-randomized realistic placements for micro-tape strips pinning the tags down
                    const tapePositionX = (sIdx % 3 === 0) ? 'left-[15%]' : (sIdx % 3 === 1) ? 'right-[15%]' : 'left-1/2 -translate-x-1/2';
                    const tapeRotation = (sIdx % 4 === 0) ? '-14deg' : (sIdx % 4 === 1) ? '7deg' : (sIdx % 4 === 2) ? '-8deg' : '12deg';
                    const tapeTop = '-6px';

                    return (
                      <motion.div
                        key={skill.label}
                        whileHover={{
                          scale: 1.06,
                          rotate: 0,
                          y: -2,
                          boxShadow: isDark
                            ? "0 4px 12px rgba(0,0,0,0.5)"
                            : "0 4px 12px rgba(46,42,36,0.12)",
                          zIndex: 25,
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 16 }}
                        className="inline-flex items-center gap-2 py-1.5 px-3 bg-paper/90 dark:bg-card border border-line rounded-[3px] select-none cursor-pointer relative"
                        style={{
                          rotate: `${chipRotation}deg`,
                          boxShadow: isDark
                            ? "0 2px 4px rgba(0,0,0,0.35)"
                            : "0 2px 4px rgba(46,42,36,0.06)",
                        }}
                      >
                        {/* Soft paper fiber texture */}
                        <div 
                          className="absolute inset-0 rounded-[3px] opacity-[0.02] pointer-events-none"
                          style={{
                            backgroundImage: 'radial-gradient(currentColor 0.6px, transparent 0.6px)',
                            backgroundSize: '6px 6px',
                          }}
                        />

                        {/* Tech Icon */}
                        <div className="w-4 h-4 flex items-center justify-center shrink-0">
                          <skill.icon 
                            className="w-3.5 h-3.5" 
                            style={{ color: skill.color }}
                          />
                        </div>

                        {/* High-contrast, extremely readable sans font for accessibility */}
                        <span className="font-sans font-semibold text-xs sm:text-sm tracking-wide text-ink leading-none mt-0.5">
                          {skill.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </PhysicalCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
