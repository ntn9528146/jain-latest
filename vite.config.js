import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // Disables original code view in browser Inspect
    minify: 'esbuild', // Scrambles and compresses all JS
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
});
