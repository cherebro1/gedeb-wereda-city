# Gedeb City (ገደብ) — Project Documentation
### The Highland Cradle of Specialty Coffee & Gedeo Cultural Agroforestry

---

## 1. Executive Overview

**Gedeb City Showcase** is a modern, high-fidelity web application engineered to celebrate and document **Gedeb Woreda** (Gedeo Zone, South Ethiopia Regional State). Located at extreme elevations between **1,950m and 2,350m** above sea level, Gedeb is celebrated by international specialty coffee roasters, agronomists, and baristas as the premier origin of floral, tea-like, and berry-rich heirloom Arabica coffee.

The application serves three primary functions:
1. **Cultural & Agronomic Storytelling**: Documenting the UNESCO-recognized Gedeo agroforestry system, the indigenous *Enset* (False Banana) polyculture, and the ancient Ethiopian *Buna* coffee ceremony.
2. **Sensory Terroir Explorer**: Providing interactive cupping flavor wheels, micro-station breakdowns (Worka Sakaro, Banko Gotiti, Chelchele, Halo Beriti, Banko Dhadhato), and processing analysis (Washed, Natural, Anaerobic/Honey).
3. **Open Source & Instant Deployment**: Equipping users, developers, and municipality advocates with ready-to-run source code, a client-side 1-click ZIP packager, and direct GitHub deployment workflows.

---

## 2. Technology Stack & Architectural Decisions

| Layer / Library | Version | Technical Purpose & Implementation Rationale |
| :--- | :--- | :--- |
| **React** | `^19.0.1` | UI runtime leveraging modern functional components, declarative state management, and optimized hydration. |
| **TypeScript** | `^7.0.2` | Strict compile-time type safety across all domain models (washing stations, elevations, cupping notes, ritual phases). |
| **Tailwind CSS** | `^4.3.3` | Next-generation engine utilizing modern `@theme` design tokens for emerald agroforestry greens (`#0d4025`, `#15693a`) and roasted coffee amber/espresso hues (`#2a170c`, `#643e20`). |
| **Motion** (`motion/react`) | `^12.23.24` | Compositor-only motion physics (`opacity`, `transform`) for page-switching transitions (`<AnimatePresence mode="wait">`), spring underlines, and interactive ritual flows. |
| **Vite** | `^8.3.0` | Ultra-fast native ES module bundler providing zero-latency local development and optimized production tree-shaking. |
| **JSZip** | `^3.10.1` | Client-side archive generation enabling zero-friction, 1-click export of the full source tree directly from the browser without server dependencies. |
| **Lucide React** | `^0.546.0` | Clean, accessible semantic vector iconography. |

---

## 3. Directory Structure

```text
├── .env.example                 # Environment variable templates
├── index.html                   # HTML entry point with Noto Sans Ethiopic & Playfair Display fonts
├── metadata.json                # AI Studio application metadata and capabilities
├── package.json                 # Project dependencies, scripts, and engine specifications
├── tsconfig.json                # TypeScript compiler configuration (bundler resolution, ES2022)
├── vite.config.ts               # Vite configuration with Tailwind CSS v4 and React plugins
├── DOCUMENTATION.md             # Complete project and domain documentation
│
└── src/
    ├── main.tsx                 # Application DOM mounting point
    ├── App.tsx                  # Root state coordinator, page router, and motion wrapper
    ├── index.css                # Tailwind v4 import and custom color / font theme definitions
    │
    ├── assets/
    │   ├── images.ts            # Centralized image exports with fallback resilience
    │   └── images/
    │       ├── gedeb_highland_city_*.jpg    # Highland mountain city landscape
    │       ├── gedeb_coffee_cherries_*.jpg  # Ripe heirloom Arabica cherries
    │       ├── gedeb_washing_station_*.jpg  # Raised African coffee drying beds
    │       └── gedeb_buna_ceremony_*.jpg    # Traditional clay Jebena coffee ceremony
    │
    ├── components/
    │   ├── Navbar.tsx           # 3-Zone navigation header with layoutId active indicator
    │   ├── HeroSection.tsx      # High-impact cinematic banner with quantified metrics
    │   ├── CityOverview.tsx     # UNESCO agroforestry and municipal life explorer
    │   ├── CoffeeSanctuary.tsx  # Processing comparison and interactive flavor wheel
    │   ├── BunaCeremony.tsx     # 5-step virtual Ethiopian coffee ceremony
    │   ├── WashingStations.tsx  # Filterable directory of famous Gedeb micro-origins
    │   ├── VisitorGuide.tsx     # Practical 3-leg travel itinerary and harvest guides
    │   ├── TechStackModal.tsx   # Interactive technical architecture inspector
    │   ├── ExportZipModal.tsx   # 1-Click ZIP downloader and GitHub deployment guides
    │   └── Footer.tsx           # Regional attribution, Ge'ez blessings, and quick links
    │
    ├── data/
    │   └── gedebData.ts         # Domain datasets, washing stations, metrics, and ceremony steps
    │
    └── utils/
        └── zipExporter.ts       # In-browser JSZip repository packaging and blob downloader
```

---

## 4. Key Modules & Functional Architecture

### 4.1. Navigation & Page Motion (`src/components/Navbar.tsx` & `src/App.tsx`)
- Adheres to the **Top Bar Contract**:
  - **Zone 1 (Brand)**: Single text wordmark (`GEDEB`) paired with native Ge'ez character (`ገ`).
  - **Zone 2 (Links)**: 5 clean text navigation links with spring-animated underline (`layoutId="activeTabUnderline"`).
  - **Zone 3 (Actions)**: Secondary "Tech Stack" inspector and primary "Export ZIP" button.
- **Page Transitions**: Powered by `motion/react` with `<AnimatePresence mode="wait">`. Switching tabs invokes smooth vertical translate and fade transitions (`pageVariants`), preventing abrupt content snapping.

### 4.2. City & Agroforestry System (`src/components/CityOverview.tsx`)
- Highlights the **Gedeo Cultural Landscape** inscribed on the UNESCO World Heritage list:
  - **Enset (*Ensete ventricosum* / Wesa)**: The multi-purpose indigenous "False Banana" that provides soil moisture retention, cooling shade, and stable food security (*Kocho*).
  - **Indigenous Canopy**: Native shade species (*Cordia africana*, *Millettia ferruginea*, *Albizia*) providing leaf litter humus, eliminating the need for synthetic chemical fertilizers.
  - **Microclimate**: 1,950m–2,350m elevation with cold mountain nights (8°C–12°C) extending cherry maturation to 8–9 months, maximizing sugar concentration and delicate acids.

### 4.3. Coffee Sanctuary & Sensory Wheel (`src/components/CoffeeSanctuary.tsx`)
- **Interactive Post-Harvest Craft**:
  - **Washed Lots**: 36–48 hours underwater fermentation; produces floral jasmine, sparkling bergamot, and crystalline tea clarity.
  - **Natural Sun-Dried Lots**: 18–24 days slow drying in whole cherries across raised bamboo mesh beds; produces dense blueberry, lavender, and winey sweetness.
  - **Anaerobic & Honey Lots**: 72–96 hours sealed tank fermentation; yields tropical papaya, honeysuckle, and candied citrus.
- **Interactive Cupping Flavor Matrix**:
  - Organizes Gedeb's cupping spectrum into 4 primary flavor families: Floral & Blossom, Citrus & Stone Fruit, Wild Berry & Winey, and Honey & Sweet Botanicals.

### 4.4. Traditional Buna Ceremony (`src/components/BunaCeremony.tsx`)
- Detailed interactive journey across the 5 canonical phases of Ethiopian coffee preparation:
  1. **እጥበትና ዝግጅት (Washing & Sorting)**: Removing parchment and sorting green cherries on flat woven *Sefét* mats.
  2. **ማመስ በእሳት (Charcoal Roasting)**: Roasting green beans on the iron *Menkeshkësha* skillet until oils glisten.
  3. **መውቀጥና ዕጣን (Mortar & Incense)**: Hand-crushing in a wooden *Mukecha* pestle while Frankincense (*Itan*) cleanses the air.
  4. **ማፍላት በጀበና (Clay Jebena Brewing)**: Boiling the grounds in a black clay *Jebena* with multiple gentle boils.
  5. **ሦስቱ ዙሮች (The Three Rounds)**:
     - **Abol (አቦል)**: The first, strongest cup awakening the senses.
     - **Tona (ቶና)**: The second cup, opening deeper dialogue.
     - **Baraka (በረካ)**: The third cup, conferring blessings and peace on the community.
- Includes an interactive "Pour a Cup" virtual simulator tracking rounds poured.

### 4.5. Micro-Origin Directory (`src/components/WashingStations.tsx`)
- Curated database of Gedeb's top washing stations:
  - **Worka Sakaro** (2,050m–2,250m, SCA 89.5–92.5)
  - **Banko Gotiti** (2,100m–2,300m, SCA 90.0–93.0)
  - **Chelchele** (1,950m–2,150m, SCA 88.5–91.5)
  - **Halo Beriti** (2,000m–2,220m, SCA 89.0–92.0)
  - **Banko Dhadhato** (2,150m–2,350m, SCA 89.5–92.5)
- Filterable by processing method and high-altitude tier (&ge; 2,150m).

### 4.6. In-Browser ZIP Exporter (`src/utils/zipExporter.ts` & `src/components/ExportZipModal.tsx`)
- Uses **JSZip** to assemble the full project tree directly into an in-memory `Blob`.
- Packages `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `README.md`, `DOCUMENTATION.md`, and complete source components.
- Triggers automatic download of `gedeb-city-source-code.zip` with zero backend server dependency.

---

## 5. Local Setup & Development Guide

### Prerequisites
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher

### Quick Start Commands

```bash
# 1. Clone or extract the repository
cd gedeb-city-showcase

# 2. Install all dependencies
npm install

# 3. Start local development server on port 3000
npm run dev
```

Visit `http://localhost:3000` in your web browser.

### Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server on `http://localhost:3000` |
| `npm run build` | Compiles TypeScript and builds optimized production bundles into `/dist` |
| `npm run preview` | Locally serves the production build from `/dist` |
| `npm run lint` | Runs `tsc --noEmit` to validate strict TypeScript type definitions |

---

## 6. How to Deploy to GitHub & Live Web Hosting

### Step 1: Initialize Git and Push to GitHub

```bash
# Open terminal inside the project root folder
git init
git add .
git commit -m "feat: initial commit for Gedeb City interactive website"

# Rename branch to main
git branch -M main

# Add your GitHub remote repository
git remote add origin https://github.com/YOUR_USERNAME/gedeb-city.git

# Push code to GitHub
git push -u origin main
```

### Step 2: Deploy Free Online (Choose One)

#### Option A: Vercel (Recommended)
1. Navigate to [vercel.com](https://vercel.com) and log in with GitHub.
2. Click **Add New** $\rightarrow$ **Project**.
3. Select your `gedeb-city` repository.
4. Vercel automatically detects the Vite framework.
5. Click **Deploy**. Your website will be live at `https://gedeb-city.vercel.app` in ~30 seconds.

#### Option B: Netlify
1. Log in to [netlify.com](https://netlify.com).
2. Select **Add new site** $\rightarrow$ **Import an existing project**.
3. Link your GitHub account and choose `gedeb-city`.
4. Set Build Command to `npm run build` and Publish Directory to `dist`.
5. Click **Deploy Site**.

#### Option C: GitHub Pages
1. In `vite.config.ts`, set `base: '/gedeb-city/'` if deploying to a subpath.
2. Run `npm run build`.
3. Push the generated `dist` folder to a `gh-pages` branch or configure GitHub Actions under **Settings** $\rightarrow$ **Pages**.

---

## 7. Cultural & Agronomic Glossary

- **Buna (ቡና)**: The Amharic word for coffee, as well as the cultural ritual of hospitality and communion.
- **Jebena (ጀበና)**: Traditional handcrafted black earthenware pot with a spherical belly, tall neck, and pouring spout used to brew coffee over charcoal.
- **Cini (ሲኒ)**: Small ceramic or porcelain handleless cups in which coffee is traditionally served.
- **Menkeshkësha (መንከሽከሻ)**: A shallow, long-handled iron skillet used to roast green coffee beans over glowing charcoal embers.
- **Itan (ዕጣን)**: Natural Frankincense and myrrh tree resin burned on hot coals during the Buna ceremony to release sacred aromatic smoke.
- **Enset (እንሰት / Wesa)**: *Ensete ventricosum*, the giant herbaceous perennial known as the "False Banana" that anchors Gedeo agroforestry and provides *Kocho* flatbread.
- **Ketema (ቀጤማ)**: Freshly cut green aromatic marsh grass spread over the floor during celebrations to signify purity, peace, and abundance.
- **Abol, Tona, Baraka (አቦል ፣ ቶና ፣ በረካ)**: The three mandatory successive rounds of coffee served during an authentic Ethiopian ceremony.
- **Kurume & Dega**: Celebrated indigenous Ethiopian heirloom Arabica landraces characterized by dense small beans, high pest resistance, and extraordinary floral cup profiles.
- **SCA (Specialty Coffee Association)**: The international standard grading system where coffees scored 80+ are classified as Specialty, and 90+ as World Championship caliber.

---

*Authored for the people of Gedeb Woreda, Gedeo Zone, South Ethiopia, and specialty coffee lovers worldwide.*
