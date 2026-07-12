import React from 'react';
import strings from '../i18n/strings.json';
import anomalies from '../data/anomalies.json';
import { formatRelativeTime } from '../utils/formatRelativeTime';

export default function AnomalyPanel({ lang }) {
  const t = strings.anomalies;

  // Map high/medium/low or critical/warning/info to red/amber/gray accent borders
  const getSeverityClass = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
      case 'high':
        return 'severity-critical'; // Red accent
      case 'warning':
      case 'medium':
        return 'severity-warning'; // Amber accent
      case 'info':
      case 'low':
      default:
        return 'severity-info'; // Gray accent
    }
  };

  // Assign weights to severities for descending order sorting
  const getSeverityWeight = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
      case 'high':
        return 3;
      case 'warning':
      case 'medium':
        return 2;
      case 'info':
      case 'low':
      default:
        return 1;
    }
  };

  // Generate dynamic, spread-out timestamps computed relative to Date.now()
  // to avoid rounding everything into the same stale hour bucket.
  const processedAnomalies = anomalies.map((item, idx) => {
    const offsets = [
      30 * 1000,          // 30 seconds ago (renders "just now")
      12 * 60 * 1000,     // 12 minutes ago (renders "12 min ago")
      45 * 60 * 1000,     // 45 minutes ago (renders "45 min ago")
      2 * 3600 * 1000,    // 2 hours ago (renders "2h ago")
      5 * 3600 * 1000,    // 5 hours ago (renders "5h ago")
      14 * 3600 * 1000,   // 14 hours ago (renders "14h ago")
    ];
    const offset = offsets[idx] || (idx * 3 * 3600 * 1000);
    return {
      ...item,
      detectedAt: new Date(Date.now() - offset).toISOString(),
    };
  });

  // Sort: Severity descending, then recency descending
  const sortedAnomalies = [...processedAnomalies].sort((a, b) => {
    const weightA = getSeverityWeight(a.severity);
    const weightB = getSeverityWeight(b.severity);
    
    if (weightA !== weightB) {
      return weightB - weightA;
    }
    // Newest timestamp first
    return new Date(b.detectedAt) - new Date(a.detectedAt);
  });

  return (
    <div className="flex flex-col h-full select-none transition-colors duration-300 overflow-hidden">
      
      {/* Section Header Row */}
      <div className="flex items-center justify-between border-b border-outline-variant pb-3 mb-2 h-10 shrink-0 pl-8">
        <h2 className="text-label-caps font-label-caps tracking-widest text-outline uppercase font-semibold">
          {t.sectionTitle[lang]}
        </h2>
        
        {/* Filter and Download Icons */}
        <div className="flex items-center gap-3 text-outline">
          <button 
            className="flex items-center justify-center hover:text-primary transition-colors p-1 rounded focus:outline-none"
            title={lang === 'en' ? 'Filter' : 'फ़िल्टर'}
          >
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
          </button>
          <button 
            className="flex items-center justify-center hover:text-primary transition-colors p-1 rounded focus:outline-none"
            title={lang === 'en' ? 'Download' : 'डाउनलोड'}
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
          </button>
        </div>
      </div>

      {/* Table Header Row (Muted, Small, Uppercase) */}
      <div className="flex items-center justify-between text-label-caps font-label-caps text-outline uppercase pb-2 border-b border-outline pl-11 pr-3 shrink-0">
        <span className="w-[75%]">{t.headers.details[lang]}</span>
        <span className="w-[25%] text-right">{t.headers.detected[lang]}</span>
      </div>

      {/* Table Body (Flex Container with Independent vertical scrolling) */}
      {/* Row height layout and paddings (py-4) are standardized and rows support hover animations */}
      {/* Solid dividers (divide-divider-20 / border-divider-20) prevent transparency border bugs */}
      <div className="flex-grow overflow-y-auto pr-1 flex flex-col divide-y divide-outline-variant mb-6 scrollbar-thin">
        {sortedAnomalies.map((row) => {
          return (
            <div
              key={row.id}
              className={`flex items-center justify-between py-4 pl-11 pr-2 border-b border-outline-variant last:border-b-0 ${getSeverityClass(row.severity)} hover:bg-surface-variant/25 transition-all duration-150 shrink-0`}
            >
              
              {/* Column 1: Details (75% Width) */}
              <div className="w-[75%] flex flex-col pr-4">
                <span className="text-headline-sm font-headline-sm text-on-surface font-semibold leading-tight">
                  {row.title[lang]}
                </span>
                <span className="text-body-md font-body-md text-on-surface-variant/60 mt-0.5 leading-none">
                  {row.subtitle[lang]}
                </span>
              </div>

              {/* Column 2: Detected Time - Relative (25% Width) */}
              <div className="w-[25%] text-right text-data-mono font-data-mono text-on-surface-variant shrink-0">
                {formatRelativeTime(row.detectedAt, lang)}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
