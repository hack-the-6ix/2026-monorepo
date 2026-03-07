import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

import baseConfig from './eslint.react.config.mts';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...baseConfig,
  globalIgnores([
    'node_modules/**',
    '.next/**',
    '.open-next/**',
    '.wrangler/**',
    "tsconfig.tsbuildinfo",
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
