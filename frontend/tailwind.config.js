/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        // Dynamic theme colors from CSS variables
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'accent': 'var(--color-accent)',
        'background': 'var(--color-background)',
        'card-bg': 'var(--color-card-background)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        
        // Legacy colors (keep for backwards compatibility)
        'page-color-1': 'rgba(33, 33, 43, 1)',
        'brand-text-gray': 'rgba(255, 255, 255, 0.6)',
        'brand-text-white': 'rgba(255, 255, 255, 1)', 
      },
      backgroundImage: {
        // You can keep or add gradients here if needed
      },
      screens: {

      
      // Custom breakpoints
      'minMobile': { 'max': '320px', 'min': '0px' },
      'sm': { 'max': '425px', 'min': '0px' },
      'md': { 'max': '1023px', 'min': '426px' },
      'lg': { 'max': '1439px', 'min': '1024px' },
      'xl': { 'min': '1440px' },
      
    },
    minHeight: {
      'fill': '-webkit-fill-available',
    },
    height: {
      'fill': '-webkit-fill-available',
    },
    },
  },
  plugins: [],
};