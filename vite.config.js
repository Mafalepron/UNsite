import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          vendor: ['lazysizes']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true,
    cors: true
  },
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('cssnano')({
          preset: 'default'
        })
      ]
    }
  },
  optimizeDeps: {
    include: ['lazysizes']
  },
  esbuild: {
    target: 'es2020',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  }
});
