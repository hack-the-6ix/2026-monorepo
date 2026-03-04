import themes, { withThemeByDataAttribute } from '@storybook/addon-themes';
import { definePreview } from '@storybook/react-vite';

import './index.css';

export default definePreview({
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      attributeName: 'data-theme',
      defaultTheme: 'light',
    }),
  ],
  addons: [themes()],
});
