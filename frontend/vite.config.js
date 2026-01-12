import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ],
  base: '/', // Ensure assets load correctly on Netlify
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
 //proxy setup to forward API requests to backend server
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // your backend URL/port
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
