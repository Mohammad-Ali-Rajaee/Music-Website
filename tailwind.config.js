/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html" , "./src/js/**/*.js"],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md' : '768px',
        'lg': '915px',
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
