import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
// Disabled locally because no code uses getCloudflareContext() yet, and the
// workerd subprocess it spawns chews through macOS file watchers (EMFILE).
// Re-enable when wiring up actual Cloudflare bindings.
// import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
// initOpenNextCloudflareForDev();
