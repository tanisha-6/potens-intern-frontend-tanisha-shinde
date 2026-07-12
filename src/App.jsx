import { useState } from 'react'
import strings from './i18n/strings.json'

function App() {
  const [lang, setLang] = useState('en')

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">{strings.appTitle[lang]}</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-4">Scaffold is working. Build the real cockpit here.</p>
        <button
          onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
          className="px-4 py-2 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-sm font-medium"
        >
          {lang === 'en' ? 'हिंदी में देखें' : 'View in English'}
        </button>
      </div>
    </div>
  )
}

export default App
