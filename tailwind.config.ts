import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        blue: {
          50: '#001A6C',
          100: '#003F85',
          200: '#006E9D',
          300: '#00A5B4',
          400: '#00caaf',
          500: '#22D49A',
          600: '#44DD8D',
          700: '#66E589',
          800: '#88ED8F',
          900: '#AAF3AA',
          DEFAUL: '#00caaf',
        },
      },
    },
  },
  plugins: [],
};
export default config;
