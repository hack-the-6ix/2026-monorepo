import { NextRequest } from 'next/server';

const apiUrl = process.env.HT6_API_URL || 'https://v2.api.hackthe6ix.com/api';

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
export const OPTIONS = proxyRequest;
