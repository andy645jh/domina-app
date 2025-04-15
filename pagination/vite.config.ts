import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'pagination',
      filename: 'remoteEntry.js',
      exposes: {
        './PaginationComponent': './src/components/PaginationComponent.tsx',
      },
      shared:['react','react-dom'],
    }),
  ],
  server: {
      port:3002,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  }
})
