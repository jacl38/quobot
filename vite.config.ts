import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      "/wiki": {
        target: "https://en.wikipedia.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wiki/, "")
      }
    },
  },
});