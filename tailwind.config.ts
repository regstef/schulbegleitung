import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Spring Bouquet Theme colors are defined in globals.css via CSS variables
      // This config provides additional utilities and ensures IntelliSense works
      colors: {
        // Note: With Tailwind 4.x, colors are primarily defined in globals.css
        // using CSS variables in @theme inline directive
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        serif: ['Hedvig Letters Serif', 'serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      borderRadius: {
        'theme-sm': '0.25rem',
        'theme-md': '0.5rem',
        'theme-lg': '1rem',
      },
    },
  },
  plugins: [],
}

export default config
