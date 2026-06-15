export const featureFlags = {
  // Flip this back to true to reopen the application flow.
  applicationFormOpen: false,
} as const;

const applicationRoutePrefixes = [
  '/about-you',
  '/experiences',
  '/long-answer',
  '/survey',
  '/review',
  '/thank-you',
] as const;

export function isApplicationRoute(pathname: string) {
  return applicationRoutePrefixes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
