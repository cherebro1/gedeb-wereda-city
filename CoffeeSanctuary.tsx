import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Droplets, Sun, Wind, CheckCircle2, ChevronRight, Award, Send, Package } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { FLAVOR_CATEGORIES } from '../data/gedebData';
import { useMunicipalData } from '../context/MunicipalDataContext';

interface CoffeeSanctuaryProps {
  onOpenInquiry?: (stationName: string) => void;
}

export const CoffeeSanctuary: React.FC<CoffeeSanctuaryProps> = ({ onOpenInquiry }) => {
  const { data } = useMunicipalData();
  const [selectedProcess, setSelectedProcess] = useState<'washed' | 'natural' | 'anaerobic'>('washed');
  const [selectedFlavorIdx, setSelectedFlavorIdx] = useState<number>(0);

  const processingDetails = {
    washed: {
      title: 'Washed Processing (የታጠበ)',
      tagline: 'Crystalline clarity, sparkling bergamot, and delicate jasmine perfume',
      duration: '36 – 48 Hours Fermentation · 12 – 15 Days Drying',
      profile:
        data.coffeeData?.washedProfile ||
        'Silky, luminous, and elegant. Mountain spring water removes cherry pulp before beans are soaked and dried on raised beds.',
      cupHighlights: ['Jasmine flower aroma', 'Sparkling bergamot & lime acidity', 'Clean Earl Grey tea finish', 'Delicate honey mouthfeel'],
      dryingMethod: 'Thinly spread on raised bamboo mesh beds under breathable shade netting during midday heat.',
    },
    natural: {
      title: 'Natural Sun-Dried (የፀሐይ ቡና)',
      tagline: 'Deep wild blueberry, ripe apricot nectar, and heavy winey sweetness',
      duration: '18 – 24 Days Slow Sun-Drying on Raised Beds',
      profile:
        data.coffeeData?.naturalProfile ||
        'Whole ripe cherries dry intact under the high-altitude sun, allowing fruit sugars to permeate deep into the bean seed.',
      cupHighlights: ['Wild blueberry jam', 'Lavender floral notes', 'Syrupy peach nectar', 'Rich milk chocolate body'],
      dryingMethod: 'Turned by hand every 40 minutes across 150+ raised African drying tables to ensure uniform sweetness.',
    },
    anaerobic: {
      title: 'Anaerobic / Slow Honey Fermentation',
      tagline: 'Exotic tropical fruits, papaya, passionfruit, and candied floral spice',
      duration: '72 – 96 Hours Sealed Fermentation · 20 Days Drying',
      profile:
        data.coffeeData?.anaerobicProfile ||
        'Ripe cherries ferment in oxygen-deprived barrels before slow bed drying, creating rare competition-level complexity.',
      cupHighlights: ['Tropical papaya & mango', 'Candied citrus blossom', 'Champagne-like effervescence', 'Prolonged sweet finish'],
      dryingMethod: 'Controlled slow temperature reduction on covered drying beds with continuous moisture measurement.',
    },
  };

  const activeProcess = processingDetails[selectedProcess];
  const activeFlavor = FLAVOR_CATEGORIES[selectedFlavorIdx];

  return (
    <section className="py-16 md:py-24 bg-[#f4f6f0] border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
            <span>Specialty Origin</span>
            <span aria-hidden="true">·</span>
            <span>Ethiopian Buna Sanctuary</span>
            <span aria-hidden="true">·</span>
            <span>{data.coffeeData?.scaScoreRange || '89.0 – 93.5+ SCA'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-serif-display text-balance">
            The Living Terroir: Why Gedeb Beans Lead the World
          </h2>
          <p className="mt-3 text-stone-700 leading-relaxed text-sm sm:text-base">
            Gedeb is home to the highest altitude specialty coffee washing stations in Ethiopia. Harvest window: <strong>{data.coffeeData?.harvestWindow || 'November – January'}</strong>. Extreme elevation, heirloom landraces, and volcanic red soil produce unmistakable cup profiles celebrated by global baristas.
          </p>
        </div>

        {/* Processing Method Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedProcess('washed')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedProcess === 'washed'
                ? 'bg-emerald-950 text-white shadow-md'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Droplets className="w-4 h-4 text-sky-400" />
            <span>Washed Process (የታጠበ)</span>
          </button>

          <button
            onClick={() => setSelectedProcess('natural')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedProcess === 'natural'
                ? 'bg-emerald-950 text-white shadow-md'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-400" />
            <span>Natural Sun-Dried (የፀሐይ ቡና)</span>
          </button>

          <button
            onClick={() => setSelectedProcess('anaerobic')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedProcess === 'anaerobic'
                ? 'bg-emerald-950 text-white shadow-md'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Wind className="w-4 h-4 text-purple-400" />
            <span>Anaerobic / Honey Fermentation</span>
          </button>
        </div>

        {/* Active Processing Details Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProcess}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div>
                <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
                  {activeProcess.duration}
                </span>
                <h3 className="text-2xl font-bold font-serif-display text-stone-900 mt-1">
                  {activeProcess.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200 mt-2">
                  {activeProcess.tagline}
                </p>
              </div>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                {activeProcess.profile}
              </p>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-stone-500 mb-3">
                  Signature Cup Attributes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeProcess.cupHighlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-center gap-2 text-xs sm:text-sm text-stone-800 bg-stone-50 p-2.5 rounded-lg border border-stone-150"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`side-${selectedProcess}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm"
            >
              <div className="aspect-[4/3] relative">
                <img
                  src={
                    selectedProcess === 'washed'
                      ? IMAGES.washingStation
                      : selectedProcess === 'natural'
                        ? IMAGES.coffeeCherries
                        : IMAGES.coffeeCherries
                  }
                  alt={`${activeProcess.title} in Gedeb`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs text-white font-medium">
                    {activeProcess.title} at high-altitude washing stations
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                    Drying Architecture
                  </div>
                  <div className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {activeProcess.dryingMethod}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
                  <span className="text-stone-500">Average Bean Moisture Target</span>
                  <span className="font-semibold text-emerald-900 tabular-nums">10.5% - 11.2%</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indigenous Landrace Varieties Section */}
        <div className="mb-16">
          <div className="max-w-2xl mb-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-800 font-semibold mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Genetic Heritage</span>
            </div>
            <h3 className="text-2xl font-bold font-serif-display text-stone-900">
              Ancient Heirloom Landraces of Gedeb
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Nurtured across generations within native forest canopies, these three varieties define Gedeb&apos;s extraordinary flavor identity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
                Landrace Variety 01
              </span>
              <h4 className="text-xl font-bold font-serif-display text-stone-900">Kurume (ቁሩሜ)</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {data.coffeeData?.kurumeDescription ||
                  'Compact trees with small, dense berries. Piercing jasmine florals, sparkling lime acidity, and delicate bergamot finish.'}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded">
                Landrace Variety 02
              </span>
              <h4 className="text-xl font-bold font-serif-display text-stone-900">Dega (ደጋ)</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {data.coffeeData?.degaDescription ||
                  'Medium-sized leaves and rounded cherries. Delivers honey sweetness, stone fruits, and balanced milk chocolate body.'}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2.5 py-1 rounded">
                Landrace Variety 03
              </span>
              <h4 className="text-xl font-bold font-serif-display text-stone-900">Wolisho (ወሊሾ)</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {data.coffeeData?.wolishoDescription ||
                  'Broad towering trees with large cherries. Imparts bold tropical fruits, juicy apricot, and syrupy texture.'}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Flavor Profile Matrix */}
        <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="max-w-2xl mb-8 relative z-10">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-300 font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sensory Cupping Matrix</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif-display text-white">
              The Gedeb Flavor Wheel
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm mt-2">
              Click through the hallmark flavor families of Gedeb coffees to discover their terroir origins.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 relative z-10">
            {FLAVOR_CATEGORIES.map((cat, idx) => {
              const isSelected = selectedFlavorIdx === idx;
              return (
                <button
                  key={cat.category}
                  onClick={() => setSelectedFlavorIdx(idx)}
                  className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-white text-stone-950 border-white shadow-md'
                      : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs font-semibold leading-tight">{cat.category}</div>
                  <div className="text-[11px] text-stone-400 mt-1">
                    {cat.representativeKebeles.join(', ')}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/15 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-300 font-medium">
                  {activeFlavor.category} Cupping Notes
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {activeFlavor.notes.map((note) => (
                    <span
                      key={note}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/15 text-stone-100"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-white/15 pt-3 sm:pt-0 sm:pl-6">
                <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                  Prominent In Kebeles
                </span>
                <span className="text-sm font-semibold text-emerald-300">
                  {activeFlavor.representativeKebeles.join(' · ')}
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-300 mt-3 pt-3 border-t border-white/10">
              {activeFlavor.flavorDescription}
            </p>
          </div>

          {/* Direct Trade Roaster Inquiry Banner */}
          {onOpenInquiry && (
            <div className="mt-8 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 rounded-2xl p-6 sm:p-8 text-stone-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-stone-900">
                  <Package className="w-4 h-4 text-emerald-950" />
                  <span>Specialty Roaster & Green Buyer Program</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold font-serif-display text-stone-950">
                  Request Fresh Crop Microlot Samples from Gedeb
                </h4>
                <p className="text-xs sm:text-sm text-stone-800 max-w-xl">
                  Connect with Gedeb cooperative washing stations for direct export samples (Grade 1 Washed, Natural, and Anaerobic).
                </p>
              </div>
              <button
                onClick={() => onOpenInquiry('Gedeb Specialty Microlots')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-950 hover:bg-stone-900 text-white font-bold text-xs shadow-lg transition-all cursor-pointer whitespace-nowrap"
              >
                <Send className="w-3.5 h-3.5 text-amber-300" />
                <span>Inquire for Samples</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
