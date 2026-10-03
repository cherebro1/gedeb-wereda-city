import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
  Gauge,
  Sunrise,
  Sunset,
  RefreshCw,
  Calendar,
  Clock,
  Sparkles,
  Mountain,
  ChevronRight,
  Info,
  CheckCircle2,
} from 'lucide-react';

interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  cloudCover: number;
  isDay: boolean;
  time: string;
}

interface DailyForecast {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitationSum: number;
  uvIndexMax: number;
  sunrise: string;
  sunset: string;
}

interface HourlyForecast {
  time: string;
  temp: number;
  humidity: number;
  precipProb: number;
  weatherCode: number;
}

interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
  hourly: HourlyForecast[];
  lastUpdated: Date;
  isLive: boolean;
}

// Fallback data reflecting realistic Gedeb highland microclimate (2,050m elevation)
const FALLBACK_WEATHER: WeatherData = {
  current: {
    temperature: 20.8,
    apparentTemperature: 21.2,
    humidity: 64,
    precipitation: 0.0,
    weatherCode: 1, // Mainly clear
    windSpeed: 8.5,
    windDirection: 140, // SE mountain breeze
    pressure: 1018,
    cloudCover: 25,
    isDay: true,
    time: new Date().toISOString(),
  },
  daily: [
    {
      date: 'Today',
      weatherCode: 1,
      tempMax: 23.4,
      tempMin: 11.2,
      precipitationSum: 0.2,
      uvIndexMax: 9.8,
      sunrise: '06:14 AM',
      sunset: '06:21 PM',
    },
    {
      date: 'Tomorrow',
      weatherCode: 2,
      tempMax: 22.8,
      tempMin: 10.9,
      precipitationSum: 1.1,
      uvIndexMax: 8.9,
      sunrise: '06:14 AM',
      sunset: '06:21 PM',
    },
    {
      date: 'Day 3',
      weatherCode: 51,
      tempMax: 21.5,
      tempMin: 11.5,
      precipitationSum: 3.4,
      uvIndexMax: 7.5,
      sunrise: '06:14 AM',
      sunset: '06:21 PM',
    },
    {
      date: 'Day 4',
      weatherCode: 2,
      tempMax: 22.1,
      tempMin: 10.8,
      precipitationSum: 0.5,
      uvIndexMax: 9.2,
      sunrise: '06:14 AM',
      sunset: '06:21 PM',
    },
    {
      date: 'Day 5',
      weatherCode: 0,
      tempMax: 24.0,
      tempMin: 11.0,
      precipitationSum: 0.0,
      uvIndexMax: 10.1,
      sunrise: '06:14 AM',
      sunset: '06:21 PM',
    },
  ],
  hourly: [
    { time: '06:00', temp: 12.4, humidity: 88, precipProb: 5, weatherCode: 45 },
    { time: '09:00', temp: 17.2, humidity: 74, precipProb: 10, weatherCode: 1 },
    { time: '12:00', temp: 22.8, humidity: 55, precipProb: 15, weatherCode: 2 },
    { time: '15:00', temp: 21.6, humidity: 62, precipProb: 25, weatherCode: 2 },
    { time: '18:00', temp: 17.9, humidity: 78, precipProb: 20, weatherCode: 1 },
    { time: '21:00', temp: 14.1, humidity: 85, precipProb: 10, weatherCode: 0 },
  ],
  lastUpdated: new Date(),
  isLive: false,
};

// Map WMO codes to descriptions, Amharic translations, and Lucide icons
function getWeatherDetails(code: number, isDay = true) {
  if (code === 0) {
    return {
      description: isDay ? 'Sunny Mountain Clear' : 'Starlit Mountain Sky',
      amharic: isDay ? 'ጠራራ ፀሐይ' : 'ጥርት ያለ ሰማይ',
      icon: <Sun className="w-8 h-8 text-amber-500 animate-spin-slow" />,
      smallIcon: <Sun className="w-5 h-5 text-amber-500" />,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    };
  }
  if (code === 1 || code === 2) {
    return {
      description: 'Partly Cloudy Mountain Sky',
      amharic: 'ከፊል ደመናማ',
      icon: <CloudSun className="w-8 h-8 text-amber-600" />,
      smallIcon: <CloudSun className="w-5 h-5 text-amber-600" />,
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    };
  }
  if (code === 3) {
    return {
      description: 'Highland Overcast',
      amharic: 'ደመናማ አየር',
      icon: <Cloud className="w-8 h-8 text-stone-500" />,
      smallIcon: <Cloud className="w-5 h-5 text-stone-500" />,
      badgeColor: 'bg-stone-200 text-stone-800 border-stone-300',
    };
  }
  if (code >= 45 && code <= 48) {
    return {
      description: 'Highland Mountain Mist / Fog',
      amharic: 'የተራራ ጉም',
      icon: <CloudFog className="w-8 h-8 text-teal-600" />,
      smallIcon: <CloudFog className="w-5 h-5 text-teal-600" />,
      badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
    };
  }
  if (code >= 51 && code <= 55) {
    return {
      description: 'Gentle Highland Drizzle',
      amharic: 'ካፊያ ዝናብ',
      icon: <CloudDrizzle className="w-8 h-8 text-blue-500" />,
      smallIcon: <CloudDrizzle className="w-5 h-5 text-blue-500" />,
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    };
  }
  if (code >= 61 && code <= 67) {
    return {
      description: 'Rift Valley Mountain Rain',
      amharic: 'ተራራማ ዝናብ',
      icon: <CloudRain className="w-8 h-8 text-blue-600" />,
      smallIcon: <CloudRain className="w-5 h-5 text-blue-600" />,
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    };
  }
  if (code >= 80 && code <= 82) {
    return {
      description: 'Highland Afternoon Showers',
      amharic: 'የከሰዓት ዝናብ',
      icon: <CloudRain className="w-8 h-8 text-indigo-600" />,
      smallIcon: <CloudRain className="w-5 h-5 text-indigo-600" />,
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    };
  }
  if (code >= 95) {
    return {
      description: 'Mountain Thunderstorm',
      amharic: 'ነጎድጓዳማ ዝናብ',
      icon: <CloudLightning className="w-8 h-8 text-amber-600" />,
      smallIcon: <CloudLightning className="w-5 h-5 text-amber-600" />,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    };
  }
  return {
    description: 'Highland Mild Weather',
    amharic: 'ተስማሚ አየር',
    icon: <Sun className="w-8 h-8 text-amber-500" />,
    smallIcon: <Sun className="w-5 h-5 text-amber-500" />,
    badgeColor: 'bg-stone-100 text-stone-800 border-stone-200',
  };
}

export const LocalWeather: React.FC = () => {
  const [data, setData] = useState<WeatherData>(FALLBACK_WEATHER);
  const [loading, setLoading] = useState<boolean>(true);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [activeTab, setActiveTab] = useState<'overview' | 'dryingImpact' | 'hourly'>('overview');
  const [currentTimeEAT, setCurrentTimeEAT] = useState<string>('');

  // Convert temperature helper
  const formatTemp = (celsius: number) => {
    if (unit === 'F') {
      const f = (celsius * 9) / 5 + 32;
      return `${Math.round(f)}°F`;
    }
    return `${Math.round(celsius)}°C`;
  };

  // Keep live East Africa Time (EAT - UTC+3)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const eatFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Addis_Ababa',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTimeEAT(eatFormatter.format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch real-time weather from Open-Meteo API
  const fetchGedebWeather = useCallback(async () => {
    setLoading(true);
    try {
      // Gedeb coordinates: 5.932° N, 38.281° E
      const url =
        'https://api.open-meteo.com/v1/forecast?latitude=5.932&longitude=38.281&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum&timezone=Africa%2FAddis_Ababa';

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Weather fetch failed: ${response.statusText}`);
      }

      const json = await response.json();

      const current = {
        temperature: json.current.temperature_2m,
        apparentTemperature: json.current.apparent_temperature,
        humidity: json.current.relative_humidity_2m,
        precipitation: json.current.precipitation,
        weatherCode: json.current.weather_code,
        windSpeed: json.current.wind_speed_10m,
        windDirection: json.current.wind_direction_10m,
        pressure: json.current.surface_pressure,
        cloudCover: json.current.cloud_cover,
        isDay: Boolean(json.current.is_day),
        time: json.current.time,
      };

      // Format daily 5 days
      const daysCount = Math.min(5, json.daily.time?.length || 0);
      const daily: DailyForecast[] = [];
      const dayNames = ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'];

      for (let i = 0; i < daysCount; i++) {
        let label = dayNames[i] || `Day ${i + 1}`;
        if (i > 1 && json.daily.time[i]) {
          const d = new Date(json.daily.time[i]);
          label = d.toLocaleDateString('en-US', { weekday: 'short' });
        }

        const rawSunrise = json.daily.sunrise?.[i] || '';
        const rawSunset = json.daily.sunset?.[i] || '';

        const formatSunTime = (isoStr: string) => {
          if (!isoStr) return '--';
          const parts = isoStr.split('T');
          return parts[1] || isoStr;
        };

        daily.push({
          date: label,
          weatherCode: json.daily.weather_code[i],
          tempMax: json.daily.temperature_2m_max[i],
          tempMin: json.daily.temperature_2m_min[i],
          precipitationSum: json.daily.precipitation_sum?.[i] ?? 0,
          uvIndexMax: json.daily.uv_index_max?.[i] ?? 8,
          sunrise: formatSunTime(rawSunrise),
          sunset: formatSunTime(rawSunset),
        });
      }

      // Format next 8 hourly intervals
      const hourly: HourlyForecast[] = [];
      if (json.hourly?.time) {
        // Find current hour index or start from index 0
        const nowIsoPrefix = json.current.time.slice(0, 13);
        let startIdx = json.hourly.time.findIndex((t: string) => t.startsWith(nowIsoPrefix));
        if (startIdx === -1) startIdx = 0;

        for (let i = startIdx; i < Math.min(startIdx + 8, json.hourly.time.length); i++) {
          const rawTime = json.hourly.time[i];
          const timeLabel = rawTime.slice(11, 16);
          hourly.push({
            time: timeLabel,
            temp: json.hourly.temperature_2m[i],
            humidity: json.hourly.relative_humidity_2m[i],
            precipProb: json.hourly.precipitation_probability?.[i] ?? 0,
            weatherCode: json.hourly.weather_code[i],
          });
        }
      }

      setData({
        current,
        daily,
        hourly,
        lastUpdated: new Date(),
        isLive: true,
      });
    } catch {
      // Fallback gracefully without breaking UI
      setData((prev) => ({
        ...prev,
        lastUpdated: new Date(),
        isLive: false,
      }));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGedebWeather();
    // Refresh weather every 10 minutes
    const interval = setInterval(fetchGedebWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchGedebWeather]);

  const weatherStyle = getWeatherDetails(data.current.weatherCode, data.current.isDay);

  // Evaluate coffee drying condition based on live temp and humidity
  const getDryingCondition = () => {
    const { temperature, humidity, precipitation } = data.current;
    if (precipitation > 0.5) {
      return {
        status: 'Sheltered Coverage Advised',
        color: 'bg-amber-100 text-amber-900 border-amber-300',
        rating: 'Tarp On',
        description:
          'Highland precipitation detected. Coffee parchment beds must be draped with breathable plastic sheeting to preserve delicate cup clarity.',
      };
    }
    if (humidity > 75) {
      return {
        status: 'Slow Highland Fermentation',
        color: 'bg-blue-100 text-blue-900 border-blue-300',
        rating: 'Gentle',
        description:
          'High mountain moisture extends bean drying time to 18-21 days, allowing floral jasmine notes and complex honey sweetness to deepen.',
      };
    }
    if (temperature >= 18 && temperature <= 25 && humidity <= 65) {
      return {
        status: 'Prime Raised Bed Solar Drying',
        color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        rating: 'Ideal (Grade 1)',
        description:
          'Spectacular highland solar drying conditions. Crisp mountain airflow and balanced ultraviolet radiation ensure uniform bean moisture reaching the target 10.5%.',
      };
    }
    return {
      status: 'Steady Highland Processing',
      color: 'bg-stone-100 text-stone-900 border-stone-300',
      rating: 'Favorable',
      description:
        'Moderate mountain temperature ensures balanced parchment moisture stabilization on high raised bamboo screens.',
    };
  };

  const dryingAssessment = getDryingCondition();

  return (
    <section id="gedeb-weather" className="py-12 bg-gradient-to-b from-[#fafaf6] via-emerald-50/20 to-[#fafaf6] border-t border-b border-stone-200/70 relative overflow-hidden">
      {/* Background subtle topographic patterns */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
              <Mountain className="w-3.5 h-3.5" />
              <span>Gedeb Woreda Microclimate • 2,050m ASL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-display text-stone-900 flex items-center gap-3">
              <span>Local Mountain Weather</span>
              <span className="text-sm font-sans font-medium text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md border border-emerald-200">
                የገደብ የአየር ሁኔታ
              </span>
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Live meteorological readings and coffee drying indices directly from Gedeb City, Gedeo Zone, South Ethiopia (5.93°N, 38.28°E).
            </p>
          </div>

          {/* Controls: Unit Toggle & Live Refresh */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* Unit switch */}
            <div className="flex items-center bg-stone-200/80 p-0.5 rounded-lg border border-stone-300">
              <button
                onClick={() => setUnit('C')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  unit === 'C'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Celsius"
              >
                °C
              </button>
              <button
                onClick={() => setUnit('F')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  unit === 'F'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Fahrenheit"
              >
                °F
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchGedebWeather}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg shadow-xs hover:border-emerald-500 transition-all cursor-pointer disabled:opacity-50"
              title="Refresh live weather from Open-Meteo"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-700 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Updating...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Live Weather Main Card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden mb-6">
          {/* Top Status Bar with Live Indicator & Gedeb Clock */}
          <div className="bg-stone-900 text-stone-300 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-stone-800">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>{data.isLive ? 'Live Weather API Active' : 'Cached Microclimate Data'}</span>
              </span>
              <span className="text-stone-500 hidden sm:inline">•</span>
              <span className="text-stone-400 hidden sm:inline">Provider: Open-Meteo High-Res Model</span>
            </div>

            <div className="flex items-center gap-4 text-stone-400">
              <div className="flex items-center gap-1.5 text-stone-200">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Gedeb Local Time (EAT):</span>
                <span className="font-mono font-bold text-amber-300">
                  {currentTimeEAT || '12:00 PM EAT'}
                </span>
              </div>
            </div>
          </div>

          {/* Primary Metrics Grid */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Big Temperature & Status */}
              <div className="lg:col-span-5 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-stone-200 pb-6 lg:pb-0 lg:pr-8">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${weatherStyle.badgeColor}`}
                  >
                    {weatherStyle.smallIcon}
                    <span>{weatherStyle.description}</span>
                  </span>
                  <span className="text-xs font-semibold text-stone-500">
                    ({weatherStyle.amharic})
                  </span>
                </div>

                <div className="flex items-baseline gap-4 mt-2">
                  <div className="text-5xl sm:text-6xl font-extrabold font-serif-display text-stone-900 tracking-tight">
                    {formatTemp(data.current.temperature)}
                  </div>
                  <div className="text-stone-500 text-xs sm:text-sm font-medium">
                    <div>Feels like {formatTemp(data.current.apparentTemperature)}</div>
                    <div className="text-emerald-800 font-semibold mt-0.5">
                      Elevation: ~2,050m ASL
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 mt-4 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-200/80">
                  <strong className="text-stone-800">Highland Terroir Effect:</strong> The crisp mountain air and drastic nighttime cooling (down to ~11°C) slow cherry maturation, concentrating sucrose and bright citrus acids in Gedeb coffee beans.
                </p>
              </div>

              {/* Right Column: Key Microclimate Instruments */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {/* Humidity */}
                  <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
                      <span>Relative Humidity</span>
                      <Droplets className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="mt-2 text-2xl font-bold text-stone-900 font-mono">
                      {data.current.humidity}%
                    </div>
                    <div className="text-[11px] text-emerald-800 mt-1 font-medium">
                      {data.current.humidity > 70 ? 'High highland moisture' : 'Crisp mountain air'}
                    </div>
                  </div>

                  {/* Mountain Wind */}
                  <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
                      <span>Mountain Breeze</span>
                      <Wind className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="mt-2 text-2xl font-bold text-stone-900 font-mono">
                      {Math.round(data.current.windSpeed)} <span className="text-xs text-stone-500 font-sans">km/h</span>
                    </div>
                    <div className="text-[11px] text-amber-800 mt-1 font-medium">
                      Aerates raised drying beds
                    </div>
                  </div>

                  {/* Surface Pressure */}
                  <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
                      <span>Barometer</span>
                      <Gauge className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="mt-2 text-2xl font-bold text-stone-900 font-mono">
                      {Math.round(data.current.pressure)} <span className="text-xs text-stone-500 font-sans">hPa</span>
                    </div>
                    <div className="text-[11px] text-blue-800 mt-1 font-medium">
                      Highland atmospheric density
                    </div>
                  </div>

                  {/* Precipitation */}
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
                      <span>Precipitation</span>
                      <CloudRain className="w-4 h-4 text-stone-600" />
                    </div>
                    <div className="mt-2 text-2xl font-bold text-stone-900 font-mono">
                      {data.current.precipitation} <span className="text-xs text-stone-500 font-sans">mm</span>
                    </div>
                    <div className="text-[11px] text-stone-600 mt-1 font-medium">
                      {data.current.precipitation > 0 ? 'Active mountain rain' : 'Dry canopy conditions'}
                    </div>
                  </div>

                  {/* Sunrise */}
                  <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
                      <span>Highland Sunrise</span>
                      <Sunrise className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="mt-2 text-xl font-bold text-stone-900 font-mono">
                      {data.daily[0]?.sunrise || '06:14 AM'}
                    </div>
                    <div className="text-[11px] text-orange-800 mt-1 font-medium">
                      Morning mist lifting
                    </div>
                  </div>

                  {/* Sunset */}
                  <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
                      <span>Sunset (EAT)</span>
                      <Sunset className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="mt-2 text-xl font-bold text-stone-900 font-mono">
                      {data.daily[0]?.sunset || '06:21 PM'}
                    </div>
                    <div className="text-[11px] text-purple-800 mt-1 font-medium">
                      Nighttime cooling cycle
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Tabs for Coffee Terroir / Hourly / 5-Day Outlook */}
          <div className="border-t border-stone-200 bg-stone-50/80 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'overview'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                5-Day Highland Outlook
              </button>
              <button
                onClick={() => setActiveTab('dryingImpact')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'dryingImpact'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Coffee Drying Bed Index</span>
              </button>
              <button
                onClick={() => setActiveTab('hourly')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'hourly'
                    ? 'bg-stone-800 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                Hourly Temperature Trend
              </button>
            </div>
          </div>

          {/* Tab 1: 5-Day Highland Outlook */}
          {activeTab === 'overview' && (
            <div className="p-6 bg-white border-t border-stone-200">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {data.daily.map((day, idx) => {
                  const style = getWeatherDetails(day.weatherCode, true);
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-stone-200/80 bg-stone-50/60 hover:bg-emerald-50/30 transition-all flex flex-col items-center text-center"
                    >
                      <span className="text-xs font-bold text-stone-800">{day.date}</span>
                      <div className="my-2">{style.smallIcon}</div>
                      <span className="text-[11px] text-stone-500 font-medium line-clamp-1">
                        {style.description}
                      </span>
                      <div className="mt-2 flex items-center gap-2 text-xs font-bold">
                        <span className="text-stone-900">{formatTemp(day.tempMax)}</span>
                        <span className="text-stone-400">/</span>
                        <span className="text-stone-500 font-normal">{formatTemp(day.tempMin)}</span>
                      </div>
                      <div className="mt-2 text-[10px] text-emerald-800 font-semibold bg-emerald-100/70 px-2 py-0.5 rounded-md">
                        UV {day.uvIndexMax} • {day.precipitationSum}mm
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Coffee Drying Bed Index (Terroir Impact) */}
          {activeTab === 'dryingImpact' && (
            <div className="p-6 bg-white border-t border-stone-200">
              <div className="bg-gradient-to-br from-amber-50/80 via-emerald-50/50 to-stone-50 rounded-xl p-5 border border-amber-200/70">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                    <h4 className="text-base font-bold text-stone-900 font-serif-display">
                      Current Gedeb Drying Bed & Processing Status
                    </h4>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${dryingAssessment.color}`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{dryingAssessment.status} ({dryingAssessment.rating})</span>
                  </span>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed mb-4">
                  {dryingAssessment.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-200/80 text-xs">
                  <div className="p-3 bg-white/90 rounded-lg border border-stone-200">
                    <span className="text-stone-500 block font-medium">Optimal Moisture Target:</span>
                    <span className="font-bold text-stone-900 text-sm">10.5% – 11.5%</span>
                    <p className="text-[11px] text-stone-500 mt-0.5">Strict specialty export standard</p>
                  </div>
                  <div className="p-3 bg-white/90 rounded-lg border border-stone-200">
                    <span className="text-stone-500 block font-medium">Average Bed Turn Rate:</span>
                    <span className="font-bold text-stone-900 text-sm">Every 45–60 mins</span>
                    <p className="text-[11px] text-stone-500 mt-0.5">Uniform air exposure</p>
                  </div>
                  <div className="p-3 bg-white/90 rounded-lg border border-stone-200">
                    <span className="text-stone-500 block font-medium">Diurnal Temp Swing:</span>
                    <span className="font-bold text-stone-900 text-sm">~12°C Differential</span>
                    <p className="text-[11px] text-stone-500 mt-0.5">Intensifies floral terpenes</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Hourly Trend */}
          {activeTab === 'hourly' && (
            <div className="p-6 bg-white border-t border-stone-200">
              <div className="flex items-center gap-2 mb-3 text-xs text-stone-600 font-medium">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                <span>Next 8 Hours Forecast (East Africa Time - Gedeb)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
                {data.hourly.map((h, i) => {
                  const style = getWeatherDetails(h.weatherCode, true);
                  return (
                    <div
                      key={i}
                      className="p-3 rounded-xl border border-stone-200 bg-stone-50 flex flex-col items-center text-center"
                    >
                      <span className="text-xs font-mono font-bold text-stone-700">{h.time}</span>
                      <div className="my-1.5">{style.smallIcon}</div>
                      <span className="text-sm font-bold text-stone-900">{formatTemp(h.temp)}</span>
                      <div className="text-[10px] text-blue-700 font-medium mt-1 flex items-center gap-0.5">
                        <Droplets className="w-2.5 h-2.5" />
                        <span>{h.precipProb}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
