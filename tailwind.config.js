module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_pages/**/*.html',
    './_posts/**/*.html',
    './**/*.markdown',
    './index.html',
    './src/**/*.{html,tsx,ts,jsx,js}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dt-pink': '#FF69B4',
        'dt-dark': '#2D2D2D',
        'dt-cream': '#FFF5E6',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
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
