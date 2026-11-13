import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tw from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tw()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
});
