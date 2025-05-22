/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // opcional: si usas clases en código Vue
    './src-tauri/**/*.{js,ts,jsx,tsx,vue}', // opcional: si usas clases en código Tauri
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1D4ED8',   // Azul Tailwind estándar
          light: '#3B82F6',
          dark: '#1E40AF',
        },
      },
    },
  },
  plugins: [],
}
