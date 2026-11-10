module.exports = {
  content: ['./src/components/ui/testimonial-globe.tsx'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--tg-background) / <alpha-value>)',
        foreground: 'rgb(var(--tg-foreground) / <alpha-value>)',
        card: 'rgb(var(--tg-card) / <alpha-value>)',
        'card-foreground': 'rgb(var(--tg-card-foreground) / <alpha-value>)',
        muted: 'rgb(var(--tg-muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--tg-muted-foreground) / <alpha-value>)',
        border: 'rgb(var(--tg-border) / <alpha-value>)',
        ring: 'rgb(var(--tg-ring) / <alpha-value>)',
        chart: {
          1: 'rgb(var(--tg-chart-1) / <alpha-value>)',
          2: 'rgb(var(--tg-chart-2) / <alpha-value>)',
          3: 'rgb(var(--tg-chart-3) / <alpha-value>)',
          4: 'rgb(var(--tg-chart-4) / <alpha-value>)',
          5: 'rgb(var(--tg-chart-5) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
}
