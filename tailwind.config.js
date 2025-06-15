/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      // Add custom dark mode colors if needed
      colors: {
        gray: {
          850: '#1f2937',
          950: '#111827',
        }
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}