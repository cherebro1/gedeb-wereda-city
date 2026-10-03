import React, { createContext, useContext, useState, useEffect } from 'react';
import { IMAGES } from '../assets/images';
import { WASHING_STATIONS, WashingStation } from '../data/gedebData';

export interface LeaderProfile {
  name: string;
  title: string;
  amharicTitle: string;
  office: string;
  photo: string;
  phone: string;
  term: string;
  bio: string;
  responsibilities: string[];
}

export interface BankEntity {
  id: string;
  name: string;
  branch: string;
  amharic: string;
  type: string;
  features: string[];
  accent: string;
}

export interface GasStationEntity {
  id: string;
  name: string;
  location: string;
  amharic: string;
  services: string[];
  hours: string;
}

export interface SchoolEntity {
  id: string;
  name: string;
  amharic: string;
  founded: string;
  badge: string;
  description: string;
  highlights: string[];
}

export interface HospitalData {
  name: string;
  amharic: string;
  director: string;
  catchmentPopulation: string;
  emergencyPhone: string;
  ambulancePhone: string;
  location: string;
  services: { title: string; subtitle: string }[];
}

export interface MarketData {
  primaryDays: string;
  amharicDays: string;
  description: string;
  commodities: string[];
}

export interface KebeleEntity {
  id: string;
  name: string;
  amharic: string;
  type: 'rural' | 'urban';
  elevation: string;
  features: string;
}

export interface CityOverviewData {
  heroHeadline: string;
  heroSubtext: string;
  unescoDescription: string;
  elevation: string;
  population: string;
  coffeeFarmers: string;
  kebelesCount: string;
  geographyDescription: string;
  communityDescription: string;
  varietiesDescription: string;
}

export interface CoffeeData {
  washedProfile: string;
  naturalProfile: string;
  anaerobicProfile: string;
  kurumeDescription: string;
  degaDescription: string;
  wolishoDescription: string;
  harvestWindow: string;
  scaScoreRange: string;
}

export interface EnsetAgricultureData {
  scientificName: string;
  amharicName: string;
  phoneticClarification: string;
  droughtResilienceTitle: string;
  droughtResilienceDesc: string;
  kochoDesc: string;
  bullaDesc: string;
  amichoDesc: string;
  stapleCropsSummary: string;
  cashCropsSummary: string;
  livestockSummary: string;
}

export interface TelecomData {
  ethioTelecomCoverage: string;
  safaricomCoverage: string;
  fiberStatus: string;
  serviceLocation: string;
}

export interface VisitorGuideData {
  routes: string;
  harvestPeriod: string;
  climateAttire: string;
  etiquette: string;
}

export interface MunicipalStore {
  woredaAdmin: LeaderProfile;
  cityMayor: LeaderProfile;
  banks: BankEntity[];
  gasStations: GasStationEntity[];
  schools: SchoolEntity[];
  hospital: HospitalData;
  market: MarketData;
  telecom: TelecomData;
  kebeles: KebeleEntity[];
  washingStations: WashingStation[];
  cityOverview: CityOverviewData;
  coffeeData: CoffeeData;
  ensetAgriculture: EnsetAgricultureData;
  visitorGuide: VisitorGuideData;
}

export const DEFAULT_KEBELES: KebeleEntity[] = [
  { id: 'k-01', name: 'Kebele 01 (City Center)', amharic: 'ቀበሌ 01 (የከተማ ማዕከል)', type: 'urban', elevation: '2,050m', features: 'Municipal Hall, Commercial Banks, Central Market Promenade' },
  { id: 'k-02', name: 'Kebele 02 (Hospital Corridor)', amharic: 'ቀበሌ 02 (የሆስፒታል መንደር)', type: 'urban', elevation: '2,080m', features: 'Gedeb General Hospital, Secondary School, TVET College' },
  { id: 'k-worka', name: 'Worka Sakaro', amharic: 'ዎርቃ ሳቃሮ', type: 'rural', elevation: '2,000m - 2,250m', features: 'Famous high-altitude washing station & micro-lots' },
  { id: 'k-gotiti', name: 'Banko Gotiti', amharic: 'ባንኮ ጎቲቲ', type: 'rural', elevation: '2,100m - 2,280m', features: 'Super-sweet natural heirloom micro-climate' },
  { id: 'k-chelchele', name: 'Chelchele', amharic: 'ጨልጨሌ', type: 'rural', elevation: '1,950m - 2,150m', features: 'Dense agroforestry shade & rich mountain spring runoffs' },
  { id: 'k-halo', name: 'Halo Beriti', amharic: 'ሃሎ በሪቲ', type: 'rural', elevation: '2,050m - 2,200m', features: 'Floral jasmine washed coffees & smallholder gardens' },
  { id: 'k-dhadhato', name: 'Banko Dhadhato', amharic: 'ባንኮ ዳዳቶ', type: 'rural', elevation: '2,150m - 2,300m', features: 'One of the highest coffee producing elevations in Gedeo' },
  { id: 'k-chiriku', name: 'Chiriku', amharic: 'ጭሪቁ', type: 'rural', elevation: '2,020m - 2,180m', features: 'Historic farming community, Enset agroforestry' },
];

export const DEFAULT_MUNICIPAL_DATA: MunicipalStore = {
  woredaAdmin: {
    name: 'Gedeb Woreda Chief Administrator',
    title: 'Executive Head of Gedeb Woreda Administration',
    amharicTitle: 'የገደብ ወረዳ ዋና አስተዳዳሪ',
    office: 'Gedeb Woreda Secretariat Compound',
    photo: IMAGES.woredaAdmin,
    phone: '+251 46 331 0122',
    term: 'Current Serving Administration',
    bio: 'Leads the executive branch of Gedeb Woreda, guiding rural agroforestry development, coffee washing station quality regulation, environmental soil preservation across coffee-growing kebeles, and inter-zonal security.',
    responsibilities: [
      'Oversees 16+ highland rural coffee kebeles',
      'Specialty coffee union licensing & environmental compliance',
      'Public peace, judicial administration, and rural roads',
      'Natural resource conservation and highland reforestation',
    ],
  },
  cityMayor: {
    name: 'Gedeb City Mayor',
    title: 'Chief Executive of Gedeb City Administration',
    amharicTitle: 'የገደብ ከተማ ከንቲባ',
    office: 'Gedeb Municipal Hall, Kebele 01',
    photo: IMAGES.cityMayor,
    phone: '+251 46 331 0455',
    term: 'Current Serving Administration',
    bio: 'Directs the municipal administration of Gedeb City, spearheading urban master planning, paved stone walkways, city electrification, night streetlights, commercial market zones, sanitation, and municipal revenue.',
    responsibilities: [
      'Governs the 2 Urban Municipal Kebeles (Kebele 01 & 02)',
      'Spearheaded the modern paved cobblestone & night lighting avenues',
      'Manages the bustling Gedeo Zone Tuesday & Friday trade market',
      'Oversees municipal revenue, civil registry, and urban zoning',
    ],
  },
  banks: [
    {
      id: 'cbe-gedeb',
      name: 'Commercial Bank of Ethiopia (CBE)',
      branch: 'Gedeb Branch',
      amharic: 'የኢትዮጵያ ንግድ ባንክ - የገደብ ቅርንጫፍ',
      type: 'State Commercial Bank',
      features: ['Full-service ATM', 'Telebirr SuperApp integration', 'Specialty coffee export letters of credit'],
      accent: 'border-purple-200 bg-purple-50/50 text-purple-900',
    },
    {
      id: 'awash-gedeb',
      name: 'Awash Bank',
      branch: 'Gedeb Branch',
      amharic: 'አዋሽ ባንክ - የገደብ ቅርንጫፍ',
      type: 'Private Commercial Bank',
      features: ['Awash Birr mobile payments', 'Fast merchant clearance', 'Agricultural working capital loans'],
      accent: 'border-blue-200 bg-blue-50/50 text-blue-900',
    },
    {
      id: 'abyssinia-gedeb',
      name: 'Bank of Abyssinia',
      branch: 'Gedeb Branch',
      amharic: 'አቢሲኒያ ባንክ - የገደብ ቅርንጫፍ',
      type: 'Private Commercial Bank',
      features: ['Apollo digital banking', 'High-volume cash withdrawal for harvest', 'Foreign exchange'],
      accent: 'border-amber-200 bg-amber-50/50 text-amber-900',
    },
    {
      id: 'dashen-gedeb',
      name: 'Dashen Bank',
      branch: 'Gedeb Branch',
      amharic: 'ዳሽን ባንክ - የገደብ ቅርንጫፍ',
      type: 'Private Commercial Bank',
      features: ['Amole & digital POS', 'Coffee union financing', 'Modern digital banking counter'],
      accent: 'border-emerald-200 bg-emerald-50/50 text-emerald-900',
    },
    {
      id: 'sinqee-gedeb',
      name: 'Sinqee Bank',
      branch: 'Gedeb Branch',
      amharic: 'ሲንቄ ባንክ - የገደብ ቅርንጫፍ',
      type: 'Inclusive Community Bank',
      features: ['Smallholder farmer micro-credit', 'Cooperative saving accounts', 'Low-barrier rural banking'],
      accent: 'border-rose-200 bg-rose-50/50 text-rose-900',
    },
  ],
  gasStations: [
    {
      id: 'noc-gedeb',
      name: 'NOC (National Oil Ethiopia)',
      location: 'Main Highway Transit Route, Gedeb',
      amharic: 'ኤን ኦ ሲ (NOC) ነዳጅ ማደያ',
      services: ['High-flow Diesel for coffee cargo trucks', 'Benzene fuel pumps', 'Engine lubricants & vehicle service'],
      hours: '24/7 Operations during harvest peak',
    },
    {
      id: 'africa-barke',
      name: 'Africa Barke (Africat Barke)',
      location: 'Central Entrance Corridor, Gedeb',
      amharic: 'አፍሪካ ተባረከ ነዳጅ ማደያ',
      services: ['Clean diesel for wet mill washing generators', 'Automotive fuels', 'Heavy transport rest stop'],
      hours: 'Open daily with emergency fuel reserve',
    },
  ],
  schools: [
    {
      id: 'gedeb-primary',
      name: 'Gedeb Primary School',
      amharic: 'የገደብ አንደኛ ደረጃ ትምህርት ቤት',
      founded: 'Circa 1954 (Italian post-war historic era)',
      badge: 'Historic 1954 Foundation',
      description:
        'The historic pioneer academic institution of Gedeb Woreda. Built in the mid-1950s, it has nurtured multiple generations of community elders, coffee union organizers, teachers, and regional leaders.',
      highlights: ['Grade 1 through 8 foundational curriculum', 'Spacious historic campus with native shade trees', 'Centuries of civic pride'],
    },
    {
      id: 'gedeb-secondary',
      name: 'Gedeb Secondary & Preparatory School',
      amharic: 'የገደብ አጠቃላይ ሁለተኛ ደረጃ ትምህርት ቤት',
      founded: 'Comprehensive High School',
      badge: 'Regional Secondary Center',
      description:
        'Equips thousands of young minds from Kebele 01, Kebele 02, and surrounding rural woredas for national higher education entry and university entrance examinations.',
      highlights: ['Natural science and social science streams', 'Science lab & digital learning facilities', 'Active regional youth sports'],
    },
    {
      id: 'gedeb-polytechnic',
      name: 'Gedeb Polytechnic College (TVET)',
      amharic: 'የገደብ ፖሊ ቴክኒክ ኮሌጅ',
      founded: 'Vocational & Technical College',
      badge: 'Technical & Agricultural Skills',
      description:
        'Specialized vocational powerhouse delivering technical skills for coffee processing machinery, automotive mechanics, electrical systems, agro-processing, and modern building construction.',
      highlights: ['Agro-mechanic training for washing station wet mills', 'Electrical & ICT programs', 'Job creation for highland youth'],
    },
  ],
  hospital: {
    name: 'Gedeb General Hospital',
    amharic: 'የገደብ አጠቃላይ ሆስፒታል',
    director: 'Medical Director & Chief of Clinical Services',
    catchmentPopulation: '150,000+ residents across Gedeb & borders',
    emergencyPhone: '+251 46 331 9911',
    ambulancePhone: '+251 46 331 9912',
    location: 'Gedeb Kebele 02 Medical Compound',
    services: [
      { title: '24/7 Emergency', subtitle: 'Trauma & Acute Resuscitation' },
      { title: 'Maternal & Child (MCH)', subtitle: 'Modern Delivery Suites & NICU' },
      { title: 'Surgical Theater', subtitle: 'General, C-Section & Trauma' },
      { title: 'Diagnostic Lab', subtitle: 'Hematology, imaging & pathology' },
      { title: 'Inpatient Wards', subtitle: 'Medical, surgical, and pediatric' },
      { title: 'Full Pharmacy', subtitle: 'Essential medications & vaccines' },
    ],
  },
  market: {
    primaryDays: 'Tuesday & Friday',
    amharicDays: 'ማክሰኞ እና አርብ',
    description:
      'Gedeb is celebrated across Southern Ethiopia as the most bustling, high-volume market center in Gedeo Zone, drawing traders from Hawassa, Dilla, Guji, and rural kebeles.',
    commodities: [
      'Red Arabica Coffee Cherries & Dry Cherries (Jenfel)',
      'Kocho & Bulla from Enset (False Banana)',
      'Highland Grains (Teff, Barley, Wheat, Corn)',
      'Highland Butter (Qibe), Honey & Organic Produce',
      'Livestock (Cattle, Sheep, Goats) & Traditional Pottery',
    ],
  },
  telecom: {
    ethioTelecomCoverage: 'High-speed 4G LTE Advanced & Fixed Broadband across urban corridors',
    safaricomCoverage: '4G Data & Voice network operational across Gedeb town and market plazas',
    fiberStatus: 'Optical fiber backbone connecting municipal bureaus, bank branches, and hospital',
    serviceLocation: 'Ethio Telecom Customer Center, Main Boulevard, Kebele 01',
  },
  kebeles: DEFAULT_KEBELES,
  washingStations: WASHING_STATIONS,
  cityOverview: {
    heroHeadline: 'The Highland Sanctuary of Specialty Coffee',
    heroSubtext:
      'Where misty clouds kiss volcanic soil, and ancient Gedeo agroforestry nurtures world-class Arabica coffee alongside drought-resilient Enset (False Banana), Teff grains, and highland livestock.',
    unescoDescription:
      'Gedeb is part of the UNESCO-inscribed Gedeo Cultural Landscape. Smallholder families cultivate indigenous Arabica trees integrated within a multi-tiered canopy of Enset (Ensete ventricosum, widely known as the False Banana, and phonetically referred to as "sets" or "inset"), along with native hardwood trees. This ancient bio-system is crowned the "Tree Against Hunger" because Enset stores massive reservoirs of water in its pseudostem—making it extraordinarily drought-resistant and harvestable at any time of year when other seasonal crops fail.',
    elevation: '2,050m – 2,250m above sea level',
    population: '150,000+ residents across urban & rural kebeles',
    coffeeFarmers: '12,000+ smallholder agroforestry families',
    kebelesCount: '16 Rural Coffee Kebeles + 2 Urban Municipal Kebeles',
    geographyDescription:
      'Gedeb Woreda sits on the southern edge of the Ethiopian Great Rift Valley escarpment. Because temperatures plummet during clear mountain nights, the Arabica coffee cherries mature very slowly over 8 to 9 months, producing crystalline malic acidity and sweet floral terpenes.',
    communityDescription:
      'Gedeb town serves as the vibrant commercial hub where thousands of smallholder coffee growers gather weekly. Farmers bring meticulously hand-harvested red cherries to primary washing stations and cooperative unions. Life here is deeply communal—anchored by traditional Gedeo social structures and Buna hospitality.',
    varietiesDescription:
      'Unlike commercial coffee regions that plant uniform hybrids, Gedeb farms are rich with wild landrace varieties nurtured across generations: Kurume, Dega, and Wolisho.',
  },
  coffeeData: {
    washedProfile:
      'Silky, luminous, and elegant. Mountain spring water removes cherry pulp before beans are soaked and dried on raised beds.',
    naturalProfile:
      'Whole ripe cherries dry intact under the high-altitude sun, allowing fruit sugars to permeate deep into the bean seed.',
    anaerobicProfile:
      'Ripe cherries ferment in oxygen-deprived barrels before slow bed drying, creating rare competition-level complexity.',
    kurumeDescription:
      'Compact trees with small, dense berries. Piercing jasmine florals, sparkling lime acidity, and delicate bergamot finish.',
    degaDescription:
      'Medium-sized leaves and rounded cherries. Delivers honey sweetness, stone fruits, and balanced milk chocolate body.',
    wolishoDescription:
      'Broad towering trees with large cherries. Imparts bold tropical fruits, juicy apricot, and syrupy texture.',
    harvestWindow: 'November through January',
    scaScoreRange: '89.0 – 93.5+ SCA Specialty Grade',
  },
  ensetAgriculture: {
    scientificName: 'Ensete ventricosum',
    amharicName: 'እንሰት (Wesa)',
    phoneticClarification: 'Commonly known as "Sets" or "Inset" (False Banana)',
    droughtResilienceTitle: 'The "Tree Against Hunger" & Living Reservoir',
    droughtResilienceDesc:
      'Enset stores hundreds of liters of water in its gigantic pseudostem, surviving multi-year droughts when other seasonal crops fail completely. It can be harvested at any month of the year.',
    kochoDesc:
      'Fermented scraping from enset leaf-sheaths and corm. Baked into nutrient-dense flatbread eaten with Kitfo, vegetables, or roasted coffee.',
    bullaDesc:
      'High-grade white starch extracted by squeezing the scraped leaf-sheaths. Cooked into nourishing porridge, dumplings, or medicinal soup.',
    amichoDesc:
      'Boiled young enset corm, soft and potato-like in texture, consumed with highland spiced butter (Nit\'ir Qibe) and fresh milk.',
    stapleCropsSummary:
      'Teff (golden & brown varieties), highland barley, wheat, maize, taro (godere), and sweet potatoes cultivated in agroforestry terraces.',
    cashCropsSummary:
      'World-class specialty Arabica coffee, highland khat, organic avocado trees, and native forest-canopy apiculture (wildflower & coffee blossom honey).',
    livestockSummary:
      'Highland Zebu cattle, wool-bearing sheep, dairy goats, and village poultry fed year-round on nutritious enset leaves.',
  },
  visitorGuide: {
    routes:
      'Fly to Hawassa Airport (or drive south from Addis Ababa on the modern expressway ~380km). From Hawassa, travel through Dilla (Gedeo capital) and Yirgacheffe town on scenic paved mountain roads into Gedeb.',
    harvestPeriod:
      'November through January is the most magical window: hillsides are alive with bright red coffee cherries and thousands of raised drying beds turn golden in the mountain sun.',
    climateAttire:
      'Sub-tropical mountain climate. Days are sunny and warm (20°C - 24°C), while nights are cool (9°C - 13°C). Bring light layers, sturdy hiking shoes for highland trails, and rain gear.',
    etiquette:
      'Always accept the third cup of coffee (Baraka) during Buna ceremonies. Ask permission before photographing farmers or drying stations. Support local cooperatives by purchasing freshly roasted coffee in Gedeb town.',
  },
};

const STORAGE_KEY = 'gedeb_municipal_store_v2';

interface MunicipalDataContextType {
  data: MunicipalStore;
  updateWoredaAdmin: (admin: Partial<LeaderProfile>) => void;
  updateCityMayor: (mayor: Partial<LeaderProfile>) => void;
  addBank: (bank: Omit<BankEntity, 'id'>) => void;
  updateBank: (id: string, bank: Partial<BankEntity>) => void;
  deleteBank: (id: string) => void;
  addGasStation: (station: Omit<GasStationEntity, 'id'>) => void;
  updateGasStation: (id: string, station: Partial<GasStationEntity>) => void;
  deleteGasStation: (id: string) => void;
  updateHospital: (hospital: Partial<HospitalData>) => void;
  updateMarket: (market: Partial<MarketData>) => void;
  updateTelecom: (telecom: Partial<TelecomData>) => void;
  addSchool: (school: Omit<SchoolEntity, 'id'>) => void;
  updateSchool: (id: string, school: Partial<SchoolEntity>) => void;
  deleteSchool: (id: string) => void;
  addKebele: (kebele: Omit<KebeleEntity, 'id'>) => void;
  updateKebele: (id: string, kebele: Partial<KebeleEntity>) => void;
  deleteKebele: (id: string) => void;
  addWashingStation: (station: WashingStation) => void;
  updateWashingStation: (id: string, station: Partial<WashingStation>) => void;
  deleteWashingStation: (id: string) => void;
  updateCityOverview: (overview: Partial<CityOverviewData>) => void;
  updateCoffeeData: (coffee: Partial<CoffeeData>) => void;
  updateEnsetAgriculture: (enset: Partial<EnsetAgricultureData>) => void;
  updateVisitorGuide: (guide: Partial<VisitorGuideData>) => void;
  resetToDefaults: () => void;
  exportBackupJson: () => void;
  importBackupJson: (jsonString: string) => boolean;
}

const MunicipalDataContext = createContext<MunicipalDataContextType | undefined>(undefined);

export const MunicipalDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<MunicipalStore>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_MUNICIPAL_DATA,
          ...parsed,
          woredaAdmin: { ...DEFAULT_MUNICIPAL_DATA.woredaAdmin, ...parsed.woredaAdmin },
          cityMayor: { ...DEFAULT_MUNICIPAL_DATA.cityMayor, ...parsed.cityMayor },
          cityOverview: { ...DEFAULT_MUNICIPAL_DATA.cityOverview, ...parsed.cityOverview },
          coffeeData: { ...DEFAULT_MUNICIPAL_DATA.coffeeData, ...parsed.coffeeData },
          ensetAgriculture: { ...DEFAULT_MUNICIPAL_DATA.ensetAgriculture, ...parsed.ensetAgriculture },
          telecom: { ...DEFAULT_MUNICIPAL_DATA.telecom, ...parsed.telecom },
          visitorGuide: { ...DEFAULT_MUNICIPAL_DATA.visitorGuide, ...parsed.visitorGuide },
        };
      }
    } catch (e) {
      console.error('Failed to load municipal data from localStorage', e);
    }
    return DEFAULT_MUNICIPAL_DATA;
  });

  // Auto-persist to localStorage on state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save municipal data to localStorage', e);
    }
  }, [data]);

  const updateWoredaAdmin = (updated: Partial<LeaderProfile>) => {
    setData((prev) => ({
      ...prev,
      woredaAdmin: { ...prev.woredaAdmin, ...updated },
    }));
  };

  const updateCityMayor = (updated: Partial<LeaderProfile>) => {
    setData((prev) => ({
      ...prev,
      cityMayor: { ...prev.cityMayor, ...updated },
    }));
  };

  const addBank = (bank: Omit<BankEntity, 'id'>) => {
    const id = `bank-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      banks: [...prev.banks, { ...bank, id }],
    }));
  };

  const updateBank = (id: string, updated: Partial<BankEntity>) => {
    setData((prev) => ({
      ...prev,
      banks: prev.banks.map((b) => (b.id === id ? { ...b, ...updated } : b)),
    }));
  };

  const deleteBank = (id: string) => {
    setData((prev) => ({
      ...prev,
      banks: prev.banks.filter((b) => b.id !== id),
    }));
  };

  const addGasStation = (station: Omit<GasStationEntity, 'id'>) => {
    const id = `station-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      gasStations: [...prev.gasStations, { ...station, id }],
    }));
  };

  const updateGasStation = (id: string, updated: Partial<GasStationEntity>) => {
    setData((prev) => ({
      ...prev,
      gasStations: prev.gasStations.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
  };

  const deleteGasStation = (id: string) => {
    setData((prev) => ({
      ...prev,
      gasStations: prev.gasStations.filter((s) => s.id !== id),
    }));
  };

  const updateHospital = (updated: Partial<HospitalData>) => {
    setData((prev) => ({
      ...prev,
      hospital: { ...prev.hospital, ...updated },
    }));
  };

  const updateMarket = (updated: Partial<MarketData>) => {
    setData((prev) => ({
      ...prev,
      market: { ...prev.market, ...updated },
    }));
  };

  const updateTelecom = (updated: Partial<TelecomData>) => {
    setData((prev) => ({
      ...prev,
      telecom: { ...prev.telecom, ...updated },
    }));
  };

  const addSchool = (school: Omit<SchoolEntity, 'id'>) => {
    const id = `school-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      schools: [...prev.schools, { ...school, id }],
    }));
  };

  const updateSchool = (id: string, updated: Partial<SchoolEntity>) => {
    setData((prev) => ({
      ...prev,
      schools: prev.schools.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
  };

  const deleteSchool = (id: string) => {
    setData((prev) => ({
      ...prev,
      schools: prev.schools.filter((s) => s.id !== id),
    }));
  };

  const addKebele = (kebele: Omit<KebeleEntity, 'id'>) => {
    const id = `kebele-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      kebeles: [...prev.kebeles, { ...kebele, id }],
    }));
  };

  const updateKebele = (id: string, updated: Partial<KebeleEntity>) => {
    setData((prev) => ({
      ...prev,
      kebeles: prev.kebeles.map((k) => (k.id === id ? { ...k, ...updated } : k)),
    }));
  };

  const deleteKebele = (id: string) => {
    setData((prev) => ({
      ...prev,
      kebeles: prev.kebeles.filter((k) => k.id !== id),
    }));
  };

  const addWashingStation = (station: WashingStation) => {
    setData((prev) => ({
      ...prev,
      washingStations: [...prev.washingStations, station],
    }));
  };

  const updateWashingStation = (id: string, updated: Partial<WashingStation>) => {
    setData((prev) => ({
      ...prev,
      washingStations: prev.washingStations.map((w) => (w.id === id ? { ...w, ...updated } : w)),
    }));
  };

  const deleteWashingStation = (id: string) => {
    setData((prev) => ({
      ...prev,
      washingStations: prev.washingStations.filter((w) => w.id !== id),
    }));
  };

  const updateCityOverview = (overview: Partial<CityOverviewData>) => {
    setData((prev) => ({
      ...prev,
      cityOverview: { ...prev.cityOverview, ...overview },
    }));
  };

  const updateCoffeeData = (coffee: Partial<CoffeeData>) => {
    setData((prev) => ({
      ...prev,
      coffeeData: { ...prev.coffeeData, ...coffee },
    }));
  };

  const updateEnsetAgriculture = (enset: Partial<EnsetAgricultureData>) => {
    setData((prev) => ({
      ...prev,
      ensetAgriculture: { ...prev.ensetAgriculture, ...enset },
    }));
  };

  const updateVisitorGuide = (guide: Partial<VisitorGuideData>) => {
    setData((prev) => ({
      ...prev,
      visitorGuide: { ...prev.visitorGuide, ...guide },
    }));
  };

  const resetToDefaults = () => {
    setData(DEFAULT_MUNICIPAL_DATA);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportBackupJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gedeb_municipal_data_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importBackupJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.woredaAdmin && parsed.cityMayor && Array.isArray(parsed.banks)) {
        setData((prev) => ({
          ...prev,
          ...parsed,
        }));
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON file format', e);
    }
    return false;
  };

  return (
    <MunicipalDataContext.Provider
      value={{
        data,
        updateWoredaAdmin,
        updateCityMayor,
        addBank,
        updateBank,
        deleteBank,
        addGasStation,
        updateGasStation,
        deleteGasStation,
        updateHospital,
        updateMarket,
        updateTelecom,
        addSchool,
        updateSchool,
        deleteSchool,
        addKebele,
        updateKebele,
        deleteKebele,
        addWashingStation,
        updateWashingStation,
        deleteWashingStation,
        updateCityOverview,
        updateCoffeeData,
        updateEnsetAgriculture,
        updateVisitorGuide,
        resetToDefaults,
        exportBackupJson,
        importBackupJson,
      }}
    >
      {children}
    </MunicipalDataContext.Provider>
  );
};

export const useMunicipalData = () => {
  const context = useContext(MunicipalDataContext);
  if (!context) {
    throw new Error('useMunicipalData must be used within a MunicipalDataProvider');
  }
  return context;
};
