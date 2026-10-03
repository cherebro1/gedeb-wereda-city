import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Mountain, ArrowRight, Compass, CloudSun } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { PageTab } from './Navbar';
import { useMunicipalData } from '../context/MunicipalDataContext';

interface HeroSectionProps {
  onNavigate: (tab: PageTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { data } = useMunicipalData();
  const { heroHeadline, heroSubtext } = data.cityOverview;
  return (
    <section className="relative overflow-hidden bg-stone-900 text-white">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.cityHero}
          alt="Authentic aerial photo of Gedeb city center, paved avenues, red-tiled roofs, and surrounding green Gedeo highlands"
          className="w-full h-full object-cover object-center filter brightness-90 transform scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Measured contrast scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-stone-950/40" />
        <div className="absolute inset-0 bg-emerald-950/20 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {/* Quiet Metadata Kicker - Zero-Pill Discipline */}
          <div className="flex items-center gap-2 text-xs md:text-sm tracking-wider uppercase text-emerald-300 font-medium mb-4">
            <span className="font-amharic text-base tracking-normal text-amber-300 font-bold">ገደብ</span>
            <span aria-hidden="true">·</span>
            <span>Gedeo Zone, Southern Ethiopia</span>
            <span aria-hidden="true">·</span>
            <span>{data.cityOverview.elevation || 'Elevation 2,200m'}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-serif-display leading-[1.1] mb-6 text-balance">
            {heroHeadline || 'The Highland Sanctuary of Specialty Coffee'}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-stone-200/90 leading-relaxed font-light mb-8 max-w-2xl">
            {heroSubtext ||
              'Where misty clouds kiss volcanic soil, and ancient Gedeo agroforestry nurtures world-class Arabica coffee alongside drought-resilient Enset (False Banana), Teff grains, and highland livestock.'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-14">
            <button
              onClick={() => onNavigate('ceremony')}
              className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg shadow-amber-900/20 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-stone-900" />
              <span>Experience Buna Ceremony</span>
              <ArrowRight className="w-4 h-4 text-stone-900" />
            </button>

            <a
              href="#gedeb-agriculture"
              className="flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-emerald-200 bg-emerald-950/60 hover:bg-emerald-900/80 backdrop-blur-md border border-emerald-500/40 rounded-xl transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Compass className="w-4 h-4 text-emerald-300" />
              <span>Enset & Crops</span>
            </a>

            <button
              onClick={() => onNavigate('coffee')}
              className="flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>Coffee Kebeles</span>
            </button>
          </div>
        </motion.div>

        {/* Quantified Adjacency Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-white/15 backdrop-blur-xs"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-300 font-serif-display tabular-nums">
              2,200m+
            </div>
            <div className="text-xs text-stone-300 mt-1 uppercase tracking-wider font-medium">
              Highland Elevation
            </div>
            <p className="text-[11px] text-stone-400 mt-0.5">Cold nights slow cherry ripening</p>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-300 font-serif-display tabular-nums">
              89 - 93+
            </div>
            <div className="text-xs text-stone-300 mt-1 uppercase tracking-wider font-medium">
              SCA Cup Score
            </div>
            <p className="text-[11px] text-stone-400 mt-0.5">Record-setting competition lots</p>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-300 font-serif-display tabular-nums">
              100%
            </div>
            <div className="text-xs text-stone-300 mt-1 uppercase tracking-wider font-medium">
              Shade-Grown
            </div>
            <p className="text-[11px] text-stone-400 mt-0.5">Enset & indigenous canopy</p>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-300 font-serif-display tabular-nums">
              12,000+
            </div>
            <div className="text-xs text-stone-300 mt-1 uppercase tracking-wider font-medium">
              Smallholder Farmers
            </div>
            <p className="text-[11px] text-stone-400 mt-0.5">Ancestral heirloom stewardship</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
