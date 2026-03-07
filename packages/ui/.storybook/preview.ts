import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { definePreview } from '@storybook/react-vite';

import './index.css';

export default definePreview({
  parameters: {
    options: {
      storySort: {
        order: ['Atoms', 'Modules'],
      },
    },
    controls: {
      disableSaveFromUI: true,
    },
    viewport: {
      options: {
        'desktop-lg': {
          name: 'Large Desktop',
          styles: {
            height: '67.5rem',
            width: '120rem',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            height: '64rem',
            width: '90rem',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            height: '64rem',
            width: '48rem',
          },
        },
        mobile: {
          name: 'Mobile',
          styles: {
            height: '35.5rem',
            width: '20rem',
          },
        },
      },
    },
  },
  globalTypes: {
    theme: { type: 'string' },
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
  addons: [],
});
