import { useState, useEffect } from 'react'
import Header from './components/Header'
import strings from './i18n/strings.json'

function App() {
  const [lang, setLang] = useState('en')
  const [darkMode, setDarkMode] = useState(true)
  const [lowBandwidth, setLowBandwidth] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const tAction = strings.actionItems
  const tAnomaly = strings.anomalies

  return (
    <div className="min-h-screen xl:h-screen xl:max-h-screen bg-background text-on-background flex flex-col overflow-y-auto xl:overflow-hidden transition-colors duration-300">
      <Header
        lang={lang}
        setLang={setLang}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        lowBandwidth={lowBandwidth}
        setLowBandwidth={setLowBandwidth}
      />

      <main className="flex-1 px-8 py-6 xl:overflow-hidden">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-0 h-full divide-y xl:divide-y-0 xl:divide-x divide-outline-variant/30">
          
          {/* Left Column (col-span-8) */}
          <div className="col-span-12 xl:col-span-8 xl:h-full xl:overflow-hidden pb-6 xl:pb-0 pr-0 xl:pr-8 flex flex-col">
            {/* Eyebrow Header Row */}
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3 mb-4 h-10">
              <h2 className="text-label-caps font-label-caps tracking-widest text-outline uppercase font-semibold">
                {tAction.sectionTitle[lang]}
              </h2>
              <span className="text-data-mono font-data-mono text-outline uppercase tracking-wider">
                {tAction.autoRefresh[lang]}
              </span>
            </div>
            
            {/* Empty Dashed Box */}
            <div className="flex-1 min-h-[400px] border border-dashed border-outline-variant/50 bg-surface-container-low/10 rounded-xl flex flex-col items-center justify-center p-8 transition-colors duration-300">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-outline text-[24px]">assignment</span>
              </div>
              <p className="text-body-md font-body-md text-outline">
                {lang === 'en' ? 'Action items will be loaded here' : 'कार्रवाई की जाने वाली वस्तुएं यहां लोड की जाएंगी'}
              </p>
            </div>
          </div>

          {/* Right Column (col-span-4) */}
          <div className="col-span-12 xl:col-span-4 xl:h-full xl:overflow-hidden pt-6 xl:pt-0 pl-0 xl:pl-8 flex flex-col">
            {/* Eyebrow Header Row */}
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3 mb-4 h-10">
              <h2 className="text-label-caps font-label-caps tracking-widest text-outline uppercase font-semibold">
                {tAnomaly.sectionTitle[lang]}
              </h2>
              <div className="flex items-center gap-3 text-outline">
                <button className="flex items-center justify-center hover:text-primary transition-colors p-1 rounded focus:outline-none">
                  <span className="material-symbols-outlined text-[20px]">filter_list</span>
                </button>
                <button className="flex items-center justify-center hover:text-primary transition-colors p-1 rounded focus:outline-none">
                  <span className="material-symbols-outlined text-[20px]">download</span>
                </button>
              </div>
            </div>

            {/* Empty Dashed Box */}
            <div className="flex-1 min-h-[400px] border border-dashed border-outline-variant/50 bg-surface-container-low/10 rounded-xl flex flex-col items-center justify-center p-8 transition-colors duration-300">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-outline text-[24px]">warning</span>
              </div>
              <p className="text-body-md font-body-md text-outline">
                {lang === 'en' ? 'Flagged anomalies will be loaded here' : 'चिह्नित विसंगतियां यहां लोड की जाएंगी'}
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default App
