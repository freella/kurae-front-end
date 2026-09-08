import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // Inline assets menores que 4KB diretamente no CSS/JS (evita requests extras)
    assetsInlineLimit: 4096,

    // Compressão e quality do CSS
    cssCodeSplit: true,

    rollupOptions: {
      output: {
        // Separa vendors em chunk próprio para melhor cache no browser
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['vuetify'],
        },
      },
    },
  },
})
