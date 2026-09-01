import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Search, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  setIsResumeOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  hideNavbar?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  scrolled,
  menuOpen,
  setMenuOpen,
  setIsResumeOpen,
  setIsSearchOpen,
  hideNavbar,
}) => {
  const { t, isRtl } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  const navLinks = [
    { label: t.about, kind: 'hash' as const, value: '#about' },
    { label: t.prompts, kind: 'page' as const, value: '/prompts' },
    { label: t.blog, kind: 'page' as const, value: '/blog' },
  ];

  return (
    <nav
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        scrolled && !menuOpen
          ? 'top-3 px-4 sm:px-6 lg:px-8 flex justify-center'
          : 'top-0 px-0 w-full'
      } ${hideNavbar ? '-translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
    >
      <div
        className={`w-full transition-all duration-300 flex justify-between items-center ${
          scrolled && !menuOpen
            ? 'max-w-4xl bg-card border border-line shadow-md py-2 px-5 sm:px-6 rounded-full'
            : 'max-w-5xl mx-auto px-6 sm:px-8 py-3.5 lg:py-4 bg-transparent border-b border-transparent'
        }`}
      >
        {/* Name brand / logo */}
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => onHome && window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="font-sans font-black text-base sm:text-lg tracking-tight text-ink flex items-center gap-1">
            {isRtl ? 'مفروق' : 'mafrook'}
            {!isRtl && <span className="text-clay font-black">.</span>}
            <motion.span
              className="inline-block origin-[70%_70%] ml-0.5"
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
            >
              👋
            </motion.span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center gap-5 text-[13px] font-semibold text-ink-soft">
          <div className="flex items-center gap-4">
            {navLinks.map((link) =>
              link.kind === 'hash' ? (
                <a
                  key={link.value}
                  href={onHome ? link.value : `/${link.value}`}
                  className="hover:text-clay transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.value}
                  to={link.value}
                  className={`transition-colors ${pathname.startsWith(link.value) ? 'text-clay' : 'hover:text-clay'}`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>

          <span className="h-4 w-px bg-line"></span>

          <div className="flex items-center gap-2.5">
            {/* Global search trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="h-8 pl-2.5 pr-3 rounded-full bg-paper-2 border border-line text-ink-soft flex items-center gap-2 cursor-pointer shadow-sm hover:bg-card hover:text-ink transition-all group"
              aria-label={t.search}
              title={`${t.search} (Ctrl+K)`}
            >
              <Search size={12} className="text-clay" />
              <span className="text-[10px] font-bold uppercase tracking-wider hidden xl:inline">{t.search}</span>
              <kbd className="hidden xl:flex items-center text-[8px] font-mono font-bold border border-line rounded px-1 py-0.5 text-ink-soft/60 group-hover:text-ink-soft">
                ⌘K
              </kbd>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full bg-paper-2 border border-line text-ink flex items-center justify-center cursor-pointer shadow-sm hover:translate-y-[-1px] active:scale-95 transition-all select-none hover:bg-card"
              aria-label="Toggle dark mode"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={12} className="text-amber-400" /> : <Moon size={12} className="text-stone-600" />}
            </button>

            <button
              onClick={() => setIsResumeOpen(true)}
              className="bg-clay hover:brightness-110 text-white font-bold text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm hover:translate-y-[-1px] transition-all flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <FileText size={11} />
              <span>{t.resume}</span>
            </button>
          </div>
        </div>

        {/* Mobile controls — intentionally minimal: search + menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-8 h-8 rounded-full border border-line bg-card flex items-center justify-center text-ink-soft active:scale-95 hover:bg-paper-2 transition-all cursor-pointer shadow-sm"
            aria-label={t.search}
          >
            <Search size={13} className="text-clay" />
          </button>

          {/* Compact animated hamburger / close morph */}
          <button
            className="w-8 h-8 rounded-full border border-line bg-card flex flex-col items-center justify-center gap-[4px] active:scale-95 hover:bg-paper-2 transition-all cursor-pointer shadow-sm"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-[1.5px] w-3.5 rounded-full bg-ink transition-all duration-300 ${
                menuOpen ? 'translate-y-[2.75px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] w-3.5 rounded-full bg-ink transition-all duration-300 ${
                menuOpen ? '-translate-y-[2.75px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
