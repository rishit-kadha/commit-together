/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#c8f549',
        groups: '#7b5ef8',
        warning: '#f5a623',
        background: '#0d0d0f',
        surface: '#141418',
        'surface-soft': '#1c1c22',
        foreground: '#f0efe8',
        muted: '#6b6a72'
      },
      fontFamily: {
        syne: ['Syne_700Bold', 'sans-serif'],
        'syne-black': ['Syne_800ExtraBold', 'sans-serif'],
        dmsans: ['DMSans_400Regular', 'sans-serif'],
        'dmsans-medium': ['DMSans_500Medium', 'sans-serif'],
        'dmsans-bold': ['DMSans_700Bold', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

