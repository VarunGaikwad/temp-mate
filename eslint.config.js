import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { ESLint } from "eslint";
import { ESLint as TSESLint } from "@typescript-eslint/experimental-utils";
import tsPlugin from "@typescript-eslint/eslint-plugin";

const eslint = new ESLint({
  ignorePatterns: ["dist"],
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
      extends: [js.configs.recommended, ...tsPlugin.configs.recommended],
      globals: globals.browser,
      plugins: {
        "react-hooks": reactHooks,
        "react-refresh": reactRefresh,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true },
        ],
      },
    },
  ],
});

export default eslint;
