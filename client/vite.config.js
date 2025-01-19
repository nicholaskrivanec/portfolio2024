import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue$': 'vue/dist/vue.runtime.esm.js', // Prevent cross-site scripting
      three: 'three',
      orbit: 'three/examples/jsm/controls/OrbitControls.js'
    },
  },
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
    hmr: {
      timeout: 10000,
    },
    
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false

      }
    }
  },
  build: {
    outDir: '../dist', 
    chunkSizeWarningLimit: 2000, 
    rollupOptions: {
      external: [], // Ensure no externalization for proper bundling
    },
  },
  optimizeDeps: {
    include: ['three', 'three/examples/jsm/controls/OrbitControls.js'],
    exclude: ['three/examples/jsm/libs/lil-gui.module.min.js'] // If not needed
  }
  
});
