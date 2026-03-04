import { FixupConfigArray, fixupConfigRules } from '@eslint/compat';
import eslintConfig from '@hackthe6ix/eslint-config/react';
import { defineConfig } from 'eslint/config';
import storybook from 'eslint-plugin-storybook';

const storybookConfig = fixupConfigRules(
  storybook.configs['flat/recommended'] as FixupConfigArray,
);

export default defineConfig([...eslintConfig, ...storybookConfig]);
