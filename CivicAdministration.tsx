import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2,
  Landmark,
  HeartPulse,
  Signal,
  ShoppingBag,
  Fuel,
  GraduationCap,
  Users2,
  Calendar,
  PhoneCall,
  CheckCircle2,
  MapPin,
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  ArrowRight,
  ExternalLink,
  Check,
} from 'lucide-react';
import { IMAGES } from '../assets/images';
import { useMunicipalData } from '../context/MunicipalDataContext';

interface CivicAdministrationProps {
  onOpenAdmin?: () => void;
}

export const CivicAdministration: React.FC<CivicAdministrationProps> = ({ onOpenAdmin }) => {
  const { data } = useMunicipalData();

  const adminPhoto = data.woredaAdmin.photo;
  const mayorPhoto = data.cityMayor.photo;
  const banks = data.banks;
  const gasStations = data.gasStations;
  const schools = data.schools;
  const hospital = data.hospital;
  const market = data.market;

  return (
    <div className="py-12 bg-[#fafaf6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Civic Governance & Modern Infrastructure • Gedeo Zone</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-display text-stone-900 tracking-tight">
            City Leadership & Municipal Infrastructure
          </h1>
          <p className="text-stone-600 text-base sm:text-lg mt-2 max-w-3xl leading-relaxed">
            Discover the dynamic leadership, essential services, 4G telecom networks, premier regional markets, financial institutions, and vibrant multi-faith harmony that power <strong>Gedeb City Administration</strong> and <strong>Gedeb Woreda</strong>.
          </p>
        </div>

        {/* Night City Transformation Banner (Photo from User) */}
        <div className="bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left text */}
            <div className="lg:col-span-6 p-8 sm:p-12 text-white z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Modern Urban Transformation • Gedeb at Night</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif-display leading-tight text-white mb-4">
                Illuminated Evenings & Paved Mountain Walkways
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
                Gedeb City has undergone stunning modern urban upgrading. Broad stone-paved pedestrian avenues, modern drainage canals, warm bollard street lighting, and multi-story commercial buildings bring lively energy and security to highland evenings after the bustling coffee market days.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
                  <span className="text-amber-300 block font-bold text-sm">24/7 Streetlights</span>
                  <span className="text-stone-300">Modern energy-efficient bollard lighting</span>
                </div>
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
                  <span className="text-emerald-300 block font-bold text-sm">Paved Corridors</span>
                  <span className="text-stone-300">Wide pedestrian sidewalks & stone gutters</span>
                </div>
              </div>
            </div>

            {/* Right photo */}
            <div className="lg:col-span-6 h-80 sm:h-96 lg:h-full relative min-h-[380px]">
              <img
                src={IMAGES.cityNight}
                alt="Gedeb city at night with illuminated cobblestone sidewalks, bollards, and modern buildings"
                className="w-full h-full object-cover object-center filter brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-900 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 bg-stone-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs text-stone-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Gedeb City Night Promenade (የገደብ ከተማ የምሽት ገጽታ)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Executive Leadership (Woreda Administrator & City Mayor) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Executive Governance • የአስተዳደር መዋቅር
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-stone-900 mt-1">
                Woreda & City Leadership
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-medium bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
              Gedeo Zone, South Ethiopia Regional State
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Gedeb Woreda Administrator - Enhanced with Emerald Brand Gradient & Accents */}
            <div className="bg-gradient-to-br from-emerald-50/90 via-white to-stone-50 rounded-3xl border-2 border-emerald-300 shadow-md p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl hover:border-emerald-500 transition-all">
              <div>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 mb-2">
                      Gedeb Woreda Administration
                    </span>
                    <h3 className="text-2xl font-bold font-serif-display text-stone-900">
                      {data.woredaAdmin.name}
                    </h3>
                    <p className="text-sm font-semibold text-emerald-800 mt-0.5 font-amharic">
                      {data.woredaAdmin.amharicTitle}
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-900 text-amber-300 rounded-2xl shrink-0 shadow-md">
                    <Landmark className="w-6 h-6" />
                  </div>
                </div>

                {/* Portrait Slot */}
                <div className="mb-6 rounded-2xl overflow-hidden border-2 border-emerald-200 bg-white aspect-[4/3] relative flex items-center justify-center shadow-sm">
                  {adminPhoto ? (
                    <img
                      src={adminPhoto}
                      alt="Gedeb Woreda Administrator official portrait"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-6">
                      <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 mb-3 shadow-xs">
                        <Users2 className="w-8 h-8" />
                      </div>
                      <span className="text-sm font-bold text-stone-800 block">
                        Official Administrator Portrait
                      </span>
                      <p className="text-xs text-stone-500 mt-1 max-w-xs">
                        Slot reserved for the photo of the Gedeb Woreda Administrator.
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-sm text-stone-700 leading-relaxed mb-6 font-medium">
                  {data.woredaAdmin.bio}
                </p>

                <div className="space-y-2 text-xs text-stone-800 pt-4 border-t border-emerald-100">
                  {data.woredaAdmin.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-100 flex items-center justify-between text-xs text-stone-600">
                <span className="font-semibold text-emerald-950">Office Contact:</span>
                <span className="font-mono text-emerald-900 font-bold bg-emerald-100/60 px-2 py-0.5 rounded-md">{data.woredaAdmin.phone}</span>
              </div>
            </div>

            {/* Card 2: Gedeb City Mayor - Enhanced with Warm Gold/Amber Brand Gradient & Accents */}
            <div className="bg-gradient-to-br from-amber-50/90 via-white to-stone-50 rounded-3xl border-2 border-amber-300 shadow-md p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl hover:border-amber-500 transition-all">
              <div>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-amber-950 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 mb-2">
                      Gedeb City Administration
                    </span>
                    <h3 className="text-2xl font-bold font-serif-display text-stone-900">
                      {data.cityMayor.name}
                    </h3>
                    <p className="text-sm font-semibold text-amber-900 mt-0.5 font-amharic">
                      {data.cityMayor.amharicTitle}
                    </p>
                  </div>
                  <div className="p-3 bg-amber-500 text-stone-950 rounded-2xl shrink-0 shadow-md">
                    <Building2 className="w-6 h-6" />
                  </div>
                </div>

                {/* Portrait Slot */}
                <div className="mb-6 rounded-2xl overflow-hidden border-2 border-amber-200 bg-white aspect-[4/3] relative flex items-center justify-center shadow-sm">
                  {mayorPhoto ? (
                    <img
                      src={mayorPhoto}
                      alt="Gedeb City Mayor official portrait"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-6">
                      <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 mb-3 shadow-xs">
                        <Users2 className="w-8 h-8" />
                      </div>
                      <span className="text-sm font-bold text-stone-800 block">
                        Official Mayor Portrait
                      </span>
                      <p className="text-xs text-stone-500 mt-1 max-w-xs">
                        Slot reserved for the photo of the Gedeb City Mayor.
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-sm text-stone-700 leading-relaxed mb-6 font-medium">
                  {data.cityMayor.bio}
                </p>

                <div className="space-y-2 text-xs text-stone-800 pt-4 border-t border-amber-100">
                  {data.cityMayor.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="font-medium">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-xs text-stone-600">
                <span className="font-semibold text-amber-950">Mayor Office Contact:</span>
                <span className="font-mono text-amber-900 font-bold bg-amber-100/60 px-2 py-0.5 rounded-md">{data.cityMayor.phone}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Two Urban Kebeles (Kebele 01 & Kebele 02) */}
        <section className="bg-stone-100/80 rounded-2xl border border-stone-200/90 p-6 sm:p-8">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Municipal Structure • የከተማው ቀበሌዎች
            </span>
            <h3 className="text-2xl font-bold font-serif-display text-stone-900 mt-1">
              Two Urban Kebeles of Gedeb City Administration
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Gedeb City is structured into two vibrant, well-organized urban administrative kebeles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-emerald-800 text-white font-bold flex items-center justify-center text-sm font-mono">
                    01
                  </span>
                  <div>
                    <h4 className="font-bold text-stone-900 text-base">Gedeb Kebele 01</h4>
                    <span className="text-xs text-stone-500">ቀበሌ 01 (Central Commercial Quarter)</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Business Core
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                The vibrant commercial heart of Gedeb, encompassing the grand Tuesday and Friday open market plazas, the central bus station, financial street with CBE and private commercial banks, and main highway storefronts.
              </p>
              <div className="text-[11px] text-stone-500 space-y-1">
                <div>• Main Market Square & Grain/Coffee Depot</div>
                <div>• Banking Street & Telebirr Hubs</div>
                <div>• Highway commercial shopping & dining avenues</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-amber-700 text-white font-bold flex items-center justify-center text-sm font-mono">
                    02
                  </span>
                  <div>
                    <h4 className="font-bold text-stone-900 text-base">Gedeb Kebele 02</h4>
                    <span className="text-xs text-stone-500">ቀበሌ 02 (Civic, Medical & Academic District)</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Institutional & Residential
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Home to the major public institutions including Gedeb General Hospital, educational campuses (Gedeb Primary, High School, and Polytechnic College), tranquil residential tree-lined streets, and municipal administrative offices.
              </p>
              <div className="text-[11px] text-stone-500 space-y-1">
                <div>• Gedeb General Hospital healthcare compound</div>
                <div>• Historic Gedeb Primary & Polytechnic campuses</div>
                <div>• Peaceful residential neighborhoods and church parishes</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Gedeb General Hospital */}
        <section className="bg-gradient-to-br from-rose-50/70 via-white to-stone-50 rounded-2xl border border-rose-200/80 p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider border border-rose-200">
                <HeartPulse className="w-3.5 h-3.5" />
                <span>Regional Healthcare Pillar</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif-display text-stone-900">
                Gedeb General Hospital
              </h2>
              <p className="text-sm font-semibold text-rose-900">
                የገደብ አጠቃላይ ሆስፒታል
              </p>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Gedeb General Hospital serves as the vital medical sanctuary for over 150,000+ citizens of Gedeb Woreda and neighboring highland communities along the Gedeo–Guji southern borders. It delivers compassionate, specialized clinical care, reducing patient referrals to distant regional hospitals.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-white rounded-xl border border-rose-100 shadow-xs">
                  <span className="font-bold text-rose-900 text-sm block">24/7 Emergency</span>
                  <span className="text-stone-500 text-xs">Trauma & Acute Care</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-rose-100 shadow-xs">
                  <span className="font-bold text-rose-900 text-sm block">Maternal & Child (MCH)</span>
                  <span className="text-stone-500 text-xs">Modern Delivery & NICU</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-rose-100 shadow-xs">
                  <span className="font-bold text-rose-900 text-sm block">Surgical Theater</span>
                  <span className="text-stone-500 text-xs">General & Emergency Surgery</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-rose-100 shadow-xs">
                  <span className="font-bold text-rose-900 text-sm block">Diagnostic Lab</span>
                  <span className="text-stone-500 text-xs">Blood, imaging, and pathology</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-rose-100 shadow-xs">
                  <span className="font-bold text-rose-900 text-sm block">Inpatient Wards</span>
                  <span className="text-stone-500 text-xs">Medical, surgical, and pediatric</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-rose-100 shadow-xs">
                  <span className="font-bold text-rose-900 text-sm block">Full Pharmacy</span>
                  <span className="text-stone-500 text-xs">Essential medications</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-rose-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Key Hospital Statistics</h4>
                  <span className="text-xs text-stone-500">Service Highlights</span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-stone-100">
                  <span className="text-stone-600">Catchment Population:</span>
                  <span className="font-bold text-stone-900">150,000+ residents</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-stone-100">
                  <span className="text-stone-600">Ambulance Service:</span>
                  <span className="font-bold text-emerald-700">Active Woreda-Wide</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-stone-100">
                  <span className="text-stone-600">Location:</span>
                  <span className="font-bold text-stone-900">Gedeb Kebele 02 Campus</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-stone-600">Community Outreach:</span>
                  <span className="font-bold text-stone-900">Immunization & Nutrition Programs</span>
                </div>
              </div>

              <div className="p-3 bg-rose-50 rounded-xl text-xs text-rose-800 leading-relaxed font-medium">
                Ensuring that coffee farming families receive world-class healthcare, safe deliveries, and immediate trauma response without leaving their home district.
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: 4G High-Speed Telecom & Connectivity with Panoramic Background & Brand Colors */}
        <section className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-800">
          {/* Panoramic 4G Cellular Mast & Dual-Brand Lighting */}
          <div className="absolute inset-0 z-0">
            <img
              src={IMAGES.telecomTower}
              alt="Modern 4G telecommunication transmission mast on misty mountain plateau overlooking Gedeb"
              className="w-full h-full object-cover object-center filter brightness-50 scale-105"
            />
            {/* Dual Brand Ambient Glow: Ethio Telecom Lime (#8cc63f) on left, Safaricom Emerald (#009a44) on right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#172e0a]/95 via-stone-950/90 to-[#042f15]/95" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(140,198,63,0.3),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(0,154,68,0.35),_transparent_55%)]" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 lg:p-12 space-y-8 text-white">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Signal className="w-3.5 h-3.5" />
                <span>Digital Infrastructure • የቴሌኮም እና ኢንተርኔት ሽፋን</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif-display text-white mt-1">
                Two Major 4G Telecom Networks in Gedeb
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 mt-2 leading-relaxed max-w-2xl font-light">
                Gedeb is fully connected with lightning-fast 4G LTE mobile data, national optical fiber backbone, and digital finance services from Ethiopia&apos;s two licensed telecommunication providers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Ethio Telecom - Styled in Official Brand Lime-Green (#8cc63f) */}
              <div className="relative rounded-3xl overflow-hidden bg-[#8cc63f] text-stone-950 shadow-2xl border-2 border-[#7cb832] flex flex-col justify-between p-6 sm:p-8 transition-transform hover:-translate-y-1 duration-300">
                {/* Subtle top gloss glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/15 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3.5">
                      {/* Ethio Telecom Brand Mark */}
                      <div className="w-14 h-14 rounded-2xl bg-white p-2 shadow-md flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 100 100" className="w-10 h-10">
                          {/* Cyan bottom crescent */}
                          <path
                            d="M 20 60 C 25 80, 50 85, 70 70 C 60 75, 35 72, 30 55 C 28 50, 20 52, 20 60 Z"
                            fill="#0072bc"
                          />
                          {/* Green dome */}
                          <path
                            d="M 22 52 C 18 35, 35 15, 65 18 C 85 20, 95 38, 85 55 C 75 70, 45 68, 30 52 C 26 48, 22 50, 22 52 Z"
                            fill="#009245"
                          />
                          <path
                            d="M 28 40 C 26 28, 42 20, 60 22 C 45 22, 32 30, 28 40 Z"
                            fill="#8cc63f"
                            opacity="0.8"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black tracking-tight text-stone-950 font-sans lowercase">
                            ethio telecom
                          </span>
                          <span className="text-[10px] font-bold text-stone-900">TM</span>
                        </div>
                        <span className="text-xs font-bold text-stone-900 font-amharic block -mt-0.5">
                          ኢትዮ ቴሌኮም • የገደብ ቅርንጫፍ
                        </span>
                      </div>
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-stone-950 text-white shadow-xs tracking-wider uppercase">
                      4G LTE Active
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-950 font-medium leading-relaxed mb-6 bg-white/40 backdrop-blur-xs p-3.5 rounded-2xl border border-black/10">
                    {data.telecom?.ethioTelecomCoverage ||
                      'Provides expansive high-capacity 4G LTE wireless coverage across Gedeb city and rural farming kebeles. Powers ubiquitous Telebirr digital transactions for coffee cherry payments, local businesses, and government utilities.'}
                  </p>

                  <div className="space-y-2.5 text-xs text-stone-950 font-medium">
                    <div className="flex items-center gap-2.5 bg-black/5 p-2 rounded-xl">
                      <div className="w-5 h-5 rounded-full bg-stone-950 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>High-Speed 4G Mobile Internet for communications & commerce</span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-black/5 p-2 rounded-xl">
                      <div className="w-5 h-5 rounded-full bg-stone-950 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>Telebirr cashless transactions at coffee washing stations & retail</span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-black/5 p-2 rounded-xl">
                      <div className="w-5 h-5 rounded-full bg-stone-950 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>Dedicated customer service center in Central Gedeb</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-black/15 flex items-center justify-between text-xs font-semibold text-stone-950">
                  <span>Coverage: Citywide & Rural Woreda</span>
                  <span className="px-2.5 py-1 rounded-lg bg-stone-950 text-[#8cc63f] font-bold">
                    {data.telecom?.fiberStatus || 'Nationwide Fiber Backbone'}
                  </span>
                </div>
              </div>

              {/* Safaricom Ethiopia - Styled in Official Brand Emerald Green (#009a44) */}
              <div className="relative rounded-3xl overflow-hidden bg-[#009a44] text-white shadow-2xl border-2 border-[#00823a] flex flex-col justify-between p-6 sm:p-8 transition-transform hover:-translate-y-1 duration-300">
                {/* Decorative Safaricom signature red accent circle */}
                <div className="absolute -top-12 -right-12 w-48 h-48 border-8 border-[#e30613] rounded-full opacity-35 pointer-events-none" />

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3.5">
                      {/* Safaricom Brand Mark */}
                      <div className="w-14 h-14 rounded-2xl bg-white p-2 shadow-md flex items-center justify-center shrink-0 relative overflow-hidden">
                        <svg viewBox="0 0 100 100" className="w-10 h-10">
                          {/* Safaricom Red Arc */}
                          <path
                            d="M 15 55 C 20 20, 80 15, 85 45 C 80 50, 75 42, 60 35 C 35 25, 20 45, 15 55 Z"
                            fill="#e30613"
                          />
                          {/* Safaricom green 'S' icon */}
                          <path
                            d="M 25 70 C 15 60, 20 40, 45 42 C 30 45, 30 65, 55 60 C 70 57, 78 72, 65 82 C 45 92, 25 85, 25 70 Z"
                            fill="#009a44"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-2xl font-black tracking-tight text-white font-sans">
                            Safaricom
                          </span>
                          <span className="w-2.5 h-2.5 rounded-full bg-[#e30613]" />
                        </div>
                        <span className="text-xs font-semibold text-emerald-100 font-amharic block -mt-0.5">
                          ሳፋሪኮም ኢትዮጵያ • 4ጂ ኔትወርክ
                        </span>
                      </div>
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-[#e30613] text-white shadow-xs tracking-wider uppercase">
                      4G High-Speed
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-white/95 font-medium leading-relaxed mb-6 bg-black/15 backdrop-blur-xs p-3.5 rounded-2xl border border-white/15">
                    {data.telecom?.safaricomCoverage ||
                      'Modern high-throughput 4G base towers delivering high-speed bandwidth and ultra-reliable data. Integrated with M-PESA mobile money, allowing international money transfers, digital merchant pay, and swift farmer payments.'}
                  </p>

                  <div className="space-y-2.5 text-xs text-white font-medium">
                    <div className="flex items-center gap-2.5 bg-black/15 p-2 rounded-xl border border-white/10">
                      <div className="w-5 h-5 rounded-full bg-[#e30613] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>Lightning 4G data streaming, low latency, and clear HD voice calls</span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-black/15 p-2 rounded-xl border border-white/10">
                      <div className="w-5 h-5 rounded-full bg-[#e30613] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>M-PESA mobile money wallet and merchant payment network</span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-black/15 p-2 rounded-xl border border-white/10">
                      <div className="w-5 h-5 rounded-full bg-[#e30613] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>Expanding mast towers connecting surrounding coffee micro-regions</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs font-semibold text-emerald-100">
                  <span>Network: Next-Gen 4G Ready</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white text-[#009a44] font-bold shadow-xs">
                    M-PESA Services Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: The Most Market Area in Gedeo Zone (Tuesday & Friday) */}
        <section className="bg-gradient-to-r from-amber-950 via-amber-900 to-stone-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider mb-4">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Commercial Capital of Gedeo Zone</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-display leading-tight text-white mb-4">
              The Premier Market Days: Tuesday & Friday
            </h2>
            <p className="text-amber-200 font-serif text-lg mb-4">
              ማክሰኞ እና አርብ — የጌዴኦ ዞን ዋነኛ እና ትልቁ የንግድ ማዕከል
            </p>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8">
              Gedeb is recognized far and wide as the single most vibrant commercial market area in the entire Gedeo Zone. Every <strong>Tuesday</strong> and <strong>Friday</strong>, thousands of coffee farmers, merchants from Addis Ababa, Hawassa, and Dilla, and highland pastoralists from neighboring Guji converge here.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
                <span className="text-amber-300 font-bold block text-sm">Tuesday Market</span>
                <span className="text-stone-300 text-xs">Fresh harvest & wholesale agricultural produce</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
                <span className="text-amber-300 font-bold block text-sm">Friday Grand Market</span>
                <span className="text-stone-300 text-xs">Major regional livestock, textiles, pottery & grain</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
                <span className="text-amber-300 font-bold block text-sm">Red Cherry Trade</span>
                <span className="text-stone-300 text-xs">Direct grower delivery to washing stations</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
                <span className="text-amber-300 font-bold block text-sm">Kocho & Spices</span>
                <span className="text-stone-300 text-xs">Fermented enset, korarima, ginger & highland honey</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Financial & Banking Sector (5 Major Banks) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Banking & Commerce • የባንክ አገልግሎት
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-stone-900 mt-1">
                Financial Hub: 5 Major Banks in Gedeb
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-medium bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
              ATM Access • Letters of Credit • Harvest Liquidity
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {banks.map((bank, index) => {
              // Brand color styles for each bank
              const bankStyles = [
                { border: 'border-t-4 border-t-purple-700 hover:border-purple-600', bg: 'bg-gradient-to-b from-purple-50/40 via-white to-stone-50', iconBg: 'bg-purple-100 text-purple-800' },
                { border: 'border-t-4 border-t-blue-600 hover:border-blue-500', bg: 'bg-gradient-to-b from-blue-50/40 via-white to-stone-50', iconBg: 'bg-blue-100 text-blue-800' },
                { border: 'border-t-4 border-t-amber-600 hover:border-amber-500', bg: 'bg-gradient-to-b from-amber-50/40 via-white to-stone-50', iconBg: 'bg-amber-100 text-amber-900' },
                { border: 'border-t-4 border-t-indigo-700 hover:border-indigo-600', bg: 'bg-gradient-to-b from-indigo-50/40 via-white to-stone-50', iconBg: 'bg-indigo-100 text-indigo-800' },
                { border: 'border-t-4 border-t-emerald-700 hover:border-emerald-600', bg: 'bg-gradient-to-b from-emerald-50/40 via-white to-stone-50', iconBg: 'bg-emerald-100 text-emerald-800' },
              ];
              const style = bankStyles[index % bankStyles.length];

              return (
                <div
                  key={index}
                  className={`rounded-2xl border border-stone-200/90 p-6 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all ${style.border} ${style.bg}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${bank.accent}`}>
                        {bank.type}
                      </span>
                      <div className={`p-2 rounded-xl ${style.iconBg} shadow-xs`}>
                        <Landmark className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="font-bold text-stone-900 text-lg leading-snug">{bank.name}</h3>
                    <div className="text-xs font-semibold text-emerald-800 mt-0.5">{bank.branch}</div>
                    <p className="text-xs text-stone-500 font-amharic mt-1">{bank.amharic}</p>

                    <div className="mt-4 pt-3 border-t border-stone-100 space-y-2">
                      {bank.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-stone-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                    <span>Location: Central Gedeb</span>
                    <span className="font-semibold text-stone-800">Open Mon - Sat</span>
                  </div>
                </div>
              );
            })}

            {/* Quick Summary Card */}
            <div className="bg-emerald-950 text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold mb-4">
                  $
                </div>
                <h3 className="font-bold text-lg font-serif-display text-white mb-2">
                  Specialty Coffee Financial Corridor
                </h3>
                <p className="text-stone-300 text-xs leading-relaxed">
                  During peak harvest (October through January), these five institutions handle hundreds of millions of Birr in coffee transactions, cash withdrawals for cherry pickers, and export letters of credit for worldwide specialty roasters.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-amber-300 font-semibold">
                Cashless digital payments via Telebirr, CBE Birr & Awash Birr fully supported.
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Fuel & Gas Stations */}
        <section className="bg-stone-100/80 rounded-2xl border border-stone-200/90 p-6 sm:p-8">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Fuel & Transport Energy • የነዳጅ ማደያዎች
            </span>
            <h3 className="text-2xl font-bold font-serif-display text-stone-900 mt-1">
              Gas Stations in Gedeb City
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Supplying vital diesel and benzene to keep coffee haulage transport trucks, washing mill generators, and regional commuters moving smoothly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gasStations.map((station, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                      <Fuel className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-base">{station.name}</h4>
                      <span className="text-xs text-stone-500 font-amharic">{station.amharic}</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-full border border-stone-200">
                    Active Station
                  </span>
                </div>

                <div className="text-xs text-stone-600 mb-4 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{station.location}</span>
                </div>

                <div className="space-y-1.5 text-xs text-stone-700 pt-3 border-t border-stone-100">
                  {station.services.map((srv, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500 font-medium">
                  {station.hours}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Educational Institutions & History (1954 Italian Era Primary School) */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Education & Historic Heritage • የትምህርት ተቋማት
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-stone-900 mt-1">
              Schools & Polytechnic College
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              From the historic 1954 primary school to modern technical polytechnic training, education is the foundation of Gedeb&apos;s youth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {schools.map((school, sIdx) => (
              <div
                key={sIdx}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between hover:border-emerald-400/50 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-stone-100 text-stone-800 px-2.5 py-1 rounded-md border border-stone-200">
                      {school.badge}
                    </span>
                    <GraduationCap className="w-5 h-5 text-emerald-700" />
                  </div>

                  <h3 className="font-bold text-stone-900 text-lg leading-snug">{school.name}</h3>
                  <div className="text-xs text-emerald-800 font-semibold mt-0.5">{school.amharic}</div>
                  <div className="text-xs text-amber-900 font-medium mt-1">{school.founded}</div>

                  <p className="text-xs text-stone-600 leading-relaxed mt-3">
                    {school.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-700">
                    {school.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
                  Campus: Gedeb Kebele 02 Education Quarter
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 9: Faith, Religious Harmony & Protestant Majority */}
        <section className="bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">
              Social Fabric & Spiritual Unity • የሃይማኖት አንድነት እና መቻቻል
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-display mt-2 text-white">
              Vibrant Multi-Faith Harmony
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mt-3">
              Gedeb is home to a peaceful, mutually supportive community comprising <strong>Protestant</strong>, <strong>Ethiopian Orthodox Tewahedo</strong>, and <strong>Muslim</strong> faithful. The community has a dominant Protestant population, with active churches, community choirs, and joint agricultural celebrations that embody deep Gedeo communal fraternity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-xs uppercase font-bold text-amber-300 block mb-1">
                Dominant Community
              </span>
              <h4 className="text-lg font-bold text-white mb-2">Protestant Fellowship</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Represents the largest community in Gedeb with thriving congregations including Mekane Yesus, Kale Heywet, and Full Gospel. Active in youth literacy, choral music, and community service.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-xs uppercase font-bold text-amber-300 block mb-1">
                Ancient Heritage
              </span>
              <h4 className="text-lg font-bold text-white mb-2">Orthodox Tewahedo</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Historic parish churches celebrating timeless liturgical calendar festivals like Meskel and Timkat, bringing together citizens of all walks of life under towering eucalyptus and enset groves.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-xs uppercase font-bold text-amber-300 block mb-1">
                Commercial & Cultural Fellowship
              </span>
              <h4 className="text-lg font-bold text-white mb-2">Muslim Community</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Integral pillar of the Gedeb trading network and market commerce. Mosques and Muslim business leaders work hand-in-hand with civic administrations during Ramadan and holiday charity drives.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
