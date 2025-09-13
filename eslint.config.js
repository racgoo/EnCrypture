import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import barrelRules from "eslint-plugin-barrel-rules";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "barrel-rules": barrelRules,
    },
    rules: {
      "barrel-rules/enforce-barrel-pattern": [
        "error",
        {
          paths: ["src/pages/*", "src/features/*", "src/entities/*"],
          baseDir: __dirname,
          isolated: false,
          allowedImportPaths: [],
        },
      ],
      "barrel-rules/no-wildcard": ["error"],
    },
  },
]);
