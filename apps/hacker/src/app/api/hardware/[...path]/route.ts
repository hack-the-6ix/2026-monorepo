import { NextRequest } from 'next/server';

// Base URL of the hardware backend (deployed from the hardware portal repo).
// The client calls /api/hardware/<path>; we forward to HARDWARE_API_URL/<path>.
// Dash auth is the httpOnly `ht6_session` cookie — the browser sends it to this
// same-origin proxy, and we forward it (plus Authorization / X-Access-Token
// derived from the session) so the hardware API can verify via HT6 /users/me.
const apiUrl =
  process.env.HARDWARE_API_URL || 'https://api.hardware.hackthe6ix.com';

async function proxyRequest(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const url = new URL(request.url);
  const targetUrl = `${apiUrl}/${path.join('/')}${url.search}`;

  const headers = new Headers(request.headers);
  headers.delete('host');

  // Explicitly forward cookies. Undici/Workers fetch can drop Cookie when
  // copying the inbound header map across origins.
  const cookie = request.headers.get('cookie') ?? request.cookies.toString();
  if (cookie) {
    headers.set('Cookie', cookie);
  }

  // Hardware auth accepts Authorization, X-Access-Token, or ht6_session.
  // JS cannot read the httpOnly session cookie, so attach it here when the
  // browser client did not already supply a token header.
  const session = request.cookies.get('ht6_session')?.value;
  if (session) {
    if (!headers.get('authorization')) {
      headers.set('Authorization', `Bearer ${session}`);
    }
    if (!headers.get('x-access-token')) {
      headers.set('X-Access-Token', session);
    }
  }

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: request.body,
    credentials: 'include',
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
