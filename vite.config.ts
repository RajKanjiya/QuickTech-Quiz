import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
    root: 'src',
    publicDir: '../public',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                login: resolve(__dirname, 'src/Pages/login.html'),
                subjects: resolve(__dirname, 'src/Pages/subjects.html'),
                difficulty: resolve(__dirname, 'src/Pages/difficulty.html'),
                question: resolve(__dirname, 'src/Pages/questions.html'),
            },
        },
        outDir: '../dist',
    },
});
