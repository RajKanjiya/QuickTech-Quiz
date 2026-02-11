import {resolve} from "path";
import {defineConfig} from "vite";

export default defineConfig({
    root: "src", // Tells Vite that index.html is inside src
    envDir: "./", // <--- FIX 1: Tells Vite to look for .env in the parent folder
    build: {
        // @ts-ignore
        publicDir: "../public", // <--- FIX 2: Tells Vite where the public assets are
        outDir: "../dist", // Builds to a folder outside of src
        emptyOutDir: true,
        rollupOptions: {
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
