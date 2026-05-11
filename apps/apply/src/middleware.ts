import { NextResponse } from 'next/server';

import { fetchWithCookies } from './actions';

export async function middleware(req: Request) {
  console.log('[MIDDLEWARE] hit', req.url);
  try {
    const res = await fetchWithCookies(`${process.env.HT6_API_URL}/auth/check`);
    console.log('[MIDDLEWARE] auth/check status:', res.status);
    if (!res.ok) throw new Error('Failed auth check. Triggering login');
  } catch (err) {
    console.error('[MIDDLEWARE] catch:', err);
    try {
      const auth = await fetch(
        `${process.env.HT6_API_URL}/auth/login?redirectUrl=${process.env.HOST_URL}`,
        { redirect: 'follow' },
      );
      console.log('[MIDDLEWARE] auth.url:', auth.url);
      return NextResponse.redirect(auth.url);
    } catch (loginErr) {
      console.error('[MIDDLEWARE] login fetch failed:', loginErr);
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
