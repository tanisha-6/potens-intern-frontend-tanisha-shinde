import React from 'react';
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

  return (
    <header className="h-24 w-full bg-background border-b border-outline-variant/30 text-on-surface flex items-center justify-between px-8 select-none transition-colors duration-300">
      
      {/* Left: App Title */}
      <div className="flex items-center">
        <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight font-bold select-none">
          {strings.appTitle[lang]}
        </h1>
      </div>

      {/* Center: Stacked Live-Metric Block */}
      <div className="flex flex-col items-center justify-center text-center">
        <span className="text-[11px] font-label-caps tracking-widest text-outline uppercase font-semibold">
          {t.liveMetricLabel[lang]}
        </span>
        <span className="text-display-rank font-display-rank font-extrabold tabular-nums text-white leading-none mt-1">
          42
        </span>
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
        <button
          onClick={() => setLowBandwidth(!lowBandwidth)}
          className={`flex items-center text-on-surface-variant hover:text-primary transition-colors duration-150 focus:outline-none ${
            lowBandwidth ? 'text-secondary' : 'text-on-surface-variant'
          }`}
          title={t.lowBandwidthToggle[lang]}
        >
          <span className="material-symbols-outlined text-[20px]">
            signal_cellular_alt
          </span>
        </button>

      </div>
    </header>
  );
}
