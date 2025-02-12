/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "bg": "#212121",
        "carbon": "#1c1c1c",
        "primaryBlue": "#35A3D9",
        "secondaryBlue": "#158ac4",
        "white-30": "rgb(256, 256, 256, 0.3)",
        "black-40": "rgb(0, 0, 0, 0.4)",
        "black-50": "rgb(0, 0, 0, 0.5)",
      }
    },
  },
  plugins: [],
};