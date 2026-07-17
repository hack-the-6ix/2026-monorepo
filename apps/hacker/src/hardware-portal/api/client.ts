import type { ApiError } from '../types';

// Client-side base. Requests go to the Next.js proxy route
// (src/app/api/hardware/[...path]/route.ts), which forwards them to the
// hardware backend (HARDWARE_API_URL) — avoiding CORS and letting us attach
// the logged-in hacker's HT6 token.
const API_BASE = process.env.NEXT_PUBLIC_HARDWARE_API_URL || '/api/hardware';

export class HttpError extends Error {
  status: number;
  statusText: string;
  data?: ApiError;

  constructor(status: number, statusText: string, data?: ApiError) {
    super(data?.error || statusText);
    this.name = 'HttpError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

// Mirrors apps/hacker/src/client.ts (fetchHt6): read the HT6 token from
// localStorage (falling back to the `token` cookie) and forward it so the
// hardware backend can identify the user.
function getAccessToken(): string {
  if (typeof window === 'undefined') return '';
  const fromStorage = localStorage.getItem('token') ?? '';
  const fromCookie = document.cookie.match(/(?:^|; )token=([^;]+)/)?.[1] ?? '';
  return fromStorage || decodeURIComponent(fromCookie);
}

function authHeaders(): Record<string, string> {
  const token = getAccessToken();
  if (!token) return {};
  return {
    'X-Access-Token': token,
    Authorization: `Bearer ${token}`,
  };
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...authHeaders(),
  });
  // Merge any caller-supplied headers on top of the defaults. Going through
  // the Headers class handles every HeadersInit shape (Headers instance,
  // [key, value][] tuples, or a plain record) — a plain spread would silently
  // drop the first two. `.set` gives caller-wins override + case-insensitive
  // dedup; `new Headers(undefined)` is a valid empty no-op.
  new Headers(options.headers).forEach((value, key) => headers.set(key, value));

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
    cache: 'no-store',
  });

  if (!response.ok) {
    let errorData: ApiError | undefined;
    try {
      errorData = await response.json();
    } catch {
      // Response body is not JSON
    }
    throw new HttpError(response.status, response.statusText, errorData);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export async function get<T>(endpoint: string): Promise<T> {
  return request<T>(endpoint, { method: 'GET' });
}

export async function post<T>(endpoint: string, body?: unknown): Promise<T> {
  return request<T>(endpoint, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
}

export async function postForm<T>(
  endpoint: string,
  body: FormData,
): Promise<T> {
  // No Content-Type header — the browser sets it with the multipart boundary.
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: authHeaders(),
    body,
    credentials: 'include',
    cache: 'no-store',
  });
  if (!response.ok) {
    let errorData: ApiError | undefined;
    try {
      errorData = await response.json();
    } catch {
      /* not JSON */
    }
    throw new HttpError(response.status, response.statusText, errorData);
  }
  return response.json();
}
