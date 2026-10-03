import React from 'react';
import { Compass, Calendar, SunMedium, ShieldAlert, MapPin, Bus, Plane } from 'lucide-react';
import { useMunicipalData } from '../context/MunicipalDataContext';

export const VisitorGuide: React.FC = () => {
  const { data } = useMunicipalData();

  const travelSections = [
    {
      title: 'How to Reach Gedeb',
      icon: <Plane className="w-4 h-4 text-emerald-700" />,
      detail:
        data.visitorGuide?.routes ||
        'Fly to Hawassa Airport (or drive south from Addis Ababa on the modern expressway ~380km). From Hawassa, travel through Dilla (Gedeo capital) and Yirgacheffe town on scenic paved mountain roads into Gedeb.',
    },
    {
      title: 'Best Time to Visit (Peak Harvest)',
      icon: <Calendar className="w-4 h-4 text-amber-700" />,
      detail:
        data.visitorGuide?.harvestPeriod ||
        'November through January is the most magical window: hillsides are alive with bright red coffee cherries and thousands of raised drying beds turn golden in the mountain sun.',
    },
    {
      title: 'Climate & What to Bring',
      icon: <SunMedium className="w-4 h-4 text-sky-700" />,
      detail:
        data.visitorGuide?.climateAttire ||
        'Sub-tropical mountain climate. Days are sunny and warm (20°C - 24°C), while nights are cool (9°C - 13°C). Bring light layers, sturdy hiking shoes for highland trails, and rain gear.',
    },
    {
      title: 'Cultural Etiquette & Buying Coffee',
      icon: <ShieldAlert className="w-4 h-4 text-emerald-700" />,
      detail:
        data.visitorGuide?.etiquette ||
        'Always accept the third cup of coffee (Baraka) during Buna ceremonies. Ask permission before photographing farmers or drying stations. Support local cooperatives by purchasing freshly roasted coffee in Gedeb town.',
    },
  ];

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
          <span>Travel & Coffee Expeditions</span>
          <span aria-hidden="true">·</span>
          <span>Gedeb, Ethiopia</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-serif-display text-balance">
          Visiting Gedeb: The Pilgrim&apos;s Trail of Coffee
        </h2>
        <p className="mt-3 text-stone-700 leading-relaxed text-sm sm:text-base">
          Whether you are a green coffee importer, professional roaster, or traveler eager to witness the living origin of Arabica coffee, here is your essential guide to navigating Gedeb.
        </p>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {travelSections.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
                {item.icon}
                <span>0{idx + 1}. Guide Section</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 font-serif-display mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Travel Itinerary & Tips */}
      <div className="bg-[#f4f6f0] rounded-2xl p-6 sm:p-8 border border-stone-200">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
          <Compass className="w-4 h-4 text-emerald-800" />
          <span>Recommended 3-Stage Travel Route</span>
        </div>
        <h3 className="text-2xl font-bold text-stone-900 font-serif-display mb-6">
          The Highland Route from Addis Ababa to Gedeb
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-white border border-stone-200">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
              <Plane className="w-4 h-4 text-emerald-700" />
              <span>Leg 1: Addis to Hawassa</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Take a 45-minute domestic Ethiopian Airlines flight from Bole International to Hawassa, or drive 4 hours south via the modern A2 toll expressway.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-stone-200">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
              <Bus className="w-4 h-4 text-emerald-700" />
              <span>Leg 2: Hawassa to Dilla</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Drive south through Dilla (the administrative capital of Gedeo Zone). Paved roads wind through lush roadside fruit stands selling bananas and papayas.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-stone-200">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Leg 3: Yirgacheffe to Gedeb</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Climb higher into the misty cloud forest past Yirgacheffe town. Arrive at Gedeb (2,050m - 2,250m elevation) with its red soil and endless coffee washing stations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
