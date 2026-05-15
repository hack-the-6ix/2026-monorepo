import { NextResponse } from 'next/server';

import { fetchWithCookies } from './actions';

export async function middleware() {
  try {
    const res = await fetchWithCookies(`${process.env.HT6_API_URL}/auth/check`);
    if (!res.ok) throw new Error('Failed auth check. Triggering login');
  } catch (err) {
    console.error(err);
    try {
      const auth = await fetch(
        `${process.env.HT6_API_URL}/auth/login?redirectUrl=${process.env.HOST_URL}`,
        { redirect: 'follow' },
      );
      return NextResponse.redirect(auth.url);
    } catch {
      // Backend unreachable in dev; let the request through so the page can render.
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
