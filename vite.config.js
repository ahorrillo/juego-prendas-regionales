import { defineConfig } from 'vite';
import cssInjectedByJS from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    cssInjectedByJS()
  ],
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'RegionalDressupWidget',
      fileName: () => 'widget.js',
      formats: ['iife']
    }
  }
});
