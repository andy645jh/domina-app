import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'listado',
      filename: 'remoteEntry.js',
      exposes: {
        './UserListComponent': './src/UserListComponent.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 3001,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});