import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['node_modules/**']),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^react', '^@?\\w'], ['^[^.]', '^\\.'], ['.(css|scss)$']],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
    languageOptions: {
      parserOptions: {
        project: [
          './configs/*/tsconfig.json',
          './apps/*/tsconfig.json',
          './packages/*/tsconfig.json',
        ],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  eslintPrettierRecommended,
]);
