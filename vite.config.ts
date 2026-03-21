import {resolve} from 'path';
import {defineConfig} from 'vite';

// @ts-ignore
export default defineConfig({
    envDir: './', // Change from '../' to './' to load from project root
    publicDir: "../public",
    root: 'src',
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                login: resolve(__dirname, 'src/Pages/login.html'),
                subjects: resolve(__dirname, 'src/Pages/subjects.html'),
                difficulty: resolve(__dirname, 'src/Pages/difficulty.html'),
                question: resolve(__dirname, 'src/Pages/questions.html'),
                result: resolve(__dirname, 'src/Pages/result.html'),
            },
        },
    },
});