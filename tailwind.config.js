// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode (e.g., <html class="dark">)
  theme: {
    extend: {
      colors: {
        background: '#0f1117',
        surface: '#1c1f26',
        primary: '#6c63ff',
        secondary: '#4fc3f7',
        // text: '#f5f7fa',
        muted: '#cbd5e1',
        border: '#2a2e36',
        danger: '#ff6b6b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 10px rgba(108, 99, 255, 0.7)',
      },
    },
  },
  plugins: [],
}
