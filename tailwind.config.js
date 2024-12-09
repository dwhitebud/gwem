/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#025584',
          light: '#02558466',
          lighter: '#02558433',
        },
        secondary: {
          DEFAULT: '#00D47E',
          light: '#00D47E66',
          lighter: '#00D47E33',
        },
        status: {
          success: '#00D47E',
          pending: '#94A3B8',
          error: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Helvetica', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'lg': '8px',
        'xl': '12px',
      },
      maxWidth: {
        'content': '1280px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      screens: {
        'mobile': '640px',
        'tablet': '768px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
      boxShadow: {
        'card': '0 2px 4px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
