import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Sparkles, Coffee, Heart, Volume2, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { BUNA_CEREMONY_STEPS } from '../data/gedebData';
import { IMAGES } from '../assets/images';

export const BunaCeremony: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [pouredRounds, setPouredRounds] = useState<number[]>([1]);
  const [isBrewingAnimation, setIsBrewingAnimation] = useState(false);

  const step = BUNA_CEREMONY_STEPS[currentStepIndex];

  const handlePourCup = (roundNumber: number) => {
    setIsBrewingAnimation(true);
    if (!pouredRounds.includes(roundNumber)) {
      setPouredRounds([...pouredRounds, roundNumber]);
    }
    setTimeout(() => {
      setIsBrewingAnimation(false);
    }, 1200);
  };

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-800 uppercase mb-2">
          <span className="font-amharic text-base tracking-normal font-bold">የኢትዮጵያ ባህላዊ የቡና ስነ-ስርዓት</span>
          <span aria-hidden="true">·</span>
          <span>Living Ritual</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-serif-display text-balance">
          The Sacred Buna Ceremony: Friendship, Aroma & Blessings
        </h2>
        <p className="mt-3 text-stone-700 leading-relaxed text-sm sm:text-base">
          In Gedeb and across Ethiopia, Buna is not a quick grab-and-go caffeine fix; it is a sacred multi-sensory social gathering where time slows down, gratitude is voiced, and bonds are renewed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Traditional Jebena & Ceremony Visual */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-900 shadow-md">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={IMAGES.bunaCeremony}
                alt="Traditional Ethiopian Buna ceremony with black clay Jebena pouring coffee into cini cups with incense smoke"
                className="w-full h-full object-cover filter brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent flex flex-col justify-end p-5">
                <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">
                  The Heart of Hospitality
                </div>
                <h3 className="text-xl font-bold text-white font-serif-display">
                  Handcrafted Clay Jebena & Cini
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  Black clay pot with curved neck and spout, resting on Ketema (fresh fragrant green grass).
                </p>
              </div>
            </div>

            {/* Interactive Virtual Pourer */}
            <div className="p-5 bg-stone-900 text-white border-t border-stone-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-amber-300 font-medium">
                  The Three Rounds (ሦስቱ ዙሮች)
                </span>
                <span className="text-[11px] text-stone-400">
                  {pouredRounds.length} of 3 blessed
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { round: 1, name: 'Abol (አቦል)', desc: 'The First / Strongest' },
                  { round: 2, name: 'Tona (ቶና)', desc: 'Second / Dialogue' },
                  { round: 3, name: 'Baraka (በረካ)', desc: 'Third / Blessing' },
                ].map((item) => {
                  const isPoured = pouredRounds.includes(item.round);
                  return (
                    <button
                      key={item.round}
                      onClick={() => handlePourCup(item.round)}
                      className={`p-2.5 rounded-xl text-center text-xs transition-all cursor-pointer border ${
                        isPoured
                          ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold shadow-xs'
                          : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <Coffee className="w-3 h-3" />
                        <span>{item.name}</span>
                      </div>
                      <div className="text-[10px] opacity-80 mt-0.5">{item.desc}</div>
                    </button>
                  );
                })}
              </div>

              {isBrewingAnimation ? (
                <div className="text-center py-2 text-xs text-amber-300 flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    ☕
                  </motion.span>
                  <span>Pouring from the Jebena in one continuous unbroken arch...</span>
                </div>
              ) : (
                <div className="text-[11px] text-stone-400 text-center italic">
                  &ldquo;Abol awakens, Tona converses, Baraka brings divine peace.&rdquo;
                </div>
              )}
            </div>
          </div>

          {/* Cultural Etiquette Note */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-stone-800 space-y-1.5">
            <div className="font-semibold text-amber-900 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-amber-800" />
              <span>Gedeo Cultural Etiquette</span>
            </div>
            <p className="leading-relaxed">
              Never decline a cup of Buna when entering a home in Gedeb. It represents mutual trust, hospitality, and prayer for prosperity. Fresh popcorn (Fendisha) or roasted barley (Kollo) is always served alongside.
            </p>
          </div>
        </div>

        {/* Right Column: Step-by-Step Ritual Explorer */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
            {/* Step navigation tabs */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Step {step.stepNumber} of 5
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentStepIndex === 0}
                  onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                  className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Previous ritual step"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={currentStepIndex === BUNA_CEREMONY_STEPS.length - 1}
                  onClick={() =>
                    setCurrentStepIndex((prev) =>
                      Math.min(BUNA_CEREMONY_STEPS.length - 1, prev + 1)
                    )
                  }
                  className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Next ritual step"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stepper Dots Indicator */}
            <div className="flex gap-2 mb-6">
              {BUNA_CEREMONY_STEPS.map((s, idx) => (
                <button
                  key={s.stepNumber}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentStepIndex
                      ? 'w-8 bg-amber-700'
                      : idx < currentStepIndex
                      ? 'w-4 bg-emerald-700'
                      : 'w-3 bg-stone-200'
                  }`}
                  aria-label={`Jump to step ${s.stepNumber}`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div>
                  <div className="text-xs font-semibold text-emerald-800 font-amharic text-lg mb-1">
                    {step.amharicTitle}
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 font-serif-display">
                    {step.englishTitle}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-amber-900 mt-1">
                    {step.tagline}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                  {step.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 block mb-1">
                      Ritual Significance
                    </span>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {step.ritualSignificance}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/60">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block mb-1">
                      Sensory Aromas
                    </span>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {step.sensoryNote}
                    </p>
                  </div>
                </div>

                {step.cupRound && (
                  <div className="p-4 rounded-xl bg-emerald-950 text-white mt-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{step.cupRound.name} ({step.cupRound.amharic})</span>
                    </div>
                    <p className="text-xs text-stone-200 leading-relaxed">
                      {step.cupRound.meaning}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Step navigation next button */}
            <div className="mt-8 pt-6 border-t border-stone-200 flex justify-between items-center">
              <span className="text-xs text-stone-500 font-medium">
                {currentStepIndex + 1} of 5 phases completed
              </span>

              {currentStepIndex < BUNA_CEREMONY_STEPS.length - 1 ? (
                <button
                  onClick={() => setCurrentStepIndex((prev) => prev + 1)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Next: {BUNA_CEREMONY_STEPS[currentStepIndex + 1].englishTitle.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => setCurrentStepIndex(0)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Restart Ceremony Journey</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
