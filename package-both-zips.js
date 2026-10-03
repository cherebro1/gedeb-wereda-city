import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

async function addDirectoryToZip(zip, dirPath, rootDir, excludeList = [], fileOverrides = {}) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(rootDir, fullPath);

    if (
      entry.name === 'node_modules' ||
      entry.name === '.git' ||
      entry.name === 'dist' ||
      entry.name === 'bun.lock' ||
      entry.name.endsWith('.zip') ||
      relativePath.startsWith('public/gedeb_')
    ) {
      continue;
    }

    if (excludeList.includes(relativePath) || excludeList.includes(entry.name)) {
      continue;
    }

    if (entry.isDirectory()) {
      const folderZip = zip.folder(entry.name);
      await addDirectoryToZip(folderZip, fullPath, rootDir, excludeList, fileOverrides);
    } else {
      if (fileOverrides[relativePath]) {
        zip.file(entry.name, fileOverrides[relativePath]);
      } else {
        const fileData = fs.readFileSync(fullPath);
        zip.file(entry.name, fileData);
      }
    }
  }
}

async function buildPublicZip(rootDir) {
  const zip = new JSZip();

  // Public-specific README
  const publicReadme = `# Gedeb City & Woreda — Public Showcase Website

The official, clean public web application showcasing **Gedeb City Administration** and **Gedeb Woreda** (Gedeo Zone, South Ethiopia Regional State).

This package is the **Public Showcase Edition** (without administrative portal or password gates). It is ready for public web hosting, tourist boards, green coffee buyers, or municipal exhibition.

## Included Pages & Sections
- **City & Heritage**: High-altitude terroir, UNESCO Gedeo Cultural Landscape, living agroforestry.
- **Enset (False Banana) & Multi-Crop Polyculture**: Drought-resistant miracle tree ("sets"/Enset), Teff grains, cash crops, and highland cattle.
- **Specialty Coffee Sanctuary**: Heirloom varieties (Kurume, Dega, Wolisho), washing stations, tasting wheel, and traditional Ethiopian Buna Ceremony.
- **Micro-Regions & Terroir**: Filterable washing stations directory (Worka Sakaro, Banko Gotiti, Chelchele, Halo Beriti, Banko Dhadhato).
- **Civic Governance**: Leadership profiles, Gedeb General Hospital, 4G networks (Ethio telecom & Safaricom), 5 commercial banks, fuel stations, schools.
- **Visitor Guide**: Flight & highway travel routes, peak harvest calendar, packing guide, cultural etiquette.
- **Real-Time Weather**: Live Open-Meteo elevation telemetry for Gedeb.

## Getting Started
\`\`\`bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
\`\`\`
`;

  // Public App.tsx without admin listeners or admin modal
  const publicAppTsx = `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar, PageTab } from './components/Navbar';
import type { Variants } from 'motion/react';
import { HeroSection } from './components/HeroSection';
import { CityOverview } from './components/CityOverview';
import { AgroforestryCrops } from './components/AgroforestryCrops';
import { LocalWeather } from './components/LocalWeather';
import { CoffeeSanctuary } from './components/CoffeeSanctuary';
import { BunaCeremony } from './components/BunaCeremony';
import { WashingStations } from './components/WashingStations';
import { CivicAdministration } from './components/CivicAdministration';
import { VisitorGuide } from './components/VisitorGuide';
import { Footer } from './components/Footer';
import { MunicipalDataProvider } from './context/MunicipalDataContext';
import { Sparkles, Building2, ArrowRight } from 'lucide-react';
import { IMAGES } from './assets/images';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('overview');

  const pageVariants: Variants = {
    initial: { opacity: 0, y: 12, scale: 0.99 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: 'easeOut' } },
    exit: { opacity: 0, y: -12, scale: 0.99, transition: { duration: 0.18, ease: 'easeIn' } },
  };

  const handleNavigate = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MunicipalDataProvider>
      <div className="min-h-screen flex flex-col bg-[#fafaf6] text-stone-900 font-sans selection:bg-emerald-900 selection:text-white">
        <Navbar activeTab={activeTab} onSelectTab={handleNavigate} />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div key="overview" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <HeroSection onNavigate={handleNavigate} />
                <CityOverview />
                <AgroforestryCrops />
                <LocalWeather />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                  <div className="bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 shadow-xl grid grid-cols-1 md:grid-cols-12 items-center">
                    <div className="md:col-span-7 p-8 sm:p-10 text-white">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Civic Governance & Urban Infrastructure</span>
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold font-serif-display text-white">
                        Gedeb Woreda Administrator & City Mayor
                      </h3>
                      <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed">
                        Explore the leadership of Gedeb Woreda & City, Gedeb General Hospital, 4G networks (Ethio telecom & Safaricom), Tuesday & Friday market days, 5 major commercial banks, fuel stations, and multi-faith unity.
                      </p>
                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => handleNavigate('civic')}
                          className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
                        >
                          <Building2 className="w-4 h-4 text-stone-900" />
                          <span>Explore Leadership & Services</span>
                          <ArrowRight className="w-4 h-4 text-stone-900" />
                        </button>
                      </div>
                    </div>
                    <div className="md:col-span-5 h-64 md:h-full min-h-[220px] relative">
                      <img
                        src={IMAGES.cityNight}
                        alt="Gedeb city at night"
                        className="w-full h-full object-cover object-center filter brightness-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-stone-900 via-transparent to-transparent" />
                      <div className="absolute bottom-3 right-3 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[11px] text-amber-200">
                        Gedeb Night Promenade
                      </div>
                    </div>
                  </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                  <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-950 rounded-2xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="max-w-xl">
                      <span className="text-xs uppercase font-semibold text-amber-300 tracking-wider">
                        The Ethiopian Buna Ritual
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold font-serif-display mt-1 text-white">
                        Experience the Authentic 3-Cup Buna Ceremony
                      </h3>
                      <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed">
                        Discover why every gathering in Gedeb starts with the aroma of charcoal roasting and the blessings of Abol, Tona, and Baraka.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate('ceremony')}
                      className="flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      <Sparkles className="w-4 h-4 text-stone-900" />
                      <span>Enter Ceremony Room</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'coffee' && (
              <motion.div key="coffee" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <CoffeeSanctuary />
              </motion.div>
            )}

            {activeTab === 'ceremony' && (
              <motion.div key="ceremony" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <BunaCeremony />
              </motion.div>
            )}

            {activeTab === 'stations' && (
              <motion.div key="stations" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <WashingStations />
              </motion.div>
            )}

            {activeTab === 'civic' && (
              <motion.div key="civic" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <CivicAdministration />
              </motion.div>
            )}

            {activeTab === 'guide' && (
              <motion.div key="guide" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <VisitorGuide />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer onNavigate={handleNavigate} />
      </div>
    </MunicipalDataProvider>
  );
}
`;

  // Public package.json without zip script
  const publicPkgJson = JSON.stringify(
    {
      name: 'gedeb-city-public-showcase',
      private: true,
      version: '1.0.0',
      type: 'module',
      scripts: {
        dev: 'vite --port=3000 --host=0.0.0.0',
        build: 'vite build',
        preview: 'vite preview',
        lint: 'tsc --noEmit',
      },
      dependencies: {
        'lucide-react': '^0.546.0',
        motion: '^12.23.24',
        react: '^19.0.1',
        'react-dom': '^19.0.1',
      },
      devDependencies: {
        '@tailwindcss/vite': '^4.3.3',
        '@types/node': '^22.14.0',
        '@types/react': '^19.3.0',
        '@types/react-dom': '^19.3.0',
        '@vitejs/plugin-react': '^6.1.1',
        tailwindcss: '^4.3.3',
        typescript: '^7.0.2',
        vite: '^8.3.0',
      },
    },
    null,
    2
  );

  const excludeList = [
    'src/components/AdminPortal.tsx',
    'src/utils/zipGenerator.ts',
    'src/utils',
    'scripts/generate-zip.js',
    'scripts/package-both-zips.js',
    'scripts',
  ];

  const fileOverrides = {
    'README.md': publicReadme,
    'src/App.tsx': publicAppTsx,
    'package.json': publicPkgJson,
  };

  await addDirectoryToZip(zip, rootDir, rootDir, excludeList, fileOverrides);

  const content = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });

  const outPublic = path.join(rootDir, 'public', 'gedeb_public_website.zip');
  fs.writeFileSync(outPublic, content);
  console.log('Created Public ZIP:', outPublic, `(${Math.round(content.length / 1024)} KB)`);
}

async function buildAdminZip(rootDir) {
  const zip = new JSZip();

  const adminReadme = `# Gedeb City & Woreda — Full Administrative Master Suite

The complete master web application and administrative management system for **Gedeb City Administration** and **Gedeb Woreda** (Gedeo Zone, South Ethiopia Regional State).

This package is the **Admin Master Edition**, featuring the full hidden administrative portal, live state persistence, washing station manager, municipal leadership editor, and data backup/restore engine.

## Administration Features
- **Hidden Admin Portal**: Access by appending \`#admin\` to the URL (e.g. \`http://localhost:3000/#admin\`) or press \`Ctrl+Shift+A\` (or \`Alt+A\`), or click the discreet lock in the footer.
- **Passcode Protection**: Default passcode: \`gedeb2026\` (or \`admin\`).
- **Live Persistence**: Changes made in the Admin Portal are instantly synchronized with localStorage and displayed across all site pages.
- **Executive Leadership**: Easily change the Gedeb Woreda Chief Administrator and Gedeb City Mayor (photos, bio, titles, phone numbers).
- **Terroir & Kebeles**: Add, edit, or remove washing stations (elevation, SCA scores, flavor profiles) and kebeles.
- **Civic Institutions**: Add, edit, or remove commercial banks, hospital hotlines, gas stations, and schools.
- **Enset & Agriculture**: Edit wonder plant data ("sets"/Enset), Kocho/Bulla/Amicho, staple crops, and livestock.
- **Dual ZIP Generator**: Generate and export public and admin ZIP packages anytime with \`npm run zip\`.

## Getting Started
\`\`\`bash
# 1. Install dependencies
npm install

# 2. Start local dev server
npm run dev

# 3. Access public site
http://localhost:3000

# 4. Access Admin Portal
http://localhost:3000/#admin
# Passcode: gedeb2026
\`\`\`
`;

  const excludeList = [];
  const fileOverrides = {
    'README.md': adminReadme,
  };

  await addDirectoryToZip(zip, rootDir, rootDir, excludeList, fileOverrides);

  const content = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });

  const outAdmin = path.join(rootDir, 'public', 'gedeb_admin_master.zip');
  fs.writeFileSync(outAdmin, content);
  console.log('Created Admin ZIP:', outAdmin, `(${Math.round(content.length / 1024)} KB)`);

  // Also update standard gedeb_source_code.zip to match admin master
  const outSource = path.join(rootDir, 'public', 'gedeb_source_code.zip');
  fs.writeFileSync(outSource, content);
}

async function run() {
  const rootDir = process.cwd();
  console.log('Starting dual packaging process in:', rootDir);
  await buildPublicZip(rootDir);
  await buildAdminZip(rootDir);
  console.log('Dual ZIP generation completed successfully!');
}

run().catch((err) => {
  console.error('Packaging failed:', err);
  process.exit(1);
});
