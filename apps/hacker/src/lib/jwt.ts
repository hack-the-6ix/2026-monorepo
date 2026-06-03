export function decodeJwtPayload(token: string): Record<string, any> {
  if (!token) return {};
  const payload = token.split('.')[1];
  if (!payload) return {};
  const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
  try {
    return JSON.parse(decoded);
  } catch {
    return {};
  }
}
