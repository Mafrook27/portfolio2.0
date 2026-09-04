import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Check, Mail, Terminal, ShieldCheck, Sparkles } from 'lucide-react';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { PushPin } from '../../components/ui/PushPin';
import { PhysicalCard } from '../../components/ui/PhysicalCard';
import { Reveal } from '../../components/ui/Reveal';

interface AboutSectionProps {
  setIsResumeOpen: (open: boolean) => void;
  handleCopyEmail: () => void;
  copiedEmail: boolean;
  totalExp: {
    shortLabel: string;
    label: string;
    years: number;
    months: number;
  };
}

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  setIsResumeOpen, 
  handleCopyEmail, 
  copiedEmail, 
  totalExp 
 }) => {
  const { language, t, isRtl } = useLanguage();
  const { theme } = useTheme();

  return (
    <section id="about" className="py-24 sm:py-32 bg-paper border-b border-line relative overflow-hidden">
      {/* Background paper texture accents */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-paper-2 rounded-full blur-[100px] pointer-events-none opacity-50"></div>

      {/* Hand-drawn pencil sketch highlight circle around Card 1 area */}
      <div className="absolute bottom-[8%] left-[2%] pointer-events-none opacity-[0.07] dark:opacity-[0.02] text-clay -z-10 select-none hidden sm:block">
        <svg width="260" height="260" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M 100 10 A 90 90 0 1 1 99.9 10" strokeDasharray="120 8 40 10" />
          <path d="M 100 5 A 95 95 0 1 1 99.8 5" strokeWidth="0.8" opacity="0.5" strokeDasharray="160 15" />
          <path d="M 40 40 L 50 50 M 50 40 L 40 50" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      {/* Hand-drawn coffee stain ring & pencil scratches in AboutSection */}
      <div className="absolute top-[8%] right-[10%] pointer-events-none opacity-[0.06] dark:opacity-[0.02] text-ink rotate-[-8deg] hidden md:block">
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          {/* Faded spill outlines */}
          <path d="M 80 20 A 60 60 0 1 1 79.9 20" strokeDasharray="12 4 8 8" />
          <path d="M 80 15 A 65 65 0 1 1 79.8 15" strokeWidth="1" opacity="0.6" />
          {/* Quick handwritten code bracket doodle */}
          <path d="M 25 45 C 15 50, 15 70, 25 75" strokeWidth="2.5" />
          <path d="M 135 45 C 145 50, 145 70, 135 75" strokeWidth="2.5" />
          {/* Hand drawn pencil circles */}
          <path d="M 50 110 A 12 12 0 1 1 49.9 110" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M 110 115 A 15 15 0 1 1 109.9 115" strokeWidth="1" />
        </svg>
        <span className="font-handwriting text-xs text-ink-soft block text-center -mt-8">coffee & code</span>
      </div>

      {/* Flying paper rocket with loop-de-loop path in About Section */}
      <div className="absolute top-[35%] left-[5%] pointer-events-none opacity-[0.08] dark:opacity-[0.03] text-clay rotate-[15deg] hidden lg:block">
        <svg width="140" height="140" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Dotted flying loop path */}
          <path d="M 10 110 C 30 115, 60 100, 50 70 C 40 40, 80 50, 100 20" strokeDasharray="3 3" />
          {/* Paper airplane/rocket at the end of path */}
          <g transform="translate(95, 15) rotate(45)">
            <path d="M 0 0 L -15 25 L -5 20 L 5 30 L 0 0 Z" fill="none" />
            <path d="M 0 0 L -5 20" />
          </g>
          {/* Sketchy stars */}
          <path d="M 20 50 L 26 56 M 26 50 L 20 56" strokeWidth="1" />
          <path d="M 85 85 L 91 91 M 91 85 L 85 91" strokeWidth="1" />
        </svg>
        <span className="font-handwriting text-[11px] text-clay block ml-14 -mt-6">reaching new heights...</span>
      </div>

      {/* Dense Pencil scratches in background */}
      <div className="absolute top-[60%] right-[3%] pointer-events-none opacity-[0.06] dark:opacity-[0.02] text-ink hidden md:block">
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
          <path d="M 10 15 L 110 12 M 15 22 L 105 20 M 12 30 L 115 28 M 20 38 L 95 36 M 8 46 L 100 44" opacity="0.7" />
          <path d="M 30 55 C 50 50, 70 60, 90 55" strokeDasharray="2 3" />
        </svg>
      </div>

      {/* Pencil Scribble Underline in bottom corner */}
      <div className="absolute bottom-[5%] left-[8%] pointer-events-none opacity-[0.07] dark:opacity-[0.02] text-ink hidden lg:block">
        <svg width="200" height="80" viewBox="0 0 200 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M 10 25 C 60 15, 120 35, 190 20" />
          <path d="M 15 32 C 70 24, 130 40, 185 28" opacity="0.6" />
          {/* Hand drawn arrows pointing up to the cards */}
          <path d="M 90 60 L 90 40 L 84 46 M 90 40 L 96 46" strokeWidth="1.5" />
          <path d="M 150 65 L 150 45 L 144 51 M 150 45 L 156 51" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        <SectionHeading pretitle={t.aboutPretitle} title={t.aboutTitle} />
        
        <Reveal className="mt-12 sm:mt-16 space-y-12" delay={0.1}>
          
          {/* Main Bio and Action bar */}
          <div className="space-y-6 max-w-4xl">
            <p className="text-ink-soft text-base md:text-lg font-light leading-relaxed">
              {t.aboutBio}
            </p>
          </div>

          {/* Pinned Note Cards - Alternating rotations, with push pins */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            
            {/* Card 1 - Pinned with clay pin */}
            <PhysicalCard 
              className="p-5 select-none"
              style={{ rotate: '-3deg' }}
              tiltRange={6}
            >
              <PushPin colorClass="pin-clay" />
              <div className="w-8 h-8 rounded bg-clay/10 flex items-center justify-center text-clay mb-3">
                <Terminal size={15} />
              </div>
              <h4 className="font-sans font-bold text-ink text-sm uppercase tracking-wider mb-1">{t.card1Title}</h4>
              <p className="text-ink-soft text-xs leading-relaxed font-light">
                {t.card1Desc}
              </p>
            </PhysicalCard>
            
            {/* Card 2 - Pinned with olive pin */}
            <PhysicalCard 
              className="p-5 select-none"
              style={{ rotate: '2deg' }}
              tiltRange={6}
            >
              <PushPin colorClass="pin-olive" />
              <div className="w-8 h-8 rounded bg-olive/10 flex items-center justify-center text-olive mb-3">
                <ShieldCheck size={15} />
              </div>
              <h4 className="font-sans font-bold text-ink text-sm uppercase tracking-wider mb-1">{t.card2Title}</h4>
              <p className="text-ink-soft text-xs leading-relaxed font-light">
                {t.card2Desc}
              </p>
            </PhysicalCard>

            {/* Card 3 - Pinned with denim pin */}
            <PhysicalCard 
              className="p-5 select-none"
              style={{ rotate: '-1.8deg' }}
              tiltRange={6}
            >
              <PushPin colorClass="pin-denim" />
              <div className="w-8 h-8 rounded bg-denim/10 flex items-center justify-center text-denim mb-3">
                <Sparkles size={15} />
              </div>
              <h4 className="font-sans font-bold text-ink text-sm uppercase tracking-wider mb-1">{t.card3Title}</h4>
              <p className="text-ink-soft text-xs leading-relaxed font-light">
                {t.card3Desc}
              </p>
            </PhysicalCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutSection;
