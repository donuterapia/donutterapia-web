module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_pages/**/*.html',
    './_posts/**/*.markdown',
    './index.html',
    './about.html',
    './cart.html',
    './contact.html',
    './franchise.html',
    './locations.html',
    './menu.html',
    './policies.html',
    './src/**/*.{html,tsx,ts,jsx,js}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary & Logo Colors
        'dt-letter-outline': '#5b3429',
        'dt-donut-shadow': '#cfa45a',
        'dt-donut': '#ffcf64',
        'dt-glacing': '#ea1947',
        
        // Secondary Yellow Palette
        'dt-secondary-base': '#fddb00',
        'dt-yellow-900': '#f1da2e',
        'dt-yellow-700': '#f3e23e',
        'dt-yellow-500': '#f3e758',
        'dt-yellow-400': '#f8f3a1',
        'dt-yellow-200': '#f8f3a1',
        
        // Complementary Blue Palette
        'dt-blue-900': '#0098d6',
        'dt-blue-700': '#2db4e7',
        'dt-blue-500': '#36c1f0',
        'dt-blue-400': '#63cdf5',
        'dt-blue-200': '#99dbf8',
        
        // Complementary Purple Palette
        'dt-purple-900': '#6e4d9f',
        'dt-purple-700': '#7b69af',
        'dt-purple-500': '#917cb9',
        'dt-purple-400': '#a790c4',
        'dt-purple-200': '#cfbfde',
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'], // Corporate font
        heading: ['Konigsberg', 'sans-serif'], // Primary font
        secondary: ['Erita', 'sans-serif'], // Secondary font
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(255, 105, 180, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(255, 105, 180, 0.6)',
          },
        },
        slideDown: {
          'from': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        bounceIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
    },
  },
}
