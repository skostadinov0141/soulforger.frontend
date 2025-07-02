import type { Config } from 'tailwindcss';
import PrimeUI from 'tailwindcss-primeui';

export default {
  content: [
    './pages/**/**/*.vue',
    './components/**/**/*.vue',
    './layouts/**/**/*.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [PrimeUI],
} satisfies Config;
