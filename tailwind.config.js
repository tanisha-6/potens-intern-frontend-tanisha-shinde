/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#101417", "surface": "#101417", "surface-dim": "#101417",
        "surface-bright": "#363a3e", "surface-variant": "#313539",
        "surface-container-lowest": "#0b0f12", "surface-container-low": "#181c20",
        "surface-container": "#1c2024", "surface-container-high": "#262a2e",
        "surface-container-highest": "#313539",
        "on-surface": "#e0e3e8", "on-surface-variant": "#c4c6cb", "on-background": "#e0e3e8",
        "outline": "#8e9195", "outline-variant": "#44474b",
        "primary": "#c0c7cf", "on-primary": "#2a3138", "primary-container": "#495057",
        "on-primary-container": "#bbc2ca",
        "secondary": "#ffb4ac", "on-secondary": "#680007",
        "secondary-container": "#a00212", "on-secondary-container": "#ffa9a0",
        "tertiary": "#ffb783", "on-tertiary": "#4f2500",
        "tertiary-container": "#7d3e00", "on-tertiary-container": "#ffaf75",
        "error": "#ffb4ab", "error-container": "#93000a", "on-error": "#690005",
        "on-error-container": "#ffdad6"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        "body-md": ["Inter"], "headline-lg": ["Inter"], "label-caps": ["Inter"],
        "display-rank": ["Inter"], "headline-sm": ["Inter"], "data-mono": ["JetBrains Mono"]
      },
      fontSize: {
        "body-md": ["13px", { lineHeight: "18px", fontWeight: "400" }],
        "headline-lg": ["20px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "label-caps": ["11px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "700" }],
        "display-rank": ["48px", { lineHeight: "48px", letterSpacing: "-0.04em", fontWeight: "800" }],
        "headline-sm": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "600" }],
        "data-mono": ["12px", { lineHeight: "16px", fontWeight: "500" }]
      }
    },
  },
  plugins: [],
}
