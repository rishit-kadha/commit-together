/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'dm-sans': ['DMSans_400Regular', 'sans-serif'],
        'dm-sans-medium': ['DMSans_500Medium', 'sans-serif'],
        'dm-sans-bold': ['DMSans_700Bold', 'sans-serif'],
        syne: ['Syne_700Bold', 'sans-serif'],
      },
      colors: {
        background: '#09090B',
        foreground: '#FAFAFA',
        primary: {
          DEFAULT: '#8B5CF6',
          foreground: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}
