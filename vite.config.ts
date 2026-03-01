import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/allwealth/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['recharts'],
          'animation-vendor': ['framer-motion'],
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.laserbeamcapital.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
