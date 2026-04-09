/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      colors: {
        paper: {
          50: '#faf8f5',
          100: '#f4f0e8',
          200: '#e8e0d0',
          300: '#d4c9b0',
        },
        ink: {
          DEFAULT: '#1a1714',
          light: '#3d3830',
          muted: '#7a7060',
          faint: '#b0a898',
        },
        accent: {
          DEFAULT: '#c2452d',
          light: '#d4614c',
          pale: '#f5e8e5',
        },
        range: {
          start: '#1a1714',
          end: '#c2452d',
          mid: '#ede9e2',
        },
      },
      boxShadow: {
        calendar: '0 8px 40px -8px rgba(26,23,20,0.18), 0 2px 8px -2px rgba(26,23,20,0.08)',
        'calendar-hover': '0 16px 56px -8px rgba(26,23,20,0.22), 0 4px 16px -4px rgba(26,23,20,0.10)',
        ring: '2px 2px 0 0 rgba(26,23,20,0.12)',
        note: 'inset 0 1px 4px rgba(26,23,20,0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
        'page-turn': 'pageTurn 0.5s cubic-bezier(0.4,0,0.2,1) forwards',
        'range-in': 'rangeIn 0.2s ease forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pageTurn: {
          from: { opacity: '0', transform: 'rotateY(-8deg) scale(0.98)', transformOrigin: 'left center' },
          to: { opacity: '1', transform: 'rotateY(0) scale(1)', transformOrigin: 'left center' },
        },
        rangeIn: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
}
