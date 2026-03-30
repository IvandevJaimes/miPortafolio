import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  // Ignorar archivos compilados
  {
    ignores: ["**/dist/**", "**/node_modules/**"],
  },
  // Config base
  js.configs.recommended,
  // Frontend
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.app.json",
      },
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react-refresh": reactRefresh,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  // Backend
  {
    files: ["../backend/src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "../backend/tsconfig.json",
      },
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
);
