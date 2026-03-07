import { defineMain } from '@storybook/react-vite/node';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineMain({
  viteFinal: (config) => {
    if (config.plugins) {
      config.plugins.push(tsconfigPaths());
    }
    return config;
  },
  features: {
    backgrounds: false,
  },
  stories: ['../src/**/*.stories.@(ts|tsx)', '../stories/**/*.mdx'],
  framework: '@storybook/react-vite',
  addons: ['@storybook/addon-themes', '@storybook/addon-docs'],
});
