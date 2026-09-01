import React from 'react';
import { Link } from 'react-router-dom';
import { socialLinks } from '../../lib/data';
import { useLanguage, Language } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, isRtl, language, setLanguage } = useLanguage();

  const pageLinks = [
    { label: t.about, to: '/' },
    { label: t.prompts, to: '/prompts' },
    { label: t.blog, to: '/blog' },
  ];

  return (
    <footer className="bg-paper text-ink-soft py-14 border-t border-line transition-all">
      <div className="container mx-auto px-6 max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start">
        {/* Handwritten personal caption */}
        <p className="marker text-lg sm:text-xl text-clay tracking-wide">
          {isRtl
            ? 'شكراً لزيارتك مكتبي الرقمي! أتمنى لك يوماً سعيداً.'
            : "Thanks for dropping by! Put things back when you're done."}
        </p>

        {/* Site + social links */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-widest text-ink-soft">
          {pageLinks.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-clay transition-colors duration-200">
              {link.label}
            </Link>
          ))}
          <span className="hidden sm:block h-3 w-px bg-line"></span>
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-clay transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* Language selection lives here now (moved out of the navbar) */}
      <div className="mt-10 flex flex-col items-center gap-2">
        <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-ink-soft/50">
          {t.language}
        </span>
        <div className="flex items-center bg-paper-2 p-0.5 rounded-full border border-line">
          {(['en', 'de', 'ar'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3.5 py-1 rounded-full text-[10px] font-extrabold transition-all cursor-pointer ${
                language === lang ? 'bg-clay text-white shadow-sm' : 'text-ink-soft hover:text-ink hover:bg-card'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Small copyright micro-label at bottom */}
      <div className="mt-8 text-center border-t border-dashed border-line pt-6 max-w-4xl mx-auto px-6">
        <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-ink-soft/60">
          {isRtl
            ? `© ٢٠٢٦ مفروق كوتوبودين. جميع الحقوق محفوظة.`
            : `© 2026 MAFROOK KUTHPUDEEN. ${t.rightsReserved.toUpperCase()}`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
