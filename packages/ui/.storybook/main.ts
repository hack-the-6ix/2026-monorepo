import { defineMain } from '@storybook/react-vite/node';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineMain({
  viteFinal: (config) => {
    if (config.plugins) {
      config.plugins.push(tsconfigPaths());
    }
    return config;
  },
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  framework: '@storybook/react-vite',
  addons: [],
});
