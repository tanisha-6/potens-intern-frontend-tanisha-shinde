import React, { useState } from 'react';
import strings from '../i18n/strings.json';
import actionItems from '../data/actionItems.json';

export default function PriorityList({ lang }) {
  const t = strings.actionItems;

  // Track the action status of each item: 'pending' | 'approved' | 'held'
  const [statuses, setStatuses] = useState(() => {
    const initial = {};
    actionItems.forEach((item) => {
      initial[item.id] = 'pending';
    });
    return initial;
  });

  // Track active toast notifications
  const [toasts, setToasts] = useState([]);

  const getTagClasses = (tag) => {
    switch (tag) {
      case 'CRITICAL':
      case 'SENSITIVE':
        return 'bg-secondary-container text-on-secondary-container';
      case 'RE-ROUTE':
        return 'bg-tertiary-container text-on-tertiary-container';
      case 'SAFETY':
      case 'COMPLIANCE':
        return 'bg-primary-container text-on-primary-container';
      default:
        return 'bg-surface-container-highest text-on-surface';
    }
  };

  const handleAction = (id, type) => {
    const item = actionItems.find((i) => i.id === id);
    if (!item) return;

    let statusText = 'pending';
    let toastLabel = '';

    if (type === 'approve') {
      statusText = 'approved';
      toastLabel = t.toastApproved[lang];
    } else if (type === 'hold') {
      statusText = 'held';
      toastLabel = t.toastHeld[lang];
    } else if (type === 'undo') {
      statusText = 'pending';
      toastLabel = t.toastReverted[lang];
    }

    const message = `${toastLabel} — ${item.title[lang]}`;

    // Update status mapping in place
    setStatuses((prev) => ({ ...prev, [id]: statusText }));

    // Add toast notification
    const toastId = Date.now();
    setToasts((prev) => [...prev, { id: toastId, message }]);

    // Auto-dismiss toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
    }, 3000);
  };

  return (
    <div className="flex flex-col h-full select-none transition-colors duration-300 relative">
      
      {/* Section Header Row */}
      <div className="flex items-center justify-between border-b border-outline-variant pb-3 mb-2 h-10 pr-8">
        <h2 className="text-label-caps font-label-caps tracking-widest text-outline uppercase font-semibold">
          {t.sectionTitle[lang]}
        </h2>
        <span className="text-data-mono font-data-mono text-outline uppercase tracking-wider">
          {t.autoRefresh[lang]}
        </span>
      </div>

      {/* Row Items Container (No empty-state path since items are actioned in place) */}
      <div className="flex-1 flex flex-col justify-between divide-y divide-outline-variant">
        {actionItems.map((item) => {
          const formattedRank = String(item.rank).padStart(2, '0');
          const currentStatus = statuses[item.id];
          const isActioned = currentStatus === 'approved' || currentStatus === 'held';

          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-4 transition-all duration-200 pr-8"
            >
              
              {/* Left Side: Rank, Title, Context, Tag */}
              <div className="flex items-start gap-4 flex-1">
                
                {/* Large Rank Number */}
                <div className="text-display-rank font-display-rank text-outline select-none min-w-[56px] text-center font-bold">
                  {formattedRank}
                </div>

                {/* Title & Context Info */}
                <div className="flex flex-col gap-1 flex-1 mt-0.5">
                  
                  {/* Title & Tag Pill */}
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className={`text-headline-sm font-headline-sm font-semibold leading-snug transition-all duration-200 ${
                      isActioned ? 'line-through text-on-surface-variant opacity-40' : 'text-on-surface'
                    }`}>
                      {item.title[lang]}
                    </h3>
                    <span className={`text-label-caps font-label-caps px-3 py-1 rounded text-[10px] uppercase font-bold tracking-wider transition-all duration-200 ${getTagClasses(item.tagLabel)} ${
                      isActioned ? 'opacity-60' : 'opacity-100'
                    }`}>
                      {t.tags[item.tagLabel] ? t.tags[item.tagLabel][lang] : item.tagLabel}
                    </span>
                  </div>

                  {/* Context Info */}
                  <p className={`text-body-md font-body-md italic leading-snug transition-all duration-200 ${
                    isActioned ? 'text-on-surface-variant opacity-40' : 'text-on-surface-variant'
                  }`}>
                    {item.context[lang]}
                  </p>

                </div>
              </div>

              {/* Right Side: Action Buttons / Undo indicator area */}
              {/* Heights are locked to h-9 (36px) to avoid visual layout shifts when collapsing buttons */}
              <div className="flex items-center gap-4 self-end sm:self-auto pl-16 sm:pl-0 h-9 transition-all duration-200">
                
                {/* Status Indicator (Checkmark/Pause icons) */}
                {isActioned && (
                  <div className="flex items-center gap-1.5 text-[11px] font-label-caps font-bold uppercase tracking-wider transition-all duration-200 animate-fade-in pr-2 select-none">
                    {currentStatus === 'approved' ? (
                      <>
                        <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
                        <span className="text-emerald-400">{t.toastApproved[lang]}</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-tertiary text-[18px]">pause_circle</span>
                        <span className="text-tertiary">{t.toastHeld[lang]}</span>
                      </>
                    )}
                  </div>
                )}

                {/* Approve/Hold Button pair or Single Undo button */}
                {!isActioned ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleAction(item.id, 'approve')}
                      className="px-6 py-1.5 rounded bg-primary hover:bg-primary/90 text-on-primary font-bold text-body-md transition-colors duration-150 active:scale-[0.97] shadow-sm uppercase tracking-wide focus:outline-none"
                    >
                      {t.approve[lang]}
                    </button>
                    <button
                      onClick={() => handleAction(item.id, 'hold')}
                      className="px-6 py-1.5 rounded border border-outline hover:bg-surface-variant/30 text-on-surface font-bold text-body-md transition-colors duration-150 active:scale-[0.97] uppercase tracking-wide focus:outline-none"
                    >
                      {t.hold[lang]}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAction(item.id, 'undo')}
                    className="px-6 py-1.5 rounded border border-outline hover:bg-surface-variant/30 text-on-surface font-bold text-body-md transition-colors duration-150 active:scale-[0.97] uppercase tracking-wide focus:outline-none"
                  >
                    {t.undo[lang]}
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Floating Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-surface-container border border-outline-variant/60 text-on-surface px-4 py-3.5 rounded-lg shadow-2xl flex items-center justify-between gap-3 pointer-events-auto transition-all duration-300 animate-slide-in"
          >
            <div className="flex items-center gap-2 text-sm font-semibold leading-tight">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
                info
              </span>
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-outline hover:text-on-surface shrink-0 focus:outline-none flex items-center justify-center p-0.5 rounded hover:bg-surface-variant/30 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
