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
        'shake': 'shake 0.5s ease-in-out',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'spin': 'spin 1s linear infinite',
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
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' }
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        spin: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' }
        }
      },
      boxShadow: {
        'sm': '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'md': '0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -4px rgb(0 0 0 / 0.07)',
        'lg': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
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
      
      // Red colors for errors and validation
      red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
        950: '#450a0a',
      },
      
      // Orange colors for password strength
      orange: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12',
        950: '#431407',
      },

      amber: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
        950: '#451a03',
      },
      
      // Yellow colors for password strength
      yellow: {
        50: '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12',
        950: '#422006',
      },
      
      // Green colors for success and password strength
      green: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
        950: '#052e16',
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