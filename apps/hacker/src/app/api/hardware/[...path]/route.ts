import { NextRequest } from 'next/server';

// Base URL of the hardware backend (deployed from the hardware portal repo).
// The client calls /api/hardware/<path>; we forward to HARDWARE_API_URL/<path>,
// preserving the incoming headers (including the HT6 token attached by
// hardware-portal/api/client.ts) so the backend can identify the user.
const apiUrl = process.env.HARDWARE_API_URL || 'http://localhost:3000';

async function proxyRequest(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const url = new URL(request.url);
  const targetUrl = `${apiUrl}/${path.join('/')}${url.search}`;
  const headers = new Headers(request.headers);

  headers.delete('host');

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
