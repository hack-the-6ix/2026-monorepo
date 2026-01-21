import json from "@eslint/json";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPrettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default defineConfig([
  globalIgnores(["package-lock.json"]),
  {
    files: ["**/*.json"],
    language: "json/jsonc",
    extends: [json.configs.recommended],
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [["^react", "^@?\\w"], ["^[^.]", "^\\."], [".(css|scss)$"]],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  eslintPrettierRecommended,
]);
