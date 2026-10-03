/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar, PageTab } from './components/Navbar';
import type { Variants } from 'motion/react';
import { HeroSection } from './components/HeroSection';
import { CityOverview } from './components/CityOverview';
import { AgroforestryCrops } from './components/AgroforestryCrops';
import { LocalWeather } from './components/LocalWeather';
import { CoffeeSanctuary } from './components/CoffeeSanctuary';
import { BunaCeremony } from './components/BunaCeremony';
import { WashingStations } from './components/WashingStations';
import { CivicAdministration } from './components/CivicAdministration';
import { VisitorGuide } from './components/VisitorGuide';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/AdminPortal';
import { MunicipalDataProvider } from './context/MunicipalDataContext';
import { LanguageProvider } from './context/LanguageContext';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { CoffeeInquiryModal } from './components/CoffeeInquiryModal';
import { Sparkles, Building2, ArrowRight } from 'lucide-react';
import { IMAGES } from './assets/images';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('overview');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedInquiryStation, setSelectedInquiryStation] = useState<string>('');

  const handleOpenInquiry = (stationName?: string) => {
    setSelectedInquiryStation(stationName || '');
    setIsInquiryOpen(true);
  };

  // Hidden admin access listeners: #admin in URL or Ctrl+Shift+A / Alt+A
  useEffect(() => {
    const checkAdminQueryOrHash = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        setIsAdminOpen(true);
      }
    };
    checkAdminQueryOrHash();
    window.addEventListener('hashchange', checkAdminQueryOrHash);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret key combination: Ctrl+Shift+A or Alt+A
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminQueryOrHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  // Motion page transition variants
  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      y: 12,
      scale: 0.99,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.28,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -12,
      scale: 0.99,
      transition: {
        duration: 0.18,
        ease: 'easeIn',
      },
    },
  };

  const handleNavigate = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LanguageProvider>
      <MunicipalDataProvider>
        <div className="min-h-screen flex flex-col bg-[#fafaf6] text-stone-900 font-sans selection:bg-emerald-900 selection:text-white">
          {/* Thin, color-changing coffee-inspired scroll progress bar */}
          <ScrollProgressBar />

          {/* Clean Top Bar */}
          <Navbar
            activeTab={activeTab}
            onSelectTab={handleNavigate}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />

      {/* Main Content Area with Motion Transitions for Each Page */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <HeroSection onNavigate={handleNavigate} />
              <CityOverview />
              <AgroforestryCrops />
              <LocalWeather />
              {/* Teaser for Civic Leadership & Municipal Life */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                <div className="bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 shadow-xl grid grid-cols-1 md:grid-cols-12 items-center">
                  <div className="md:col-span-7 p-8 sm:p-10 text-white">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Civic Governance & Urban Infrastructure</span>
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif-display text-white">
                      Gedeb Woreda Administrator & City Mayor
                    </h3>
                    <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed">
                      Explore the leadership of Gedeb Woreda & City, Gedeb General Hospital, 4G networks (Ethio telecom & Safaricom), Tuesday & Friday market days, 5 major commercial banks, fuel stations, and multi-faith unity.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => handleNavigate('civic')}
                        className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
                      >
                        <Building2 className="w-4 h-4 text-stone-900" />
                        <span>Explore Leadership & Services</span>
                        <ArrowRight className="w-4 h-4 text-stone-900" />
                      </button>
                    </div>
                  </div>
                  <div className="md:col-span-5 h-64 md:h-full min-h-[220px] relative">
                    <img
                      src={IMAGES.cityNight}
                      alt="Gedeb city at night with illuminated modern walkways and streetlights"
                      className="w-full h-full object-cover object-center filter brightness-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-stone-900 via-transparent to-transparent" />
                    <div className="absolute bottom-3 right-3 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[11px] text-amber-200">
                      Gedeb Night Promenade
                    </div>
                  </div>
                </div>
              </div>

              {/* Teaser to dive deeper into coffee */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-950 rounded-2xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="max-w-xl">
                    <span className="text-xs uppercase font-semibold text-amber-300 tracking-wider">
                      The Ethiopian Buna Ritual
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif-display mt-1 text-white">
                      Experience the Authentic 3-Cup Buna Ceremony
                    </h3>
                    <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed">
                      Discover why every gathering in Gedeb starts with the aroma of charcoal roasting and the blessings of Abol, Tona, and Baraka.
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate('ceremony')}
                    className="flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    <Sparkles className="w-4 h-4 text-stone-900" />
                    <span>Enter Ceremony Room</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'coffee' && (
            <motion.div
              key="coffee"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <CoffeeSanctuary onOpenInquiry={handleOpenInquiry} />
            </motion.div>
          )}

          {activeTab === 'ceremony' && (
            <motion.div
              key="ceremony"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <BunaCeremony />
            </motion.div>
          )}

          {activeTab === 'stations' && (
            <motion.div
              key="stations"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <WashingStations onOpenInquiry={handleOpenInquiry} />
            </motion.div>
          )}

          {activeTab === 'civic' && (
            <motion.div
              key="civic"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <CivicAdministration onOpenAdmin={() => setIsAdminOpen(true)} />
            </motion.div>
          )}

          {activeTab === 'guide' && (
            <motion.div
              key="guide"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <VisitorGuide />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Admin Portal Dashboard */}
      {isAdminOpen && <AdminPortal onClose={handleCloseAdmin} />}

      {/* Specialty Coffee Direct Trade & Sample Inquiry Modal */}
      <CoffeeInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        defaultStation={selectedInquiryStation}
      />
    </div>
  </MunicipalDataProvider>
</LanguageProvider>
  );
}
