/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        brand: 'rgb(var(--color-brand) / <alpha-value>)',
        gold: 'rgb(var(--color-gold) / <alpha-value>)',
        success: '#047857',
        danger: '#b91c1c',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(6, 95, 70, 0.1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'bar-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'draw-line': {
          '0%': { strokeDashoffset: '900' },
          '100%': { strokeDashoffset: '0' },
        },
        'pulse-soft': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(4, 120, 87, 0.18)' },
          '50%': { boxShadow: '0 0 0 8px rgba(4, 120, 87, 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 420ms ease-out both',
        'scale-in': 'scale-in 320ms ease-out both',
        'bar-grow': 'bar-grow 650ms ease-out both',
        'draw-line': 'draw-line 900ms ease-out both',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
