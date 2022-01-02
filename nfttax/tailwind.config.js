module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#120048',
        'custom-yellow':'#BAA333',
      }
    },
  },
  plugins: [],
}
