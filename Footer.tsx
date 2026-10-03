import React from 'react';
import { PageTab } from './Navbar';
import { Building2, Phone, MapPin, Calendar, HeartPulse, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const [secretClicks, setSecretClicks] = React.useState(0);
  const handleSecretClick = () => {
    setSecretClicks((prev) => {
      const next = prev + 1;
      if (next >= 4) {
        if (onOpenAdmin) onOpenAdmin();
        return 0;
      }
      return next;
    });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-stone-800">
          {/* Brand & Regional Anchor */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-900 flex items-center justify-center text-amber-200 font-serif-display font-bold text-lg">
                ገ
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-serif-display">
                GEDEB CITY & WOREDA
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              The high-altitude cradle of world-class specialty coffee and the vibrant commercial hub of Gedeo Zone, South Ethiopia Regional State. Home to over 12,000 smallholder agroforestry families.
            </p>
            <div className="text-xs font-amharic text-amber-300/90 pt-1">
              ቡናችን ይጣፍጥ! እንኳን ወደ ገደብ ከተማና ወረዳ በሰላም መጡ።
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-xs uppercase font-bold tracking-wider text-stone-200 mb-3">
              Explore Gedeb
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('overview')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  City Life & Gedeo Cultural Landscape
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('civic')}
                  className="hover:text-white transition-colors cursor-pointer text-amber-300 font-medium"
                >
                  Civic Leadership, Mayor, Hospital & Banks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('coffee')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  The Specialty Coffee Sanctuary (Bun)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ceremony')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Traditional Ethiopian Buna Ceremony
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('stations')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Micro-Regions: Worka, Gotiti & Chelchele
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guide')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Travel & Visitor Pilgrimage Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Municipal & Community Quick Info */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs uppercase font-bold tracking-wider text-stone-200 mb-3">
              City & Woreda Center
            </div>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Gedeb Town, 01 & 02 Kebele Municipal Halls</span>
              </li>
              <li className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Major Market Days: <strong className="text-white">Tuesday & Friday</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <HeartPulse className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>Gedeb General Hospital (24/7 Emergency)</span>
              </li>
              <li className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-stone-300 shrink-0 mt-0.5" />
                <span>5 Banks: CBE, Awash, Abyssinia, Dashen, Sinqee</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Gedeb City & Woreda Administration</span>
            <span>·</span>
            <span>Gedeo Zone, South Ethiopia</span>
          </div>

          <div className="flex items-center gap-3 text-stone-400">
            <span>The Premier Specialty Coffee Capital of Ethiopia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
