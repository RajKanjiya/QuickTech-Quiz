import {resolve} from 'path';
import {defineConfig} from 'vite';

// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
export default defineConfig({
    envDir: '../',
    root: 'src',
    build: {
        rollupOptions: {
            // @ts-ignore
            publicDir: "../public",
            outDir: "../dist", // Builds to a folder outside of src
            emptyOutDir: true,
            input: {
                main: resolve(__dirname, 'src/index.html'),
                login: resolve(__dirname, 'src/Pages/login.html'),
                subjects: resolve(__dirname, 'src/Pages/subjects.html'),
                difficulty: resolve(__dirname, 'src/Pages/difficulty.html'),
                question: resolve(__dirname, 'src/Pages/questions.html'),
            },
        },
    },
});
