/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        scroll: 'scroll 20s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-delay': 'fadeInUp 0.8s ease-out forwards 0.3s',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        lugha: {
          primary: '#2C3E70',   // Core brand navy
          accent: '#A1B6DA',    // Light blue accent (legacy)
          mist: '#E9EEF6',      // Section background
          gold: '#F5A623',      // CTA and highlight
          teal: '#14B8A6',      // Icon and button accents
          coral: '#F36B6B',     // Emotional highlights
          ink: '#222831',       // Deep text contrast
          white: '#FFFFFF',     // Always include this for clarity
        },
      },
    },
  },
  plugins: [],