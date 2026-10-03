import React from 'react';
import { motion } from 'motion/react';
import { Menu, X, Coffee, Mountain, Sparkles, Building2, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type PageTab = 'overview' | 'coffee' | 'ceremony' | 'stations' | 'civic' | 'guide';

interface NavbarProps {
  activeTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenAdmin,
}) => {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [logoClicks, setLogoClicks] = React.useState(0);

  const handleBrandClick = () => {
    onSelectTab('overview');
    setMobileMenuOpen(false);
    setLogoClicks((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        if (onOpenAdmin) onOpenAdmin();
        return 0;
      }
      return next;
    });
  };

  const navItems: { id: PageTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: t('nav.overview'), icon: <Mountain className="w-3.5 h-3.5" /> },
    { id: 'coffee', label: t('nav.coffee'), icon: <Coffee className="w-3.5 h-3.5" /> },
    { id: 'ceremony', label: t('nav.ceremony'), icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'stations', label: t('nav.stations'), icon: <Mountain className="w-3.5 h-3.5" /> },
    { id: 'civic', label: t('nav.civic'), icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'guide', label: t('nav.guide'), icon: <Coffee className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fafaf6]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={handleBrandClick}
            className="flex items-center gap-2 group text-left cursor-pointer"
            title="Gedeb City & Woreda"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-900 flex items-center justify-center text-amber-200 font-serif-display font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              ገ
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-stone-900 font-serif-display group-hover:text-emerald-900 transition-colors leading-tight">
                {t('brand.title')}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-stone-600 font-medium -mt-0.5">
                {t('brand.sub')}
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative px-3 py-1.5 text-xs xl:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer rounded-lg ${
                    isActive ? 'text-emerald-950 font-semibold bg-stone-100/80' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/50'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.icon}
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute inset-x-2 -bottom-1 h-0.5 bg-emerald-800 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Medium screen navigation fallback */}
          <nav className="hidden md:flex lg:hidden items-center gap-1">
            {navItems.slice(0, 4).map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    isActive ? 'text-emerald-950 font-semibold bg-stone-100' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-Click Language Switcher (EN | አማ) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center p-0.5 bg-stone-200/80 rounded-xl text-xs font-bold border border-stone-300">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-emerald-900 text-white shadow-xs font-extrabold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="English language"
              >
                EN
              </button>
              <button
                onClick={() => setLang('am')}
                className={`px-2.5 py-1 rounded-lg font-amharic transition-all cursor-pointer ${
                  lang === 'am'
                    ? 'bg-emerald-900 text-white shadow-xs font-extrabold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="አማርኛ ቋንቋ"
              >
                አማ
              </button>
            </div>

            {/* Mobile hamburger button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-700 hover:bg-stone-100 rounded-lg cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-b border-stone-200 bg-[#fafaf6] px-4 pt-2 pb-4 space-y-1 shadow-lg"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                activeTab === item.id
                  ? 'bg-emerald-900 text-white font-medium'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
            </button>
          ))}
        </motion.div>
      )}
    </header>
  );
};
