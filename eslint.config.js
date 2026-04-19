import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["src/**/*.ts", "tests/**/*.ts"], // ✅ ONLY these
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },

  {
    ignores: [
      "dist",
      "node_modules",
      "coverage",
      "docs",        // 🚨 IMPORTANT
      "scripts",     // optional
    ],
  },
];