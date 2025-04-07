import { defineConfig } from "eslint";
import prettierConfig from "eslint-config-prettier";

export default defineConfig({
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": ["error", prettierConfig],
  },
});