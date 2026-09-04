import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, ShieldCheck, Layout, Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { PhysicalCard } from '../../components/ui/PhysicalCard';

interface CertType {
  title: string;
  description: string;
  url: string;
  icon: React.ComponentType<any>;
  date: string;
  issuer: string;
  tags: string[];
}

export const CertificationsSection: React.FC<{ onNavInteraction?: () => void }> = ({ onNavInteraction }) => {
  const { language, t, isRtl } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getLocalizedCertifications = (): CertType[] => {
    if (language === 'de') {
      return [
        {
          title: "HackerRank: JavaScript & Java Verified",
          description: "Verifizierte Gold-Abzeichen-Kompetenz, die fortgeschrittene prozedurale Logik, Typisierungssicherheit, objektorientierte Konzepte und Rechenalgorithmen demonstriert.",
          url: "https://www.hackerrank.com/profile/mafrooktkc",
          icon: BookOpen,
          date: "Juni 2024",
          issuer: "HackerRank",
          tags: ["JavaScript", "Java", "OOP", "Algorithmen"]
        },
        {
          title: "AWS Academy: Cloud Foundations",
          description: "AWS-Akkreditierung, die virtualisierte Cloud-Architekturen, verwaltete Datenbanken, Sicherheitszugriffsrollen (IAM) und hochskalierbare Hosting-Umgebungen umfasst.",
          url: "https://www.linkedin.com/in/k-mafrook/",
          icon: ShieldCheck,
          date: "März 2024",
          issuer: "AWS Academy",
          tags: ["AWS", "IAM", "VPC", "Cloud Security"]
        },
        {
          title: "freeCodeCamp: Responsive Web Design",
          description: "Umfassender Lehrplan mit detaillierten Anweisungen zu benutzerdefinierten Viewport-Medien, flüssigen Layout-Ausrichtungsalgorithmen, Flexbox-Gittern und Designstandards.",
          url: "https://www.linkedin.com/in/k-mafrook/",
          icon: Layout,
          date: "Januar 2024",
          issuer: "freeCodeCamp",
          tags: ["HTML5", "CSS3", "Flexbox", "Responsive"]
        }
      ];
    }
    if (language === 'ar') {
      return [
        {
          title: "HackerRank: JavaScript & Java Verified",
          description: "إثبات كفاءة الشارة الذهبية المعتمدة في إظهار المنطق الإجرائي المتقدم، سلامة كتابة الأكواد، مفاهيم البرمجة كائنية التوجه (OOP)، والخوارزميات الحسابية المعقدة.",
          url: "https://www.hackerrank.com/profile/mafrooktkc",
          icon: BookOpen,
          date: "يونيو 2024",
          issuer: "HackerRank",
          tags: ["JavaScript", "Java", "OOP", "الخوارزميات"]
        },
        {
          title: "AWS Academy: Cloud Foundations",
          description: "اعتماد من أكاديمية AWS يغطي بنيات السحابة الافتراضية، وقواعد البيانات المدارة، وأدوار الوصول الأمني (IAM)، وبيئات الاستضافة عالية التدرج والقابلية للتوسع.",
          url: "https://www.linkedin.com/in/k-mafrook/",
          icon: ShieldCheck,
          date: "مارس 2024",
          issuer: "AWS Academy",
          tags: ["AWS", "IAM", "VPC", "أمن السحابة"]
        },
        {
          title: "freeCodeCamp: Responsive Web Design",
          description: "منهج هندسي شامل يشرح بالتفصيل توجيهات وسائط العرض المخصصة (Media Queries)، وخوارزميات محاذاة التخطيط المرن (Flexbox)، وشبكات التصميم المتجاوبة.",
          url: "https://www.linkedin.com/in/k-mafrook/",
          icon: Layout,
          date: "يناير 2024",
          issuer: "freeCodeCamp",
          tags: ["HTML5", "CSS3", "Flexbox", "تجاوب المواقع"]
        }
      ];
    }
    return [
      {
        title: "HackerRank: JavaScript & Java Verified",
        description: "Verified gold-badge proficiency demonstrating advanced procedural logic, typing safety, object-oriented concepts, and computational algorithms.",
        url: "https://www.hackerrank.com/profile/mafrooktkc",
        icon: BookOpen,
        date: "Jun 2024",
        issuer: "HackerRank",
        tags: ["JavaScript", "Java", "OOP", "Algorithms"]
      },
      {
        title: "AWS Academy: Cloud Foundations",
        description: "AWS accreditation covering virtualized cloud architectures, managed databases, security access roles (IAM), and highly-scalable hosting environments.",
        url: "https://www.linkedin.com/in/k-mafrook/",
        icon: ShieldCheck,
        date: "Mar 2024",
        issuer: "AWS Academy",
        tags: ["AWS", "IAM", "VPC", "Cloud Security"]
      },
      {
        title: "freeCodeCamp: Responsive Web Design",
        description: "Comprehensive engineering curriculum detailing custom viewport media directives, fluid layout alignment algorithms, flexbox grids, and design standards.",
        url: "https://www.linkedin.com/in/k-mafrook/",
        icon: Layout,
        date: "Jan 2024",
        issuer: "freeCodeCamp",
        tags: ["HTML5", "CSS3", "Flexbox", "Responsive"]
      }
    ];
  };

  const localizedCerts = getLocalizedCertifications();

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft } = scrollContainerRef.current;
    
    const cards = scrollContainerRef.current.children;
    let closestIndex = 0;
    let minDistance = Infinity;
    
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      if (!card) continue;
      const distance = Math.abs(card.offsetLeft - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    
    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
      if (onNavInteraction) onNavInteraction();
    }
  };

  const scrollToCard = (index: number) => {
    if (!scrollContainerRef.current) return;
    const cards = scrollContainerRef.current.children;
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      scrollContainerRef.current.scrollTo({
        left: card.offsetLeft,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  const scrollPrev = () => {
    const nextIndex = Math.max(0, activeIndex - 1);
    scrollToCard(nextIndex);
    if (onNavInteraction) onNavInteraction();
  };

  const scrollNext = () => {
    const nextIndex = Math.min(localizedCerts.length - 1, activeIndex + 1);
    scrollToCard(nextIndex);
    if (onNavInteraction) onNavInteraction();
  };

  return (
    <section id="certifications" className="py-24 sm:py-32 bg-paper relative overflow-hidden border-b border-line">
      {/* Desk Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(46,42,36,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(46,42,36,0.05)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-40"></div>
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-paper-2 rounded-full blur-[100px] pointer-events-none opacity-50"></div>

      {/* Flying Paper Rocket in Certifications Section */}
      <div className="absolute top-[12%] right-[10%] pointer-events-none opacity-[0.08] dark:opacity-[0.03] text-clay rotate-[-15deg] hidden md:block">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 80 20 L 20 45 L 47 52 L 53 72 Z" />
          <path d="M 80 20 L 47 52" />
          {/* Dashed trail */}
          <path d="M 10 90 Q 30 70 25 50 T 60 30" strokeDasharray="3 3" />
        </svg>
        <span className="font-handwriting text-[10px] text-clay block -mt-1 ml-4 rotate-[10deg]">verifying credentials...</span>
      </div>

      {/* Hand-drawn double circle highlight in background of certifications */}
      <div className="absolute top-[8%] left-[2%] pointer-events-none opacity-[0.06] dark:opacity-[0.02] text-clay rotate-[12deg] select-none">
        <svg width="220" height="220" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M 100 20 A 80 80 0 1 1 99.9 20 C 102 30, 95 60, 110 80 C 120 100, 140 90, 150 120" strokeDasharray="160 8 40 12" />
          <path d="M 100 12 A 88 88 0 1 1 99.8 12" strokeWidth="1" opacity="0.5" strokeDasharray="180 15" />
        </svg>
      </div>

      {/* Hand-drawn pencil scratches scribble */}
      <div className="absolute bottom-[4%] left-[4%] pointer-events-none opacity-[0.06] dark:opacity-[0.02] text-ink hidden md:block">
        <svg width="140" height="80" viewBox="0 0 140 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          {/* Rapid back and forth pencil scratches */}
          <path d="M 10 15 L 120 12 M 20 25 L 130 20 M 15 35 L 115 32 M 30 45 L 125 42 M 10 55 L 100 50 M 25 65 L 110 60" opacity="0.6" />
          {/* A couple of hand-drawn stars / asterisks */}
          <path d="M 115 50 L 125 60 M 125 50 L 115 60 M 120 48 L 120 62" strokeWidth="1" />
          <path d="M 45 10 L 51 16 M 51 10 L 45 16 M 48 8 L 48 18" strokeWidth="1" />
        </svg>
      </div>

      {/* Hand-drawn doodle arrow pointing to controls */}
      <div className="absolute bottom-[10%] right-[15%] pointer-events-none opacity-[0.08] dark:opacity-[0.03] text-clay rotate-[-10deg] hidden lg:block">
        <svg width="80" height="50" viewBox="0 0 80 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M 10 30 C 30 10, 50 15, 65 25" />
          <path d="M 55 25 L 67 27 L 62 15" />
        </svg>
        <span className="font-handwriting text-[9px] text-clay font-bold block ml-2">try clicking!</span>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        <SectionHeading pretitle={t.milestonesPretitle} title={t.milestonesTitle} />

        <div className="relative bg-paper-2 border border-line rounded-[10px] p-6 sm:p-10 md:p-12 mt-16 shadow-[inset_0_2px_8px_rgba(0,0,0,0.03)]">
          
          {/* Decorative script-label notched in top border */}
          <div className="absolute -top-4 left-6 sm:left-10 bg-paper px-3 py-1 border border-line rounded-sm shadow-sm rotate-[0.5deg] z-10">
            <span className="marker text-sm sm:text-base text-clay font-bold tracking-wide">
              {isRtl ? 'المؤهلات المعتمدة / الإنجازات' : 'accredited credentials / records'}
            </span>
          </div>

          {/* Swipeable Carousel Scroll Track */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 pt-4 pb-4 px-0.5 cursor-grab active:cursor-grabbing select-none"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {localizedCerts.map((cert, idx) => (
              <div
                key={cert.title}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 snap-start h-full"
              >
                <PhysicalCard 
                  href={cert.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex flex-col p-6 sm:p-8 rounded-[4px] bg-card border border-line h-full relative cursor-pointer select-none transition-all duration-300 hover:border-clay/50"
                  style={{
                    transform: `rotate(${idx % 2 === 0 ? -0.4 : 0.4}deg)`
                  }}
                  whileHover={{
                    rotate: 0,
                    y: -6,
                    borderColor: 'var(--clay)',
                    boxShadow: '0 18px 36px -12px var(--shadow)'
                  }}
                  tiltRange={4}
                >
                  <div className="relative z-10 flex flex-col h-full">
                    
                    {/* Header Details with stamp */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 shrink-0 bg-paper-2 border border-line rounded flex items-center justify-center text-clay transition-all group-hover:scale-105">
                        <cert.icon size={16} />
                      </div>
                      
                      {/* Document stamp issue date */}
                      <div className="flex flex-col items-end">
                        <span className="text-[9px] font-mono font-bold tracking-wider text-ink-soft uppercase opacity-45 flex items-center gap-1">
                          <Calendar size={10} />
                          {cert.date}
                        </span>
                        <span className="text-[10px] font-sans font-extrabold text-clay mt-0.5 tracking-wider uppercase">
                          {cert.issuer}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="font-sans text-base font-extrabold text-ink mb-2 group-hover:text-clay transition-colors duration-200 leading-snug">
                        {cert.title}
                      </h3>
                      
                      <p className="text-ink-soft text-xs leading-relaxed font-light mb-6">
                        {cert.description}
                      </p>
                    </div>

                    {/* Skill Tags & External Indicator */}
                    <div className="mt-auto pt-4 border-t border-dashed border-line/40 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {cert.tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-paper-2 border border-line/50 text-ink-soft text-[9px] font-mono font-medium rounded-sm uppercase tracking-wide"
                          >
                            <Tag size={8} className="opacity-55" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="w-7 h-7 rounded-full border border-line/70 flex items-center justify-center text-ink-soft group-hover:bg-clay group-hover:border-clay group-hover:text-white transition-all duration-300">
                        <ArrowUpRight size={12} />
                      </div>
                    </div>

                  </div>
                </PhysicalCard>
              </div>
            ))}
          </div>

          {/* Pagination dots & navigation controls wrapper */}
          <div className="flex items-center justify-between gap-4 mt-8 pt-4 border-t border-line/30">
            {/* Left/Start: Interactive pagination dots */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2" role="tablist" aria-label="Credentials slide navigation">
                {localizedCerts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      scrollToCard(idx);
                      if (onNavInteraction) onNavInteraction();
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-clay ${
                      activeIndex === idx 
                        ? 'w-6 bg-clay' 
                        : 'w-2.5 bg-line hover:bg-ink-soft/45'
                    }`}
                    role="tab"
                    aria-selected={activeIndex === idx}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
              <span className="marker text-xs text-ink-soft opacity-65 hidden sm:inline">
                {language === 'de'
                  ? "* Ziehen für mehr"
                  : language === 'ar'
                  ? "* اسحب للمزيد"
                  : "* Swipe to explore"}
              </span>
            </div>

            {/* Right/End: Combined Tactile Navigation Controls */}
            <div className="flex items-center gap-1 bg-paper p-1 border border-line rounded-full shadow-sm">
              <button 
                onClick={isRtl ? scrollNext : scrollPrev}
                disabled={isRtl ? activeIndex === localizedCerts.length - 1 : activeIndex === 0}
                className="p-1.5 rounded-full text-ink-soft hover:text-clay hover:bg-paper-2 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-clay"
                aria-label="Previous credential"
              >
                <ChevronLeft size={15} className={isRtl ? 'rotate-180' : ''} />
              </button>
              <div className="h-4 w-px bg-line" />
              <button 
                onClick={isRtl ? scrollPrev : scrollNext}
                disabled={isRtl ? activeIndex === 0 : activeIndex === localizedCerts.length - 1}
                className="p-1.5 rounded-full text-ink-soft hover:text-clay hover:bg-paper-2 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-clay"
                aria-label="Next credential"
              >
                <ChevronRight size={15} className={isRtl ? 'rotate-180' : ''} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;

