/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      backdropBlur: {
        xs: '2px'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      animation: {
        'neuron-pulse': 'neuron-pulse 2s infinite',
        'connection-flow': 'connection-flow 2s infinite',
        typing: 'typing 3.5s steps(40,end) forwards',
        flow: 'flow 3s ease-in-out infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        scroll: 'scroll 2s cubic-bezier(0.4,0,0.2,1) infinite',
        'synapse-pulse': 'synapse-pulse 8s ease-in-out infinite'
      },
      keyframes: {
        'neuron-pulse': {
          '0%,100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.5)', opacity: '1' }
        },
        'connection-flow': {
          '0%,100%': { height: '1px', opacity: '0.2' },
          '50%': { height: '2px', opacity: '0.5' }
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' }
        },
        flow: {
          '0%': { opacity: '0.2' },
          '50%': { opacity: '0.5' },
          '100%': { opacity: '0.2' }
        },
        pulse: {
          '0%,100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.2)', opacity: '1' }
        },
        scroll: {
          '0%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(10px)' },
          '60%': { transform: 'translateY(5px)' },
          '100%': { transform: 'translateY(15px)' }
        },
        'synapse-pulse': {
          '0%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
          '100%': { opacity: '0.3' }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}