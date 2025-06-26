/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // This line tells Tailwind to scan all your React files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
