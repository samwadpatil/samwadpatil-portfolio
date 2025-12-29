
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This allows us to use process.env.API_KEY in our code
    // while Vite is building for production.
    'process.env': process.env
  }
});
