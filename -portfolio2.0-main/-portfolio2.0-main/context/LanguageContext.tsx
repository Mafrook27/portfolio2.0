import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'de' | 'ar';

export interface TranslationDictionary {
  // Navigation
  about: string;
  skills: string;
  experience: string;
  projects: string;
  milestones: string;
  getInTouch: string;
  resume: string;
  prompts: string;
  blog: string;
  search: string;
  menu: string;
  language: string;
  
  // Hero
  greeting: string;
  availableForWork: string;
  heroSub: string;
  viewProjects: string;
  downloadCV: string;
  roles: string[];

  // About
  aboutPretitle: string;
  aboutTitle: string;
  aboutBio: string;
  locationLabel: string;
  locationValue: string;
  educationLabel: string;
  educationValue: string;
  emailCopied: string;
  copyEmail: string;
  expYears: string;
  expLabel: string;

  // About Cards
  card1Title: string;
  card1Desc: string;
  card2Title: string;
  card2Desc: string;
  card3Title: string;
  card3Desc: string;

  // Skills
  skillsPretitle: string;
  skillsTitle: string;
  skillsDescLanguages: string;
  skillsDescFrameworks: string;
  skillsDescTools: string;
  skillsDescAI: string;

  // Experience
  expPretitle: string;
  expTitle: string;
  expPresent: string;

  // Projects
  projectsPretitle: string;
  projectsTitle: string;
  viewCode: string;

  // Milestones
  milestonesPretitle: string;
  milestonesTitle: string;
  verifyLabel: string;

  // Footer
  footerHeading: string;
  footerSub: string;
  rightsReserved: string;
  backToTop: string;
}

const translations: Record<Language, TranslationDictionary> = {
  en: {
    about: "About",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    milestones: "Milestones",
    getInTouch: "Get in Touch",
    resume: "Resume",
    prompts: "Prompts",
    blog: "Blog",
    search: "Search",
    menu: "Menu",
    language: "Language",

    greeting: "Hi, I am",
    availableForWork: "Available for fullstack opportunities",
    heroSub: "Crafting highly-polished fullstack web apps, balancing backend performance with pixel-perfect responsive frontends.",
    viewProjects: "View Projects",
    downloadCV: "Download CV",
    roles: ["UI Engineer", "Fullstack Engineer", "Backend Developer", "Frontend Developer"],

    aboutPretitle: "Introduction",
    aboutTitle: "About Me",
    aboutBio: "Hey! I'm Mafrook, a full-stack developer who loves turning ideas into clean, highly-polished web apps. With a year of experience, I spend my days writing React, building speedy Node backend services, and organizing code like a neat physical desk. Let's build some cool internet stuff together!",
    locationLabel: "Location",
    locationValue: "Mayiladuthurai, Tamilnadu, India",
    educationLabel: "Education",
    educationValue: "B.E. - Computer Science & Engineering (GPA: 8.0/10)",
    emailCopied: "Email Copied!",
    copyEmail: "Copy Contact Email",
    expYears: "Years",
    expLabel: "Practical Industry Experience",

    card1Title: "Fullstack Architectures",
    card1Desc: "Constructing reusable frontend workflows with React, integrated with secure token-authorizing Express API endpoints.",
    card2Title: "Safe Data Pipelines",
    card2Desc: "Utilizing React Query for lag-free data sync, paired with robust JWT role-based access schemes and Mongoose validation rules.",
    card3Title: "AI-Powered Velocity",
    card3Desc: "Leveraging prompt engineering and precise spec blueprints to accelerate development cycles and optimize solution architectures.",

    skillsPretitle: "Expertise",
    skillsTitle: "Skills",
    skillsDescLanguages: "Core programming languages for building secure, performant applications.",
    skillsDescFrameworks: "Modern libraries and systems for interactive interfaces and backend logic.",
    skillsDescTools: "Essential development environments, version control, and cloud hosting.",
    skillsDescAI: "Leveraging advanced LLMs and precision prompting to accelerate software development.",

    expPretitle: "History",
    expTitle: "Experience",
    expPresent: "Present",

    projectsPretitle: "Portfolio",
    projectsTitle: "Projects",
    viewCode: "View Code",

    milestonesPretitle: "Verifications",
    milestonesTitle: "Certifications",
    verifyLabel: "Verify Certificate",

    footerHeading: "Let's construct something outstanding.",
    footerSub: "Open for innovative fullstack roles and advanced React or Node systems architecture.",
    rightsReserved: "All rights reserved.",
    backToTop: "Back to top",
  },
  de: {
    about: "Über mich",
    skills: "Fähigkeiten",
    experience: "Erfahrung",
    projects: "Projekte",
    milestones: "Zertifikate",
    getInTouch: "Kontaktieren",
    resume: "Lebenslauf",
    prompts: "Prompts",
    blog: "Blog",
    search: "Suche",
    menu: "Menü",
    language: "Sprache",

    greeting: "Hallo, ich bin",
    availableForWork: "Verfügbar für Fullstack-Positionen",
    heroSub: "Entwicklung hochgradig optimierter Fullstack-Webanwendungen, die Backend-Performance mit pixelgenauen, responsiven Frontends verbinden.",
    viewProjects: "Projekte ansehen",
    downloadCV: "Lebenslauf laden",
    roles: ["UI-Ingenieur", "Fullstack-Ingenieur", "Backend-Entwickler", "Frontend-Entwickler"],

    aboutPretitle: "Einführung",
    aboutTitle: "Über mich",
    aboutBio: "Hi! Ich bin Mafrook, ein Full-Stack-Entwickler, der es liebt, Ideen in sauber gestaltete, hochgradig polierte Web-Apps zu verwandeln. Mit einem Jahr Erfahrung code ich mit React, baue schnelle Node-Backends und organisiere Code so ordentlich wie einen echten Schreibtisch. Lass uns zusammen cooles Zeug entwickeln!",
    locationLabel: "Standort",
    locationValue: "Mayiladuthurai, Tamilnadu, Indien",
    educationLabel: "Ausbildung",
    educationValue: "B.E. - Informatik & Softwaretechnik (GPA: 8.0/10)",
    emailCopied: "E-Mail kopiert!",
    copyEmail: "E-Mail kopieren",
    expYears: "Jahre",
    expLabel: "Praktische Industrieerfahrung",

    card1Title: "Fullstack-Architekturen",
    card1Desc: "Erstellung wiederverwendbarer Frontend-Workflows mit React, integriert in sichere Express-API-Endpunkte mit Token-Autorisierung.",
    card2Title: "Sichere Daten-Pipelines",
    card2Desc: "Nutzung von React Query für verzögerungsfreie Datensynchronisierung, gepaart mit robusten JWT-Rollenberechtigungen und Mongoose-Validierungsregeln.",
    card3Title: "KI-gestützte Effizienz",
    card3Desc: "Nutzung von Prompt-Engineering und präzisen Spezifikationen zur Beschleunigung von Entwicklungszyklen und Optimierung von Lösungsarchitekturen.",

    skillsPretitle: "Expertise",
    skillsTitle: "Fähigkeiten",
    skillsDescLanguages: "Kernsprachen für die Entwicklung sicherer und performanter Anwendungen.",
    skillsDescFrameworks: "Moderne Bibliotheken und Systeme für interaktive Frontends und Backends.",
    skillsDescTools: "Entwicklungswerkzeuge, Versionskontrolle und Cloud-Hosting.",
    skillsDescAI: "Nutzung von LLMs und präzisem Prompt-Engineering zur Entwicklungsbeschleunigung.",

    expPretitle: "Verlauf",
    expTitle: "Erfahrung",
    expPresent: "Heute",

    projectsPretitle: "Portfolio",
    projectsTitle: "Projekte",
    viewCode: "Code anzeigen",

    milestonesPretitle: "Nachweise",
    milestonesTitle: "Zertifizierungen",
    verifyLabel: "Zertifikat prüfen",

    footerHeading: "Lassen Sie uns etwas Herausragendes bauen.",
    footerSub: "Offen für innovative Fullstack-Rollen und fortschrittliche React- oder Node-Systemarchitektur.",
    rightsReserved: "Alle Rechte vorbehalten.",
    backToTop: "Nach oben",
  },
  ar: {
    about: "حول",
    skills: "المهارات",
    experience: "الخبرة",
    projects: "المشاريع",
    milestones: "الشهادات",
    getInTouch: "تواصل معي",
    resume: "السيرة الذاتية",
    prompts: "الأوامر",
    blog: "المدونة",
    search: "بحث",
    menu: "القائمة",
    language: "اللغة",

    greeting: "مرحباً، أنا",
    availableForWork: "متاح لفرص تطوير فول ستاك",
    heroSub: "أقوم ببناء تطبيقات ويب متكاملة (Fullstack) مصقولة للغاية، مع الموازنة بين أداء الواجهة الخلفية وجمال الواجهة الأمامية المتجاوبة.",
    viewProjects: "عرض المشاريع",
    downloadCV: "تحميل السيرة الذاتية",
    roles: ["مهندس واجهات", "مهندس فول ستاك", "مطور باك إند", "مطور فرونت إند"],

    aboutPretitle: "مقدمة",
    aboutTitle: "من أنا",
    aboutBio: "أهلاً! أنا مفروق، مطور ويب متكامل (Fullstack) أعشق تحويل الأفكار إلى تطبيقات ويب مصقولة وسريعة. مع عام من الخبرة العملية، أقضي يومي في كتابة أكواد React، وبناء واجهات Express، وتنظيم مشاريعي بدقة كالمكتب المرتب تماماً. دعنا نبني أشياء مذهلة معاً!",
    locationLabel: "الموقع",
    locationValue: "ماييلادوثوراي، تاميل نادو، الهند",
    educationLabel: "التعليم",
    educationValue: "بكالوريوس - هندسة علوم الحاسب (معدل: 8.0/10)",
    emailCopied: "تم نسخ البريد الإلكتروني!",
    copyEmail: "نسخ البريد الإلكتروني",
    expYears: "سنوات",
    expLabel: "الخبرة العملية في الصناعة",

    card1Title: "بنيات ويب متكاملة",
    card1Desc: "بناء تدفقات عمل واجهة أمامية قابلة لإعادة الاستخدام باستخدام React مدمجة مع واجهات Express البرمجية المؤمنة.",
    card2Title: "تدفقات بيانات آمنة",
    card2Desc: "استخدام React Query لمزامنة البيانات بدون تأخير، مقترنة بنظام صلاحيات JWT قوي وقواعد التحقق من Mongoose.",
    card3Title: "كفاءة مدعومة بالذكاء الاصطناعي",
    card3Desc: "تسخير هندسة الأوامر والمواصفات الدقيقة لتسريع دورات التطوير وتحسين بنيات الحلول البرمجية.",

    skillsPretitle: "الخبرة الكلية",
    skillsTitle: "المهارات المهنية",
    skillsDescLanguages: "لغات البرمجة الأساسية لبناء تطبيقات ويب آمنة وعالية الأداء.",
    skillsDescFrameworks: "أطر عمل وأنظمة حديثة لتطوير واجهات تفاعلية ومنطق برمجية متقدم.",
    skillsDescTools: "أدوات التطوير الأساسية، أنظمة التحكم في النسخ، والاستضافة السحابية.",
    skillsDescAI: "تسخير النماذج اللغوية الكبيرة وهندسة الأوامر لتسريع وتيرة التطوير.",

    expPretitle: "السيرة المهنية",
    expTitle: "الخبرة العملية",
    expPresent: "حتى الآن",

    projectsPretitle: "معرض الأعمال",
    projectsTitle: "المشاريع",
    viewCode: "عرض الكود",

    milestonesPretitle: "الإنجازات",
    milestonesTitle: "الشهادات المعتمدة",
    verifyLabel: "التحقق من الشهادة",

    footerHeading: "دعنا نصنع شيئاً استثنائياً معاً.",
    footerSub: "متاح للعمل في أدوار فول ستاك مبتكرة وبناء بنية أنظمة React أو Node متقدمة.",
    rightsReserved: "جميع الحقوق محفوظة.",
    backToTop: "الرجوع للأعلى",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio-lang');
    return (saved === 'en' || saved === 'de' || saved === 'ar') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio-lang', lang);
  };

  useEffect(() => {
    // Dynamically update page dir and lang attributes for optimal SEO and RTL rendering
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = translations[language];
  const isRtl = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
