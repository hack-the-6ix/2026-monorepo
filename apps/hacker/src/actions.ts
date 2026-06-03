import { NextRequest } from 'next/server';

type FetchParams = Parameters<typeof fetch>;
export function fetchWithCookies(
  request: NextRequest,
  ...params: Parameters<typeof fetch>
): ReturnType<typeof fetch>;
export function fetchWithCookies(request: NextRequest): typeof fetch;
export function fetchWithCookies(
  request: NextRequest,
  url?: FetchParams[0],
  init?: FetchParams[1],
) {
  const fetcher = (...params: Parameters<typeof fetch>) => {
    params[1] = {
      ...params[1],
      headers: { Cookie: request.cookies.toString(), ...params[1]?.headers },
    };
    return fetch(...params);
  };

  if (url) return fetcher(url, init);
  return fetcher;
}