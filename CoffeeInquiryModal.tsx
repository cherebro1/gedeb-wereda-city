import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, CheckCircle2, X, Send, Sparkles, Globe, MapPin, Package } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CoffeeInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStation?: string;
}

export const CoffeeInquiryModal: React.FC<CoffeeInquiryModalProps> = ({
  isOpen,
  onClose,
  defaultStation = '',
}) => {
  const { lang, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    roasteryName: '',
    contactName: '',
    email: '',
    country: '',
    kebele: defaultStation || 'Chelchele (2,100m)',
    process: 'Grade 1 Washed',
    volume: 'Sample Box (2x 500g green)',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // auto close or allow user to close
    }, 4000);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="fixed inset-0 bg-stone-950/80 backdrop-blur-md cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-[#fcfbfa] rounded-3xl border border-stone-200 p-6 sm:p-8 max-w-2xl w-full shadow-2xl z-10 my-8 text-stone-900"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Coffee className="w-3.5 h-3.5" />
                <span>Direct Trade • Gedeb Cooperative Desk</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-display text-stone-900">
                {t('sample.title')}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                {t('sample.desc')}
              </p>
            </div>
            <button
              onClick={resetAndClose}
              className="text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center space-y-4"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold font-serif-display text-stone-900">
                {lang === 'am' ? 'የናሙና ጥያቄው ተልኳል!' : 'Sample Request Dispatched!'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                {t('sample.success')}
              </p>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 max-w-md mx-auto text-xs text-emerald-950 font-mono">
                <span className="block font-bold mb-1">
                  Export Desk Reference: GDB-2026-EXP-{Math.floor(1000 + Math.random() * 9000)}
                </span>
                <span>Destination: {formData.country || 'Global Specialty Importer'}</span>
              </div>
              <button
                onClick={resetAndClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-emerald-900 text-white font-bold text-xs hover:bg-emerald-800 transition-all cursor-pointer"
              >
                {t('btn.close')}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    {t('sample.roastery_name')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nordic Roasters Oslo / Blue Bottle Tokyo"
                    value={formData.roasteryName}
                    onChange={(e) => setFormData({ ...formData, roasteryName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-emerald-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    {t('sample.buyer_name')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova / Head of Green Coffee"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-emerald-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    {t('sample.email')} *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="coffee-buyer@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-emerald-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    {t('sample.country')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Germany (Hamburg Port) / Japan (Yokohama)"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-emerald-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    {t('sample.kebele')}
                  </label>
                  <select
                    value={formData.kebele}
                    onChange={(e) => setFormData({ ...formData, kebele: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-emerald-800 font-medium"
                  >
                    <option value="Chelchele (2,100m)">Chelchele (2,100m)</option>
                    <option value="Banko Gotiti (2,250m)">Banko Gotiti (2,250m)</option>
                    <option value="Worka Sakaro (2,200m)">Worka Sakaro (2,200m)</option>
                    <option value="Halo Beriti (2,180m)">Halo Beriti (2,180m)</option>
                    <option value="Banko Dhadhato (2,150m)">Banko Dhadhato (2,150m)</option>
                    <option value="Gedeb Multi-Terroir Blend">Gedeb Multi-Terroir Blend</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    {t('sample.process')}
                  </label>
                  <select
                    value={formData.process}
                    onChange={(e) => setFormData({ ...formData, process: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-emerald-800 font-medium"
                  >
                    <option value="Grade 1 Washed">Grade 1 Washed (Jasmine/Bergamot)</option>
                    <option value="Grade 1 Natural">Grade 1 Natural (Peach/Blueberry)</option>
                    <option value="Anaerobic Slow Dry">Anaerobic Slow Dry (Wine/Yuzu)</option>
                    <option value="Carbonic Maceration">Carbonic Maceration (Tropical)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    {t('sample.volume')}
                  </label>
                  <select
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-emerald-800 font-medium"
                  >
                    <option value="Sample Box (2x 500g green)">Sample Box (2x 500g)</option>
                    <option value="Microlot (10 to 30 bags)">Microlot (10 to 30 bags)</option>
                    <option value="Single Lot (30 to 100 bags)">Single Lot (30 to 100 bags)</option>
                    <option value="FCL Container (320 bags)">FCL Container (320 bags)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">
                  {t('sample.notes')}
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Looking for minimum 88.5+ SCA score with high floral notes and vibrant citric acidity..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-emerald-800 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <span className="text-[11px] text-stone-500">
                  Samples dispatched via DHL Express with phytosanitary & ECX certificates.
                </span>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t('sample.submit_btn')}</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
