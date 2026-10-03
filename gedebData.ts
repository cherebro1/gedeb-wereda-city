export interface WashingStation {
  id: string;
  name: string;
  amharicName: string;
  elevation: string;
  altitudeMeters: number;
  kebelle: string;
  harvestWindow: string;
  flavorNotes: string[];
  scaScoreRange: string;
  primaryVarieties: string[];
  processingTypes: ('Washed' | 'Natural' | 'Honey / Anaerobic')[];
  description: string;
  tastingQuote: string;
}

export interface BunaStep {
  stepNumber: number;
  amharicTitle: string;
  englishTitle: string;
  tagline: string;
  description: string;
  ritualSignificance: string;
  sensoryNote: string;
  cupRound?: {
    name: string;
    amharic: string;
    meaning: string;
  };
}

export const GEDEB_METRICS = {
  elevationMin: 1950,
  elevationMax: 2350,
  avgAnnualRainfall: '1,850 - 2,100 mm',
  harvestSeason: 'Late October to Mid-January',
  soilType: 'Deep, fertile volcanic red-brown loam',
  canopyStyle: 'Multi-strata Enset (False Banana) & indigenous shade',
  cooperativeNetwork: 'Over 12,000 smallholder agroforestry farmers',
  scaRange: '88 - 93+ points',
};

export const WASHING_STATIONS: WashingStation[] = [
  {
    id: 'worka-sakaro',
    name: 'Worka Sakaro',
    amharicName: 'ዎርቃ ሳቃሮ',
    elevation: '2,050m - 2,250m',
    altitudeMeters: 2150,
    kebelle: 'Worka Sakaro Kebele, Gedeb Woreda',
    harvestWindow: 'November – January',
    flavorNotes: ['Jasmine Blossom', 'Bergamot', 'White Peach', 'Earl Grey Tea', 'Lime Honey'],
    scaScoreRange: '89.5 - 92.5',
    primaryVarieties: ['Kurume (Dega)', 'Wolisho', 'Indigenous Heirloom'],
    processingTypes: ['Washed', 'Natural'],
    description: 'Worka Sakaro sits in the highest reaches of eastern Gedeb. Cold mountain nights slow coffee cherry maturation, yielding unmatched floral intensity and sparkling citrus acidity revered in world cupping championships.',
    tastingQuote: '“Like sipping liquid jasmine tea steeped with fresh white peach and Bergamot oil.”',
  },
  {
    id: 'banko-gotiti',
    name: 'Banko Gotiti',
    amharicName: 'ባንቆ ጎቲቲ',
    elevation: '2,100m - 2,300m',
    altitudeMeters: 2200,
    kebelle: 'Banko Gotiti Kebele, Gedeb Woreda',
    harvestWindow: 'November – January',
    flavorNotes: ['Wild Blueberry', 'Lavender', 'Meyer Lemon', 'Apricot Jam', 'Silky Cocoa'],
    scaScoreRange: '90.0 - 93.0',
    primaryVarieties: ['74110 & 74112 Landraces', 'Local Heirloom'],
    processingTypes: ['Natural', 'Honey / Anaerobic'],
    description: 'Celebrated worldwide for naturally processed micro-lots dried slowly on 150+ raised African mesh beds. The extreme altitude infuses deep berry notes and vibrant wine-like sweetness.',
    tastingQuote: '“An explosion of sweet blueberry nectar, lavender perfume, and creamy Meyer lemon.”',
  },
  {
    id: 'chelchele',
    name: 'Chelchele',
    amharicName: 'ጨልጨሌ',
    elevation: '1,950m - 2,150m',
    altitudeMeters: 2050,
    kebelle: 'Chelchele Kebele, Gedeb Woreda',
    harvestWindow: 'October – December',
    flavorNotes: ['Orange Blossom', 'Nectarine', 'Crisp Black Tea', 'Wild Honey', 'Lemongrass'],
    scaScoreRange: '88.5 - 91.5',
    primaryVarieties: ['Kurume', 'Heirloom Gedeo'],
    processingTypes: ['Washed', 'Honey / Anaerobic'],
    description: 'Fed by pristine river waters running from the highland ridges, Chelchele washing station is famous for exceptionally clean washed coffees with balanced sweet stone fruit and refreshing citrus finish.',
    tastingQuote: '“Silky and crystalline, glowing with sweet nectarine and wild forest honey.”',
  },
  {
    id: 'halo-beriti',
    name: 'Halo Beriti',
    amharicName: 'ሃሎ በሪቲ',
    elevation: '2,000m - 2,220m',
    altitudeMeters: 2110,
    kebelle: 'Halo Beriti Kebele, Gedeb Woreda',
    harvestWindow: 'November – January',
    flavorNotes: ['Crisp Red Apple', 'Raspberry', 'Mandarin Orange', 'Panela Sugar', 'Chamomile'],
    scaScoreRange: '89.0 - 92.0',
    primaryVarieties: ['Dega', 'Wolisho'],
    processingTypes: ['Washed', 'Natural'],
    description: 'Located in the southern hills bordering Oromia Guji, Halo Beriti brings together crisp fruit acids with deep panela sugarcane sweetness. Smallholders cultivate trees on plots averaging less than one hectare.',
    tastingQuote: '“Bright red raspberry meets soothing chamomile tea and caramelized brown sugar.”',
  },
  {
    id: 'banko-dhadhato',
    name: 'Banko Dhadhato',
    amharicName: 'ባንቆ ዳዳቶ',
    elevation: '2,150m - 2,350m',
    altitudeMeters: 2250,
    kebelle: 'Banko Dhadhato Kebele, Gedeb Woreda',
    harvestWindow: 'December – January',
    flavorNotes: ['Honeysuckle', 'Ripe Papaya', 'Sweet Tangerine', 'Cardamom', 'Golden Raisin'],
    scaScoreRange: '89.5 - 92.5',
    primaryVarieties: ['Local High-Altitude Landraces'],
    processingTypes: ['Washed', 'Natural'],
    description: 'One of the highest inhabited coffee zones on the planet. Trees produce smaller, dense beans with concentrated sugars and lingering exotic spice undertones.',
    tastingQuote: '“Concentrated sweetness with exotic tropical papaya and aromatic spice complexity.”',
  },
];

export const BUNA_CEREMONY_STEPS: BunaStep[] = [
  {
    stepNumber: 1,
    amharicTitle: 'እጥበትና ዝግጅት',
    englishTitle: 'Washing & Sorting the Green Heirloom Beans',
    tagline: 'Fresh green cherries from the mountain garden',
    description: 'Freshly hulled green Arabica beans are hand-washed in cool spring water to remove parchment chaff. Defective beans are patiently sorted out on flat woven straw mats (Sefét).',
    ritualSignificance: 'Purification and honor: welcoming the household and travelers into a peaceful sanctuary of shared communion.',
    sensoryNote: 'Crisp herbal aroma of fresh wet unroasted heirloom beans mingling with highland morning air.',
  },
  {
    stepNumber: 2,
    amharicTitle: 'ማመስ በእሳት',
    englishTitle: 'Charcoal Roasting on the Menkeshkësha',
    tagline: 'Crackling beans over glowing charcoal embers',
    description: 'The green beans are roasted over glowing wood charcoal in a flat iron skillet (Menkeshkësha). Stirred continuously until they reach an even, glistening chestnut-to-dark roast.',
    ritualSignificance: 'The host walks the smoking skillet around the room so every seated guest can cup the fragrant smoke with their hands and inhale the freshly released aromatic oils.',
    sensoryNote: 'Intense sweet toasted sugar, caramelized jasmine, roasted nuts, and warm cocoa.',
  },
  {
    stepNumber: 3,
    amharicTitle: 'መውቀጥና ዕጣን',
    englishTitle: 'Mortar Crushing & Sacred Frankincense',
    tagline: 'The rhythm of the wooden mortar and sweet Itan incense',
    description: 'While the clay pot (Jebena) heats with fresh water, the warm beans are crushed by hand using a heavy wooden pestle and mortar (Mukecha & Zenezena). Fragrant Frankincense (Itan) is placed on hot coals.',
    ritualSignificance: 'The rising incense cleanses the spirit and signals to neighbors that the Buna is almost ready—anyone walking by is invited in.',
    sensoryNote: 'Frankincense resin smoke intertwining with freshly cracked, blooming ground coffee.',
  },
  {
    stepNumber: 4,
    amharicTitle: 'ማፍላት በጀበና',
    englishTitle: 'Slow Brewing in the Handcrafted Jebena',
    tagline: 'Clay pot alchemy passed down through centuries',
    description: 'Fresh grounds are funneled into the round belly of the black clay Jebena pot. Cold mountain water is brought to a rolling simmer multiple times to achieve rich extraction and settle sediment.',
    ritualSignificance: 'Patience and harmony: great coffee cannot be rushed. Elders bless the brew while popcorn (Fendisha) or toasted barley (Kollo) is shared.',
    sensoryNote: 'Deep espresso amber crema rising, steam dancing from the curved clay spout.',
  },
  {
    stepNumber: 5,
    amharicTitle: 'ሦስቱ ዙሮች (አቦል፣ ቶና፣ በረካ)',
    englishTitle: 'The Sacred Three Rounds of Pouring',
    tagline: 'From strong contemplation to ultimate community blessing',
    description: 'Poured from high above into handleless ceramic cups (Cini) in one unbroken stream. Guests partake in all three traditional rounds to complete the ritual.',
    ritualSignificance: 'In Ethiopian tradition, drinking coffee is not a transaction; it is a sacred bond. Leaving before the third cup (Bereka) is considered declining a divine blessing.',
    sensoryNote: 'Layered complexity shifting from robust dark berry in Round 1 to sweet, soothing floral tea in Round 3.',
    cupRound: {
      name: 'Abol, Tona & Bereka',
      amharic: 'አቦል ፣ ቶና ፣ በረካ',
      meaning: '1st cup (Abol) awakens the senses; 2nd cup (Tona) sparks deep conversation; 3rd cup (Bereka) seals fellowship and blessing.',
    },
  },
];

export const FLAVOR_CATEGORIES = [
  {
    category: 'Floral & Blossom',
    color: '#047857',
    notes: ['Jasmine', 'Orange Blossom', 'Chamomile', 'Honeysuckle'],
    representativeKebeles: ['Worka Sakaro', 'Chelchele'],
    flavorDescription: 'High-altitude cold nights concentrate aromatic terpenes producing tea-like, perfumed florality.',
  },
  {
    category: 'Citrus & Stone Fruit',
    color: '#c2410c',
    notes: ['Bergamot', 'White Peach', 'Meyer Lemon', 'Nectarine'],
    representativeKebeles: ['Worka Sakaro', 'Banko Gotiti'],
    flavorDescription: 'Sparkling phosphoric and malic acidity reminiscent of fresh mountain stone fruit.',
  },
  {
    category: 'Wild Berry & Winey',
    color: '#991b1b',
    notes: ['Wild Blueberry', 'Raspberry', 'Blackcurrant', 'Dried Cranberry'],
    representativeKebeles: ['Banko Gotiti', 'Halo Beriti'],
    flavorDescription: 'Signature of Gedeb natural processed lots dried intact inside ripe cherries on raised beds.',
  },
  {
    category: 'Honey & Sweet Botanicals',
    color: '#b45309',
    notes: ['Panela Sugarcane', 'Forest Honey', 'Earl Grey Tea', 'Lemongrass'],
    representativeKebeles: ['Chelchele', 'Banko Dhadhato'],
    flavorDescription: 'Rich viscous sweetness derived from mineral-rich volcanic red loam and Enset shade canopy.',
  },
];

export const GEDEB_TRAVEL_GUIDE = [
  {
    title: 'How to Reach Gedeb',
    detail: 'Fly to Hawassa Airport (or drive south from Addis Ababa on the modern expressway ~380km). From Hawassa, travel through Dilla (Gedeo capital) and Yirgacheffe town on scenic paved mountain roads into Gedeb.',
  },
  {
    title: 'Peak Harvest Season',
    detail: 'November through January is the most magical window: hillsides are alive with bright red coffee cherries and thousands of raised drying beds turn golden in the mountain sun.',
  },
  {
    title: 'Climate & Attire',
    detail: 'Sub-tropical mountain climate. Days are sunny and warm (20°C - 24°C), while nights are cool (9°C - 13°C). Bring light layers, sturdy hiking shoes for highland trails, and rain gear.',
  },
  {
    title: 'Living Agroforestry Heritage',
    detail: 'Gedeb is home to the UNESCO-inscribed Gedeo Cultural Landscape, where smallholders have sustained one of Africa’s densest rural populations for millennia through multi-crop agroforestry.',
  },
];

export interface EnsetProfile {
  scientificName: string;
  amharicName: string;
  gedeoName: string;
  phoneticNotes: string;
  famineResilience: string;
  foodProducts: { name: string; amharic: string; description: string }[];
  ecologicalBenefits: string[];
}

export const ENSET_WONDER_PLANT: EnsetProfile = {
  scientificName: 'Ensete ventricosum',
  amharicName: 'እንሰት (የውሸት ሙዝ)',
  gedeoName: 'ዌሳ (Wesa)',
  phoneticNotes: 'Commonly known phonetically as "sets" or "inset", exactly the same indigenous false banana plant.',
  famineResilience:
    'Crowned the "Tree Against Hunger," Enset is exceptionally drought-resistant. Its thick pseudostem and corm store massive reservoirs of water, allowing it to remain vibrant and harvestable at any time of year when seasonal rains fail.',
  foodProducts: [
    {
      name: 'Kocho (ቆጮ)',
      amharic: 'ቆጮ',
      description:
        'The staple highland flatbread made from the scraped, fermented pseudostem and pulverized corm, aged in subterranean pits with sourdough culture.',
    },
    {
      name: 'Bulla (ቡላ)',
      amharic: 'ቡላ',
      description:
        'The pure, water-extracted starch squeezed from the pulp; prepared as a silky restorative porridge or soup prized for bone recovery and digestive health.',
    },
    {
      name: 'Amicho (አሚቾ)',
      amharic: 'አሚቾ',
      description:
        'The boiled corm of young enset plants, eaten hot with spiced butter, similar in texture and sweetness to premium cassava or potato.',
    },
  ],
  ecologicalBenefits: [
    'Provides multi-tiered protective canopy shade preventing scorched coffee leaves',
    'Deep root architecture anchors mountain slopes against torrential highland erosion',
    'Leaves yield high-tensile fiber (Kacha) for packaging, ropes, and local thatch',
    'Green outer sheath serves as critical livestock fodder during dry seasons',
  ],
};

export interface AgriculturalItem {
  id: string;
  name: string;
  amharic: string;
  category: 'staple' | 'cash' | 'livestock';
  tagline: string;
  details: string;
  roleInEconomy: string;
}

export const GEDEB_AGRICULTURE: AgriculturalItem[] = [
  // Staple Crops
  {
    id: 'teff',
    name: 'Teff Grain',
    amharic: 'ጤፍ',
    category: 'staple',
    tagline: 'Ethiopia’s iron-rich ancient super-grain for injera',
    details: 'Cultivated on volcanic hillside plateaus around Gedeb, teff produces the daily staple injera eaten with organic vegetable and meat stews.',
    roleInEconomy: 'Household food independence and local grain market trading on Tuesdays and Fridays.',
  },
  {
    id: 'barley-wheat',
    name: 'Highland Barley & Wheat',
    amharic: 'ገብስና ስንዴ',
    category: 'staple',
    tagline: 'Cold-tolerant grains cultivated at 2,200m–2,350m',
    details: 'Grown on the mist-covered upper ridges of Gedeb where temperatures fall to single digits. Used for roasted Kollo snacks, Genfo (thick porridge), and hearth bread.',
    roleInEconomy: 'Vital nutritional safety net during the highland rainy season.',
  },
  {
    id: 'maize-tubers',
    name: 'Maize, Sweet Potato & Taro (Godere)',
    amharic: 'በቆሎ፣ ስኳር ድንች እና ጎደሬ',
    category: 'staple',
    tagline: 'High-yield garden companion crops',
    details: 'Intercropped directly beneath fruit trees and enset; provides fresh roasted ears in autumn and calorie-rich roots throughout winter.',
    roleInEconomy: 'Staple family sustenance and steady open-market street trade.',
  },
  // Cash Crops Beyond Coffee
  {
    id: 'khat',
    name: 'Khat / Chat',
    amharic: 'ጫት',
    category: 'cash',
    tagline: 'High-value perennial commercial cash crop',
    details: 'Grown on dedicated family plots; freshly harvested green tender shoots are transported daily to trading hubs across South Ethiopia and export corridors.',
    roleInEconomy: 'Immediate year-round weekly cash flow between annual coffee harvest seasons.',
  },
  {
    id: 'avocado-fruits',
    name: 'Avocado & Tropical Fruits',
    amharic: 'አቮካዶ እና ፍራፍሬዎች',
    category: 'cash',
    tagline: 'Lush mountain avocado orchards & papayas',
    details: 'Gedeo highland soil produces exceptionally rich, buttery Hass and local avocado cultivars, alongside highland bananas, mangoes, and papayas.',
    roleInEconomy: 'Rapidly expanding commercial export to regional cities like Hawassa and Addis Ababa.',
  },
  {
    id: 'honey-spices',
    name: 'Highland Forest Honey & Spices',
    amharic: 'የተራራ ማርና ኮረሪማ (ቅመማ ቅመም)',
    category: 'cash',
    tagline: 'Coffee blossom honey & indigenous Korarima cardamom',
    details: 'Harvested from log and modern frame hives suspended in Cordia and Enset trees. The bees feast on sweet white coffee flowers, yielding fragrant amber honey.',
    roleInEconomy: 'High-margin premium commodity sold at Gedeb market and regional cooperatives.',
  },
  // Livestock & Pastoral Heritage
  {
    id: 'cattle-dairy',
    name: 'Highland Zebu Cattle & Butter (Qibe)',
    amharic: 'የሀገር በሬዎች፣ የወተት ላሞችና ቅቤ',
    category: 'livestock',
    tagline: 'Draft oxen, rich dairy milk & spiced clarified butter',
    details: 'Indigenous zebu cattle graze on mountain pastures and enset foliage. Cows produce milk churned into renowned aromatic Gedeo butter (Qibe) and yogurt (Ergo).',
    roleInEconomy: 'Plowing terraced soils, producing organic manure for coffee/enset, and major wealth savings.',
  },
  {
    id: 'sheep-goats',
    name: 'Highland Sheep & Mountain Goats',
    amharic: 'የደጋ በጎችና ፍየሎች',
    category: 'livestock',
    tagline: 'Cold-hardy sheep with thick woolen fleece',
    details: 'Thriving in the chilly nighttime climate of Gedeb, highland sheep are easily managed on small agroforestry plots and steep ravines.',
    roleInEconomy: 'Liquid capital for school fees, wedding celebrations, and holiday feasts.',
  },
  {
    id: 'apiculture-poultry',
    name: 'Traditional Apiculture & Poultry',
    amharic: 'የንብ እርባታ እና የዶሮ እርባታ',
    category: 'livestock',
    tagline: 'Forest canopy beekeeping & free-range village poultry',
    details: 'Traditional cylindrical hives woven from highland bamboo and straw hang high in shade trees, maintaining biodiversity and pollination across farms.',
    roleInEconomy: 'Essential biological pollination for coffee blossoms and recurring household income.',
  },
];
