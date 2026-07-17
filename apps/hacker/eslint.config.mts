import eslintConfig from '@hackthe6ix/eslint-config/next';

const config = [
  ...eslintConfig,
  {
    // Ported hardware portal: intentional <img> usage for dynamic/remote/data-URI
    // images (catalog thumbnails, upload previews), and setState-in-effect used
    // to sync derived local state (countdown ticks, object-URL previews).
    files: ['src/hardware-portal/**/*.{ts,tsx}'],
    rules: {
      '@next/next/no-img-element': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
];

export default config;
