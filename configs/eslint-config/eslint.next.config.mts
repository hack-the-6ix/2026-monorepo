import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { defineConfig, globalIgnores } from 'eslint/config';
import baseConfig from "./eslint.config.mts";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...baseConfig,
  globalIgnores([
    'node_modules/**',
    '.wrangler/**',
    '.next/**',
    'build/**',
    'out/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;