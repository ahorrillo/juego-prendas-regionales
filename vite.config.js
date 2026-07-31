import { defineConfig } from 'vite';
import cssInjectedByJS from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    cssInjectedByJS()
  ],
  build: {
    minify: 'esbuild',
    lib: {
      entry: 'src/main.js',
      name: 'RegionalDressupWidget',
      fileName: () => 'widget.js',
      formats: ['umd']
    },
    rollupOptions: {
      output: {
        // Forzamos a que empaquete todo sin importaciones externas
        inlineDynamicImports: true
      }
    }
  }
});
