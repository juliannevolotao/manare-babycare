import type { Config } from 'tailwindcss';

// Valores copiados do :root do site original.
// Os breakpoints são max-width, como no CSS original (desktop primeiro).
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      b1040: { max: '1040px' },
      b1000: { max: '1000px' },
      b860: { max: '860px' },
      b760: { max: '760px' },
      b600: { max: '600px' },
      b520: { max: '520px' },
      b330: { max: '330px' },
    },
    // Só o tamanho: a altura de linha é herdada do body (1.6), como no original.
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      '2xl': '24px',
    },
    extend: {
      colors: {
        creme: '#FBF5EC',
        branco: '#FFFFFF',
        areia: '#F2D9B3',
        cacau: { DEFAULT: '#4A2618', escuro: '#5E3322', suave: '#6B4330' },
        caramelo: { DEFAULT: '#8A5A35', claro: '#B07A4F', escuro: '#74492A' },
        salvia: '#A3B18A',
        linha: '#EADFCF',
        erro: '#B5452F',
        ok: '#4F6B3A',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', '"Times New Roman"', 'serif'],
        body: ['Montserrat', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      maxWidth: { wrap: '1160px' },
      boxShadow: {
        selo: '0 18px 40px -20px rgba(74,38,24,.35)',
        cartao: '0 18px 36px -24px rgba(74,38,24,.45)',
      },
    },
  },
  plugins: [],
} satisfies Config;
