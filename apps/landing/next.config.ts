import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // Assets are imported directly from packages/assets/
  // Webpack handles SVG imports automatically
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
