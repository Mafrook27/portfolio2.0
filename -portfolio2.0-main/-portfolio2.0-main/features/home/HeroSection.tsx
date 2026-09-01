import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, MapPin, Sparkles, Search, Mail } from 'lucide-react';
import { socialLinks } from '../../lib/data';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useUi } from '../../context/UiContext';
import { PhysicalCard } from '../../components/ui/PhysicalCard';
import { Reveal } from '../../components/ui/Reveal';

interface HeroSectionProps {
  setIsResumeOpen: (open: boolean) => void;
  currentRoleIndex: number;
  roles: string[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setIsResumeOpen, currentRoleIndex, roles }) => {
  const { language, t, isRtl } = useLanguage();
  const { theme } = useTheme();
  const { setSearchOpen } = useUi();

  const getDeskBio = () => {
    if (language === 'de') {
      return "Willkommen an meinem Schreibtisch. Ich gestalte moderne Frontend-Erlebnisse, entwickle MERN-Anwendungen und dokumentiere meine Reise.";
    }
    if (language === 'ar') {
      return "مرحباً بك في مكتبي. أصمم تجارب واجهات مميزة، أبني تطبيقات MERN متكاملة، وأوثق رحلتي البرمجية في العلن.";
    }
    return "Welcome to my desk. I craft clean frontend experiences, engineer full-stack MERN apps, and document my building journey in public.";
  };

  const getPills = () => {
    if (language === 'de') {
      return [
        { label: "Sauberes UI/UX", color: "var(--clay)" },
        { label: "MERN-Anwendungen", color: "var(--olive)" },
        { label: "Öffentlich bauen", color: "var(--denim)" }
      ];
    }
    if (language === 'ar') {
      return [
        { label: "تصميم واجهات مميزة", color: "var(--clay)" },
        { label: "تطبيقات MERN", color: "var(--olive)" },
        { label: "البناء في العلن", color: "var(--denim)" }
      ];
    }
    return [
      { label: "Crafting clean UI/UX", color: "var(--clay)" },
      { label: "MERN Stack Dev", color: "var(--olive)" },
      { label: "Building in Public", color: "var(--denim)" }
    ];
  };

  const pills = getPills();

  return (
    <header className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-paper pt-28 pb-16">
      {/* Soft warm radial gradient background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_0%,var(--paper)_100%)] pointer-events-none"></div>

      {/* Hand-drawn Paper Rocket / Paper Airplane Launch sketch */}
      <div className="absolute top-[18%] left-[8%] pointer-events-none opacity-[0.09] dark:opacity-[0.04] text-clay rotate-[-12deg] hidden md:block">
        <svg width="150" height="150" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* A beautiful hand-sketched paper rocket launching */}
          <path d="M 85 15 L 25 45 L 48 52 L 55 75 Z" />
          <path d="M 85 15 L 48 52" />
          {/* Propulsion dashes & wind swirls */}
          <path d="M 15 85 C 20 75, 30 72, 38 65" strokeDasharray="3 3" />
          <path d="M 5 65 C 15 62, 22 55, 25 48" strokeDasharray="4 2" />
          <path d="M 30 95 C 35 85, 45 80, 48 72" strokeDasharray="2 4" />
          {/* A small hand-drawn star */}
          <path d="M 75 40 L 79 44 M 79 40 L 75 44" strokeWidth="1" />
        </svg>
        <span className="font-handwriting text-[11px] text-clay block -mt-1 ml-4 rotate-[10deg]">launching apps...</span>
      </div>

      {/* Right-side flying paper rocket ascending with a wavy flight path */}
      <div className="absolute top-[25%] right-[6%] pointer-events-none opacity-[0.09] dark:opacity-[0.04] text-denim rotate-[25deg] hidden lg:block">
        <svg width="130" height="130" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Paper airplane body */}
          <path d="M 75 25 L 25 45 L 45 52 L 52 70 Z" />
          <path d="M 75 25 L 45 52" />
          {/* Looping wind swirls */}
          <path d="M 10 95 C 20 80, 15 65, 35 60 C 50 55, 45 40, 60 35" strokeDasharray="3 3" />
          {/* Micro stars */}
          <circle cx="80" cy="55" r="1.5" fill="currentColor" />
          <circle cx="20" cy="25" r="1" fill="currentColor" />
        </svg>
        <span className="font-handwriting text-[10px] text-denim block ml-4 -mt-2 rotate-[-5deg]">high fidelity MERN...</span>
      </div>

      {/* Pencil Scratches / Desk Scribble background element */}
      <div className="absolute bottom-[10%] right-[12%] pointer-events-none opacity-[0.08] dark:opacity-[0.03] text-ink hidden lg:block">
        <svg width="180" height="110" viewBox="0 0 180 110" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          {/* Multi-layered messy pencil scribblings / scratches */}
          <path d="M 10 20 L 160 15 M 15 25 L 170 20 M 12 30 L 155 28" />
          <path d="M 25 45 C 50 35, 100 55, 145 40" strokeDasharray="2 4" />
          <path d="M 30 60 L 130 58 M 35 65 L 140 62" />
          {/* Double hand-drawn circle / coffee stain outline sketch */}
          <path d="M 140 60 A 18 18 0 1 1 139.9 60" strokeDasharray="5 2" />
          <path d="M 143 62 A 15 15 0 1 1 142.9 62" strokeWidth="1" />
          {/* Fun little sketchy smiley face or doodles in bottom right */}
          <path d="M 50 85 Q 60 95 70 85" strokeWidth="1.2" />
          <circle cx="53" cy="80" r="1" fill="currentColor" />
          <circle cx="67" cy="80" r="1" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-6xl w-full">
        <div className="flex flex-col lg:flex-row gap-16 sm:gap-20 lg:gap-16 items-center justify-center">
          
          {/* Taped Title-Card Column */}
          <div className="flex-[1.3] lg:flex-[1.3] w-full flex items-center justify-center lg:justify-end lg:pr-6">
            <div className="relative w-full max-w-[560px]">
              {/* Hand-drawn double-circle highlight doodle around the title card */}
              <div className="absolute -inset-6 pointer-events-none opacity-[0.08] dark:opacity-[0.03] text-clay -z-10 select-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M 5 50 Q 15 5, 50 5 T 95 50 Q 85 95, 50 95 T 5 50 Z" strokeDasharray="150 5 120 4" />
                  <path d="M 8 48 Q 20 8, 48 8 T 92 48 Q 80 92, 48 92 T 8 48 Z" strokeWidth="0.8" strokeDasharray="180 8 100 10" />
                </svg>
              </div>

              {/* Massive Washi Tape Strip at the top center of the card */}
              <div className={`tape ${theme === 'dark' ? 'tape-dark' : ''} top-[-20px] left-1/2 -translate-x-1/2`}></div>
              
              <PhysicalCard 
                className="p-5 sm:p-8 relative bg-card flex flex-col"
                style={{ rotate: '-2.5deg' }}
                tiltRange={0}
              >
                <div>
                  {/* Rotating Role Ticker Subtitle on top */}
                  <div className="h-6 flex items-center overflow-hidden mb-2 select-none">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentRoleIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-clay font-sans"
                      >
                        {roles[currentRoleIndex] || roles[0]}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  {/* Display Heading - Sora 800 Weight */}
                  <h1 className="font-sans text-[clamp(1.8rem,3.6vw,2.85rem)] font-extrabold leading-[1.15] text-ink tracking-tighter mb-4">
                    {isRtl ? (
                      <>
                        مهندس برمجيات، <span className="text-clay font-black">أبني في العلن.</span>
                      </>
                    ) : language === 'de' ? (
                      <>
                        Software-Dev, <span className="text-clay font-black">baut in der Öffentlichkeit.</span>
                      </>
                    ) : (
                      <>
                        Software dev, <span className="text-clay font-black">building in public.</span>
                      </>
                    )}
                  </h1>

                  {/* Cozy desk-bio */}
                  <p className="text-ink-soft text-sm sm:text-base leading-relaxed font-light mb-5 max-w-xl">
                    {getDeskBio()}
                  </p>
                </div>

                {/* Desk Workspace Status / Pill Links */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {pills.map((pill, idx) => (
                      <div 
                        key={idx}
                        className="bg-paper-2 border border-line text-ink-soft hover:text-clay hover:border-clay hover:bg-card px-3 py-1.5 rounded-full text-xs font-semibold select-none flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-sm hover:translate-y-[-1px]"
                      >
                        <span 
                          className="w-2 h-2 rounded-full shrink-0" 
                          style={{ backgroundColor: pill.color }}
                        ></span>
                        <span>{pill.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Call to Actions & Social Connections */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-dashed border-line">
                    <button 
                      onClick={() => setIsResumeOpen(true)}
                      className="group px-5 py-2.5 bg-clay hover:bg-clay hover:brightness-110 text-white font-semibold text-xs tracking-widest uppercase rounded-sm shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer select-none"
                    >
                      <FileText size={14} />
                      <span>{t.resume}</span>
                    </button>

                    <div className="flex gap-2">
                      {socialLinks.map((social) => {
                        let hoverClasses = "hover:text-clay hover:border-clay hover:bg-paper-2";
                        if (social.name.toLowerCase() === 'github') {
                          hoverClasses = "hover:text-[#24292f] hover:border-[#24292f]/40 hover:bg-[#24292f]/5 dark:hover:text-white dark:hover:border-white/40 dark:hover:bg-white/5";
                        } else if (social.name.toLowerCase() === 'linkedin') {
                          hoverClasses = "hover:text-[#0077b5] hover:border-[#0077b5]/40 hover:bg-[#0077b5]/5 dark:hover:text-[#3babeb] dark:hover:border-[#3babeb]/40 dark:hover:bg-[#3babeb]/5";
                        } else if (social.name.toLowerCase() === 'whatsapp') {
                          hoverClasses = "hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/5 dark:hover:text-[#25D366] dark:hover:border-[#25D366]/40 dark:hover:bg-[#25D366]/5";
                        }
                        return (
                          <a 
                            key={social.name} 
                            href={social.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`flex items-center justify-center w-10 h-10 bg-card border border-line rounded-sm text-ink-soft transition-all shadow-sm ${hoverClasses}`}
                            title={social.name}
                          >
                            <social.icon size={16} />
                          </a>
                        );
                      })}
                      <a 
                        href="mailto:mafrooktkc@gmail.com"
                        className="flex items-center justify-center w-10 h-10 bg-card border border-line rounded-sm text-ink-soft hover:text-[#EA4335] hover:border-[#EA4335]/40 hover:bg-[#EA4335]/5 dark:hover:text-[#ff6b5a] dark:hover:border-[#ff6b5a]/40 dark:hover:bg-[#ff6b5a]/5 transition-all shadow-sm"
                        title="Email mafrooktkc@gmail.com"
                      >
                        <Mail size={16} />
                      </a>
                    </div>
                  </div>
                </div>

              </PhysicalCard>
            </div>
          </div>

          {/* Polaroid Photo Frame Column */}
          <div className="flex-1 w-full flex items-center justify-center lg:justify-start lg:pl-8">
            <div className="relative w-full max-w-[330px]">
              {/* Hand-drawn circle highlighting the polaroid */}
              <div className="absolute -inset-6 pointer-events-none opacity-[0.09] dark:opacity-[0.03] text-olive -z-10 select-none rotate-[4deg]">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M 50 5 C 75 5, 95 25, 95 50 C 95 75, 75 95, 50 95 C 25 95, 5 75, 5 50 C 5 25, 25 5, 50 5 Z" strokeDasharray="190 6" />
                  <path d="M 48 2 C 78 2, 98 22, 98 48 C 98 78, 78 98, 48 98 C 18 98, 2 78, 2 48 C 2 22, 18 2, 48 2 Z" strokeWidth="0.8" opacity="0.6" strokeDasharray="140 10" />
                </svg>
              </div>

              {/* Handwritten annotation next to Polaroid */}
              <div className="absolute -top-12 -right-1 sm:-right-8 sm:-top-10 rotate-[6deg] z-10 max-w-[150px] sm:max-w-[180px] pointer-events-none select-none">
                <p className={`font-handwriting text-clay text-base sm:text-xl leading-none ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {language === 'de' 
                    ? "immer am lernen — schreibe es auf!" 
                    : language === 'ar'
                    ? "أتعلم باستمرار — وأسجل رحلتي!"
                    : "still figuring it out — writing it down anyway"
                  }
                </p>
              </div>

              {/* Washi Tape Strip on Polaroid */}
              <div className={`tape tape-sm ${theme === 'dark' ? 'tape-dark' : ''} top-[-14px] left-1/2 -translate-x-1/2 z-20`}></div>

              {/* Polaroid Frame */}
              <div className="polaroid relative">

                <div className="w-full aspect-square bg-[#eceae1] dark:bg-[#2b2823] rounded-sm overflow-hidden mb-4 border border-line relative group">
                  <img 
                    src="/1774159206336.jpg" 
                    alt="Mafrook Kuthpudeen" 
                    className="w-full h-full object-cover hover:scale-105 transition-all duration-500 ease-out"
                  />
                </div>
                <div className="polaroid-caption text-center">
                  {isRtl ? 'إنه أنا - مفروك' : "it's me - mafrook"}
                </div>

                {/* Secondary tiny taped card overlay badge - 'Now in India' */}
                <div className="absolute -bottom-3 -left-2 z-20">
                  <div className="bg-card border border-line rounded-sm p-1.5 px-2.5 shadow-md flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-ink rotate-[-8deg] select-none">
                    <MapPin size={10} className="text-clay animate-bounce" />
                    <span>INDIA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Realistic Desk Search Bar Mockup */}
        <Reveal className="mt-16 flex justify-center w-full" delay={0.2}>
          <div className="relative w-full max-w-xl group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-ink-soft group-focus-within:text-clay transition-colors">
              <Search size={16} />
            </div>
            <input 
              type="text"
              placeholder={isRtl ? "ابحث في المستودع، المشاريع والمهارات..." : "Search the vault, projects & skills..."}
              className="w-full pl-11 pr-24 py-3.5 bg-card border border-line rounded-full shadow-inner text-xs sm:text-sm text-ink placeholder:text-ink-soft/40 focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay transition-all font-sans cursor-pointer"
              onClick={() => setSearchOpen(true)}
              readOnly
            />
            <div className="absolute inset-y-1.5 right-2 flex items-center">
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-extrabold uppercase bg-paper-2 border border-line text-ink-soft rounded-full shadow-sm font-sans select-none">
                {isRtl ? 'استكشف' : 'Explore'}
              </kbd>
            </div>
          </div>
        </Reveal>

      </div>
    </header>
  );
};

export default HeroSection;
