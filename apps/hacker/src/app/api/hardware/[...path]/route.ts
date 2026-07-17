import { NextRequest } from 'next/server';

// Base URL of the hardware backend (deployed from the hardware portal repo).
// Browser → same-origin /api/hardware/* (sends httpOnly ht6_session) → proxy
// → HARDWARE_API_URL. The hardware API verifies via HT6 /users/me using the
// session cookie. Do not forward client Authorization / X-Access-Token: those
// often come from stale localStorage tokens and make cookie auth get skipped.
const apiUrl =
  process.env.HARDWARE_API_URL || 'https://api.hardware.hackthe6ix.com';

const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailers',
  'transfer-encoding',
  'upgrade',
  'host',
  'content-length',
  // Drop client token headers so cookie auth is always used.
  'authorization',
  'x-access-token',
]);

async function proxyRequest(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const url = new URL(request.url);
  const targetUrl = `${apiUrl}/${path.join('/')}${url.search}`;

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  // Explicit Cookie set — Workers/undici may drop it if only copied from the
  // inbound header map on cross-origin subrequests.
  const cookie = request.headers.get('cookie') ?? request.cookies.toString();
  if (cookie) {
    headers.set('Cookie', cookie);
  }

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: request.body,
    duplex: 'half',
  } as RequestInit);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
