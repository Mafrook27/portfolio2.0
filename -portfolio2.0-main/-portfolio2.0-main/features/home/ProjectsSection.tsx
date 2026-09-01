import React, { useRef, useState } from 'react';
import { ArrowUpRight, Code2, ShieldCheck, MessageSquare, GraduationCap } from 'lucide-react';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

interface ProjectsSectionProps {
  hideNavbar?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ hideNavbar }) => {
  const { language, t, isRtl } = useLanguage();
  const { theme } = useTheme();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getLocalizedProjects = () => {
    if (language === 'de') {
      return [
        {
          title: "html-formeditor [opensrc]",
          desc: "Ein benutzerdefinierter, visueller Editor im Canvas-Stil, der von Grund auf neu entwickelt wurde, um offizielle Unternehmensdokumente und E-Mail-Vorlagen zu erstellen und zu verwalten. Bietet eine intuitive Drag-and-Drop-Schnittstelle unter Verwendung von shadcn/ui und Tailwind CSS, ohne Abhängigkeiten von Drittanbieter-Buildern, und gewährleistet strikte Typsicherheit durch TypeScript.",
          github: "https://github.com/Mafrook27",
          technologies: ["React.js", "shadcn", "tailwind", "typescript"],
          icon: Code2
        },
        {
          title: "AccessVault",
          desc: "Eine sichere Anwendung zur Verwaltung von Anmeldedaten mit rollenbasiertem Zugriff (RBAC) für Admin-, Manager- und Viewer-Benutzer. Implementierung von JWT-Authentifizierung, bcrypt-Passwort-Hashing, MongoDB-Schemata mit Validierungsregeln und REST-APIs mit Audit-Protokollierungsfunktionen.",
          github: "https://github.com/Mafrook27",
          technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "bcrypt"],
          icon: ShieldCheck
        },
        {
          title: "StatChat - Multi-Tenant Chat-Engine",
          desc: "Entwurf und Entwicklung eines mandantenfähigen Chat-Systems für Unternehmen mit sicherer Sitzungsverwaltung, dynamischem Raum-Routing und Offline-Nachrichtencaching. Integrierte flüssige React-Frontend-Workflows mit Echtzeit-Feedback-Schleifen.",
          github: "https://github.com/Mafrook27",
          technologies: ["React.js", "TypeScript", "Node.js", "Express.js", "Tailwind CSS"],
          icon: MessageSquare
        },
        {
          title: "LMS Flow - Bildungs-Dashboard",
          desc: "Entwicklung eines interaktiven Dashboards für ein Bildungsportal zur Verfolgung komplexer Lernpfade, dynamischer Bewertungsformulare und Leistungsstatistiken der Schüler. Optimiert mit React Query.",
          github: "https://github.com/Mafrook27",
          technologies: ["React.js", "TypeScript", "React Query", "Recharts", "Tailwind CSS"],
          icon: GraduationCap
        }
      ];
    }
    if (language === 'ar') {
      return [
        {
          title: "html-formeditor [opensrc]",
          desc: "محرر مرئي مخصص بأسلوب الكانفاس تم بناؤه من الصفر لإنشاء وإدارة مستندات الشركة الرسمية وقوالب البريد الإلكتروني. يتميز بواجهة سحب وإفلات بديهية تعتمد على shadcn/ui و Tailwind CSS، مما يلغي الاعتماد على حزم البناء الخارجية، مع ضمان أمان كامل للأنواع باستخدام TypeScript.",
          github: "https://github.com/Mafrook27",
          technologies: ["React.js", "shadcn", "tailwind", "typescript"],
          icon: Code2
        },
        {
          title: "AccessVault",
          desc: "تطبيق آمن لإدارة بيانات الاعتماد مع وصول قائم على الأدوار للمستخدمين من فئات المسؤول والمدير والمشاهد. تم تنفيذ مصادقة JWT وتشفير كلمات المرور عبر bcrypt، وتصميم مخططات MongoDB مع قواعد التحقق، وإنشاء واجهات برمجة تطبيقات REST مع ميزات تسجيل تدقيق الحسابات.",
          github: "https://github.com/Mafrook27",
          technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "bcrypt"],
          icon: ShieldCheck
        },
        {
          title: "StatChat - محرك المحادثة متعدد المستأجرين",
          desc: "تصميم وتطوير نظام محادثة متعدد المستأجرين مخصص للمؤسسات يدعم إدارة الجلسات الآمنة، وتوجيه الغرف الديناميكي، والتخزين المؤقت للرسائل في وضع عدم الاتصال بالإنترنت مع واجهات مستخدم سلسة.",
          github: "https://github.com/Mafrook27",
          technologies: ["React.js", "TypeScript", "Node.js", "Express.js", "Tailwind CSS"],
          icon: MessageSquare
        },
        {
          title: "LMS Flow - لوحة تحكم لإدارة التعلم",
          desc: "تطوير لوحة تحكم تفاعلية لبوابة تعليمية تتعامل مع تتبع مسارات التعلم المعقدة، ونماذج التقييم الديناميكية، وإحصاءات أداء الطلاب مع مزامنة سلسة للبيانات باستخدام React Query.",
          github: "https://github.com/Mafrook27",
          technologies: ["React.js", "TypeScript", "React Query", "Recharts", "Tailwind CSS"],
          icon: GraduationCap
        }
      ];
    }
    return [
      {
        title: "html-formeditor [opensrc]",
        desc: "Built a custom, canvas-style visual editor from scratch to create and manage official company documents and email templates. Designed an intuitive drag-and-drop canvas interface leveraging shadcn/ui and Tailwind CSS, eliminating third-party builder packages, and ensuring strict type-safety via TypeScript.",
        github: "https://github.com/Mafrook27",
        technologies: ["React.js", "shadcn", "tailwind", "typescript"],
        icon: Code2
      },
      {
        title: "AccessVault",
        desc: "A secure credential management application with role-based access for Admin, Manager, and Viewer users. Implemented JWT authentication and bcrypt password hashing, designed MongoDB schemas with validation rules, and built REST APIs with audit logging capabilities.",
        github: "https://github.com/Mafrook27",
        technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "bcrypt"],
        icon: ShieldCheck
      },
      {
        title: "StatChat - Multi-Tenant Chat Engine",
        desc: "Designed and engineered an enterprise-grade multi-tenant chat system supporting secure session handling, dynamic room routing, and offline message caching. Integrated fluid React frontend workflows with real-time feedback loops.",
        github: "https://github.com/Mafrook27",
        technologies: ["React.js", "TypeScript", "Node.js", "Express.js", "Tailwind CSS"],
        icon: MessageSquare
      },
      {
        title: "LMS Flow - Learning Management Client",
        desc: "Developed an interactive education portal dashboard handling complex learning path tracking, dynamic assessment forms, and student performance statistics. Crafted responsive charts and detailed course modules using React Query.",
        github: "https://github.com/Mafrook27",
        technologies: ["React.js", "TypeScript", "React Query", "Recharts", "Tailwind CSS"],
        icon: GraduationCap
      }
    ];
  };

  const localizedList = getLocalizedProjects();

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

  return (
    <section id="projects" className="py-24 sm:py-32 bg-paper relative overflow-hidden border-b border-line">
      {/* Decorative background light */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-paper-2 rounded-full blur-[120px] pointer-events-none opacity-40"></div>
      
      {/* Hand-drawn double circle highlight in background of projects */}
      <div className="absolute bottom-[20%] right-[3%] pointer-events-none opacity-[0.06] dark:opacity-[0.02] text-denim rotate-[-22deg] hidden lg:block select-none">
        <svg width="240" height="240" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M 100 20 A 80 80 0 1 1 99.9 20 C 102 30, 95 60, 110 80 C 120 100, 140 90, 150 120" strokeDasharray="160 8 40 12" />
          <path d="M 100 12 A 88 88 0 1 1 99.8 12" strokeWidth="1" opacity="0.5" strokeDasharray="180 15" />
        </svg>
      </div>

      {/* Hand-drawn Paper Rocket / Paper Airplane Launch sketch */}
      <div className="absolute top-[8%] right-[5%] pointer-events-none opacity-[0.08] dark:opacity-[0.03] text-clay rotate-[15deg] hidden md:block">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Body of paper rocket / plane */}
          <path d="M 80 20 L 20 50 L 45 55 L 50 80 L 80 20 Z" />
          <path d="M 80 20 L 45 55" />
          {/* Launch trails / wind scratches */}
          <path d="M 15 75 Q 30 70 40 62" strokeDasharray="4 4" />
          <path d="M 22 85 Q 32 75 38 72" strokeDasharray="3 3" />
          <path d="M 10 65 Q 20 62 30 58" />
        </svg>
        <span className="font-handwriting text-xs text-clay block text-center rotate-[-10deg] mt-1">code engine active</span>
      </div>

      {/* Pencil Scratches / Hand Scribbled underline accent */}
      <div className="absolute bottom-[4%] left-[6%] pointer-events-none opacity-[0.06] dark:opacity-[0.02] text-ink hidden lg:block">
        <svg width="180" height="70" viewBox="0 0 180 70" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M 10 20 L 150 16" />
          <path d="M 15 28 L 160 24" opacity="0.6" />
          <path d="M 50 45 L 120 42" strokeDasharray="4 4" />
          {/* Star doodles */}
          <path d="M 140 38 L 146 44 M 146 38 L 140 44" strokeWidth="1" />
          <path d="M 30 40 L 36 46 M 36 40 L 30 46" strokeWidth="1" />
        </svg>
      </div>

      {/* Hand-drawn doodle arrow pointing to the cards */}
      <div className="absolute bottom-4 right-[8%] pointer-events-none opacity-[0.08] dark:opacity-[0.03] text-clay rotate-[5deg] hidden md:block">
        <svg width="100" height="50" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M 15 15 C 35 35, 65 35, 80 20" />
          <path d="M 70 20 L 82 18 L 78 30" />
        </svg>
        <span className="font-handwriting text-[10px] text-clay block -mt-1 ml-6">swipe / scroll cards!</span>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-5xl">
        <SectionHeading pretitle={t.projectsPretitle} title={t.projectsTitle} />
        
        {/* Large Tray Container (the "Projects Tray") */}
        <div className="relative bg-paper-2 border border-line rounded-[10px] p-6 sm:p-10 md:p-12 mt-16 shadow-[inset_0_2px_8px_rgba(0,0,0,0.03)]">
          
          {/* Floating script-label notched in top border */}
          <div className="absolute -top-4 left-6 sm:left-10 bg-paper px-3 py-1 border border-line rounded-sm shadow-sm rotate-[-1deg] z-10">
            <span className="marker text-sm sm:text-base text-clay font-bold tracking-wide">
              {isRtl ? 'مستودع الكود / المشاريع' : 'visual workbench / logs'}
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
            {localizedList.map((project, idx) => (
              <div 
                key={idx} 
                className="w-full sm:w-[calc(50%-12px)] flex-shrink-0 snap-start h-full"
              >
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col p-6 sm:p-8 rounded-[4px] bg-card border border-line shadow-sm hover:shadow-md transition-all duration-300 h-full relative overflow-hidden cursor-pointer"
                  style={{
                    transform: `rotate(${idx % 2 === 0 ? -0.5 : 0.5}deg)`
                  }}
                  whileHover={{
                    rotate: 0,
                    y: -6,
                    borderColor: 'var(--clay)',
                    boxShadow: '0 18px 36px -12px var(--shadow)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Subtle top indicator bar */}
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-denim opacity-40 group-hover:bg-clay group-hover:opacity-100 transition-colors"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header line */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-10 h-10 shrink-0 bg-paper-2 border border-line rounded flex items-center justify-center text-clay transition-all group-hover:scale-105">
                        <project.icon size={16} />
                      </div>
                      <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink-soft group-hover:bg-clay group-hover:border-clay group-hover:text-white transition-all duration-300 -rotate-45 group-hover:rotate-0">
                        <ArrowUpRight size={14} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-sans text-base sm:text-lg font-extrabold text-ink group-hover:text-clay transition-colors duration-200 leading-snug mb-2">
                      {project.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-ink-soft text-xs sm:text-sm font-light leading-relaxed mb-6 flex-grow">
                      {project.desc}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-line">
                      {project.technologies.map(tech => (
                        <span 
                          key={tech} 
                          className="px-2 py-0.5 bg-paper-2 border border-line text-ink-soft text-[9px] font-bold uppercase tracking-wider rounded-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.a>
              </div>
            ))}
          </div>

          {/* Pagination dots wrapper */}
          <div className={`flex items-center justify-between gap-4 mt-8 pt-4 border-t border-line/30 transition-all duration-300 ${
            hideNavbar ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            {/* Left/Start: Interactive pagination dots */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2" role="tablist" aria-label="Project slide navigation">
                {localizedList.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToCard(idx)}
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
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
