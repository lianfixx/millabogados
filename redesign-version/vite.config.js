// MILLA ABOGADOS — Vite config with React plugin, Vitest, and path aliases.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{js,jsx}', 'src/tests/**/*.test.{js,jsx}'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          'react-three': ['@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap'],
        },
      },
    },
  },
});
