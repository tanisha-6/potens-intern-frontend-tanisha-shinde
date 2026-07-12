import strings from '../i18n/strings.json';

export function formatRelativeTime(dateInput, lang = 'en') {
  const date = new Date(dateInput);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  const t = strings.anomalies.time;

  // Clock skew fallback or future dates
  if (diffMs < 0) {
    return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'hi-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  // Under a minute
  if (diffMs < 60000) {
    return t.justNow[lang];
  }

  // Under an hour
  if (diffMins < 60) {
    return `${diffMins} ${t.minAgo[lang]}`;
  }

  // Under 24 hours
  if (diffHours < 24) {
    return `${diffHours}${t.hAgo[lang]}`;
  }

  // Older than 24 hours fallback to short date representation
  return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'hi-IN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}
