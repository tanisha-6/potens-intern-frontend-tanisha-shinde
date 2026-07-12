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
        "background": "var(--color-background)",
        "surface": "var(--color-surface)",
        "surface-dim": "var(--color-surface-dim)",
        "surface-bright": "var(--color-surface-bright)",
        "surface-variant": "var(--color-surface-variant)",
        "surface-container-lowest": "var(--color-surface-container-lowest)",
        "surface-container-low": "var(--color-surface-container-low)",
        "surface-container": "var(--color-surface-container)",
        "surface-container-high": "var(--color-surface-container-high)",
        "surface-container-highest": "var(--color-surface-container-highest)",
        "on-surface": "var(--color-on-surface)",
        "on-surface-variant": "var(--color-on-surface-variant)",
        "on-background": "var(--color-on-background)",
        "outline": "var(--color-outline)",
        "outline-variant": "var(--color-outline-variant)",
        "primary": "var(--color-primary)",
        "on-primary": "var(--color-on-primary)",
        "primary-container": "var(--color-primary-container)",
        "on-primary-container": "var(--color-on-primary-container)",
        "secondary": "var(--color-secondary)",
        "on-secondary": "var(--color-on-secondary)",
        "secondary-container": "var(--color-secondary-container)",
        "on-secondary-container": "var(--color-on-secondary-container)",
        "tertiary": "var(--color-tertiary)",
        "on-tertiary": "var(--color-on-tertiary)",
        "tertiary-container": "var(--color-tertiary-container)",
        "on-tertiary-container": "var(--color-on-tertiary-container)",
        "error": "var(--color-error)",
        "error-container": "var(--color-error-container)",
        "on-error": "var(--color-on-error)",
        "on-error-container": "var(--color-on-error-container)"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        "body-md": ["Inter"], "headline-lg": ["Inter"], "label-caps": ["Inter"],
        "display-rank": ["Inter"], "display-title": ["Inter"], "headline-sm": ["Inter"], "data-mono": ["JetBrains Mono"]
      },
      fontSize: {
        "body-md": ["13px", { lineHeight: "18px", fontWeight: "400" }],
        "headline-lg": ["20px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "label-caps": ["11px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "700" }],
        "display-rank": ["48px", { lineHeight: "48px", letterSpacing: "-0.04em", fontWeight: "800" }],
        "headline-sm": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "600" }],
        "data-mono": ["12px", { lineHeight: "16px", fontWeight: "500" }]
      }
    }
  },
  plugins: [],
}
