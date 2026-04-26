/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17202a',
        muted: '#6b7280',
        paper: '#f7f8fa',
        line: '#e5e7eb',
        brand: '#2563eb',
        success: '#059669',
        danger: '#dc2626',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
