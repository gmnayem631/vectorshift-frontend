/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  corePlugins: {
    preflight: false, // protects ReactFlow styles
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
