import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mountain, Trees, Users, Award, ShieldCheck, ChevronRight } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { useMunicipalData } from '../context/MunicipalDataContext';

export const CityOverview: React.FC = () => {
  const { data } = useMunicipalData();
  const [activeStory, setActiveStory] = useState<'geography' | 'agroforestry' | 'community' | 'varieties'>('agroforestry');

  const stories = [
    {
      id: 'agroforestry' as const,
      title: 'UNESCO Gedeo Cultural Landscape',
      amharic: 'የጌዴኦ ጥንታዊ የግብርና ስርዓት',
      icon: <Trees className="w-4 h-4 text-emerald-700" />,
      tagline: 'A multi-layered Living Sanctuary: Enset (False Banana), heirloom coffee & staple crops',
      description: data.cityOverview.unescoDescription,
      highlights: [
        'Enset ("sets"/False Banana): Year-round drought-resistant staple producing Kocho, Bulla, and Amicho',
        'Polyculture of Teff, highland barley, wheat, sweet potato, taro (godere), and rich livestock grazing',
        'High-value cash crops including heirloom Arabica coffee, Khat, avocados, and forest canopy apiculture',
        'Multi-tiered canopy provides cooling protective shade and stops hillside erosion without chemicals',
      ],
    },
    {
      id: 'geography' as const,
      title: 'High-Altitude Mountain Microclimate',
      amharic: 'የከፍተኛ ተራራማ አየር ንብረት',
      icon: <Mountain className="w-4 h-4 text-emerald-700" />,
      tagline: `Perched between ${data.cityOverview.elevation || '1,950m and 2,350m above sea level'}`,
      description: data.cityOverview.geographyDescription,
      highlights: [
        'Nighttime temperatures drop to 8°C–12°C, concentrating sugars',
        'Annual rainfall of 1,850mm–2,100mm distributed in two distinct wet cycles',
        'Pristine highland runoff streams feeding mountain washing stations',
      ],
    },
    {
      id: 'community' as const,
      title: 'Community Life & The Gedeb Market',
      amharic: 'የከተማው ንግድና ማህበራዊ ኑሮ',
      icon: <Users className="w-4 h-4 text-emerald-700" />,
      tagline: `Vibrant trade on ${data.market.primaryDays}, hospitality & cooperative heritage`,
      description: data.cityOverview.communityDescription,
      highlights: [
        'Primary washing stations operated by smallholder farmer cooperatives',
        `Weekly open-air markets on ${data.market.primaryDays} rich in spices, grains, and livestock`,
        'Legendary hospitality: visitors are greeted with fresh roasted coffee & steamed Kocho',
      ],
    },
    {
      id: 'varieties' as const,
      title: 'Ancient Heirloom Landraces',
      amharic: 'የጥንት ሀገር በቀል ቡና ዝርያዎች',
      icon: <Award className="w-4 h-4 text-emerald-700" />,
      tagline: 'Kurume, Dega, and Wolisho: Nature’s genetic treasure',
      description: data.cityOverview.varietiesDescription,
      highlights: [
        'Kurume (Dega): Famous for sparkling jasmine tea and bergamot finish',
        'Wolisho: Long-lived highland trees resilient to high altitude breezes',
        '74110 & 74112 selections that resist coffee berry disease naturally',
      ],
    },
  ];

  const currentStoryData = stories.find((s) => s.id === activeStory) || stories[0];

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
          <span>Gedeb Woreda</span>
          <span aria-hidden="true">·</span>
          <span>Southern Nations</span>
          <span aria-hidden="true">·</span>
          <span>Living Heritage</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-serif-display text-balance">
          Where Nature, Community, and Coffee Exist in Timeless Balance
        </h2>
        <p className="mt-3 text-stone-600 leading-relaxed text-sm sm:text-base">
          Located in Southern Ethiopia&apos;s Gedeo Zone, Gedeb is not just a renowned coffee origin—it is an ancient ecosystem of agroforestry, community wisdom, and highland life.
        </p>
      </div>

      {/* Interactive Story Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Story Navigation List */}
        <div className="lg:col-span-5 space-y-2.5">
          {stories.map((story) => {
            const isSelected = activeStory === story.id;
            return (
              <button
                key={story.id}
                onClick={() => setActiveStory(story.id)}
                className={`w-full text-left p-4 rounded-xl transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-emerald-950 text-white border-emerald-900 shadow-md'
                    : 'bg-white text-stone-800 border-stone-200 hover:border-emerald-600/40 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected ? 'bg-emerald-800 text-amber-200' : 'bg-stone-100 text-emerald-800'
                      }`}
                    >
                      {story.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold tracking-tight">{story.title}</div>
                      <div
                        className={`text-xs font-amharic ${
                          isSelected ? 'text-amber-200/90' : 'text-stone-500'
                        }`}
                      >
                        {story.amharic}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-amber-300 translate-x-1' : 'text-stone-400'
                    }`}
                  />
                </div>
              </button>
            );
          })}

          {/* Quick Municipal Fact Box - Dynamic */}
          <div className="p-5 rounded-xl bg-stone-100/90 border border-stone-200/80 mt-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>Gedeb at a Glance</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-stone-500 block">District:</span>
                <span className="font-semibold text-stone-900">Gedeb Woreda</span>
              </div>
              <div>
                <span className="text-stone-500 block">Zone:</span>
                <span className="font-semibold text-stone-900">Gedeo Zone</span>
              </div>
              <div>
                <span className="text-stone-500 block">Elevation:</span>
                <span className="font-semibold text-stone-900">{data.cityOverview.elevation}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Population:</span>
                <span className="font-semibold text-stone-900">{data.cityOverview.population}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Coffee Farmers:</span>
                <span className="font-semibold text-stone-900">{data.cityOverview.coffeeFarmers}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Main Market:</span>
                <span className="font-semibold text-stone-900">{data.market.primaryDays}</span>
              </div>
              <div className="col-span-2">
                <span className="text-stone-500 block">Administration Structure:</span>
                <span className="font-semibold text-stone-900">{data.cityOverview.kebelesCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Story Content with Motion */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStoryData.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold uppercase tracking-wider mb-2">
                <span>{currentStoryData.amharic}</span>
                <span aria-hidden="true">·</span>
                <span>In-Depth</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif-display mb-3">
                {currentStoryData.title}
              </h3>

              <p className="text-xs sm:text-sm text-amber-900 font-medium bg-amber-50/80 border border-amber-200/60 rounded-lg p-3 mb-6">
                {currentStoryData.tagline}
              </p>

              <p className="text-stone-700 leading-relaxed text-sm sm:text-base mb-6">
                {currentStoryData.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2.5 pt-4 border-t border-stone-100">
                <h4 className="text-xs uppercase font-bold tracking-wider text-stone-500">Key Ecological & Cultural Pillars</h4>
                {currentStoryData.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Landscape photo integration */}
              <div className="mt-8 rounded-xl overflow-hidden border border-stone-200 aspect-[16/9] relative">
                <img
                  src={IMAGES.cityHero}
                  alt="Aerial view of Gedeb city center, paved avenues, modern buildings, and surrounding green mountain hills"
                  className="w-full h-full object-cover object-center filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs text-white/90 font-medium">
                    Gedeb city center aerial panorama: urban avenues, commerce, and surrounding agroforestry highlands
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
