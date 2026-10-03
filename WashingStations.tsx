import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mountain, MapPin, Award, Droplets, Sun, Sparkles, Filter, Send, ChevronRight } from 'lucide-react';
import { WashingStation } from '../data/gedebData';
import { useMunicipalData } from '../context/MunicipalDataContext';
import { GedebTerroirMap } from './GedebTerroirMap';
import { useLanguage } from '../context/LanguageContext';

interface WashingStationsProps {
  onOpenInquiry?: (stationName: string) => void;
}

export const WashingStations: React.FC<WashingStationsProps> = ({ onOpenInquiry }) => {
  const { data } = useMunicipalData();
  const { lang, t } = useLanguage();
  const stationsList = data.washingStations;
  const [filterType, setFilterType] = useState<'all' | 'washed' | 'natural' | 'ultra-high'>('all');
  const [selectedStation, setSelectedStation] = useState<WashingStation | null>(stationsList[0] || null);

  const filteredStations = stationsList.filter((station) => {
    if (filterType === 'washed') return station.processingTypes.includes('Washed');
    if (filterType === 'natural') return station.processingTypes.includes('Natural');
    if (filterType === 'ultra-high') return station.altitudeMeters >= 2150;
    return true;
  });

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* 1. Interactive Topographic Terroir & Kebele Map */}
      <section>
        <GedebTerroirMap onOpenInquiry={onOpenInquiry} />
      </section>

      {/* 2. Washing Stations Directory Section */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-800 uppercase mb-2">
              <Mountain className="w-3.5 h-3.5" />
              <span>Micro-Origins & Highland Kebeles • ጌዴኦ ዞን</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-serif-display">
              {lang === 'am' ? 'የገደብ ቡና አጣቢ ጣቢያዎች ማውጫ' : 'World-Renowned Washing Stations of Gedeb'}
            </h2>
            <p className="mt-2 text-stone-600 leading-relaxed text-xs sm:text-sm">
              Every kebele in Gedeb possesses an individual microclimate. Explore the legendary names found on specialty coffee bags in Tokyo, Melbourne, London, and New York.
            </p>
          </div>

          {/* Filter Controls & Direct Trade CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {onOpenInquiry && (
              <button
                onClick={() => onOpenInquiry(selectedStation ? selectedStation.name : 'Gedeb Specialty Coffee')}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-stone-950" />
                <span>{t('btn.inquire_samples')}</span>
              </button>
            )}

            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl self-start sm:self-auto shrink-0 border border-stone-200">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  filterType === 'all'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All ({stationsList.length})
              </button>
              <button
                onClick={() => setFilterType('washed')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  filterType === 'washed'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Washed
              </button>
              <button
                onClick={() => setFilterType('natural')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  filterType === 'natural'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Natural
              </button>
              <button
                onClick={() => setFilterType('ultra-high')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  filterType === 'ultra-high'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                &ge; 2,150m
              </button>
            </div>
          </div>
        </div>

        {/* Grid of Washing Stations with Colorful Cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredStations.map((station, idx) => {
              const isSelected = selectedStation?.id === station.id;

              // Color tint variation for cards
              const cardTints = [
                'hover:border-emerald-500 hover:bg-emerald-50/20',
                'hover:border-amber-500 hover:bg-amber-50/20',
                'hover:border-sky-500 hover:bg-sky-50/20',
              ];
              const tint = cardTints[idx % cardTints.length];

              return (
                <motion.div
                  layout
                  key={station.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedStation(station)}
                  className={`rounded-2xl p-6 transition-all border cursor-pointer flex flex-col justify-between ${tint} ${
                    isSelected
                      ? 'bg-gradient-to-br from-emerald-50/80 via-white to-stone-50 border-emerald-700 shadow-md ring-2 ring-emerald-700/20'
                      : 'bg-white border-stone-200/90 shadow-xs'
                  }`}
                >
                  <div>
                    {/* Top line metadata with vibrant color badges */}
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-amharic text-base font-bold text-emerald-950">
                        {station.amharicName}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full font-bold text-amber-900 bg-amber-100 border border-amber-300 tabular-nums text-xs">
                        SCA {station.scaScoreRange}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-stone-900 font-serif-display mb-1">
                      {station.name}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-stone-600 mb-4 font-medium">
                      <span className="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <Mountain className="w-3 h-3" />
                        {station.elevation}
                      </span>
                      <span>•</span>
                      <span>{station.harvestWindow}</span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {station.description}
                    </p>

                    {/* Flavor Notes with colorful pill tags */}
                    <div className="pt-3 border-t border-stone-100 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                        Hallmark Cup Notes:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {station.flavorNotes.map((note, nIdx) => (
                          <span
                            key={nIdx}
                            className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 text-[11px] font-medium border border-stone-200"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-medium truncate max-w-[150px]">{station.primaryVarieties.join(', ')}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      {station.processingTypes.map((p) => {
                        const isWashed = p.toLowerCase().includes('washed');
                        const isNatural = p.toLowerCase().includes('natural');
                        return (
                          <span
                            key={p}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                              isWashed
                                ? 'bg-sky-50 text-sky-800 border-sky-300'
                                : isNatural
                                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                                  : 'bg-purple-50 text-purple-900 border-purple-300'
                            }`}
                          >
                            {p}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Selected Micro-Station Detailed Spotter with Direct Sample Action */}
        {selectedStation && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-800/80"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-300 font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Micro-Lot Spotlight</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-amharic">{selectedStation.amharicName}</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold font-serif-display text-white">
                  {selectedStation.name} Cupper&apos;s Review
                </h4>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-left sm:text-right">
                  <span className="text-[11px] text-stone-300 uppercase tracking-wider block">SCA Cupping Tier</span>
                  <span className="text-2xl sm:text-3xl font-black text-amber-300 font-serif-display tabular-nums">
                    {selectedStation.scaScoreRange}
                  </span>
                </div>
                {onOpenInquiry && (
                  <button
                    onClick={() => onOpenInquiry(selectedStation.name)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Inquire for Lot</span>
                  </button>
                )}
              </div>
            </div>

            <p className="text-base sm:text-lg italic font-serif-display text-amber-100/95 mb-6 max-w-4xl">
              &ldquo;{selectedStation.tastingQuote}&rdquo;
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-stone-400 block mb-0.5">Location Kebele:</span>
                <span className="font-bold text-white text-sm">{selectedStation.kebelle}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-stone-400 block mb-0.5">Elevation:</span>
                <span className="font-bold text-amber-300 text-sm font-mono">{selectedStation.elevation}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-stone-400 block mb-0.5">Heirloom Varieties:</span>
                <span className="font-bold text-white text-sm">{selectedStation.primaryVarieties.join(', ')}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-stone-400 block mb-0.5">Primary Processing:</span>
                <span className="font-bold text-emerald-300 text-sm">{selectedStation.processingTypes.join(', ')}</span>
              </div>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
};
