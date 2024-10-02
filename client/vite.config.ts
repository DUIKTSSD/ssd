import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ssd/', // Ensure this matches your deployment setup
  resolve: {
    alias: {
      '@': './client/src', // You can set up an alias for easier imports
    },
  },
  server: {
    port: 8081, // Change this to your desired development port
    open: true, // Automatically open the browser on server start
  },
  build: {
    outDir: 'dist', // Specify the output directory for production builds
  },
});

