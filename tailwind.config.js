/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./music-react/src/**/*.js"],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md' : '768px',
        'lg': '992px',
        'xl' : '1280px',
        '2xl': '1536px',
      },

    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwindcss/nesting"),
  ],
}
