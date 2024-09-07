/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit, sans-serif"],
        sora: ["Sora, sans-serif"],
        protest: ["Protest Guerrilla, sans-serif"],
      },
      colors: {
        mix: "linear-gradient(270deg, mediumslateblue, #FF26B9 99.99%, orange 100%)",
        primary: "mediumslateblue",
        main: "#666",
        sub: "#999",
        secondary:"#f7f8f9"
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.gradient-text': {
          background: 'linear-gradient(270deg, mediumslateblue, orange 99.99%, #FE34B9 100%)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}