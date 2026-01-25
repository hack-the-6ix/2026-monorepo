import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // Assets are served from public/assets
  // Source assets are in packages/assets/
  // For development: symlink public/assets -> packages/assets
  // For production: copy assets during build if needed
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
