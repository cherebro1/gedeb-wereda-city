import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wheat,
  Trees,
  Sprout,
  ShieldCheck,
  Droplets,
  Layers,
  Sparkles,
  Sun,
  Flame,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { IMAGES } from '../assets/images';
import { ENSET_WONDER_PLANT, GEDEB_AGRICULTURE, AgriculturalItem } from '../data/gedebData';
import { useMunicipalData } from '../context/MunicipalDataContext';

export const AgroforestryCrops: React.FC = () => {
  const { data } = useMunicipalData();
  const [activeCategory, setActiveCategory] = useState<'all' | 'staple' | 'cash' | 'livestock'>('all');
  const [selectedFoodProduct, setSelectedFoodProduct] = useState<number>(0);

  const ensetInfo = data.ensetAgriculture;

  const foodDescriptions = [
    ensetInfo?.kochoDesc || ENSET_WONDER_PLANT.foodProducts[0].description,
    ensetInfo?.bullaDesc || ENSET_WONDER_PLANT.foodProducts[1].description,
    ensetInfo?.amichoDesc || ENSET_WONDER_PLANT.foodProducts[2].description,
  ];

  const filteredItems =
    activeCategory === 'all'
      ? GEDEB_AGRICULTURE
      : GEDEB_AGRICULTURE.filter((item) => item.category === activeCategory);

  return (
    <section
      id="gedeb-agriculture"
      className="py-16 bg-stone-900 text-stone-100 relative overflow-hidden border-t border-b border-stone-800 scroll-mt-16"
    >
      {/* Background radial gradient accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-950/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-950/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-2">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>Beyond Coffee · Gedeo Multi-Crop Agroforestry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-serif-display text-balance">
            Enset (False Banana), Staple Crops & Highland Livestock
          </h2>
          <p className="mt-3 text-stone-300 leading-relaxed text-sm sm:text-base">
            While Gedeb is renowned globally for premier specialty coffee, the backbone of local food security, ecological balance, and daily sustenance is its ancient polyculture—anchored by the drought-resilient <strong>Enset</strong> plant, golden grains like <strong>Teff</strong>, diversified cash crops, and highland cattle.
          </p>
        </div>

        {/* Master Spotlight: The Enset (False Banana) Wonder Plant */}
        <div className="bg-stone-950/80 rounded-3xl border border-stone-800 p-6 sm:p-8 lg:p-10 mb-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 Cols: Information & Narrative */}
            <div className="lg:col-span-7 space-y-6">
              {/* Botanical & Phonetic Pill */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                  <Trees className="w-3.5 h-3.5" />
                  <span>{ensetInfo?.scientificName || ENSET_WONDER_PLANT.scientificName}</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-950/60 border border-amber-600/40 text-amber-300 text-xs font-medium">
                  {ensetInfo?.amharicName || ENSET_WONDER_PLANT.amharicName}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-stone-800 text-stone-300 text-[11px] font-mono">
                  {ensetInfo?.phoneticClarification || 'Phonetic: "Sets" / "Inset"'}
                </span>
              </div>

              {/* Title & Core Distinction */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif-display text-white">
                  The Drought-Resistant Miracle &ldquo;Tree Against Hunger&rdquo;
                </h3>
                <div className="mt-2.5 p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5 text-xs sm:text-sm text-amber-200">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Clarifying the name:</strong> The common phonetic spelling <em>&ldquo;sets&rdquo;</em> or <em>&ldquo;inset&rdquo;</em> refers directly to <strong>Enset</strong> (<em>Ensete ventricosum</em>), widely known as the <strong>False Banana</strong>. Though it resembles a banana plant with enormous tropical leaves, it yields no edible fruit; instead, its massive moisture-storing pseudostem and root corm feed millions year-round.
                  </span>
                </div>
              </div>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                {ensetInfo?.droughtResilienceDesc || ENSET_WONDER_PLANT.famineResilience}
              </p>

              {/* Interactive Food Products Tabs (Kocho, Bulla, Amicho) */}
              <div>
                <div className="text-xs uppercase font-bold tracking-wider text-stone-400 mb-2.5">
                  Three Traditional Enset Culinary Staples:
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {ENSET_WONDER_PLANT.foodProducts.map((prod, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedFoodProduct(idx)}
                      className={`p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer border ${
                        selectedFoodProduct === idx
                          ? 'bg-emerald-900/80 border-emerald-500 text-white shadow-md'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold">{prod.name}</div>
                      <div className="text-[11px] text-amber-300/80 font-amharic">{prod.amharic}</div>
                    </button>
                  ))}
                </div>

                {/* Selected Food Detail Card */}
                <div className="mt-3 p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 text-xs text-stone-300 leading-relaxed flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">
                      {ENSET_WONDER_PLANT.foodProducts[selectedFoodProduct].name}:
                    </span>{' '}
                    {foodDescriptions[selectedFoodProduct]}
                  </div>
                </div>
              </div>

              {/* Ecological Superpowers Grid */}
              <div className="pt-2">
                <div className="text-xs uppercase font-bold tracking-wider text-stone-400 mb-2">
                  Zero-Waste Ecological & Agricultural Functions:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                  {ENSET_WONDER_PLANT.ecologicalBenefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 bg-stone-900/50 p-2 rounded-lg border border-stone-800/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Authentic Farm Image Showcase */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-stone-700 shadow-xl group aspect-[4/3]">
                <img
                  src={IMAGES.ensetFarm}
                  alt="Traditional Gedeo agroforestry farm in Gedeb with gigantic Enset false banana plants shading Arabica coffee bushes"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent flex flex-col justify-end p-4">
                  <span className="text-xs font-bold text-white">
                    Gedeo Agroforestry Sanctuary in Gedeb
                  </span>
                  <span className="text-[11px] text-amber-200">
                    Towering Enset (False Banana) providing natural cooling shade to heirloom coffee underneath
                  </span>
                </div>
              </div>

              {/* Quick Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="text-lg font-bold text-amber-300 font-serif-display">100%</div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider">Zero Waste</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="text-lg font-bold text-emerald-400 font-serif-display">12 Mos</div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider">Year-Round Food</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="text-lg font-bold text-blue-400 font-serif-display">~100 L</div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider">Water Stored/Tree</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Filterable Grid for Staple Crops, Cash Crops & Livestock */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-display text-white">
                Staples, Cash Crops & Highland Livestock
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Explore the crops and animals that make Gedeb Woreda the most productive market center in Gedeo Zone.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-950 rounded-xl border border-stone-800 self-start sm:self-auto overflow-x-auto">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === 'all'
                    ? 'bg-emerald-900 text-white font-semibold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                All Diversified Agriculture
              </button>
              <button
                onClick={() => setActiveCategory('staple')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === 'staple'
                    ? 'bg-emerald-900 text-white font-semibold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Staple Crops (Teff, Grains)
              </button>
              <button
                onClick={() => setActiveCategory('cash')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === 'cash'
                    ? 'bg-emerald-900 text-white font-semibold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Cash Crops (Khat, Fruits)
              </button>
              <button
                onClick={() => setActiveCategory('livestock')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === 'livestock'
                    ? 'bg-emerald-900 text-white font-semibold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Livestock & Dairy
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="bg-stone-950/70 rounded-2xl border border-stone-800 p-5 hover:border-emerald-800/80 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                        item.category === 'staple'
                          ? 'bg-amber-950/50 border-amber-600/40 text-amber-300'
                          : item.category === 'cash'
                          ? 'bg-emerald-950/50 border-emerald-600/40 text-emerald-300'
                          : 'bg-rose-950/50 border-rose-600/40 text-rose-300'
                      }`}
                    >
                      {item.category === 'staple'
                        ? 'Staple Food Crop'
                        : item.category === 'cash'
                        ? 'Commercial Cash Crop'
                        : 'Livestock & Pastoral'}
                    </span>
                    <span className="text-xs font-amharic text-amber-300/80">{item.amharic}</span>
                  </div>

                  <h4 className="text-lg font-bold text-white font-serif-display">{item.name}</h4>
                  <p className="text-xs font-medium text-emerald-400 mt-0.5">{item.tagline}</p>

                  <p className="text-stone-300 text-xs mt-3 leading-relaxed">{item.details}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/80 text-[11px] text-stone-400">
                  <strong className="text-stone-300">Economic Role:</strong> {item.roleInEconomy}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
