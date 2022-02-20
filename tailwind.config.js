module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx,hbs,html}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        100: '50rem',
      },
      scale: {
        175: '1.75',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
