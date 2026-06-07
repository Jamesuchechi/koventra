import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: 'var(--color-navy)',
          mid: 'var(--color-navy-mid)',
          card: 'var(--color-navy-card)',
          hover: 'var(--color-navy-hover)',
        },
        gold: {
          DEFAULT: 'var(--color-gold)',
          dim: 'var(--color-gold-dim)',
          pale: 'var(--color-gold-pale)',
        },
        white: 'var(--color-white)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        'border-dim': 'var(--color-border-dim)',
        live: 'var(--color-live)',
        building: 'var(--color-building)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config