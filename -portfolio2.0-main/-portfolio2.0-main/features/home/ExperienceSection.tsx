import React, { useState } from 'react';
import { Briefcase, Calendar, ChevronDown, MapPin } from 'lucide-react';
import { experience } from '../../lib/data';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { PhysicalCard } from '../../components/ui/PhysicalCard';

interface ExperienceSectionProps {
  totalExp: {
    label: string;
    shortLabel: string;
    years: number;
    months: number;
  };
}

// High-Fidelity 3D Metallic Brass Paperclip Component
const PaperClip: React.FC<{ className?: string; isDark: boolean }> = ({ className = '', isDark }) => {
  const metalColor = isDark ? '#a89463' : '#8c7647';
  const highlightColor = isDark ? '#dfc691' : '#ebd99e';
  const shadowColor = isDark ? 'rgba(0, 0, 0, 0.45)' : 'rgba(46, 42, 36, 0.18)';

  return (
    <div 
      className={`absolute pointer-events-none z-30 select-none ${className}`}
      style={{ filter: `drop-shadow(2px 3px 4px ${shadowColor})` }}
    >
      <svg
        width="26"
        height="56"
        viewBox="0 0 26 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Paperclip path modeled accurately on physics of bent wire */}
        <path
          d="M13 48
             C 7 48, 3 43, 3 36
             L 3 14
             C 3 7, 7.5 3, 13 3
             C 18.5 3, 23 7, 23 14
             L 23 39
             C 23 44, 19.5 47, 15.5 47
             C 11.5 47, 8.5 44, 8.5 39
             L 8.5 18
             C 8.5 15, 10.5 13, 13 13
             C 15.5 13, 17.5 15, 17.5 18
             L 17.5 37"
          stroke={`url(#metallicClipGrad-${isDark ? 'dark' : 'light'})`}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <defs>
          <linearGradient id={`metallicClipGrad-${isDark ? 'dark' : 'light'}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={highlightColor} />
            <stop offset="25%" stopColor={metalColor} />
            <stop offset="50%" stopColor={highlightColor} />
            <stop offset="75%" stopColor={metalColor} />
            <stop offset="100%" stopColor={highlightColor} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ totalExp }) => {
  const { language, t, isRtl } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const getDurationString = (idx: number) => {
    const baseExp = experience[idx];
    if (!baseExp || !baseExp.startDate) return '';
    const start = new Date(baseExp.startDate);
    const end = baseExp.endDate ? new Date(baseExp.endDate) : new Date();
    
    const startYear = start.getFullYear();
    const startMonth = start.getMonth();
    const endYear = end.getFullYear();
    const endMonth = end.getMonth();
    
    const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    if (language === 'de') {
      const parts = [];
      if (years > 0) parts.push(`${years} ${years === 1 ? 'Jahr' : 'Jahre'}`);
      if (months > 0) parts.push(`${months} ${months === 1 ? 'Monat' : 'Monate'}`);
      return parts.join(' & ') || '0 Monate';
    } else if (language === 'ar') {
      const parts = [];
      if (years > 0) {
        if (years === 1) parts.push('سنة');
        else if (years === 2) parts.push('سنتين');
        else if (years >= 3 && years <= 10) parts.push(`${years} سنوات`);
        else parts.push(`${years} سنة`);
      }
      if (months > 0) {
        if (months === 1) parts.push('شهر');
        else if (months === 2) parts.push('شهرين');
        else if (months >= 3 && months <= 10) parts.push(`${months} أشهر`);
        else parts.push(`${months} شهر`);
      }
      return parts.join(' و ') || '0 شهر';
    } else {
      const parts = [];
      if (years > 0) parts.push(`${years} ${years === 1 ? 'Yr' : 'Yrs'}`);
      if (months > 0) parts.push(`${months} Mon`);
      return parts.join(' & ') || '0 Mon';
    }
  };

  const getLocalizedExperience = () => {
    if (language === 'de') {
      return [
        {
          role: "Junior-Softwareentwickler",
          company: "Statlight Software Solutions",
          location: "Bengaluru, Indien | Hybrid",
          period: "Juli 2025 - Heute",
          points: [
            "Entwicklung dynamischer React-Module für eine kommerzielle Kreditverwaltungs- und Onboarding-Plattform.",
            "Refactoring von Legacy-UI-Komponenten von Angular in skalierbare, hochperformante React-Layouts.",
            "Erstellung sicherer REST-APIs mit Node/Express, geschützt durch JWT-Rollenvalidierung und optimierte Mongoose-Schemata.",
            "Synchronisierung von Server-Zuständen über die Browser-Ebene mit React Query zur Vermeidung redundanter Datenzyklen."
          ],
          tags: ["MERN Stack", "React Query", "REST APIs"]
        },
        {
          role: "Technischer Trainer & Freiberuflicher Entwickler",
          company: "a1ideaz",
          location: "Mayiladuthurai, Indien",
          period: "Okt. 2024 - Feb. 2025",
          points: [
            "Ausbildung von Nachwuchsingenieuren in grundlegenden Full-Stack-Konzepten für JavaScript, Python und CRUD-APIs.",
            "Mentoring von Studenten beim Aufbau von datenbankintegrierten Web-Prototypen und beim Debuggen von Netzwerkschichten."
          ],
          tags: ["JS & Python", "Mentoring"]
        }
      ];
    }
    if (language === 'ar') {
      return [
        {
          role: "مهندس برمجيات جونيور",
          company: "Statlight Software Solutions",
          location: "بنغالور، الهند | عمل هجين",
          period: "يوليو ٢٠٢٥ - حتى الآن",
          points: [
            "بناء وحدات React تفاعلية لمنصة تجارية لإدارة القروض والتهيئة.",
            "إعادة هيكلة مكونات واجهة المستخدم القديمة من Angular إلى تخطيطات React عالية الأداء وقابلة للتطوير.",
            "بناء واجهات برمجية REST آمنة بـ Node/Express مدعومة بالتحقق من صلاحية JWT ونماذج Mongoose المحسنة.",
            "مزامنة حالات السيرفر مع المتصفح باستخدام React Query لإلغاء دورات البيانات الزائدة والطلب غير الضروري."
          ],
          tags: ["MERN Stack", "React Query", "REST APIs"]
        },
        {
          role: "مدرب تقني ومطور مستقل",
          company: "a1ideaz",
          location: "مايلادوثوراي، الهند",
          period: "أكتوبر ٢٠٢٤ - فبراير ٢٠٢٥",
          points: [
            "تدريب المهندسين المبتدئين على مفاهيم الـ Full-Stack الأساسية عبر JavaScript و Python و CRUD APIs.",
            "توجيه ومساعدة الطلاب في بناء نماذج ويب متكاملة مع قواعد البيانات وتصحيح أخطاء شبكة الاتصال."
          ],
          tags: ["JS & Python", "Mentoring"]
        }
      ];
    }
    return [
      {
        ...experience[0],
        tags: ["MERN Stack", "React Query", "REST APIs"]
      },
      {
        ...experience[1],
        tags: ["JS & Python", "Mentoring"]
      }
    ];
  };

  const localizedList = getLocalizedExperience();

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="py-24 sm:py-32 bg-paper relative overflow-hidden border-b border-line">
      {/* Background radial soft light */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-paper-2 rounded-full blur-[100px] pointer-events-none opacity-40"></div>
      
      {/* Flying Paper Rocket in Experience Section */}
      <div className="absolute top-[12%] right-[8%] pointer-events-none opacity-[0.08] dark:opacity-[0.03] text-clay rotate-[12deg] hidden md:block">
        <svg width="130" height="130" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 80 20 L 20 45 L 47 52 L 53 72 Z" />
          <path d="M 80 20 L 47 52" />
          {/* Dashed spiral trajectory trail */}
          <path d="M 15 95 C 25 80, 45 80, 50 65 C 55 50, 70 50, 75 35" strokeDasharray="3 3" />
          {/* Small hand-drawn sparkle stars */}
          <path d="M 85 45 L 91 51 M 91 45 L 85 51" strokeWidth="1" />
          <circle cx="25" cy="30" r="1.5" fill="currentColor" />
        </svg>
        <span className="font-handwriting text-[10px] text-clay block -mt-2 ml-4">engineering career...</span>
      </div>

      {/* Hand-drawn pencil sketch highlight circle around the experience timeline header */}
      <div className="absolute top-[8%] left-[2%] pointer-events-none opacity-[0.06] dark:opacity-[0.02] text-olive-deep -z-10 select-none rotate-[-15deg]">
        <svg width="220" height="220" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M 100 20 A 80 80 0 1 1 99.9 20 C 102 30, 95 60, 110 80 C 120 100, 140 90, 150 120" strokeDasharray="160 8 40 12" />
          <path d="M 100 12 A 88 88 0 1 1 99.8 12" strokeWidth="1" opacity="0.5" strokeDasharray="180 15" />
        </svg>
      </div>

      {/* Pencil Scratches & Doodles background element */}
      <div className="absolute bottom-[10%] right-[4%] pointer-events-none opacity-[0.06] dark:opacity-[0.02] text-ink hidden lg:block select-none">
        <svg width="180" height="150" viewBox="0 0 180 150" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          {/* Notebook margin lines */}
          <path d="M 30 10 L 30 140 M 35 10 L 35 140" stroke="var(--clay)" opacity="0.3" strokeWidth="1" />
          {/* Swirls and notes */}
          <path d="M 60 40 C 90 20, 120 50, 150 30" strokeDasharray="3 3" />
          <path d="M 140 25 L 152 32 L 138 38" />
          {/* Handdrawn stars */}
          <path d="M 100 80 L 106 86 M 106 80 L 100 86" strokeWidth="1" />
          <path d="M 120 110 L 128 118 M 128 110 L 120 118" strokeWidth="1" />
        </svg>
        <span className="font-handwriting text-[10px] text-ink-soft block text-right pr-6 mt-1 rotate-[5deg]">milestones & growth</span>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-4xl">
        
        {/* Experience section top bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-6 mb-16">
          <div className="text-left">
            <span className="text-[10px] font-bold tracking-[0.2em] text-olive-deep uppercase font-sans">{t.expPretitle}</span>
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-ink mt-1">{t.expTitle}</h2>
          </div>
        </div>
        
        {/* Timeline Stepper Container */}
        <div className="relative pl-10 sm:pl-20 space-y-12 py-4">
          
          {/* Vertical Stepper Rod (Metallic Wire) */}
          <div className="absolute left-[20px] sm:left-[40px] top-0 bottom-0 w-[3px] -translate-x-1/2 bg-gradient-to-b from-line via-[#dec795] dark:via-[#594d33] to-line opacity-70 rounded-full" />
          
          {/* Detailed Stitching Thread Overlay */}
          <div className="absolute left-[20px] sm:left-[40px] top-0 bottom-0 w-[3px] -translate-x-1/2 border-l-2 border-dashed border-[#8c7647]/25 dark:border-[#dec795]/15 pointer-events-none" />

          {localizedList.map((exp, idx) => {
            const isOpen = expandedIndex === idx;
            
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.12, ease: "easeOut" }}
                className="relative w-full group"
              >
                {/* 3D Stepper Node: Brass Hollow Grommet */}
                <div className="absolute left-[-20px] sm:left-[-40px] top-[26px] z-20 flex items-center justify-center -translate-x-1/2">
                  <div className="w-5 h-5 rounded-full bg-[#ebd99e] dark:bg-[#4a3f25] border-2 border-[#8c7647] dark:border-[#ebd99e]/40 shadow-[inset_0_1px_3px_rgba(0,0,0,0.35),0_2px_4px_rgba(0,0,0,0.2)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {/* Brass Inner Core */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3d331a] dark:bg-[#1a150b] shadow-inner" />
                  </div>
                  
                  {/* Subtle dynamic duration tag on the left margin */}
                  <span className="absolute right-7 font-mono font-bold text-[9px] text-ink-soft opacity-45 tracking-wider hidden sm:inline whitespace-nowrap uppercase">
                    {getDurationString(idx)}
                  </span>
                </div>

                {/* Horizontal metal pin connecting the eyelet to the card */}
                <div className="absolute left-[-20px] sm:left-[-40px] top-[35px] w-[20px] sm:w-[40px] h-[1.5px] bg-gradient-to-r from-[#8c7647]/50 to-transparent dark:from-[#dec795]/30 z-10 pointer-events-none" />

                {/* High-fidelity Paperclip visually clamping the card to the board */}
                <PaperClip 
                  isDark={isDark}
                  className={`hidden sm:block left-4 sm:left-6 -top-[18px] transition-transform duration-500 ease-out-back ${
                    isOpen 
                      ? 'rotate-[-6deg] scale-105 translate-x-1' 
                      : 'rotate-[18deg] group-hover:rotate-[24deg] group-hover:scale-102'
                  }`}
                />

                <PhysicalCard 
                  className={`overflow-hidden text-left cursor-pointer border-l-4 border-l-denim transition-all duration-300 ${
                    isOpen ? 'rotate-0 shadow-md scale-[1.015]' : 'shadow-sm hover:shadow-md'
                  }`}
                  style={{
                    rotate: !isOpen ? `${idx % 2 === 0 ? -0.4 : 0.5}deg` : '0deg'
                  }}
                  onClick={() => handleToggle(idx)}
                  tiltRange={isOpen ? 0 : 1.5}
                >
                  
                  {/* Physical Sticky Paper Index Tab for the Date */}
                  <div className="absolute right-4 sm:right-10 -top-[12px] z-20 select-none whitespace-nowrap">
                    <div className="relative bg-[#fcf8ef] dark:bg-[#2d2922] border-t-4 border-t-[#8c7647] dark:border-t-[#ebd99e] border-x border-b border-line dark:border-[#534938] px-3.5 py-1 rounded-t-[3px] rounded-b-[3px] shadow-[0_2px_6px_rgba(0,0,0,0.08)] transform rotate-[-1deg] group-hover:rotate-[0.5deg] transition-transform duration-300">
                      
                      <span className="marker text-xs sm:text-sm font-semibold tracking-wide text-[#7a622b] dark:text-[#ebd99e] block pt-0.5">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Card Row Header with rich metadata */}
                  <div className="p-5 sm:p-7 pt-8 sm:pt-9 flex flex-row items-start justify-between gap-4 select-none hover:bg-paper-2/45 transition-colors duration-200">
                    <div className="space-y-2.5 sm:pl-8 flex-1 min-w-0">
                      {/* Job Title & Company Badge */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-x-3 pr-12 sm:pr-32">
                        <h3 className="font-sans text-base sm:text-lg md:text-xl font-extrabold text-ink tracking-tight leading-snug group-hover:text-clay transition-colors duration-200 break-words">
                          {exp.role}
                        </h3>
                        <div>
                          <span className="inline-flex items-center text-[10px] sm:text-xs font-bold text-denim dark:text-[#8fb2cc] uppercase tracking-widest bg-denim/10 dark:bg-denim/25 border border-denim/20 dark:border-denim/30 px-2.5 py-0.5 rounded shadow-sm whitespace-nowrap">
                            {exp.company}
                          </span>
                        </div>
                      </div>
                      
                      {/* Sub-bar with Location */}
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-ink-soft">
                        <MapPin size={13} className="text-denim opacity-90 shrink-0" />
                        <span className="font-sans font-semibold tracking-tight">{exp.location}</span>
                      </div>
                    </div>
                    
                    {/* Clean micro-interactive expand button */}
                    <div className="flex items-center justify-end shrink-0 pt-1">
                      <motion.div 
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink-soft hover:text-ink shrink-0 shadow-sm transition-all duration-200 ${
                          isOpen ? 'bg-denim/10 border-denim/30 text-denim dark:text-[#8fb2cc]' : 'bg-paper-2/50 hover:bg-paper-2'
                        }`}
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Detailed Stepped Content Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-5 sm:px-15 pb-6 sm:pb-7 pt-3 border-t border-line bg-paper-2/15 space-y-5">
                          {/* Nested Sub-Timeline Stepper layout for Bullet Milestones */}
                          <div className="relative pl-5 sm:pl-6 border-l border-line/60 space-y-3.5 sm:space-y-4 ml-1 pt-1">
                            {exp.points.map((point, ptIdx) => (
                              <div key={ptIdx} className="relative group/point">
                                {/* Nested sub-step thread node */}
                                <div className="absolute -left-[24px] sm:-left-[28px] top-[5px] w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border border-denim/80 bg-paper group-hover/point:bg-clay group-hover/point:border-clay transition-colors duration-200 z-10 shadow-sm" />
                                
                                <p className="text-xs sm:text-sm text-ink-soft font-normal leading-relaxed group-hover/point:text-ink transition-colors duration-150">
                                  {point}
                                </p>
                              </div>
                            ))}
                          </div>
                          
                          {/* Tag Chips styling with subtle mechanical detailing */}
                          <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-line/45">
                            {exp.tags?.map((tag) => (
                              <span 
                                key={tag}
                                className="text-[9px] font-bold text-ink-soft tracking-wider uppercase bg-paper-2/90 dark:bg-[#2b271f] border border-line px-2.5 py-1 rounded-sm shadow-sm hover:border-[#dec795] dark:hover:border-[#594d33] transition-colors duration-150"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                </PhysicalCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

