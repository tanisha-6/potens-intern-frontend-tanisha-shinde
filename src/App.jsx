import { useState, useEffect } from 'react'
import Header from './components/Header'
import PriorityList from './components/PriorityList'
import AnomalyPanel from './components/AnomalyPanel'

function App() {
  const [lang, setLang] = useState('en')
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved !== null) {
      return saved === 'dark'
    }
    return true // Defaulting to dark mode to match high-visual Stitch black styling
  })
  const [lowBandwidth, setLowBandwidth] = useState(false)

  // Sync dark mode class on <html> element and save selection
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

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
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-0 h-full divide-y xl:divide-y-0 xl:divide-x divide-outline-variant">
          
          {/* Priority List (Left Column, col-span-8) */}
          <div className="col-span-12 xl:col-span-8 xl:h-full xl:overflow-hidden pb-6 xl:pb-0">
            <PriorityList lang={lang} />
          </div>

          {/* Anomaly Panel (Right Column, col-span-4) */}
          <div className="col-span-12 xl:col-span-4 xl:h-full xl:overflow-hidden pt-6 xl:pt-0">
            <AnomalyPanel lang={lang} />
          </div>

        </div>
      </main>
    </div>
  )
}

export default App
