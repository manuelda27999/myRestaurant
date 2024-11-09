/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'kfc-red': '#E4002B',  // Rojo KFC
        'kfc-white': '#FFFFFF', // Blanco
        'kfc-black': '#000000', // Negro
        'kfc-gray': '#D3D3D3',  // Gris claro (opcional)
      },
    },
  },
  plugins: [],
}
