import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import baseConfig from "./eslint.config.mts";

export default defineConfig([
  globalIgnores(["dist", "package-lock.json"]),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["**/*.tsx"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],
  },
  ...baseConfig,
]);
