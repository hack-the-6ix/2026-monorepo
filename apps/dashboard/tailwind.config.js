const sharedConfig = require('@hackthe6ix/tailwind-config');

module.exports = {
 ...sharedConfig,
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ]
};
