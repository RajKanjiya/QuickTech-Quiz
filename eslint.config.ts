import js from "@eslint/js";
import globals from "globals";
import css from "@eslint/css";
import {defineConfig} from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: {js},
        extends: ["js/recommended"],
        languageOptions: {globals: globals.browser},
        rules: {
            "no-unused-vars": "warn",   // was error, now warning
            "no-console": "warn",
            "@typescript/no-unused-vars": "warn"
        }
    },
    {
        files: ["**/*.css"],
        plugins: {css},
        language: "css/css",
        extends: ["css/recommended"],
        rules: {
            "css/no-duplicate-selectors": "warn",
        }

    }

]);
