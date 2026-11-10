import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        terms: resolve(import.meta.dirname, 'terms-and-conditions/index.html'),
        privacy: resolve(import.meta.dirname, 'privacy-policy/index.html'),
      },
    },
  },
})
