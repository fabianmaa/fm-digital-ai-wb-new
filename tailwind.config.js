/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FBF7F0',
        sand: '#F3EADD',
        ink: '#161B18',
        muted: '#59615B',
        forest: {
          DEFAULT: '#123A2E',
          deep: '#0C2A20',
          mid: '#1C5242',
          soft: '#2E6B58',
        },
        clay: {
          DEFAULT: '#B24A2C',
          dark: '#8F371D',
          soft: '#EBD3C8',
        },
        gold: '#BE8B44',
        line: '#E4DACB',
        sage: '#DDE5DA',
        cream: '#FFFDF8',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.9rem, 6.2vw, 5.4rem)', { lineHeight: '0.98', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.3rem, 4.4vw, 3.9rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.85rem, 3.1vw, 2.75rem)', { lineHeight: '1.07', letterSpacing: '-0.018em' }],
        'display-sm': ['clamp(1.5rem, 2.3vw, 1.95rem)', { lineHeight: '1.15', letterSpacing: '-0.012em' }],
      },
      maxWidth: {
        page: '1220px',
      },
      boxShadow: {
        soft: '0 18px 44px -24px rgba(22, 27, 24, 0.28)',
        lift: '0 30px 60px -30px rgba(18, 58, 46, 0.35)',
        card: '0 2px 4px rgba(22, 27, 24, 0.03), 0 22px 40px -32px rgba(22, 27, 24, 0.35)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
