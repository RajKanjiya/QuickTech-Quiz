import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        login: resolve(__dirname, 'src/Pages/login.html'),
      },
    },
    outDir: '../dist',
  },
});
