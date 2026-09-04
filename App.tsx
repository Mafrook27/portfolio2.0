import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Layout chrome
import { Header } from './components/layout/Header';
import { MenuPanel } from './components/layout/MenuPanel';
import { Footer } from './components/layout/Footer';
import { FlyingPaperRocket } from './components/ui/FlyingPaperRocket';
import { ResumeModal } from './features/home/ResumeModal';
import { SearchOverlay } from './features/search/SearchOverlay';

// Pages
import { HomePage } from './features/home/HomePage';

// Providers
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { PerformanceProvider } from './context/PerformanceContext';
import { UiProvider, type UiContextType } from './context/UiContext';

// Content pages are code-split so the home bundle stays light
const PromptsPage = lazy(() => import('./features/prompts/PromptsPage'));
const PromptDetailPage = lazy(() => import('./features/prompts/PromptDetailPage'));
const BlogListPage = lazy(() => import('./features/blog/BlogListPage'));
const BlogPostPage = lazy(() => import('./features/blog/BlogPostPage'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-ink-soft/60 animate-pulse">
      Loading…
    </p>
  </div>
);

const NotFoundPage = () => (
  <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
    <p className="marker text-3xl text-clay">404 — this note isn't on the desk.</p>
    <Link
      to="/"
      className="mt-6 text-xs font-bold uppercase tracking-wider text-ink-soft hover:text-clay transition-colors"
    >
      ← Back home
    </Link>
  </main>
);

// Scrolls to hash targets after route changes; plain route changes go to top.
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
};

const AppShell = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [chromeHidden, setChromeHidden] = useState(false);
  const chromeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { pathname } = useLocation();

  // Temporarily hides the navbar while interacting with in-section navs
  const pulseChromeHidden = () => {
    setChromeHidden(true);
    if (chromeTimeoutRef.current) clearTimeout(chromeTimeoutRef.current);
    chromeTimeoutRef.current = setTimeout(() => setChromeHidden(false), 2500);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (chromeTimeoutRef.current) clearTimeout(chromeTimeoutRef.current);
    };
  }, []);

  // Global Ctrl/Cmd+K search shortcut
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Close overlays when navigating
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const uiValue: UiContextType = {
    setResumeOpen,
    setSearchOpen,
    setMenuOpen,
    chromeHidden,
    pulseChromeHidden,
  };

  return (
    <UiProvider value={uiValue}>
      <div className="min-h-screen bg-paper text-ink selection:bg-clay selection:text-white transition-colors duration-300">
        <FlyingPaperRocket />

        <Header
          scrolled={scrolled}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          setIsResumeOpen={setResumeOpen}
          setIsSearchOpen={setSearchOpen}
          hideNavbar={chromeHidden}
        />

        <AnimatePresence>
          {menuOpen && <MenuPanel setMenuOpen={setMenuOpen} setIsResumeOpen={setResumeOpen} />}
        </AnimatePresence>

        <AnimatePresence>
          {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
        </AnimatePresence>

        <ScrollManager />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/prompts" element={<PromptsPage />} />
            <Route path="/prompts/:slug" element={<PromptDetailPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>

        <Footer />

        {/* Floating scroll-to-top */}
        <AnimatePresence>
          {scrolled && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-6 right-6 z-50 bg-card border border-line text-ink-soft hover:text-clay rounded-full shadow-lg p-3.5 flex items-center justify-center hover:bg-paper-2 transition-all cursor-pointer"
              aria-label="Scroll to top"
              title="Scroll to Top"
            >
              <ArrowUp size={16} />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {resumeOpen && <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />}
        </AnimatePresence>
      </div>
    </UiProvider>
  );
};

const App = () => {
  return (
    <PerformanceProvider>
      <ThemeProvider>
        <LanguageProvider>
          <BrowserRouter>
            <AppShell />
          </BrowserRouter>
        </LanguageProvider>
      </ThemeProvider>
    </PerformanceProvider>
  );
};

export default App;
