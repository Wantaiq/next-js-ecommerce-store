module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeVisibility: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeVisibility: 'fadeVisibility 1s ease-in-out',
      },
    },
  },
  plugins: [],
};
