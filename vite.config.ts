import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    headers: {
      'Content-Type': 'application/javascript'
    }
  },
  optimizeDeps: {
    include: ['mapbox-gl']
  }
}); 