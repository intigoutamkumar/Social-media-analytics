import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^es-toolkit\/compat\/(.+?)(?:\.js)?$/,
        replacement: resolve(__dirname, 'src/shims/es-toolkit-compat/$1.js')
      }
    ]
  },
  plugins: [
    react()
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/__tests__/setup.js',
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, '/')

          // Vendor chunks for better caching
          if (normalizedId.includes('node_modules')) {
            if (normalizedId.includes('/recharts/')) return 'vendor-recharts'
            if (normalizedId.includes('/react-icons/')) return 'vendor-icons'
            if (normalizedId.includes('/react-router-dom/')) return 'vendor-router'
            if (normalizedId.includes('/react-dom/') || normalizedId.includes('/react/')) return 'vendor-react'
            if (normalizedId.includes('/axios/')) return 'vendor-axios'
            return 'vendor'
          }

          // Page chunks for code splitting
          if (normalizedId.includes('src/pages/')) {
            const match = normalizedId.match(/src\/pages\/(\w+)\./)
            if (match) return `page-${match[1].toLowerCase()}`
          }
        }
      }
    },
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios']
  }
})
