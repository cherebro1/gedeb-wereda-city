import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'am';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.overview': 'City & Heritage',
    'nav.coffee': 'Coffee Sanctuary',
    'nav.ceremony': 'Buna Ceremony',
    'nav.stations': 'Terroir & Kebeles',
    'nav.civic': 'Civic & Leadership',
    'nav.guide': 'Visitor Guide',
    'brand.title': 'GEDEB',
    'brand.sub': 'City & Woreda',
    'brand.tagline': 'Specialty Coffee Capital',

    // Common Buttons & Actions
    'btn.explore': 'Explore Gedeb',
    'btn.inquire_samples': 'Inquire for Samples',
    'btn.view_map': 'Interactive Terroir Map',
    'btn.enter_ceremony': 'Enter Ceremony Room',
    'btn.close': 'Close',
    'btn.submit': 'Submit Request',
    'btn.download_pwa': 'Install App (Offline Ready)',

    // Header kickers
    'kicker.highland': 'Elevation 2,200m • Gedeo Zone, South Ethiopia',
    'kicker.unesco': 'UNESCO Cultural Landscape • Specialty Coffee Terroir',
    'kicker.civic': 'Civic Governance & Modern Infrastructure • Gedeo Zone',

    // Sample Request Modal
    'sample.title': 'Specialty Coffee Sample & Direct Trade Inquiry',
    'sample.desc': 'Connect directly with Gedeb cooperative washing stations and woreda agricultural desks. Certified Grade 1 washed, natural, and anaerobic microlots.',
    'sample.roastery_name': 'Roastery / Company Name',
    'sample.buyer_name': 'Contact Person',
    'sample.email': 'Official Work Email',
    'sample.country': 'Destination Country & Port',
    'sample.kebele': 'Target Kebele / Washing Station',
    'sample.process': 'Processing Style Preference',
    'sample.volume': 'Estimated Annual Volume / Requirement',
    'sample.notes': 'Cupping Score Profile & Target Notes',
    'sample.submit_btn': 'Dispatch Sample Request',
    'sample.success': 'Your microlot inquiry has been logged! Reference #GDB-2026-EXPORT',
  },
  am: {
    // Navigation
    'nav.overview': 'ከተማ እና ቅርስ',
    'nav.coffee': 'የቡና ማዕከል',
    'nav.ceremony': 'የቡና ስነ-ስርዓት',
    'nav.stations': 'ተራራማ ቀበሌዎች',
    'nav.civic': 'አመራር እና አገልግሎት',
    'nav.guide': 'የጎብኝዎች መመሪያ',
    'brand.title': 'ገደብ',
    'brand.sub': 'ከተማ እና ወረዳ',
    'brand.tagline': 'የልዩ ቡና መፍለቂያ',

    // Common Buttons & Actions
    'btn.explore': 'ገደብን ይጎብኙ',
    'btn.inquire_samples': 'የቡና ናሙና ይጠይቁ',
    'btn.view_map': 'የቀበሌዎች ካርታ',
    'btn.enter_ceremony': 'ወደ ስነ-ስርዓቱ ይግቡ',
    'btn.close': 'ዝጋ',
    'btn.submit': 'ጥያቄውን ይላኩ',
    'btn.download_pwa': 'መተግበሪያውን ይጫኑ (ከኢንተርኔት ውጭ)',

    // Header kickers
    'kicker.highland': 'ከፍታ 2,200 ሜትር • ጌዴኦ ዞን፣ ደቡብ ኢትዮጵያ',
    'kicker.unesco': 'የዩኔስኮ የባህል ቅርስ • የልዩ ቡና ምድር',
    'kicker.civic': 'የከተማ አመራር እና መሰረተ ልማት • ጌዴኦ ዞን',

    // Sample Request Modal
    'sample.title': 'የልዩ ቡና ናሙና እና የቀጥታ ንግድ ጥያቄ',
    'sample.desc': 'ከገደብ ቡና አጣቢ ጣቢያዎች እና የግብርና ጽ/ቤት ጋር በቀጥታ ይገናኙ። አንደኛ ደረጃ የታጠበ፣ ያልታጠበ እና አናኤሮቢክ ቡና።',
    'sample.roastery_name': 'የድርጅት / የቡና አምራች ስም',
    'sample.buyer_name': 'የተወካይ ስም',
    'sample.email': 'ኢሜይል አድራሻ',
    'sample.country': 'መዳረሻ ሀገር እና ወደብ',
    'sample.kebele': 'የሚፈልጉት ቀበሌ / ጣቢያ',
    'sample.process': 'የቡና ዝግጅት አይነት',
    'sample.volume': 'የሚፈለገው መጠን / ፍላጎት',
    'sample.notes': 'የጣዕም ዝርዝር እና መስፈርት',
    'sample.submit_btn': 'የናሙና ጥያቄውን ላክ',
    'sample.success': 'የቡና ናሙና ጥያቄዎ በተሳካ ሁኔታ ተመዝግቧል! መለያ ቁጥር #GDB-2026-EXPORT',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('gedeb_site_lang');
      return (saved === 'am' || saved === 'en') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('gedeb_site_lang', newLang);
    } catch (e) {
      console.warn('Could not save language to localStorage', e);
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'am' : 'en');
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
