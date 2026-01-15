/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#e8eaf0',
          100: '#c5cade',
          200: '#9ea7c9',
          300: '#7683b4',
          400: '#5769a5',
          500: '#384e96',
          600: '#32478e',
          700: '#2b3d83',
          800: '#243479',
          900: '#07122B', // Solo para títulos destacados
        },
        sand: {
          50: '#f9f5f2',
          100: '#f1e8df',
          200: '#e8d9ca',
          300: '#dfcab5',
          400: '#d8bfa5',
          500: '#dbc0a8',
          600: '#c4a98f',
          700: '#a98e76',
          800: '#8f745d',
          900: '#75594d',
        },
        sky: {
          50: '#f0fbfc',
          100: '#d9f4f7',
          200: '#b8ecf1',
          300: '#98d2dd',
          400: '#7ec5d4',
          500: '#64b8cb',
          600: '#5ca6b8',
          700: '#5090a0',
          800: '#447a88',
          900: '#38616d',
        },
        warmgrey: {
          50: '#f3f1ef',
          100: '#e2dfdb',
          200: '#d0cbc4',
          300: '#beb7ad',
          400: '#b0a89c',
          500: '#a39989',
          600: '#9b9181',
          700: '#918676',
          800: '#877c6c',
          900: '#746959',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
    },
  },
  plugins: [],
}
