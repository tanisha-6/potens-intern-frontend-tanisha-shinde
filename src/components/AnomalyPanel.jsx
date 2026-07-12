import React from 'react';
import strings from '../i18n/strings.json';
import anomalies from '../data/anomalies.json';

export default function AnomalyPanel({ lang }) {
  const t = strings.anomalies;

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'critical':
        return 'severity-critical';
      case 'warning':
        return 'severity-warning';
      case 'info':
      default:
        return 'severity-info';
    }
  };

  const getDeviationColor = (row) => {
    if (row.severity === 'critical') return 'text-secondary'; // Stitch secondary is light-red (#ffb4ac)
    if (row.severity === 'warning' || row.id === 'AN-9984') return 'text-tertiary'; // Stitch tertiary is orange-ish (#ffb783)
    return 'text-on-surface';
  };

  return (
    <div className="flex flex-col h-full select-none pl-8 transition-colors duration-300">
      
      {/* Section Header Row */}
      <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3 mb-2 h-10">
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

      {/* Table Header Row */}
      <div className="flex items-center justify-between text-label-caps font-label-caps text-outline uppercase pb-2 border-b border-outline-variant/60 px-3">
        <span className="w-[55%]">{t.headers.details[lang]}</span>
        <span className="w-[20%] text-center">{t.headers.detected[lang]}</span>
        <span className="w-[25%] text-right">{t.headers.deviation[lang]}</span>
      </div>

      {/* Table Body (Flex Container) */}
      <div className="flex-1 flex flex-col justify-between divide-y divide-outline-variant/20 mb-6">
        {anomalies.map((row) => {
          const timeString = row.detectedAt.substring(11, 19); // Extracts HH:MM:SS safely
          return (
            <div
              key={row.id}
              className={`flex items-center justify-between py-3 pl-3 pr-2 border-b border-outline-variant/20 last:border-b-0 ${getSeverityClass(row.severity)} bg-gradient-to-r from-transparent to-transparent hover:to-surface-variant/10 transition-colors duration-150`}
            >
              
              {/* Column 1: Details */}
              <div className="w-[55%] flex flex-col pr-2">
                <span className="text-headline-sm font-headline-sm text-on-surface font-semibold leading-tight">
                  {row.title[lang]}
                </span>
                <span className="text-body-md font-body-md text-on-surface-variant/60 mt-0.5 leading-none">
                  {row.subtitle[lang]}
                </span>
              </div>

              {/* Column 2: Detected Time */}
              <div className="w-[20%] text-center text-data-mono font-data-mono text-outline">
                {timeString}
              </div>

              {/* Column 3: Deviation info */}
              <div className="w-[25%] text-right flex flex-col">
                <span className={`text-headline-sm font-headline-sm font-bold ${getDeviationColor(row)}`}>
                  {row.deviationLabel}
                </span>
                <span className="text-[10px] text-outline font-body-md tracking-tight leading-none mt-0.5 uppercase font-semibold">
                  {row.deviationSublabel[lang]}
                </span>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
