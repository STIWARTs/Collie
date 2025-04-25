/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['media', 'class'],
  content: [
    './src/app/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/interfaces/*.{js,ts,jsx,tsx}',
    './src/interfaces/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      nunito: ['Nunito Sans'],
    },
    extend: {
      keyframes: {
        shimmer: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        'shimmer-slide': {
          to: {
            transform: 'translate(calc(100cqw - 100%), 0)',
          },
        },
        'spin-around': {
          '0%': {
            transform: 'translateZ(0) rotate(0)',
          },
          '15%, 35%': {
            transform: 'translateZ(0) rotate(90deg)',
          },
          '65%, 85%': {
            transform: 'translateZ(0) rotate(270deg)',
          },
          '100%': {
            transform: 'translateZ(0) rotate(360deg)',
          },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        'shimmer-slide':
          'shimmer-slide var(--speed) ease-in-out infinite alternate',
        'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
      },
      colors: {
        'primary-blue': '#0076E4',
        'primary-blue-rgb': '#0074e4',
        'color-dark': '#FFFFFF3B',
        'primary-theme': '#0f0f0f',
        'secondary-theme': '#202020',
        'dark-red': '#4B0000',
        'dark-pink': '#45004B',
        'dark-blue': '#003C4B',
        'dark-yellow': '#464B00',
        'dark-green': '#004B0C',
        'dark-purple': '#320161',
        'dark-orange': '#613B01',
        'super-dark-red': '#300000',
        'super-dark-pink': '#26002B',
        'super-dark-blue': '#002933',
        'super-dark-yellow': '#252900',
        'super-dark-green': '#003008',
        'super-dark-purple': '#1F003B',
        'super-dark-orange': '#362100',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      screens: {
        'xs-200': '200px',
        'xs-300': '300px',
        'xs-330': '330px',
        'xs-350': '350px',
        'xs-400': '400px',
        'xs-435': '435px',
        'xs-470': '470px',
        'sm-500': '500px',
        'small-screen': '555px',
        'sm-600': '600px',
        'sm-670': '670px',
        'sm-700': '700px',
        'sm-750': '750px',
        'sm-800': '800px',
        'small-medium-screen': '830px',
        'md-900': '900px',
        'md-1000': '1000px',
        'medium-screen': '1040px',
        'lg-1100': '1100px',
        'lg-1140': '1140px',
        'lg-1200': '1200px',
        'medium-large-screen': '1300px',
        'xl-1400': '1400px',
        'large-screen': '1520px',
        'xl-1765': '1765px',
        'xl-2000': '2000px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
