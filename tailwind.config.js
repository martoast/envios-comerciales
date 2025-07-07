/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    './components/**/*.{html,js,ts,vue}',
    './layouts/**/*.{html,js,ts,vue}',
    './pages/**/*.{html,js,ts,vue}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'fadeIn': 'fadeIn 1s ease-out',
        'pulse': 'pulse 2s infinite',
      },
      keyframes: {
        fadeIn: {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        pulse: {
          '0%': {
            boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.5)'
          },
          '70%': {
            boxShadow: '0 0 0 15px rgba(37, 211, 102, 0)'
          },
          '100%': {
            boxShadow: '0 0 0 0 rgba(37, 211, 102, 0)'
          }
        }
      },
      boxShadow: {
        'sm': '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'md': '0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -4px rgb(0 0 0 / 0.07)',
        'lg': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      
      // Primary brand colors
      primary: {
        50: '#eaf2fa',
        100: '#d5e5f5',
        200: '#abc8eb',
        300: '#82ace1',
        400: '#588fd7',
        500: '#2E6BB7', // Main primary blue
        600: '#245591',
        700: '#1b406d',
        800: '#122a48',
        900: '#091524',
        950: '#050a12',
      },
      
      // Dark section background
      dark: {
        50: '#e6eef5',
        100: '#ccdceb',
        200: '#99b9d7',
        300: '#6697c3',
        400: '#3374af',
        500: '#0d2c4f', // Main dark blue for sections
        600: '#0a2340',
        700: '#081a30',
        800: '#051020',
        900: '#030710',
        950: '#010408',
      },
      
      // Text colors
      text: {
        primary: '#1a202c',
        secondary: '#5a6474',
      },
      
      // Accent colors
      accent: {
        green: '#25D366', // WhatsApp green
        'green-light': '#e9fbf0',
        red: '#e53e3e',
        'red-light': '#fff5f5',
        'blue-light': '#eaf2fa',
        gold: '#ffc107', // Star rating color
      },
      
      // Background colors
      bg: {
        main: '#f8f9fa',
        card: '#ffffff',
        'dark-section': '#0d2c4f',
      },
      
      // Border color
      border: {
        DEFAULT: '#e2e8f0',
        light: '#c2d9f0',
      },
      
      // Gray scale (for various UI elements)
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        950: '#030712',
      },
      
      // Additional utility colors
      slate: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography')
  ],
}