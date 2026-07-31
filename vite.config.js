import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: true, // Usa el minificador por defecto (sin requerir esbuild externo)
    lib: {
      entry: 'src/main.js',
      name: 'RegionalDressupWidget',
      fileName: () => 'widget.js',
      formats: ['umd']
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  }
});
