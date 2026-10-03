import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Building2,
  Users2,
  Camera,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Download,
  Upload,
  CheckCircle2,
  Lock,
  Unlock,
  AlertCircle,
  HeartPulse,
  Fuel,
  GraduationCap,
  ShoppingBag,
  ExternalLink,
  Coffee,
  Mountain,
  Compass,
  FileArchive,
  Loader2,
  Sprout,
  Signal,
  Calendar,
  Layers,
  Edit2,
  X,
  Copy,
} from 'lucide-react';
import {
  useMunicipalData,
  BankEntity,
  GasStationEntity,
  SchoolEntity,
  KebeleEntity,
} from '../context/MunicipalDataContext';
import { WashingStation } from '../data/gedebData';
import { downloadProjectZip, downloadPublicZip, downloadAdminZip } from '../utils/zipGenerator';

interface AdminPortalProps {
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onClose }) => {
  const {
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
  } = useMunicipalData();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active tab
  const [activeTab, setActiveTab] = useState<
    'leaders' | 'heritage' | 'terroir' | 'coffee' | 'institutions' | 'agriculture' | 'guide' | 'zip'
  >('leaders');

  // Success flash toast
  const [savedToast, setSavedToast] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);

  const showToast = (message: string) => {
    setSavedToast(message);
    setTimeout(() => setSavedToast(null), 3500);
  };

  const copyToClipboard = (text: string, label: string) => {
    try {
      navigator.clipboard.writeText(text);
      showToast(`Copied ${label} URL to clipboard!`);
    } catch {
      showToast(`URL: ${text}`);
    }
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      passcode.trim() === 'gedeb2026' ||
      passcode.trim() === 'admin' ||
      passcode.trim() === ''
    ) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. (Default: gedeb2026)');
    }
  };

  // Leader photo upload handler
  const handleLeaderPhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'admin' | 'mayor'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (target === 'admin') {
          updateWoredaAdmin({ photo: result });
          showToast('Updated Gedeb Woreda Administrator photo!');
        } else {
          updateCityMayor({ photo: result });
          showToast('Updated Gedeb City Mayor photo!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Washing station modal & states
  const [isAddingStation, setIsAddingStation] = useState(false);
  const [editingStationId, setEditingStationId] = useState<string | null>(null);
  const [stationForm, setStationForm] = useState<WashingStation>({
    id: `ws-${Date.now()}`,
    name: '',
    amharicName: '',
    elevation: '2,050m - 2,250m',
    altitudeMeters: 2150,
    kebelle: 'Worka Sakaro',
    harvestWindow: 'November – January',
    flavorNotes: ['Jasmine', 'Bergamot', 'Peach'],
    scaScoreRange: '90.0 - 92.5',
    primaryVarieties: ['Kurume', 'Indigenous Heirloom'],
    processingTypes: ['Washed', 'Natural'],
    description: '',
    tastingQuote: '',
  });

  const handleSaveWashingStation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stationForm.name.trim()) return;

    if (editingStationId) {
      updateWashingStation(editingStationId, stationForm);
      showToast(`Updated ${stationForm.name} successfully!`);
    } else {
      addWashingStation({
        ...stationForm,
        id: `station-${Date.now()}`,
      });
      showToast(`Added ${stationForm.name} to washing stations registry!`);
    }
    setIsAddingStation(false);
    setEditingStationId(null);
  };

  // Bank modal state
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [newBank, setNewBank] = useState({
    name: '',
    branch: 'Gedeb Branch',
    amharic: '',
    type: 'Commercial Bank',
    features: ['ATM Services', 'Telebirr / Mobile Money', 'Agricultural financing'],
    accent: 'border-emerald-200 bg-emerald-50/50 text-emerald-900',
  });

  const handleCreateBank = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBank.name.trim()) {
      addBank(newBank);
      setIsAddingBank(false);
      setNewBank({
        name: '',
        branch: 'Gedeb Branch',
        amharic: '',
        type: 'Commercial Bank',
        features: ['ATM Services', 'Telebirr / Mobile Money', 'Agricultural financing'],
        accent: 'border-emerald-200 bg-emerald-50/50 text-emerald-900',
      });
      showToast('New bank branch added to registry!');
    }
  };

  // Kebele state
  const [isAddingKebele, setIsAddingKebele] = useState(false);
  const [newKebele, setNewKebele] = useState<Omit<KebeleEntity, 'id'>>({
    name: '',
    amharic: '',
    type: 'rural',
    elevation: '2,100m',
    features: '',
  });

  const handleCreateKebele = (e: React.FormEvent) => {
    e.preventDefault();
    if (newKebele.name.trim()) {
      addKebele(newKebele);
      setIsAddingKebele(false);
      setNewKebele({
        name: '',
        amharic: '',
        type: 'rural',
        elevation: '2,100m',
        features: '',
      });
      showToast('Added kebele to geographic registry!');
    }
  };

  // Fuel station state
  const [isAddingGasStation, setIsAddingGasStation] = useState(false);
  const [newGasStation, setNewGasStation] = useState<Omit<GasStationEntity, 'id'>>({
    name: '',
    location: 'Main Highway Transit Route, Gedeb',
    amharic: '',
    services: ['Diesel', 'Benzene', 'Engine oils'],
    hours: '24/7 Operations',
  });

  const handleCreateGasStation = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGasStation.name.trim()) {
      addGasStation(newGasStation);
      setIsAddingGasStation(false);
      showToast('Added fuel station to registry!');
    }
  };

  // Project ZIP Download handlers
  const handleDownloadPublicZip = async () => {
    try {
      setIsZipping(true);
      await downloadPublicZip();
      showToast('Public Website ZIP downloaded successfully!');
    } catch (err) {
      console.error(err);
      alert('Error downloading Public ZIP archive.');
    } finally {
      setIsZipping(false);
    }
  };

  const handleDownloadAdminZip = async () => {
    try {
      setIsZipping(true);
      await downloadAdminZip();
      showToast('Admin Master ZIP downloaded successfully!');
    } catch (err) {
      console.error(err);
      alert('Error downloading Admin ZIP archive.');
    } finally {
      setIsZipping(false);
    }
  };

  const handleDownloadZip = handleDownloadAdminZip;

  // JSON restore handler
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const success = importBackupJson(content);
        if (success) {
          showToast('Data restored from JSON backup!');
        } else {
          alert('Invalid JSON file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Passcode gate modal view
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-stone-200 text-stone-900">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-900 text-amber-200 mx-auto mb-4 shadow-sm">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold font-serif-display text-center text-stone-900">
            Administrative Portal
          </h2>
          <p className="text-xs text-stone-500 text-center mt-1 font-amharic">
            የገደብ ከተማና ወረዳ ሚስጥራዊ አስተዳደር ፖርታል
          </p>
          <p className="text-xs text-stone-600 text-center mt-2 leading-relaxed">
            Authorized portal to manage executive leadership, city facts, washing stations, coffee sanctuary profiles, institutions, and download full source code.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Passcode (Default: gedeb2026)
              </label>
              <input
                type="password"
                placeholder="Enter passcode (or leave blank to test)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
              {authError && <p className="text-xs text-rose-600 mt-1">{authError}</p>}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-amber-200 text-sm font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Enter Admin Portal</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-4 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-sm font-medium transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-stone-100 overflow-y-auto flex flex-col text-stone-900">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-stone-900 text-white border-b border-stone-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-800 flex items-center justify-center text-amber-300 font-bold font-serif-display text-lg">
            ገ
          </div>
          <div>
            <div className="text-base font-bold font-serif-display tracking-tight flex items-center gap-2">
              <span>Gedeb Master Admin Portal</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-300 border border-emerald-500/40">
                Hidden Mode · Live Persistence
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              Update all city sections, coffee profiles, leaders & download project ZIP
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleDownloadPublicZip}
            disabled={isZipping}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
            title="Download Public-only Website ZIP"
          >
            {isZipping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            <span>Public ZIP</span>
          </button>

          <button
            onClick={handleDownloadAdminZip}
            disabled={isZipping}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-all shadow-sm cursor-pointer"
            title="Download Full Admin Master ZIP"
          >
            {isZipping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileArchive className="w-3.5 h-3.5" />}
            <span>Admin ZIP</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            <span>Return to Site</span>
          </button>
        </div>
      </header>

      {/* Flash Toast */}
      {savedToast && (
        <div className="fixed top-16 right-6 z-50 bg-emerald-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold border border-emerald-500">
          <CheckCircle2 className="w-4 h-4 text-amber-300" />
          <span>{savedToast}</span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('leaders')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'leaders'
                ? 'bg-emerald-950 text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-200/70'
            }`}
          >
            <Users2 className="w-4 h-4" />
            <span>Executive Leaders</span>
          </button>

          <button
            onClick={() => setActiveTab('heritage')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'heritage'
                ? 'bg-emerald-950 text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-200/70'
            }`}
          >
            <Mountain className="w-4 h-4" />
            <span>City & Heritage</span>
          </button>

          <button
            onClick={() => setActiveTab('terroir')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'terroir'
                ? 'bg-emerald-950 text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-200/70'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Terroir & Kebeles ({data.washingStations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('coffee')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'coffee'
                ? 'bg-emerald-950 text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-200/70'
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>Coffee Sanctuary</span>
          </button>

          <button
            onClick={() => setActiveTab('institutions')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'institutions'
                ? 'bg-emerald-950 text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-200/70'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Civic Institutions & Banks</span>
          </button>

          <button
            onClick={() => setActiveTab('agriculture')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'agriculture'
                ? 'bg-emerald-950 text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-200/70'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>Enset, Crops & Livestock</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-emerald-950 text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-200/70'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Visitor Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('zip')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'zip'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-700 hover:bg-stone-200/70'
            }`}
          >
            <FileArchive className="w-4 h-4 text-emerald-900" />
            <span>Download Project ZIP</span>
          </button>
        </div>

        {/* TAB 1: EXECUTIVE LEADERSHIP */}
        {activeTab === 'leaders' && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Executive Leadership:</strong> When the Woreda Administrator or City Mayor changes, upload their new portrait photograph and update their names, official titles, and phone numbers. Updates are reflected immediately across the entire site!
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Leader 1: Administrator */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Woreda Executive
                  </span>
                  <span className="text-xs text-stone-500">{data.woredaAdmin.term}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-5 relative rounded-2xl overflow-hidden aspect-[3/4] border border-stone-300 bg-stone-100 group">
                    <img
                      src={data.woredaAdmin.photo}
                      alt="Woreda Administrator"
                      className="w-full h-full object-cover"
                    />
                    <label className="absolute inset-0 bg-stone-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-semibold cursor-pointer gap-2 p-3 text-center">
                      <Camera className="w-6 h-6 text-amber-300" />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleLeaderPhotoUpload(e, 'admin')}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="sm:col-span-7 space-y-2.5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-500">Name</label>
                      <input
                        type="text"
                        value={data.woredaAdmin.name}
                        onChange={(e) => {
                          updateWoredaAdmin({ name: e.target.value });
                          showToast('Saved Administrator name');
                        }}
                        className="w-full px-3 py-1.5 text-xs font-bold border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-500">Title</label>
                      <input
                        type="text"
                        value={data.woredaAdmin.title}
                        onChange={(e) => {
                          updateWoredaAdmin({ title: e.target.value });
                          showToast('Saved Administrator title');
                        }}
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-500">Amharic Title</label>
                      <input
                        type="text"
                        value={data.woredaAdmin.amharicTitle}
                        onChange={(e) => {
                          updateWoredaAdmin({ amharicTitle: e.target.value });
                          showToast('Saved Amharic title');
                        }}
                        className="w-full px-3 py-1.5 text-xs font-amharic border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-500">Office Phone</label>
                      <input
                        type="text"
                        value={data.woredaAdmin.phone}
                        onChange={(e) => {
                          updateWoredaAdmin({ phone: e.target.value });
                          showToast('Saved phone number');
                        }}
                        className="w-full px-3 py-1.5 text-xs font-mono border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-500">Photo URL</label>
                      <input
                        type="text"
                        value={data.woredaAdmin.photo}
                        onChange={(e) => {
                          updateWoredaAdmin({ photo: e.target.value });
                          showToast('Updated photo URL');
                        }}
                        className="w-full px-3 py-1 text-xs border border-stone-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Executive Bio</label>
                  <textarea
                    rows={2}
                    value={data.woredaAdmin.bio}
                    onChange={(e) => updateWoredaAdmin({ bio: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg leading-relaxed"
                  />
                </div>
              </div>

              {/* Leader 2: City Mayor */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    City Mayor
                  </span>
                  <span className="text-xs text-stone-500">{data.cityMayor.term}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-5 relative rounded-2xl overflow-hidden aspect-[3/4] border border-stone-300 bg-stone-100 group">
                    <img
                      src={data.cityMayor.photo}
                      alt="Gedeb City Mayor"
                      className="w-full h-full object-cover"
                    />
                    <label className="absolute inset-0 bg-stone-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-semibold cursor-pointer gap-2 p-3 text-center">
                      <Camera className="w-6 h-6 text-amber-300" />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleLeaderPhotoUpload(e, 'mayor')}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="sm:col-span-7 space-y-2.5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-500">Name</label>
                      <input
                        type="text"
                        value={data.cityMayor.name}
                        onChange={(e) => {
                          updateCityMayor({ name: e.target.value });
                          showToast('Saved Mayor name');
                        }}
                        className="w-full px-3 py-1.5 text-xs font-bold border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-500">Title</label>
                      <input
                        type="text"
                        value={data.cityMayor.title}
                        onChange={(e) => {
                          updateCityMayor({ title: e.target.value });
                          showToast('Saved Mayor title');
                        }}
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-500">Amharic Title</label>
                      <input
                        type="text"
                        value={data.cityMayor.amharicTitle}
                        onChange={(e) => {
                          updateCityMayor({ amharicTitle: e.target.value });
                          showToast('Saved Mayor Amharic title');
                        }}
                        className="w-full px-3 py-1.5 text-xs font-amharic border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-500">Office Phone</label>
                      <input
                        type="text"
                        value={data.cityMayor.phone}
                        onChange={(e) => {
                          updateCityMayor({ phone: e.target.value });
                          showToast('Saved phone number');
                        }}
                        className="w-full px-3 py-1.5 text-xs font-mono border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-500">Photo URL</label>
                      <input
                        type="text"
                        value={data.cityMayor.photo}
                        onChange={(e) => {
                          updateCityMayor({ photo: e.target.value });
                          showToast('Updated photo URL');
                        }}
                        className="w-full px-3 py-1 text-xs border border-stone-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Mayoral Duties</label>
                  <textarea
                    rows={2}
                    value={data.cityMayor.bio}
                    onChange={(e) => updateCityMayor({ bio: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CITY & HERITAGE */}
        {activeTab === 'heritage' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 max-w-5xl">
            <div>
              <h3 className="text-xl font-bold font-serif-display text-stone-900">
                City Overview & UNESCO Heritage Text
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Update the homepage hero headline, key statistics, and living agroforestry narrative.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Elevation</label>
                <input
                  type="text"
                  value={data.cityOverview.elevation}
                  onChange={(e) => updateCityOverview({ elevation: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Population</label>
                <input
                  type="text"
                  value={data.cityOverview.population}
                  onChange={(e) => updateCityOverview({ population: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Coffee Farmers</label>
                <input
                  type="text"
                  value={data.cityOverview.coffeeFarmers}
                  onChange={(e) => updateCityOverview({ coffeeFarmers: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Kebeles Count</label>
                <input
                  type="text"
                  value={data.cityOverview.kebelesCount}
                  onChange={(e) => updateCityOverview({ kebelesCount: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Hero Main Headline</label>
                <input
                  type="text"
                  value={data.cityOverview.heroHeadline}
                  onChange={(e) => {
                    updateCityOverview({ heroHeadline: e.target.value });
                    showToast('Saved hero headline');
                  }}
                  className="w-full px-3 py-2 text-sm font-bold border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Hero Subtext Description</label>
                <textarea
                  rows={2}
                  value={data.cityOverview.heroSubtext}
                  onChange={(e) => {
                    updateCityOverview({ heroSubtext: e.target.value });
                    showToast('Saved hero subtext');
                  }}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  UNESCO Agroforestry & Enset Narrative
                </label>
                <textarea
                  rows={3}
                  value={data.cityOverview.unescoDescription}
                  onChange={(e) => {
                    updateCityOverview({ unescoDescription: e.target.value });
                    showToast('Saved UNESCO description');
                  }}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Mountain Geography & Microclimate Story
                </label>
                <textarea
                  rows={2}
                  value={data.cityOverview.geographyDescription}
                  onChange={(e) => updateCityOverview({ geographyDescription: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Community Life & Market Commerce Story
                </label>
                <textarea
                  rows={2}
                  value={data.cityOverview.communityDescription}
                  onChange={(e) => updateCityOverview({ communityDescription: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Heirloom Landraces Story (Kurume, Dega, Wolisho)
                </label>
                <textarea
                  rows={2}
                  value={data.cityOverview.varietiesDescription}
                  onChange={(e) => updateCityOverview({ varietiesDescription: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl leading-relaxed"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TERROIR, KEBELES & WASHING STATIONS */}
        {activeTab === 'terroir' && (
          <div className="space-y-8">
            {/* Section 1: Washing Stations */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-serif-display text-stone-900">
                    Washing Stations & Micro-lot Registry ({data.washingStations.length} Sites)
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Manage micro-regions (Worka Sakaro, Banko Gotiti, Chelchele, Halo Beriti, Banko Dhadhato).
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingStationId(null);
                    setStationForm({
                      id: `ws-${Date.now()}`,
                      name: '',
                      amharicName: '',
                      elevation: '2,050m - 2,250m',
                      altitudeMeters: 2150,
                      kebelle: 'Worka Sakaro',
                      harvestWindow: 'November – January',
                      flavorNotes: ['Jasmine', 'Bergamot', 'Peach'],
                      scaScoreRange: '90.0 - 92.5',
                      primaryVarieties: ['Kurume', 'Indigenous Heirloom'],
                      processingTypes: ['Washed', 'Natural'],
                      description: '',
                      tastingQuote: '',
                    });
                    setIsAddingStation(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-amber-200 text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Washing Station</span>
                </button>
              </div>

              {/* Add / Edit Station Modal Form */}
              {isAddingStation && (
                <form
                  onSubmit={handleSaveWashingStation}
                  className="bg-emerald-50/70 border border-emerald-300 rounded-2xl p-6 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                    <h4 className="font-bold text-emerald-950 text-sm">
                      {editingStationId ? `Edit Washing Station` : `Add New Washing Station`}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setIsAddingStation(false)}
                      className="text-stone-500 hover:text-stone-800 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Station Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Worka Sakaro"
                        value={stationForm.name}
                        onChange={(e) => setStationForm({ ...stationForm, name: e.target.value })}
                        required
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Amharic Name</label>
                      <input
                        type="text"
                        placeholder="ዎርቃ ሳቃሮ"
                        value={stationForm.amharicName}
                        onChange={(e) => setStationForm({ ...stationForm, amharicName: e.target.value })}
                        className="w-full px-3 py-2 text-xs font-amharic border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Kebele Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Worka Sakaro Kebele"
                        value={stationForm.kebelle}
                        onChange={(e) => setStationForm({ ...stationForm, kebelle: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Elevation Label</label>
                      <input
                        type="text"
                        value={stationForm.elevation}
                        onChange={(e) => setStationForm({ ...stationForm, elevation: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Altitude (Meters)</label>
                      <input
                        type="number"
                        value={stationForm.altitudeMeters}
                        onChange={(e) => setStationForm({ ...stationForm, altitudeMeters: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">SCA Score Range</label>
                      <input
                        type="text"
                        value={stationForm.scaScoreRange}
                        onChange={(e) => setStationForm({ ...stationForm, scaScoreRange: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Flavor Notes (comma-separated)</label>
                    <input
                      type="text"
                      value={stationForm.flavorNotes.join(', ')}
                      onChange={(e) =>
                        setStationForm({
                          ...stationForm,
                          flavorNotes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={stationForm.description}
                      onChange={(e) => setStationForm({ ...stationForm, description: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white leading-relaxed"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingStation(false)}
                      className="px-4 py-2 rounded-lg border border-stone-300 text-xs font-medium cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-emerald-900 text-amber-200 text-xs font-bold cursor-pointer"
                    >
                      {editingStationId ? 'Update Station' : 'Save Station'}
                    </button>
                  </div>
                </form>
              )}

              {/* Station Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.washingStations.map((station) => (
                  <div
                    key={station.id}
                    className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-base font-bold text-stone-900">{station.name}</h4>
                          <div className="text-xs text-amber-800 font-amharic">{station.amharicName}</div>
                          <div className="text-xs text-emerald-800 font-semibold mt-1">
                            {station.elevation} ({station.altitudeMeters}m) · {station.kebelle}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingStationId(station.id);
                              setStationForm(station);
                              setIsAddingStation(true);
                            }}
                            className="text-stone-400 hover:text-emerald-700 p-1 cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove ${station.name}?`)) {
                                deleteWashingStation(station.id);
                                showToast(`Removed ${station.name}`);
                              }
                            }}
                            className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 mt-2 line-clamp-3">{station.description}</p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex flex-wrap gap-1">
                      {station.flavorNotes.map((note, nIdx) => (
                        <span key={nIdx} className="text-[10px] bg-stone-100 px-2 py-0.5 rounded text-stone-700">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Kebeles Directory */}
            <div className="space-y-4 pt-6 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-serif-display text-stone-900">
                    Kebeles & Micro-Regions Registry ({data.kebeles?.length || 0} Kebeles)
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Official municipal registry of Gedeb urban and rural kebeles.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingKebele(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-amber-200 text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Kebele</span>
                </button>
              </div>

              {isAddingKebele && (
                <form
                  onSubmit={handleCreateKebele}
                  className="bg-emerald-50/70 border border-emerald-300 rounded-2xl p-5 space-y-3"
                >
                  <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider">Add New Kebele</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-600">Kebele Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Banko Gotiti"
                        value={newKebele.name}
                        onChange={(e) => setNewKebele({ ...newKebele, name: e.target.value })}
                        required
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-600">Amharic Name</label>
                      <input
                        type="text"
                        placeholder="ባንኮ ጎቲቲ"
                        value={newKebele.amharic}
                        onChange={(e) => setNewKebele({ ...newKebele, amharic: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs font-amharic border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-600">Type</label>
                      <select
                        value={newKebele.type}
                        onChange={(e) => setNewKebele({ ...newKebele, type: e.target.value as 'rural' | 'urban' })}
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                      >
                        <option value="rural">Rural (Agroforestry)</option>
                        <option value="urban">Urban (Municipal)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-600">Elevation</label>
                      <input
                        type="text"
                        value={newKebele.elevation}
                        onChange={(e) => setNewKebele({ ...newKebele, elevation: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-600">Highlights</label>
                    <input
                      type="text"
                      placeholder="e.g. Specialty coffee washing station & native Enset farming"
                      value={newKebele.features}
                      onChange={(e) => setNewKebele({ ...newKebele, features: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingKebele(false)}
                      className="px-3 py-1 text-xs border border-stone-300 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 text-xs bg-emerald-900 text-amber-200 font-bold rounded-lg"
                    >
                      Save Kebele
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {(data.kebeles || []).map((k) => (
                  <div key={k.id} className="bg-white rounded-xl border border-stone-200 p-3.5 space-y-1 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${k.type === 'urban' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'}`}>
                        {k.type}
                      </span>
                      <button
                        onClick={() => deleteKebele(k.id)}
                        className="text-stone-300 hover:text-rose-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="font-bold text-sm text-stone-900">{k.name}</div>
                    <div className="text-xs text-amber-900 font-amharic">{k.amharic}</div>
                    <div className="text-[11px] text-stone-500">{k.elevation}</div>
                    <p className="text-[11px] text-stone-600 leading-snug pt-1">{k.features}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COFFEE SANCTUARY */}
        {activeTab === 'coffee' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 max-w-4xl">
            <div>
              <h3 className="text-xl font-bold font-serif-display text-stone-900">
                Coffee Sanctuary Processing Profiles & Varieties
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Update tasting profiles for Washed, Natural, Anaerobic methods, landrace descriptions, and harvest seasons.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Harvest Window</label>
                <input
                  type="text"
                  value={data.coffeeData.harvestWindow}
                  onChange={(e) => updateCoffeeData({ harvestWindow: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">SCA Score Range</label>
                <input
                  type="text"
                  value={data.coffeeData.scaScoreRange}
                  onChange={(e) => updateCoffeeData({ scaScoreRange: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Washed Processing Profile (የታጠበ)
                </label>
                <textarea
                  rows={2}
                  value={data.coffeeData.washedProfile}
                  onChange={(e) => {
                    updateCoffeeData({ washedProfile: e.target.value });
                    showToast('Saved washed profile');
                  }}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Natural Sun-Dried Profile (የፀሐይ ቡና)
                </label>
                <textarea
                  rows={2}
                  value={data.coffeeData.naturalProfile}
                  onChange={(e) => {
                    updateCoffeeData({ naturalProfile: e.target.value });
                    showToast('Saved natural profile');
                  }}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Anaerobic / Slow Honey Fermentation
                </label>
                <textarea
                  rows={2}
                  value={data.coffeeData.anaerobicProfile}
                  onChange={(e) => {
                    updateCoffeeData({ anaerobicProfile: e.target.value });
                    showToast('Saved anaerobic profile');
                  }}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>

              <div className="pt-4 border-t border-stone-200 space-y-3">
                <h4 className="text-sm font-bold text-stone-900">Indigenous Landrace Varieties</h4>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">Kurume Landrace</label>
                  <textarea
                    rows={2}
                    value={data.coffeeData.kurumeDescription}
                    onChange={(e) => updateCoffeeData({ kurumeDescription: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">Dega Landrace</label>
                  <textarea
                    rows={2}
                    value={data.coffeeData.degaDescription}
                    onChange={(e) => updateCoffeeData({ degaDescription: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">Wolisho Landrace</label>
                  <textarea
                    rows={2}
                    value={data.coffeeData.wolishoDescription}
                    onChange={(e) => updateCoffeeData({ wolishoDescription: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CIVIC INSTITUTIONS & BANKS */}
        {activeTab === 'institutions' && (
          <div className="space-y-8">
            {/* Banks */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-serif-display text-stone-900">
                    Commercial Banks Directory ({data.banks.length} Branches)
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Add new banks or remove existing branches as the financial ecosystem grows.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingBank(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-amber-200 text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Bank Branch</span>
                </button>
              </div>

              {isAddingBank && (
                <form
                  onSubmit={handleCreateBank}
                  className="bg-emerald-50/70 border border-emerald-300 rounded-2xl p-6 space-y-4 shadow-sm"
                >
                  <h4 className="font-bold text-emerald-950 text-sm">Add Commercial Bank Branch</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Bank Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Oromia Bank"
                        value={newBank.name}
                        onChange={(e) => setNewBank({ ...newBank, name: e.target.value })}
                        required
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Branch</label>
                      <input
                        type="text"
                        value={newBank.branch}
                        onChange={(e) => setNewBank({ ...newBank, branch: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Amharic Name</label>
                      <input
                        type="text"
                        placeholder="የባንኩ ስም በአማርኛ"
                        value={newBank.amharic}
                        onChange={(e) => setNewBank({ ...newBank, amharic: e.target.value })}
                        className="w-full px-3 py-2 text-xs font-amharic border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingBank(false)}
                      className="px-4 py-2 rounded-lg border border-stone-300 text-xs font-medium cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-emerald-900 text-amber-200 text-xs font-bold cursor-pointer"
                    >
                      Save Bank
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {data.banks.map((bank) => (
                  <div
                    key={bank.id}
                    className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                            {bank.type}
                          </span>
                          <h4 className="text-base font-bold text-stone-900 mt-1">{bank.name}</h4>
                          <div className="text-xs text-stone-500">{bank.branch}</div>
                          <div className="text-xs text-amber-800 font-amharic">{bank.amharic}</div>
                        </div>

                        <button
                          onClick={() => {
                            if (confirm(`Remove ${bank.name}?`)) {
                              deleteBank(bank.id);
                              showToast(`Removed ${bank.name}`);
                            }
                          }}
                          className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-100 text-xs text-stone-600 space-y-1">
                      {bank.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5 text-[11px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hospital & Telecommunications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hospital */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-rose-600" />
                  <h4 className="text-base font-bold text-stone-900">Gedeb General Hospital</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Director Title</label>
                    <input
                      type="text"
                      value={data.hospital.director}
                      onChange={(e) => updateHospital({ director: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-600 mb-1">24/7 Hotline</label>
                      <input
                        type="text"
                        value={data.hospital.emergencyPhone}
                        onChange={(e) => updateHospital({ emergencyPhone: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs font-mono border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-600 mb-1">Ambulance Dispatch</label>
                      <input
                        type="text"
                        value={data.hospital.ambulancePhone}
                        onChange={(e) => updateHospital({ ambulancePhone: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs font-mono border border-stone-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Catchment Population</label>
                    <input
                      type="text"
                      value={data.hospital.catchmentPopulation}
                      onChange={(e) => updateHospital({ catchmentPopulation: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Telecommunications */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Signal className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-base font-bold text-stone-900">4G Telecom Infrastructure</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Ethio Telecom Status</label>
                    <input
                      type="text"
                      value={data.telecom?.ethioTelecomCoverage || ''}
                      onChange={(e) => updateTelecom({ ethioTelecomCoverage: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Safaricom Network Status</label>
                    <input
                      type="text"
                      value={data.telecom?.safaricomCoverage || ''}
                      onChange={(e) => updateTelecom({ safaricomCoverage: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Fiber Optics Status</label>
                    <input
                      type="text"
                      value={data.telecom?.fiberStatus || ''}
                      onChange={(e) => updateTelecom({ fiberStatus: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Fuel Stations & Market Days */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gas Stations */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Fuel className="w-5 h-5 text-amber-600" />
                    <h4 className="text-base font-bold text-stone-900">Gas & Fuel Stations</h4>
                  </div>
                  <button
                    onClick={() => setIsAddingGasStation(true)}
                    className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 px-2.5 py-1 rounded-md font-bold cursor-pointer"
                  >
                    + Add Station
                  </button>
                </div>

                {isAddingGasStation && (
                  <form onSubmit={handleCreateGasStation} className="bg-amber-50 p-3 rounded-xl space-y-2">
                    <input
                      type="text"
                      placeholder="Station Name"
                      value={newGasStation.name}
                      onChange={(e) => setNewGasStation({ ...newGasStation, name: e.target.value })}
                      required
                      className="w-full px-2 py-1 text-xs border rounded bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={newGasStation.location}
                      onChange={(e) => setNewGasStation({ ...newGasStation, location: e.target.value })}
                      className="w-full px-2 py-1 text-xs border rounded bg-white"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingGasStation(false)}
                        className="px-2 py-1 text-xs border rounded"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="px-2 py-1 text-xs bg-amber-600 text-white font-bold rounded">
                        Save
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-2">
                  {data.gasStations.map((station) => (
                    <div key={station.id} className="p-3 rounded-xl border border-stone-200 bg-stone-50 flex items-start justify-between">
                      <div>
                        <div className="font-bold text-xs text-stone-900">{station.name}</div>
                        <div className="text-[11px] text-stone-500">{station.location}</div>
                        <div className="text-[10px] text-emerald-800">{station.hours}</div>
                      </div>
                      <button
                        onClick={() => deleteGasStation(station.id)}
                        className="text-stone-300 hover:text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Days */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-700" />
                  <h4 className="text-base font-bold text-stone-900">Gedeb Central Market Days</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Primary Market Days</label>
                    <input
                      type="text"
                      value={data.market.primaryDays}
                      onChange={(e) => updateMarket({ primaryDays: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs font-bold border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Amharic Market Days</label>
                    <input
                      type="text"
                      value={data.market.amharicDays}
                      onChange={(e) => updateMarket({ amharicDays: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs font-amharic border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Market Description</label>
                    <textarea
                      rows={2}
                      value={data.market.description}
                      onChange={(e) => updateMarket({ description: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: ENSET, CROPS & LIVESTOCK */}
        {activeTab === 'agriculture' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 max-w-4xl">
            <div>
              <h3 className="text-xl font-bold font-serif-display text-stone-900">
                Enset (False Banana), Multi-Crop Agroforestry & Livestock
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Update details for Enset (commonly known as &ldquo;sets&rdquo;/&ldquo;inset&rdquo;), Kocho, Bulla, Amicho, Teff, and livestock traditions.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Botanical Name</label>
                  <input
                    type="text"
                    value={data.ensetAgriculture?.scientificName || 'Ensete ventricosum'}
                    onChange={(e) => updateEnsetAgriculture({ scientificName: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono border border-stone-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Amharic & Gedeo Name</label>
                  <input
                    type="text"
                    value={data.ensetAgriculture?.amharicName || 'እንሰት (Wesa)'}
                    onChange={(e) => updateEnsetAgriculture({ amharicName: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-amharic border border-stone-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Phonetic Clarification</label>
                  <input
                    type="text"
                    value={data.ensetAgriculture?.phoneticClarification || 'Commonly known as "Sets" or "Inset"'}
                    onChange={(e) => updateEnsetAgriculture({ phoneticClarification: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Drought Resilience & Water Storage (&ldquo;Tree Against Hunger&rdquo;)
                </label>
                <textarea
                  rows={3}
                  value={data.ensetAgriculture?.droughtResilienceDesc || ''}
                  onChange={(e) => updateEnsetAgriculture({ droughtResilienceDesc: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Kocho (ቆጮ) Description</label>
                  <textarea
                    rows={3}
                    value={data.ensetAgriculture?.kochoDesc || ''}
                    onChange={(e) => updateEnsetAgriculture({ kochoDesc: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl leading-relaxed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Bulla (ቡላ) Description</label>
                  <textarea
                    rows={3}
                    value={data.ensetAgriculture?.bullaDesc || ''}
                    onChange={(e) => updateEnsetAgriculture({ bullaDesc: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl leading-relaxed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Amicho (አሚቾ) Description</label>
                  <textarea
                    rows={3}
                    value={data.ensetAgriculture?.amichoDesc || ''}
                    onChange={(e) => updateEnsetAgriculture({ amichoDesc: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl leading-relaxed"
                  />
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Staple Crops (Teff, Barley, Wheat)</label>
                  <input
                    type="text"
                    value={data.ensetAgriculture?.stapleCropsSummary || ''}
                    onChange={(e) => updateEnsetAgriculture({ stapleCropsSummary: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Cash Crops Beyond Coffee (Khat, Honey, Fruit)</label>
                  <input
                    type="text"
                    value={data.ensetAgriculture?.cashCropsSummary || ''}
                    onChange={(e) => updateEnsetAgriculture({ cashCropsSummary: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Highland Livestock (Cattle, Sheep, Goats)</label>
                  <input
                    type="text"
                    value={data.ensetAgriculture?.livestockSummary || ''}
                    onChange={(e) => updateEnsetAgriculture({ livestockSummary: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: VISITOR GUIDE */}
        {activeTab === 'guide' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 max-w-3xl">
            <div>
              <h3 className="text-xl font-bold font-serif-display text-stone-900">
                Visitor & Travel Pilgrimage Guide
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Update how to reach Gedeb, harvest months, and climate advice.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">How to Reach Gedeb (Flight & Road Routes)</label>
                <textarea
                  rows={3}
                  value={data.visitorGuide.routes}
                  onChange={(e) => {
                    updateVisitorGuide({ routes: e.target.value });
                    showToast('Saved travel routes');
                  }}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Peak Harvest Season Window</label>
                <textarea
                  rows={2}
                  value={data.visitorGuide.harvestPeriod}
                  onChange={(e) => {
                    updateVisitorGuide({ harvestPeriod: e.target.value });
                    showToast('Saved harvest window');
                  }}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Climate & What to Bring</label>
                <textarea
                  rows={2}
                  value={data.visitorGuide.climateAttire}
                  onChange={(e) => {
                    updateVisitorGuide({ climateAttire: e.target.value });
                    showToast('Saved climate advice');
                  }}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Cultural Etiquette & Local Advice</label>
                <textarea
                  rows={2}
                  value={data.visitorGuide.etiquette}
                  onChange={(e) => {
                    updateVisitorGuide({ etiquette: e.target.value });
                    showToast('Saved etiquette tips');
                  }}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl leading-relaxed"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: DOWNLOAD PROJECT ZIP & BACKUP */}
        {activeTab === 'zip' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-8 max-w-4xl">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-400 text-stone-950 font-bold">
                  <FileArchive className="w-5 h-5" />
                </span>
                <h3 className="text-2xl font-bold font-serif-display text-stone-900">
                  Download Project Source Code ZIP Archives
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Choose between two dedicated, self-contained project archives tailored for your specific deployment needs. Both packages include offline React source trees, full Tailwind CSS, components, all high-resolution authentic photos, and npm scripts.
              </p>
            </div>

            {/* Two Separate ZIP Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Package 1: Public Showcase Edition */}
              <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/40 p-6 flex flex-col justify-between space-y-5 shadow-xs hover:border-emerald-500 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full border border-emerald-300">
                      Public Edition (Clean)
                    </span>
                    <Download className="w-5 h-5 text-emerald-700" />
                  </div>

                  <h4 className="text-xl font-bold font-serif-display text-stone-900">
                    Gedeb Public Website ZIP
                  </h4>
                  <div className="text-xs font-mono text-emerald-800 font-semibold">
                    gedeb_public_website.zip
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    A clean, public-facing distribution without any administrative portal, passcode gates, or hidden editing shortcuts.
                  </p>

                  <div className="space-y-1.5 text-xs text-stone-700 pt-2 border-t border-emerald-200/60">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Ready for public web hosting & GitHub release</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero admin backdoors or staff login panels</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Complete image library and interactive public tours</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-emerald-200/70">
                  <button
                    onClick={handleDownloadPublicZip}
                    disabled={isZipping}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isZipping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    <span>Download Public Website ZIP</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={typeof window !== 'undefined' ? `${window.location.origin}/gedeb_public_website.zip` : '/gedeb_public_website.zip'}
                      target="_blank"
                      rel="noopener noreferrer"
                      download="gedeb_public_website.zip"
                      className="flex-1 py-1.5 px-3 rounded-lg border border-emerald-300 bg-white hover:bg-emerald-50 text-[11px] text-emerald-900 font-semibold text-center truncate"
                    >
                      /gedeb_public_website.zip
                    </a>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          `${window.location.origin}/gedeb_public_website.zip`,
                          'Public ZIP'
                        )
                      }
                      className="px-3 py-1.5 rounded-lg border border-emerald-300 bg-white hover:bg-emerald-100 text-emerald-900 text-xs font-semibold flex items-center gap-1 cursor-pointer shrink-0"
                      title="Copy full download link to clipboard"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Package 2: Full Administrative Master Suite */}
              <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/40 p-6 flex flex-col justify-between space-y-5 shadow-xs hover:border-amber-500 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-200 text-amber-950 px-3 py-1 rounded-full border border-amber-400">
                      Admin Master Suite
                    </span>
                    <FileArchive className="w-5 h-5 text-amber-800" />
                  </div>

                  <h4 className="text-xl font-bold font-serif-display text-stone-900">
                    Gedeb Admin Master ZIP
                  </h4>
                  <div className="text-xs font-mono text-amber-900 font-semibold">
                    gedeb_admin_master.zip
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    The complete master project including the hidden Admin Portal, dynamic leader & washing station management, live storage sync, and packaging scripts.
                  </p>

                  <div className="space-y-1.5 text-xs text-stone-700 pt-2 border-t border-amber-200/60">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>Full 8-tab administrative dashboard & password gate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>Dynamic leader portrait uploads, banks & stations editor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>Dual packaging script (<code className="font-mono text-[10px]">npm run zip</code>)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-amber-200/70">
                  <button
                    onClick={handleDownloadAdminZip}
                    disabled={isZipping}
                    className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isZipping ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileArchive className="w-4 h-4" />}
                    <span>Download Admin Master ZIP</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={typeof window !== 'undefined' ? `${window.location.origin}/gedeb_admin_master.zip` : '/gedeb_admin_master.zip'}
                      target="_blank"
                      rel="noopener noreferrer"
                      download="gedeb_admin_master.zip"
                      className="flex-1 py-1.5 px-3 rounded-lg border border-amber-300 bg-white hover:bg-amber-50 text-[11px] text-amber-950 font-semibold text-center truncate"
                    >
                      /gedeb_admin_master.zip
                    </a>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          `${window.location.origin}/gedeb_admin_master.zip`,
                          'Admin Master ZIP'
                        )
                      }
                      className="px-3 py-1.5 rounded-lg border border-amber-300 bg-white hover:bg-amber-100 text-amber-950 text-xs font-semibold flex items-center gap-1 cursor-pointer shrink-0"
                      title="Copy full download link to clipboard"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* JSON Data Backup */}
            <div className="pt-6 border-t border-stone-200">
              <h4 className="text-sm font-bold text-stone-900 mb-2">JSON Data Backup & Restore</h4>
              <p className="text-xs text-stone-500 mb-4">
                Export just the municipal data (leaders, photos, and institutions) as a lightweight JSON file:
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    exportBackupJson();
                    showToast('Backup JSON exported!');
                  }}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold border border-stone-300 cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Export Municipal JSON</span>
                </button>

                <label className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold border border-stone-300 cursor-pointer flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-amber-700" />
                  <span>Restore from JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportFile}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={() => {
                    if (confirm('Revert all municipal and site data back to factory defaults?')) {
                      resetToDefaults();
                      showToast('Reset to official factory defaults!');
                    }
                  }}
                  className="px-4 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold cursor-pointer flex items-center gap-1.5 ml-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All to Defaults</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
