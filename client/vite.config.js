import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue$': 'vue/dist/vue.runtime.esm.js', // Prevents cross-site scripting
      'three/examples/jsm': fileURLToPath(
        new URL('../node_modules/three/examples/jsm', import.meta.url) // Updated path to project root
      ),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    hmr: {
      timeout: 10000,
    },
  },
  build: {
    outDir: '../dist', // Use correct relative path for build output
    chunkSizeWarningLimit: 2000, // Adjust as needed
    rollupOptions: {
      external: [], // Ensure no externalization for proper bundling
    },
  },
  optimizeDeps: {
    include: [
      'three',
      'three/examples/jsm/geometries/TorusKnotGeometry.js',
      'three/examples/jsm/controls/OrbitControls.js',
    ],
  },
});
