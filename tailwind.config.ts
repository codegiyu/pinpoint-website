import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,html}'],
  theme: {
    extend: {
      keyframes: {
        'filter-accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'filter-accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'filter-accordion-down': 'filter-accordion-down 0.7s ease-in-out',
        'filter-accordion-up': 'filter-accordion-up 0.7s ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
