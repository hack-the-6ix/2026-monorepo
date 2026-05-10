import { cookies } from 'next/headers';

export async function fetchWithCookies(url: string, init?: RequestInit) {
  const store = await cookies();
  return fetch(url, {
    ...init,
    headers: { Cookie: store.toString(), ...init?.headers },
  });
}
