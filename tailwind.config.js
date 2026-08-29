/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand greens
        brand: {
          primary: '#0B5D3B',
          secondary: '#146C43',
          accent: '#2E9B68',
          dark: '#063B27',
          light: '#E8F5EE',
          subtle: '#BFE3D0',
          ai: '#087F5B',
        },
        ink: {
          DEFAULT: '#10231A',
          muted: '#60756B',
        },
        surface: {
          base: '#F7FAF8',
          card: '#FFFFFF',
          border: '#D8E5DE',
        },
        risk: {
          low: '#16A34A',
          medium: '#D97706',
          high: '#DC2626',
          critical: '#991B1B',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '14px',
        '2xl': '18px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(6,59,39,0.04), 0 4px 16px rgba(6,59,39,0.06)',
        'card-hover': '0 2px 4px rgba(6,59,39,0.06), 0 12px 32px rgba(6,59,39,0.10)',
        glow: '0 0 0 1px rgba(11,93,59,0.12), 0 8px 30px rgba(11,93,59,0.12)',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'dash-flow': {
          to: { strokeDashoffset: '-40' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
        scan: 'scan 3.5s ease-in-out infinite',
        'dash-flow': 'dash-flow 1.2s linear infinite',
      },
    },
  },
  plugins: [],
};
