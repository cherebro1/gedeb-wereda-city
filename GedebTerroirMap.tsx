import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Mountain,
  Navigation,
  Droplets,
  Sun,
  Building2,
  HeartPulse,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Filter,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface TerroirPoint {
  id: string;
  name: string;
  amharicName: string;
  category: 'station' | 'civic' | 'landmark';
  elevation: number;
  coordinates: string;
  x: number; // percentage on map canvas
  y: number; // percentage on map canvas
  description: string;
  flavorNotes?: string[];
  processing?: string[];
  highlights: string[];
  accessRoad: string;
}

const TERROIR_POINTS: TerroirPoint[] = [
  {
    id: 'town-center',
    name: 'Gedeb Municipal Town Center',
    amharicName: 'የገደብ ከተማ ማዕከል',
    category: 'civic',
    elevation: 2200,
    coordinates: "5°55'48\"N 38°17'24\"E",
    x: 48,
    y: 46,
    description: 'The administrative, commercial, and financial heart of Gedeb Woreda. Home to the City Administration, 5 commercial banks, and Ethio Telecom / Safaricom main offices.',
    highlights: ['City Administration Building', 'Ethio Telecom & Safaricom 4G towers', 'Commercial Banking District'],
    accessRoad: 'Paved Asphalt Arterial (Dilla - Moyale Highway)',
  },
  {
    id: 'chelchele',
    name: 'Chelchele Kebele & Washing Station',
    amharicName: 'ጨልጨሌ ቀበሌ እና የቡና ጣቢያ',
    category: 'station',
    elevation: 2100,
    coordinates: "5°54'12\"N 38°16'05\"E",
    x: 32,
    y: 62,
    description: 'Renowned globally for sparkling floral washed lots. Fresh spring water from mountain streams ferments red cherries at slow cold temperatures.',
    flavorNotes: ['Jasmine Floral', 'Lemon Blossom', 'Cane Sugar', 'White Peach'],
    processing: ['Washed Grade 1', 'Natural Grade 1'],
    highlights: ['Spring-water washed processing', '500+ smallholder family gardens', 'Shaded African drying beds'],
    accessRoad: 'All-weather graded gravel road (4 km from Gedeb Town)',
  },
  {
    id: 'banko-gotiti',
    name: 'Banko Gotiti Kebele (Ultra-High Peak)',
    amharicName: 'ባንኮ ጎቲቲ ቀበሌ (ከፍተኛ ተራራ)',
    category: 'station',
    elevation: 2250,
    coordinates: "5°52'30\"N 38°19'10\"E",
    x: 74,
    y: 72,
    description: 'One of the highest coffee producing kebeles in the world. Intense ultraviolet light and cool misty nights concentrate sugars in red heirloom cherries.',
    flavorNotes: ['Ripe Peach', 'Apricot Nectar', 'Bergamot', 'Wild Honey'],
    processing: ['Anaerobic Microlot', 'Natural Sun-Dried'],
    highlights: ['Ultra-high 2,250m elevation', 'Indigenous Kurume landrace', '30-day extended sun drying'],
    accessRoad: 'Mountain highland pass (8 km southeast from Gedeb Town)',
  },
  {
    id: 'worka-sakaro',
    name: 'Worka Sakaro Kebele & River Station',
    amharicName: 'ዎርቃ ሳካሮ ቀበሌ እና ጣቢያ',
    category: 'station',
    elevation: 2200,
    coordinates: "5°55'02\"N 38°18'45\"E",
    x: 65,
    y: 35,
    description: 'Nestled along the pristine Worka River valley. Steep misty slopes covered in dense Enset shade trees create a distinct micro-terroir.',
    flavorNotes: ['Lavender', 'Orange Blossom', 'Candied Ginger', 'Black Tea'],
    processing: ['Washed Grade 1', 'Slow Dried Natural'],
    highlights: ['River valley humidity control', 'Centuries-old agroforestry plots', 'Organic certified cooperative'],
    accessRoad: 'Gravel mountain road (6 km northeast from Gedeb Town)',
  },
  {
    id: 'halo-beriti',
    name: 'Halo Beriti Kebele & Station',
    amharicName: 'ሃሎ በሪቲ ቀበሌ እና ጣቢያ',
    category: 'station',
    elevation: 2180,
    coordinates: "5°53'18\"N 38°17'40\"E",
    x: 52,
    y: 78,
    description: 'Famous for complex cup acidity and silky mouthfeel. Positioned on rich, volcanic red clay loam with abundant natural drainage.',
    flavorNotes: ['Sweet Mandarin', 'Jasmine Tea', 'Passionfruit', 'Brown Sugar'],
    processing: ['Washed', 'Anaerobic Fermentation'],
    highlights: ['Deep volcanic red loam soils', 'High bio-diversity canopy', 'Direct trade traceable lots'],
    accessRoad: 'All-weather access track (5 km south from Gedeb Town)',
  },
  {
    id: 'banko-dhadhato',
    name: 'Banko Dhadhato Kebele',
    amharicName: 'ባንኮ ዳዳቶ ቀበሌ',
    category: 'station',
    elevation: 2150,
    coordinates: "5°51'40\"N 38°16'20\"E",
    x: 25,
    y: 82,
    description: 'Dense agroforestry garden coffees intercropped with enset and heirloom spices, producing intensely aromatic cup profiles.',
    flavorNotes: ['Yuzu Citrus', 'Blueberry', 'Floral Honey', 'Lime Peel'],
    processing: ['Natural Grade 1', 'Washed'],
    highlights: ['Micro-lot isolation beds', 'Gedeo cultural agroforestry', 'Zero-chemical farming tradition'],
    accessRoad: 'Southwest mountain connector road (7 km from Gedeb Town)',
  },
  {
    id: 'gedeb-hospital',
    name: 'Gedeb General Hospital',
    amharicName: 'የገደብ አጠቃላይ ሆስፒታል',
    category: 'civic',
    elevation: 2210,
    coordinates: "5°55'15\"N 38°17'05\"E",
    x: 42,
    y: 38,
    description: 'Premier regional 24/7 medical and surgical facility serving Gedeb city and all surrounding coffee farming kebeles with emergency trauma care.',
    highlights: ['24/7 Emergency Care', 'Dedicated Maternity & Surgical Ward', 'Direct ambulance hotline: +251 46 333 0199'],
    accessRoad: 'Direct town central boulevard access',
  },
  {
    id: 'tuesday-friday-market',
    name: 'Tuesday & Friday Grand Market Grounds',
    amharicName: 'የማክሰኞ እና አርብ ታላቁ የገደብ ገበያ',
    category: 'landmark',
    elevation: 2195,
    coordinates: "5°55'30\"N 38°17'35\"E",
    x: 55,
    y: 52,
    description: 'The single largest and most vibrant open-air commercial trading hub in Gedeo Zone. Attracts tens of thousands of merchants from across Ethiopia.',
    highlights: ['Tuesday: Wholesale Produce & Coffee Cherry Trade', 'Friday: Livestock, Textiles & Traditional Spices', 'Hub for regional Gedeo-Guji pastoral commerce'],
    accessRoad: 'Central Market Ring Road',
  },
];

interface GedebTerroirMapProps {
  onOpenInquiry?: (stationName: string) => void;
}

export const GedebTerroirMap: React.FC<GedebTerroirMapProps> = ({ onOpenInquiry }) => {
  const { lang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'station' | 'civic' | 'high'>('all');
  const [selectedPoint, setSelectedPoint] = useState<TerroirPoint>(TERROIR_POINTS[1]); // Default Chelchele

  const filteredPoints = TERROIR_POINTS.filter((p) => {
    if (activeFilter === 'station') return p.category === 'station';
    if (activeFilter === 'civic') return p.category === 'civic' || p.category === 'landmark';
    if (activeFilter === 'high') return p.elevation >= 2200;
    return true;
  });

  return (
    <div className="bg-[#102418] text-white rounded-3xl p-6 sm:p-10 border border-emerald-800/60 shadow-2xl space-y-8 relative overflow-hidden">
      {/* Background Topographic Contours (SVG pattern) */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contour-lines" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M 0 30 Q 30 10 60 30 T 120 30 M 0 60 Q 30 40 60 60 T 120 60 M 0 90 Q 30 70 60 90 T 120 90" fill="none" stroke="#34d399" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contour-lines)" />
        </svg>
      </div>

      {/* Top Banner & Filter Strip */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4 border-b border-emerald-800/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Navigation className="w-3.5 h-3.5" />
            <span>Interactive Topography • የገደብ ተራራማ ቀበሌዎች ካርታ</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold font-serif-display text-white">
            {lang === 'am' ? 'የገደብ ቡና አጣቢ ጣቢያዎች እና ቀበሌዎች ካርታ' : 'Topographic Terroir & Kebele Map'}
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl font-light">
            Explore the high-altitude microclimates (2,000m – 2,250m) across Gedeb Woreda. Click on any pin to view elevation, tasting notes, GPS coordinates, and access routes.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-900/80 rounded-2xl border border-white/10 shrink-0 text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            All Locations ({TERROIR_POINTS.length})
          </button>
          <button
            onClick={() => setActiveFilter('station')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeFilter === 'station'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Washing Stations
          </button>
          <button
            onClick={() => setActiveFilter('civic')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeFilter === 'civic'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Civic & Markets
          </button>
          <button
            onClick={() => setActiveFilter('high')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeFilter === 'high'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            &ge; 2,200m High Peak
          </button>
        </div>
      </div>

      {/* Map Interactive Canvas + Detail Panel Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Cols: Topographic Visual Map Canvas */}
        <div className="lg:col-span-7 bg-[#09180f] rounded-3xl p-4 sm:p-6 border border-emerald-900/80 shadow-inner relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden flex flex-col justify-between">
          {/* Elevation Altitude Gradient Legend */}
          <div className="flex items-center justify-between text-[11px] text-emerald-300 font-mono pb-2 border-b border-white/10 z-10">
            <span className="flex items-center gap-1.5">
              <Mountain className="w-3.5 h-3.5 text-amber-300" />
              <span>Gedeb Highlands (2,050m - 2,250m)</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-stone-400">Lower Valley</span>
              <div className="w-16 h-2 rounded-full bg-gradient-to-r from-emerald-800 via-emerald-500 to-amber-400" />
              <span className="text-amber-300 font-bold">Alpine Peak</span>
            </div>
          </div>

          {/* SVG Map Canvas with Pins */}
          <div className="relative flex-1 w-full my-2">
            {/* Mountain Contour Rings Backdrop */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              {/* Contours representing high mountain ridges of Gedeo */}
              <ellipse cx="50" cy="50" rx="46" ry="38" fill="none" stroke="#059669" strokeWidth="0.5" strokeDasharray="2,2" />
              <ellipse cx="50" cy="52" rx="36" ry="30" fill="none" stroke="#10b981" strokeWidth="0.75" />
              <ellipse cx="52" cy="55" rx="25" ry="20" fill="none" stroke="#34d399" strokeWidth="0.75" strokeDasharray="3,2" />
              <ellipse cx="54" cy="58" rx="14" ry="12" fill="#064e3b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="0.75" />
              {/* Highway Arterial Line */}
              <path d="M 10 10 Q 35 30 48 46 T 85 90" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="1,2" opacity="0.6" />
            </svg>

            {/* Interactive Pins */}
            {filteredPoints.map((point) => {
              const isSelected = selectedPoint.id === point.id;
              const isStation = point.category === 'station';
              const isCivic = point.category === 'civic';

              return (
                <button
                  key={point.id}
                  onClick={() => setSelectedPoint(point)}
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform duration-200 z-20 ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                  aria-label={point.name}
                >
                  <div
                    className={`relative p-2 rounded-2xl shadow-lg border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-stone-950 border-white ring-4 ring-amber-400/40'
                        : isStation
                          ? 'bg-emerald-700 text-white border-emerald-400'
                          : isCivic
                            ? 'bg-rose-700 text-white border-rose-300'
                            : 'bg-blue-700 text-white border-blue-300'
                    }`}
                  >
                    {isStation ? (
                      <Droplets className="w-3.5 h-3.5" />
                    ) : isCivic ? (
                      <HeartPulse className="w-3.5 h-3.5" />
                    ) : (
                      <ShoppingBag className="w-3.5 h-3.5" />
                    )}

                    {/* Subtle pulse animation for active pin */}
                    {isSelected && (
                      <span className="absolute -inset-1 rounded-2xl bg-amber-400 animate-ping opacity-30" />
                    )}
                  </div>

                  {/* Label tooltip */}
                  <span
                    className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-md transition-opacity pointer-events-none ${
                      isSelected
                        ? 'bg-stone-950 text-amber-300 border border-amber-400/50 opacity-100'
                        : 'bg-stone-950/80 text-white border border-white/10 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {point.name.split(' ')[0]} ({point.elevation}m)
                  </span>
                </button>
              );
            })}
          </div>

          {/* Map Compass & Elevation Bar */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400 z-10">
            <span className="flex items-center gap-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Gedeo Zone • Micro-Climate Elevation Map</span>
            </span>
            <span className="font-mono text-amber-300 font-bold">
              Active: {selectedPoint.elevation}m ASL
            </span>
          </div>
        </div>

        {/* Right 5 Cols: Selected Location Details Card */}
        <div className="lg:col-span-5 bg-stone-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-emerald-700/50 shadow-xl space-y-5">
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/15">
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 border border-amber-400/40 px-2.5 py-0.5 rounded-full mb-1.5">
                {selectedPoint.category === 'station'
                  ? 'Specialty Washing Station'
                  : selectedPoint.category === 'civic'
                    ? 'Civic & Emergency Center'
                    : 'Regional Commercial Landmark'}
              </span>
              <h4 className="text-xl font-bold font-serif-display text-white">
                {selectedPoint.name}
              </h4>
              <p className="text-xs text-emerald-300 font-amharic mt-0.5">
                {selectedPoint.amharicName}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-lg font-black text-amber-300 block font-mono">
                {selectedPoint.elevation}m
              </span>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider">
                Above Sea Level
              </span>
            </div>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed">
            {selectedPoint.description}
          </p>

          {/* Flavor Notes (for coffee stations) */}
          {selectedPoint.flavorNotes && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                Characteristic Sensory Profile:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedPoint.flavorNotes.map((note, nIdx) => (
                  <span
                    key={nIdx}
                    className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          <div className="space-y-2 text-xs text-stone-200 pt-3 border-t border-white/10">
            {selectedPoint.highlights.map((hl, hIdx) => (
              <div key={hIdx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>{hl}</span>
              </div>
            ))}
          </div>

          {/* GPS Coordinates & Road Access */}
          <div className="bg-stone-950/60 rounded-2xl p-3 border border-white/10 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between text-stone-400">
              <span>GPS Coordinates:</span>
              <span className="font-mono text-amber-300 font-bold">{selectedPoint.coordinates}</span>
            </div>
            <div className="flex items-center justify-between text-stone-400">
              <span>Access Route:</span>
              <span className="text-stone-200 truncate max-w-[200px] text-right">{selectedPoint.accessRoad}</span>
            </div>
          </div>

          {/* Action button if station */}
          {selectedPoint.category === 'station' && onOpenInquiry && (
            <button
              onClick={() => onOpenInquiry(selectedPoint.name)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inquire for {selectedPoint.name.split(' ')[0]} Samples</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
