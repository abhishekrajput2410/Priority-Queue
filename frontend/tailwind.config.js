export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        panel: '0 24px 50px rgba(15, 23, 42, 0.12)',
      },
      colors: {
        brand: {
          900: '#0f172a',
          700: '#1e293b',
          500: '#334155',
          300: '#cbd5e1',
        },
      },
    },
  },
  plugins: [],
};
