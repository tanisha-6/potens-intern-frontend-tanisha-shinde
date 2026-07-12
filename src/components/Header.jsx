import React, { useState, useEffect } from 'react';
import strings from '../i18n/strings.json';

export default function Header({
  lang,
  setLang,
  darkMode,
  setDarkMode,
  lowBandwidth,
  setLowBandwidth,
}) {
  const t = strings.nav;

  // Live active shipments counter (Client-side simulation)
  const [activeCount, setActiveCount] = useState(42);
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCount((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
        const next = prev + delta;
        // Bound count strictly between 38 and 46
        if (next < 38) return 38;
        if (next > 46) return 46;
        return next;
      });
    }, 8000); // Fluctuate count every 8 seconds
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update clock every second
    return () => clearInterval(clockTimer);
  }, []);

  const formatDateTime = (date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const hoursStr = String(hours).padStart(2, '0');

    const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    const dateString = date.toLocaleDateString(lang === 'en' ? 'en-US' : 'hi-IN', dateOptions);

    return `${hoursStr}:${minutes}:${seconds} ${ampm} — ${dateString}`;
  };

  return (
    <header className="h-28 w-full bg-background border-b border-outline-variant text-on-surface flex items-center justify-between px-8 select-none transition-colors duration-300">
      
      {/* Left: App Title & Stacked Live Clock */}
      <div className="flex flex-col items-start justify-center">
        <h1 className="text-[30px] font-sans font-bold text-on-surface tracking-tight leading-none select-none">
          {strings.appTitle[lang]}
        </h1>
        <span className="text-[16px] font-data-mono text-outline mt-2 tracking-wide font-medium select-none">
          {formatDateTime(currentTime)}
        </span>
      </div>

      {/* Center: Stacked Live-Metric Block */}
      <div className="flex flex-col items-center justify-center text-center">
        <span className="text-[11px] font-label-caps tracking-widest text-outline uppercase font-semibold">
          {t.liveMetricLabel[lang]}
        </span>
        <div className="flex items-center justify-center gap-3 mt-1">
          {/* Breathing Connection Green Dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" title="Connected to feed"></span>
          <span className="text-display-rank font-display-rank font-extrabold tabular-nums text-on-surface leading-none">
            {activeCount}
          </span>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-6">
        
        {/* Language Toggle */}
        <button
          onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors duration-150 focus:outline-none"
        >
          <span className="material-symbols-outlined text-[20px] text-outline">
            language
          </span>
          <span className="text-body-md font-body-md font-bold uppercase tracking-wider">
            {lang === 'en' ? 'EN/HI' : 'अंग्रेजी/हिंदी'}
          </span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center text-on-surface-variant hover:text-primary transition-colors duration-150 focus:outline-none"
          title={t.darkModeToggle[lang]}
        >
          <span className="material-symbols-outlined text-[20px] text-outline">
            {darkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {/* Bandwidth Toggle */}
        {/* <button
          onClick={() => setLowBandwidth(!lowBandwidth)}
          className={`flex items-center text-on-surface-variant hover:text-primary transition-colors duration-150 focus:outline-none ${
            lowBandwidth ? 'text-secondary' : 'text-on-surface-variant'
          }`}
          title={t.lowBandwidthToggle[lang]}
        >
          <span className="material-symbols-outlined text-[20px]">
            signal_cellular_alt
          </span>
        </button> */}

      </div>
    </header>
  );
}
